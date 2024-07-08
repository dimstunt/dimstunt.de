export let currentDeviceId = undefined;
export async function initCamera(video, canvas, drawVideoCallback, useFrontCamera = true) {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    let desiredDevice;
    if (useFrontCamera) {
      // Ищем фронтальную камеру
      desiredDevice = videoDevices.find(device => device.label.toLowerCase().includes('front'));
    } else {
      // Ищем заднюю камеру
      desiredDevice = videoDevices.find(device => device.label.toLowerCase().includes('back'));
    }

    // Если специфическое устройство не найдено, используем первое доступное видеоустройство
    currentDeviceId = desiredDevice ? desiredDevice.deviceId : videoDevices[0].deviceId;

    const constraints = {
      video: { deviceId: currentDeviceId ? { exact: currentDeviceId } : undefined }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.play();
    document.getElementById('video-output').style.display = 'block';
    document.getElementById('take-photo').style.display = 'block';
    document.getElementById('video-help').style.display = 'block';
    document.getElementById('switch-camera').style.display = 'block';
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
