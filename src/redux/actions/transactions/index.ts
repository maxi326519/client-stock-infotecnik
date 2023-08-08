import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Transactions } from "../../../interfaces";
import axios from "axios";

export const POST_TRANSACTIONS: string = "POST_TRANSACTIONS";
export const GET_TRANSACTIONS: string = "GET_TRANSACTIONS";
export const UPDATE_TRANSACTION: string = "UPDATE_TRANSACTION";
export const BIND_TRANSACTIONS = "BIND_TRANSACTIONS";
export const DELETE_TRANSACTION: string = "DELETE_TRANSACTION";

export function postTransactions(
  newTransactions: any[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions: Transactions[] = [];

      const response = await axios.post(`/transactions`, newTransactions);

      response.data.forEach((data: any) => {
        transactions.push({
          ...data,
          fecha: new Date(data.fecha),
        });
      });

      dispatch({
        type: POST_TRANSACTIONS,
        payload: transactions,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export function getTransactions(
  from: string,
  to: string,
  linked?: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions = await axios.get(
        `/transactions?from=${from}&to=${to}${linked ? `&linked=${linked}` : ""
        }`
      );

      let newData = transactions.data
        .map((data: any) => ({
          ...data,
          fecha: new Date(data.fecha),
        }))
        .sort(
          (a: Transactions, b: Transactions) =>
            b.fecha.getTime() - a.fecha.getTime()
        );

      dispatch({
        type: GET_TRANSACTIONS,
        payload: newData,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export function updateTransaction(
  transaction: Transactions
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/transactions", transaction);

      dispatch({
        type: UPDATE_TRANSACTION,
        payload: transaction,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export function bindTransactions(
  transactionId: string[],
  notes: string,
  invoiceFileId: string,
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      let data: {
        transactions: string[],
        notes: string,
        invoiceFile: string,
      } = {
        transactions: [],
        notes: "",
        invoiceFile: "",
      }

      if (transactionId) data.transactions = transactionId;
      if (notes) data.notes = notes;
      if (invoiceFileId) data.invoiceFile = invoiceFileId;

      console.log(data);

      await axios.patch("/transactions/link", data);

      dispatch({
        type: BIND_TRANSACTIONS,
        payload: data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function deleteTransaction(
  transactionId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/transactions/${transactionId}`);

      dispatch({
        type: DELETE_TRANSACTION,
        payload: transactionId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
