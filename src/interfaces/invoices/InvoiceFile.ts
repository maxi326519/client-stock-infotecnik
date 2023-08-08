export interface InvoiceFile {
  id?: string;
  date: Date | null;
  description: string;
  type: string;
  url: string;
  InvoiceId?: string;
  TransactionId?: string;
}

export interface ErrorInvoiceFile {
  date: string;
  description: string;
  type: string;
}

export interface Search {
  description: string;
  date: string;
}

export const initInvoiceFile = (): InvoiceFile => ({
  date: null,
  description: "",
  type: "",
  url: "",
});

export const initErrorInvoiceFile = (): ErrorInvoiceFile => ({
  date: "",
  description: "",
  type: "",
});

export const initSearch = (): Search => ({
  description: "",
  date: "",
});
