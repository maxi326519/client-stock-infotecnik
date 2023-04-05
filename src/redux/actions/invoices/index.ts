import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  RootState,
  Invoices,
  TipoImpositivo,
  BarCode,
} from "../../../interfaces";
import axios from "axios";

export const POST_INVOICE = "POST_INVOICE";
export const GET_INVOICE = "GET_INVOICE";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export function postInvoice(
  newInventory: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let impositivo: string = "";

      if (Number(newInventory.tipoImpositivo) === TipoImpositivo.IVA) {
        impositivo = "IVA";
      } else if (Number(newInventory.tipoImpositivo) === TipoImpositivo.REBU) {
        impositivo = "REBU";
      } else if (
        Number(newInventory.tipoImpositivo) === TipoImpositivo.recargo
      ) {
        impositivo = "Recargo";
      }

      const formatInvoice = {
        ...newInventory,
        tipoImpositivo: impositivo,
        detalles: newInventory.detalles.map((stock: any) => {
          let tipoCodigoDeBarras = "";

          if (Number(stock.tipoCodigoDeBarras) === -1) {
            tipoCodigoDeBarras = "Ninguno";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.Code128) {
            tipoCodigoDeBarras = "Code128";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.Code39) {
            tipoCodigoDeBarras = "Code39";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.UPCA) {
            tipoCodigoDeBarras = "UPC-A";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.UPCE) {
            tipoCodigoDeBarras = "UPC-E";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.EAN8) {
            tipoCodigoDeBarras = "EAN8";
          } else if (Number(stock.tipoCodigoDeBarras) === BarCode.EAN13) {
            tipoCodigoDeBarras = "EAN13";
          }

          console.log(tipoCodigoDeBarras);
          console.log(stock);
          console.log(stock.tipoCodigoDeBarras);
          console.log(Number(stock.tipoCodigoDeBarras));

          return {
            estado: stock.estado,
            fechaAlta: stock.fechaAlta,
            catalogo: stock.catalogo,
            IMEISerie: stock.IMEISerie,
            tipoCodigoDeBarras,
            codigoDeBarras: stock.codigoDeBarras,
            precioSinIVA: stock.precioSinIVA,
            precioIVA: stock.precioIVA,
            precioIVAINC: stock.precioIVAINC,
            recargo: stock.recargo,
            detalles: stock.detalles,
            imagenes: [],
            product: stock.ProductId,
          };
        }),
      };

      const response = await axios.post("/invoices", formatInvoice);

      console.log(response.data);

      dispatch({
        type: POST_INVOICE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };
}

export function getInvoice(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const invoices = await axios.get("/invoices");

      dispatch({
        type: GET_INVOICE,
        payload: invoices.data,
      });
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };
}

export function updateInvoice(
  updateInventory: Invoices
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/invoices", updateInventory);

      dispatch({
        type: UPDATE_INVOICE,
        payload: updateInventory,
      });
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };
}
