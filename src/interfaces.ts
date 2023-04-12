export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  rol: string;
  name: string;
  userName: string;
  email: string;
}

export interface PostUser {
  rol: string;
  name: string;
  userName: string;
  email: string;
  password: string;
}

export enum Rol {
  Admin = "Admin",
  Contador = "Contador",
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
  Images: string[];
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
  fechaAlta: string;
  estado: string;
  cantidad: number;
  catalogo: boolean;
  IMEISerie: string;
  tipoCodigoDeBarras: string;
  codigoDeBarras: string;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  recargo: number;
  total: number;
  detalles: string;
  Images: string[];
  ProductId: string;
  SupplierId: string;
  InvoiceId: string;
}

export interface Invoices {
  id: string;
  fecha: string;
  numero: number;
  pendiente: boolean;
  archivo: string;
  tipoImpositivo: TipoImpositivo;
  SuipplierId: string;
  StockId: Stock[];
}

export interface Client {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
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
  masDatos: string;
  importe: number;
  saldo: number;
  InvoiceId: string;
}

export enum BarCode {
  Code128,
  Code39,
  UPCA,
  UPCE,
  EAN8,
  EAN13,
}

export interface Config {
  iva: number;
  recargo: number;
}

export interface RootState {
  profile: User;
  users: User[];
  attributes: {
    capacidades: Array<string>;
    colores: Array<string>;
    categories: Array<any>;
  };
  products: Array<Product>;
  suppliers: Array<Supplier>;
  clients: Array<Client>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
  transactions: Array<Transactions>;
  config: Config;
  loading: boolean;
}
