import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Transactions } from "../../../interfaces";
import axios from "axios";

export const POST_TRANSACTIONS = "POST_TRANSACTIONS";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

export function postTransactions(
  newTransactions: any[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions: Transactions[] = [];

      for (let i = 0; i < newTransactions.length; i++) {
        const response = await axios.post("/transactions", newTransactions[i]);
        transactions.push(response.data);
      }

      dispatch({
        type: POST_TRANSACTIONS,
        payload: transactions,
      });
    } catch (error: any) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  };
}

export function getTransactions(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions = await axios.get("/transactions");

      console.log(transactions);

      dispatch({
        type: GET_TRANSACTIONS,
        payload: transactions.data,
      });
    } catch (error: any) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  };
}
