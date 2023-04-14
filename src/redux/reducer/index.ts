import { RootState } from "../../interfaces";
import { AnyAction } from "redux";
import {
  POST_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/user";
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
  DELETE_SUPPLIER,
} from "../actions/suppliers";
import {
  POST_CLIENT,
  GET_CLIENT,
} from "../actions/clients";
import {
  POST_TRANSACTIONS,
  GET_TRANSACTIONS,
} from "../actions/transactions";
import {
  GET_CONFIGURATIONS,
  UPDATE_CONFIGURATIONS,
} from "../actions/configurations";
import { POST_INVOICE, GET_INVOICE, UPDATE_INVOICE } from "../actions/invoices";
import { GET_INVENTORY, UPDATE_STOCK } from "../actions/inventory";
import { LOADING, CLOSE_LOADING } from "../actions/loading/loading";
import { LOGIN, LOG_OUT, PRESISTENCE } from "../actions/login";

const initialState: RootState = {
  profile: {
    id: "",
    rol: "",
    userName: "",
    name: "",
    email: "",
  },
  users: [],
  attributes: {
    capacidades: [],
    colores: [],
    categories: [],
  },
  products: [],
  suppliers: [],
  clients: [],
  stock: [],
  invoices: [],
  transactions: [],
  config: {
    iva: 0,
    recargo: 0,
  },
  loading: false,
};

export default function Reducer(
  state: RootState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        profile: {
          id: action.payload.id,
          rol: action.payload.rol,
          userName: action.payload.userName,
          name: action.payload.name,
          email: action.payload.email,
        },
      };

    case PRESISTENCE:
      return {
        ...state,
        profile: {
          id: action.payload.id,
          rol: action.payload.rol,
          userName: action.payload.userName,
          name: action.payload.name,
          email: action.payload.email,
        },
      };

    case LOG_OUT:
      return {
        ...state,
        profile: {
          id: "",
          rol: "",
          userName: "",
          name: "",
          email: "",
        },
      };

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

    case POST_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case POST_INVOICE:
      return {
        ...state,
        stock: [...state.stock, ...action.payload.inventory],
        invoices: [...state.invoices, action.payload.invoice],
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

    case POST_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };

    case POST_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
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

    case GET_CLIENT:
      return {
        ...state,
        clients: action.payload,
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

    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };

    case GET_CONFIGURATIONS:
      return {
        ...state,
        config: {
          iva: action.payload.iva,
          recargo: action.payload.recargo,
        },
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

    case UPDATE_CONFIGURATIONS:
      return {
        ...state,
        config: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter((s) => s.id !== action.payload),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
}
