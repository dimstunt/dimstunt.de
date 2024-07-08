export async function fetchColorNameFromAPI(hexColor) {
  const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexColor}`);
  const data = await response.json();
  return data;
}
