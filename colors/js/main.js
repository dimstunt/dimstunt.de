import { initCamera, drawRect, video } from './camera.js';
import { getAverageColor, rgbToHex, hexToRgb } from './colorAnalysis.js';
import { fetchColorNameFromAPI } from './api.js';
import { allColors, notOkColors } from './colors.js';

const canvas = document.getElementById('video-output');
const context = canvas.getContext('2d');

let lastAverageColor = null;

document.getElementById('help-button').addEventListener('click', async() => {
  const helpButton = document.getElementById('help-button');
  await initCamera(video, canvas, drawVideo);
  helpButton.style.display = 'none'; // Скрываем кнопку
  await listVideoDevices();
});

async function listVideoDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    const deviceListElement = document.getElementById('device-list');
    deviceListElement.innerHTML = ''; // Очистка предыдущего списка устройств

    videoDevices.forEach(device => {
      const deviceInfo = document.createElement('p');
      deviceInfo.textContent = `Device: ${device.label || 'No label available'}, ID: ${device.deviceId}`;
      deviceListElement.appendChild(deviceInfo);
    });
  } catch (err) {
    console.error("Ошибка при загрузке видеоустройств: ", err);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const colorBlockHeight = document.querySelector('.color-elem').offsetHeight; // Получаем высоту блока цвета
    const buttons = document.querySelectorAll('.button'); // Получаем все кнопки с классом 'button'

    buttons.forEach(button => {
        button.style.minHeight = `${colorBlockHeight}px`; // Устанавливаем минимальную высоту для каждой кнопки
    });
});

document.getElementById('switch-camera').addEventListener('click', () => {
  // Переключаемся на следующую камеру в списке
  initCamera(video, canvas, drawVideo); // Переинициализация камеры с новым deviceId
});

  const okColorsContainer = document.querySelector(".color-list .color-column:first-child");
  const notOkColorsContainer = document.querySelector(".color-list .color-column:last-child");

  allColors.forEach(color => {
    const colorDiv = document.createElement("div");
    colorDiv.className = "color-elem";
    colorDiv.style.backgroundColor = color.hex;
    colorDiv.textContent = `${color.name} (${color.hex})`;
    if (notOkColors.includes(color.name)) {
      notOkColorsContainer.appendChild(colorDiv);
    } else {
      okColorsContainer.appendChild(colorDiv);
  }
  });

function drawVideo() {
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    requestAnimationFrame(drawVideo);
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const rectSize = Math.min(25, canvas.width / 2, canvas.height / 2);
  const centerX = (canvas.width - rectSize) / 2;
  const centerY = (canvas.height - rectSize) / 2;

  const borderColor = applyAdaptiveWhiteBalance(context, canvas, centerX, centerY, rectSize, rectSize);
  // console.log(borderColor)

  if (rectSize > 0) {
    const imageData = context.getImageData(centerX, centerY, rectSize, rectSize);
    lastAverageColor = getAverageColor(imageData);
    drawRect(context, lastAverageColor, true, borderColor);  // Визуализация области для среднего цвета
  }

  requestAnimationFrame(drawVideo);
}

function applyAdaptiveWhiteBalance(context, canvas, x, y, width, height) {
    const fullImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const fullData = fullImageData.data;
    let rSum = 0, gSum = 0, bSum = 0;
    let highBrightnessCount = 0;
    let total = fullData.length / 4;
    // let maxBrigthness = 0;

    for (let i = 0; i < fullData.length; i += 4) {
        let r = fullData[i];
        let g = fullData[i + 1];
        let b = fullData[i + 2];
        let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        rSum += r;
        gSum += g;
        bSum += b;
        // if (brightness > maxBrigthness) maxBrigthness = brightness;
        if (brightness > 225) highBrightnessCount++;
    }
    // console.log(maxBrigthness);
    const rAvg = rSum / total;
    const gAvg = gSum / total;
    const bAvg = bSum / total;
    const maxAvg = Math.max(rAvg, gAvg, bAvg);

    let scaleR, scaleG, scaleB;

    let balance_color;
    const imageData = context.getImageData(x, y, width, height);
    const data = imageData.data;
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    const centerIndex = (centerY * width + centerX) * 4;
    const max_color_diff = 15;
    // console.log(Math.abs(rAvg - gAvg), Math.abs(gAvg - bAvg), Math.abs(bAvg - rAvg))
    // console.log(highBrightnessCount, total * 0.05)
    if (highBrightnessCount > total * 0.05) {
        scaleR = maxAvg / rAvg;
        scaleG = maxAvg / gAvg;
        scaleB = maxAvg / bAvg;
        balance_color = 'white'
    } else if (Math.abs(rAvg - gAvg) < max_color_diff && Math.abs(gAvg - bAvg) < max_color_diff && Math.abs(bAvg - rAvg) < max_color_diff) {
        const avg = (rAvg + gAvg + bAvg) / 3;
        scaleR = avg / rAvg;
        scaleG = avg / gAvg;
        scaleB = avg / bAvg;
        balance_color = 'gray'
    } else {
        context.putImageData(imageData, x, y);
        return 'purple';
    }

    for (let i = 0; i < data.length; i += 4) {
        data[i] = (data[i] * scaleR) | 0;
        data[i + 1] = (data[i + 1] * scaleG) | 0;
        data[i + 2] = (data[i + 2] * scaleB) | 0;
    }

    context.putImageData(imageData, x, y);
    return balance_color
}

document.getElementById('take-photo').addEventListener('click', async () => {
    if (lastAverageColor) {
        const closestColor = await findClosestColor(lastAverageColor);
        displayColorInfo(closestColor);
    } else {
        console.log("No color data available");
    }
});

async function findClosestColor(lastAverageColor) {
    let closestColor = null;
    let minDifference = Infinity;
    allColors.forEach(color => {
        const colorRgb = hexToRgb(color.hex);
        const difference = Math.sqrt(
            Math.pow(colorRgb.r - lastAverageColor.r, 2) +
            Math.pow(colorRgb.g - lastAverageColor.g, 2) +
            Math.pow(colorRgb.b - lastAverageColor.b, 2)
        );
        if (difference < minDifference) {
            minDifference = difference;
            closestColor = color;
        }
    });

    if (minDifference > 30) {
        const hexColor = rgbToHex(lastAverageColor.r, lastAverageColor.g, lastAverageColor.b).slice(1);
        const data = await fetchColorNameFromAPI(hexColor);
        return { ...data, closestColor: closestColor, isClosest: false };
    }
    return { closestColor: closestColor, isClosest: true };
}

function displayColorInfo(result) {
    const response = document.getElementById('color-response');
    response.style.display = 'block';
    if (!result.isClosest) {
        response.style.backgroundColor = `#${result.hex.clean}`;
        response.textContent = `Возможно, это не красный, скорее всего это: ${result.name.value}`;
    } else {
        const color = result.closestColor;
        response.style.backgroundColor = color.hex;
        response.textContent = `Ближайший цвет: ${color.name} (${color.hex}). ${notOkColors.includes(color.name) ? 'Не подходит' : 'Подходит'}.`;
    }
}
