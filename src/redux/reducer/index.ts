import { RootState } from "../../interfaces";
import { AnyAction } from "redux";

import {
  POST_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  POST_CATEGORIES,
  POST_CAPACIDADES,
  POST_COLORES,
  GET_ATTRIBUTES,
} from "../actions/products";
import {
  POST_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER,
} from "../actions/suppliers";
import { POST_INVOICE, GET_INVOICE, UPDATE_INVOICE } from "../actions/invoices";
import { GET_INVENTORY, UPDATE_STOCK } from "../actions/inventory";
import { LOADING, CLOSE_LOADING } from "../actions/loading/loading";
import { LOGIN, LOG_OUT } from "../actions/login/login";

const initialState: RootState = {
  user: {
    name: "Cargando",
  },
  attributes: {
    capacidades: [],
    colores: [],
    categories: [],
  },
  products: [],
  suppliers: [],
  stock: [],
  invoices: [],
  transactions: [
    {
      id: "",
      fecha: "15/03/2023",
      fechaValor: "15/03/2023",
      movimiento: "PRCU-2023-2279",
      datos: "AXARNET COMUNICACIONES SL",
      importe: -241.95,
      saldo: 4144.48,
      InvoiceId: "",
    },
  ],
  loading: false,
};

export default function Reducer(
  state: RootState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    /* LOADING */
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLOSE_LOADING:
      return {
        ...state,
        loading: false,
      };
    /* POST METHOD*/
    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case POST_SUPPLIER:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    case POST_INVOICE:
      return {
        ...state,
        stock: [...state.stock, action.payload.inventory],
        invoices: [...state.invoices, action.payload.invoce],
      };

    case POST_CATEGORIES:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          categories: action.payload,
        },
      };

    case POST_CAPACIDADES:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          capacidades: action.payload,
        },
      };

    case POST_COLORES:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          colores: action.payload,
        },
      };

    /* GET METHOD*/
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case GET_SUPPLIER:
      return {
        ...state,
        suppliers: action.payload,
      };

    case GET_INVOICE:
      return {
        ...state,
        invoices: action.payload,
      };

    case GET_INVENTORY:
      return {
        ...state,
        stock: action.payload,
      };

    case GET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload,
      };

    /* UPDATE METHOD*/
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };

    case UPDATE_STOCK:
      return {
        ...state,
        stock: state.stock.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
}
