
export const convertirHexaASexa = () => {

// Convertir el código hexadecimal a decimal
  const decimal = parseInt(codigoHexa, 16);
  
  // Convertir el decimal a sexagesimal
  let segundos = decimal % 60;
  let minutos = Math.floor(decimal / 60) % 60;
  let grados = Math.floor(decimal / (60 * 60));

  // Retornar el resultado en formato sexagesimal
  return `${grados} + ${minutos} + ${segundos}` ;
}
