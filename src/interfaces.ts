export interface Login {
  email: string;
  password: string;
}

export interface Profile {
  name: string;
  user: string;
  email: string;
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
  estado: string;
  fechaAlta: string;
  catalogo: boolean;
  IMEISerie: string /* enum[IMEI, nroSerie] */;
  tipoCodigoDeBarras: string;
  codigoDeBarras: string;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  recargo: number;
  detalles: string;
  imagen: string;
  ProductId: string;
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
  profile: Profile;
  users: Profile[];
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
  config: Config;
  loading: boolean;
}
