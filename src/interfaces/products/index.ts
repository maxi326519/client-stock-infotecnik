export interface Product {
  id?: number;
  codigo: string;
  cantidad: number;
  tipoCodigoDeBarras: string;
  codigoDeBarras: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descLarga: string;
  descCorta: string;
  Images: string[];
  CategoryId: string;
}

export const initProduct: Product = {
  codigo: "",
  cantidad: 0,
  tipoCodigoDeBarras: "",
  codigoDeBarras: "",
  modelo: "",
  marca: "",
  color: "",
  capacidad: "",
  descLarga: "",
  descCorta: "",
  CategoryId: "",
  Images: [],
};
