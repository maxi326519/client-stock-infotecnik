export interface InvoiceFile {
  id?: string;
  date: string;
  description: string;
  type: string;
  url: string;
  InvoiceId?: string;
  TransactionId?: string;
}

export interface Search {
  description: string;
  date: string;
}

export const initInvoiceFile = (): InvoiceFile => ({
  date: "",
  description: "",
  type: "",
  url: "",
});

export const initSearch = (): Search => ({
  description: "",
  date: "",
});
