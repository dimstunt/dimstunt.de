// Объявляем переменные для хранения доступных устройств и текущего индекса устройства
export let videoDevices = [];
export let currentDeviceIndex = 0;

export let video = document.createElement('video');
video.setAttribute('autoplay', '');
video.setAttribute('playsinline', '');

export async function initCamera(video, canvas, drawVideoCallback) {
  try {
    // Если список устройств пуст, получаем список всех видеоустройств
    if (videoDevices.length === 0) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      videoDevices = devices.filter(device => device.kind === 'videoinput');
      if (videoDevices.length === 0) {
        throw new Error('No video devices found');
      }
    }

    // Получаем deviceId следующего устройства в списке
    let deviceId = videoDevices[currentDeviceIndex].deviceId;
    console.log(videoDevices)
    // Обновляем индекс текущего устройства
    currentDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;

    const constraints = {
      video: { deviceId: { exact: deviceId } }
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.play();
    document.getElementById('video-output').style.display = 'block';
    document.getElementById('take-photo').style.display = 'block';
    document.getElementById('video-help').style.display = 'block';
    document.getElementById('switch-camera').style.display = 'block';
    document.getElementById('switch-camera').textContent = `Включить ${videoDevices[currentDeviceIndex].label || 'No label available'}`;
    drawVideoCallback();
  } catch (err) {
    console.error("Ошибка доступа к камере: ", err);
  }
}


export function drawRect(context, averageColor = null, drawBorder = true, borderColor) {
    const canvas = context.canvas;
    const rectSize = Math.min(25, canvas.width / 2, canvas.height / 2);
    const centerX = (canvas.width - rectSize) / 2;
    const centerY = (canvas.height - rectSize) / 2;

    if (averageColor) {
        context.fillStyle = `rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`;
        context.fillRect(centerX, centerY, rectSize, rectSize);
    }

    if (drawBorder) {
        if (borderColor) {
            context.strokeStyle = borderColor;  // Зелёный цвет рамки
        }
        context.lineWidth = 2;
        context.strokeRect(centerX, centerY, rectSize, rectSize);
    }
}
