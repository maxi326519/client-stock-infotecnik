import { InvoiceFile } from "../../../interfaces/invoices/InvoiceFile";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import axios from "axios";

export const POST_FILE = "POST_FILE";
export const GET_FILES = "GET_FILE";
export const GET_FILES_BY_ID = "GET_FILES_BY_ID";
export const UPDATE_FILE = "UPDATE_FILE";
export const DELETE_FILE = "DELETE_FILE";

export function postFile(
  fileData: InvoiceFile,
  file: File
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/invoiceFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: POST_FILE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function getFilesData(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.get("/invoiceFile");

      dispatch({
        type: GET_FILES,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function getFileById(
  fileId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.get(`/invoiceFile/${fileId}`);

      dispatch({
        type: GET_FILES_BY_ID,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function updateFile(
  fileData: InvoiceFile
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/invoiceFile", fileData);

      dispatch({
        type: UPDATE_FILE,
        payload: fileData,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function deleteFile(
  fileId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/invoiceFile/${fileId}`);

      dispatch({
        type: DELETE_FILE,
        payload: fileId,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}
