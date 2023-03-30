export interface Login {
  email: string;
  password: string;
}

export interface User {
  name: string;
}

export interface Product {
  id: string;
  codigo: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descLarga: string;
  descCorta: string;
  imgGenerica: string[];
  CategoryId: string;
}

export interface Supplier {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}
export interface Stock {
  id: string;
  status: string;
  IMEISerie: string /* enum[IMEI, nroSerie] */;
  tipoCodigoDeBarras: string;
  codigoDeBarras: string;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  imagen: string;
  ProductId: string;
  InvoiceId: string;
}

export interface Invoices {
  id: string;
  fecha: string;
  numero: number;
  archivo: string;
  tipoImpositivo: TipoImpositivo;
  SuipplierId: string;
  ProductId: Stock[];
}

export enum TipoImpositivo {
  IVA,
  recargo,
  REBU,
}

export interface Transactions {
  id: string;
  fecha: string;
  fechaValor: string;
  movimiento: string;
  datos: string;
  importe: number;
  saldo: number;
  InvoiceId: string;
}

export enum BarCode {
  Coded128,
  Code39,
  UPCA,
  UPCE,
  EAN8,
  EAN13,
}

export interface RootState {
  currentUser: User;
  users: User[];
  attributes: {
    capacidades: Array<string>;
    colores: Array<string>;
    categories: Array<any>;
  };
  products: Array<Product>;
  suppliers: Array<Supplier>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
  transactions: Array<Transactions>;
  loading: boolean;
}
