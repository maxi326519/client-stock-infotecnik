import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postInvoice } from "../../../../../redux/actions/invoices";
import { Supplier, TipoImpositivo } from "../../../../../interfaces";
import { Stock, RootState, Invoices } from "../../../../../interfaces";
import isBarCodeValid from "../../../../../functions/barCodes";
import isValidIMEI from "../../../../../functions/IMEI";
import calcularIVA from "../../../../../functions/IVA";

import AddProduct from "./AddProduct/AddProduct";
import AddSupplier from "./AddSupplier/AddSupplier";
import ProductData from "./ProductData/ProductData";
import InvoiceData from "./InvoiceData/InvoiceData";
import SupplierData from "./SupplierData/SupplierData";
import products from "../../../../../assets/svg/products.svg";
import supplier from "../../../../../assets/svg/supplier.svg";

import style from "./Form.module.css";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

interface Props {
  handleClose: () => void;
}

const initialState: Invoices = {
  id: "",
  fecha: new Date().toISOString().split("T")[0],
  numero: 0,
  pendiente: false,
  archivo: "123",
  tipoImpositivo: TipoImpositivo.IVA,
  SuipplierId: "",
  ProductId: [],
};

const initialStock: Stock = {
  id: "",
  estado: "Nuevo",
  catalogo: true,
  fechaAlta: new Date().toISOString().split("T")[0],
  IMEISerie: "",
  tipoCodigoDeBarras: "",
  codigoDeBarras: "",
  precioSinIVA: 0,
  precioIVA: 0,
  precioIVAINC: 0,
  recargo: 0,
  detalles: "",
  imagen: "",
  ProductId: "",
  InvoiceId: "",
};

export default function Form({ handleClose }: Props) {
  const invoices = useSelector((state: RootState) => state.invoices);

  const [productsSelected, setProduct] = useState<string[]>([]);
  const [supplierSelected, setSupplier] = useState<Supplier | null>(null);
  const [stock, setStock] = useState<Stock[]>([]); // Datos de los productos seleccionados
  const [invoice, setInvoice] = useState<Invoices>(initialState); // Datos de la factura

  const [addProducts, setFormProducts] = useState<boolean>(false);
  const [addSupplier, setFormSuppliers] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setStock(
      productsSelected.map((p) => {
        return { ...initialStock, ProductId: p };
      })
    );
  }, [productsSelected]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newInvoice = {
      ...invoice,
      detalles: stock,
      supplier: supplierSelected?.id,
    };
    console.log(newInvoice);
    console.log(newInvoice);
        dispatch(loading());
    dispatch<any>(postInvoice(newInvoice))
      .then(() => {
        handleClose();
        swal("Guardado", "Su inventario se guardo correctamente", "success");
        dispatch(closeLoading());
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo inventario", "error");
      });
  }

  function handleChangeInvoice(name: string, value: string | number) {
    const newInvoice = { ...invoice, [name]: value };
    console.log(newInvoice);
    setInvoice(newInvoice);
  }

  function handleChangeProduct(productId: string, name: string, value: string | number) {
    const newStock: Stock[] = stock.map((s: Stock): Stock => {
      if (s.ProductId === productId) {
        switch (name) {
          case "precioSinIVA":
            return {
              ...s,
              ...calcularIVA(invoice.tipoImpositivo, name, value),
            };
          case "precioIVA":
            return {
              ...s,
              ...calcularIVA(invoice.tipoImpositivo, name, value),
            };
          default:
            return {
              ...s,
              [name]: value,
            };
        }
      }
      return s;
    });

    console.log(newStock);
    setStock(newStock);
  }

  function handleValidation(stock: Stock, name: string, value: any) {
    if (name === "codigoDeBarras") {
      console.log(isBarCodeValid(stock.tipoCodigoDeBarras, value));
    }
    if (name === "IMEISerie") {
      console.log(isValidIMEI(value));
    }
  }

  function handleLocalClose(): void {
    handleClose();
    setProduct([]);
    setSupplier(null);
    setStock([]);
    setInvoice(initialState);
  }

  /* Formularios */
  function handleFormProduct(): void {
    setFormProducts(!addProducts);
  }

  function handleFormSuppliers(): void {
    setFormSuppliers(!addSupplier);
  }

  return (
    <div className={style.container}>
      {addProducts ? (
        <AddProduct
          productsSelected={productsSelected}
          setProduct={setProduct}
          handleClose={handleFormProduct}
        />
      ) : null}
      {addSupplier ? (
        <AddSupplier
          supplierSelected={supplierSelected}
          setSupplier={setSupplier}
          handleClose={handleFormSuppliers}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar inventario</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleLocalClose}
          >
            X
          </button>
        </div>
        <div className={style.data}>
          <div className={style.flex}>
            <div className={style.dataRight}>
              <div className={style.containerButton}>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleFormProduct}
                >
                  <img src={products} alt="products" />
                  <span>Productos</span>
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleFormSuppliers}
                >
                  <img src={supplier} alt="supplier" />
                  <span>Proveedor</span>
                </button>
              </div>

              <InvoiceData
                invoice={invoice}
                handleChange={handleChangeInvoice}
              />
              <SupplierData supplier={supplierSelected} />
              <button type="submit" className="btn btn-success">
                Agregar inventario
              </button>
            </div>
            {/* Products */}
            {productsSelected.length > 0 ? (
              <ProductData
                stock={stock}
                tipoImpositivo={invoice.tipoImpositivo}
                handleChange={handleChangeProduct}
              />
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
