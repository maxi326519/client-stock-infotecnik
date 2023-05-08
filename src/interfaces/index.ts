import {
  Invoices,
  TotalDetail,
  Stock,
  TipoImpositivo,
  initInvoice,
  initDetail,
  initStock,
} from "./invoices";

import {
  SaleInvoice,
  SaleDetail,
  PriceDetail,
  TipoImpositivoSale,
  MetodoDePago,
  ErrorSaleInvoice,
  initSaleInvoice,
  initSaleDetail,
  initPriceDetail,
  initErrorSaleInvoice,
} from "./sales";

import { Product, initProduct } from "./products";

interface Login {
  email: string;
  password: string;
}

interface User {
  id: string;
  rol: string;
  name: string;
  userName: string;
  email: string;
}

interface PostUser {
  rol: string;
  name: string;
  userName: string;
  email: string;
  password: string;
}

enum Rol {
  Admin = "Admin",
  Contador = "Contador",
}

interface Supplier {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}

interface Client {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}

interface Transactions {
  id: string;
  fecha: Date;
  fechaValor: string;
  movimiento: string;
  masDatos: string;
  importe: number;
  saldo: number;
  vinculada: boolean;
  invoiceId?: string;
  invoiceType?: string;
}

enum BarCode {
  Ninguno = "",
  Code128 = "Code128",
  Code39 = "Code39",
  UPCA = "UPC-A",
  UPCE = "UPC-E",
  EAN8 = "EAN8",
  EAN13 = "EAN13",
}

interface Config {
  iva: {
    ivaSuperReducido: number;
    ivaReducido: number;
    ivaGeneral: number;
    recargo: number;
  },
  business: {
    name: string;
    adress: string;
    image: string;
  }
}

interface RootState {
  profile: User;
  users: User[];
  attributes: {
    capacidades: Array<string>;
    colores: Array<string>;
    marcas: Array<string>;
    categories: Array<any>;
    types: Array<string>;
  };
  products: Array<Product>;
  suppliers: Array<Supplier>;
  clients: Array<Client>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
  sales: SaleInvoice[];
  transactions: Array<Transactions>;
  config: Config;
  loading: boolean;
}

export type {
  RootState,
  Invoices,
  TotalDetail,
  Login,
  User,
  PostUser,
  Product,
  Supplier,
  Stock,
  Client,
  Transactions,
  Config,
  SaleInvoice,
  SaleDetail,
  PriceDetail,
  ErrorSaleInvoice,
};

export {
  TipoImpositivo,
  BarCode,
  Rol,
  TipoImpositivoSale,
  MetodoDePago,
  initInvoice,
  initDetail,
  initStock,
  initProduct,
  initSaleInvoice,
  initSaleDetail,
  initPriceDetail,
  initErrorSaleInvoice,
};
