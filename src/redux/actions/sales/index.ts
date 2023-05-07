import { ThunkAction } from "redux-thunk";
import { RootState, SaleDetail, SaleInvoice } from "../../../interfaces";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import axios from "axios";

export const POST_SALE = "POST_SALE";
export const GET_SALES = "GET_SALES";
export const UPDATE_SALE_INVOICE = "UPDATE_SALE_INVOICE";
export const UPDATE_SALE_ITEM = "UPDATE_SALE_ITEM";
export const DELETE_SALE_INVOICE = "DELETE_SALE_INVOICE";
export const DELETE_SALE_ITEM = "DELETE_SALE_ITEM";

export function postSaleInvoice(
  sale: SaleInvoice
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newSale = await axios.post("/sales", sale);

      dispatch({
        type: POST_SALE,
        payload: newSale.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getSales(
  from: string,
  to: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const sales = await axios.get(`/sales?from=${from}&to=${to}`);

      dispatch({
        type: GET_SALES,
        payload: sales.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateSaleInvoice(
  updateSaleInvoice: SaleInvoice
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/sales/invoice", updateSaleInvoice);

      dispatch({
        type: UPDATE_SALE_INVOICE,
        payload: updateSaleInvoice,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateSaleItem(
  updateSaleDetail: SaleDetail
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/sales/item", updateSaleDetail);

      dispatch({
        type: UPDATE_SALE_ITEM,
        payload: updateSaleDetail,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteSaleInvoice(
  saleInvoiceId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.get(`/sales/invoice/${saleInvoiceId}`);

      dispatch({
        type: DELETE_SALE_INVOICE,
        payload: saleInvoiceId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteSaleItem(
  saleDetailId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/sales/item/${saleDetailId}`);

      dispatch({
        type: DELETE_SALE_ITEM,
        payload: saleDetailId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
