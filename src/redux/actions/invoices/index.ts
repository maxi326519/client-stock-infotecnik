import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  RootState,
  Invoices,
  TipoImpositivo,
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
        fecha: newInventory.fecha,
        numero: newInventory.numero,
        pendiente: newInventory.pendiente,
        archivo: newInventory.archivo,
        tipoImpositivo: impositivo,
        supplier: newInventory.SupplierId,
        detalles: newInventory.detalles.map((stock: any) => {
          let tipoCodigoDeBarras = "";

          console.log(stock.Images);

          return {
            estado: stock.estado,
            fechaAlta: stock.fechaAlta,
            cantidad: stock.cantidad,
            catalogo: stock.catalogo,
            IMEISerie: stock.IMEISerie,
            tipoCodigoDeBarras,
            codigoDeBarras: stock.codigoDeBarras,
            precioSinIVA: Number(stock.precioSinIVA),
            precioIVA: Number(stock.precioIVA),
            precioIVAINC: Number(stock.precioIVAINC),
            recargo: Number(stock.recargo),
            total: Number(stock.total),
            detalles: stock.detalles,
            Images: stock.Images || [],
            productId: stock.ProductId,
            supplierId: newInventory.SupplierId,
          };
        }),
      };

      console.log("POST - Invoice", formatInvoice);

      const response = await axios.post("/invoices", formatInvoice);

      console.log("POST response - Invoice", response.data);

      dispatch({
        type: POST_INVOICE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error.message);
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
      const invoices = await axios.get("/invoice");

      console.log("getInvoices");

      dispatch({
        type: GET_INVOICE,
        payload: invoices.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
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
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
