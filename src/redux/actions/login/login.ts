import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Login, RootState } from "../../../interfaces";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOG_OUT = "LOG_OUT";

export function login(
  user: Login
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/login", user);

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function logOut(
  user: Login
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: LOG_OUT,
        payload: null,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
