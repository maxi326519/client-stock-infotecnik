import { TipoImpositivo } from "../interfaces";

export default function calcularIVA(
  tipoImpositivo: TipoImpositivo,
  name: string,
  value: number | string
) {
  let prices = {};

  switch (tipoImpositivo) {
    case TipoImpositivo.IVA:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: (Number(value) * 1.21).toFixed(2),
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: (Number(value) / 1.21).toFixed(2),
          precioIVA: value,
        };
      }
      break;
    case TipoImpositivo.recargo:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: (Number(value) * 1.262).toFixed(2),
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: (Number(value) / 1.262).toFixed(2),
          precioIVA: value,
        };
      }
      break;
    case TipoImpositivo.REBU:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: value,
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: value,
        };
      }
      break;
    default:
      break;
  }

  return prices;
}
