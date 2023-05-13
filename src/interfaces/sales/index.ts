export interface SaleInvoice {
  id: string;
  numero: string;
  fecha: Date;
  cantidad: number;
  total: number;
  ticket: string;
  tipoImpositivo: TipoImpositivoSale;
  SaleDetails: SaleDetail[];
  detallesDePrecio: PriceDetail[];
}

export interface SaleDetail {
  id: string;
  date: Date;
  concepto: string;
  tipoImpositivo: TipoImpositivoSale;
  baseImponible: number;
  ivaPorcentaje: number;
  ivaMonto: number;
  recargoPorcentaje: number;
  recargoMonto: number;
  cantidad: number;
  ProductId?: number;
  StockId: string;
  SaleInvoiceId: string;
}

export interface PriceDetail{
  id: string;
  metodoDePago: MetodoDePago;
  monto: number;
  nroOperacion?: number;
}

export enum TipoImpositivoSale {
  Compuesto = "Compuesto",
  IVA = "IVA",
  RE = "RE",
  REBU = "REBU",
}

export enum MetodoDePago {
  efectivo = "EFECTIVO",
  tarjeta = "TARJETA",
  transferenciaBancaria = "TRANSFERENCIA BANCARIA",
  bizum = "BIZUM",
  contratoCompraventa = "CONTRATO COMPRAVENTA",
}

export interface ErrorSaleInvoice {
  numero: string;
  total: string;
  cantidad: string;
}

export interface HookSaleInvoice {
  invoice: SaleInvoice;
  details: SaleDetail[];
  priceDetails: PriceDetail[];
  errors: ErrorSaleInvoice;
  customs: {
    setInvoice: (invoice: SaleInvoice) => void;
    reset: () => void;
    addDetail: (stockId?: string[]) => void;
    setDetail: (detailId: string, name: string, value: string | number) => void;
    removeDetail: (detailId: string) => void;
    addPriceDetail: () => void;
    setPriceDetail: (priceDetailId: string, name: string, value: string | number) => void;
    removePriceDetail: (priceDetailId: string) => void;
    postInvoice: () => Promise<any>;
  };
}

export const initSaleInvoice: SaleInvoice = {
  id: "",
  numero: "",
  fecha: new Date(),
  tipoImpositivo: TipoImpositivoSale.Compuesto,
  total: 0,
  cantidad: 1,
  ticket: "",
  SaleDetails: [],
  detallesDePrecio:[],
};

export const initSaleDetail: SaleDetail = {
  id: "",
  date: new Date(),
  tipoImpositivo: TipoImpositivoSale.IVA,
  concepto: "",
  cantidad: 1,
  baseImponible: 0,
  ivaPorcentaje: 0,
  ivaMonto: 0,
  recargoPorcentaje: 0,
  recargoMonto: 0,
  StockId: "",
  SaleInvoiceId: "",
};

export const initPriceDetail = {
  id: "",
  metodoDePago: MetodoDePago.efectivo,
  monto: 0,
}

export const initErrorSaleInvoice = {
  id: "",
  numero: "",
  total: "",
  cantidad: "",
};
