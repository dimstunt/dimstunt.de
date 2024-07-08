export function getAverageColor(imageData) {
  const data = imageData.data;
  let r = 0, g = 0, b = 0;
  const total = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  return { r: Math.floor(r / total), g: Math.floor(g / total), b: Math.floor(b / total) };
}

export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => Number(x).toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
