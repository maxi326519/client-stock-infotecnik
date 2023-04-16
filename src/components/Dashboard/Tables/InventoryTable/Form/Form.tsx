import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postInvoice } from "../../../../../redux/actions/invoices";
import { Supplier, TipoImpositivo } from "../../../../../interfaces";
import { Stock, RootState, Invoices } from "../../../../../interfaces";
/* import isBarCodeValid from "../../../../../functions/barCodes";
import isValidIMEI from "../../../../../functions/IMEI"; */
import calcularIVA from "../../../../../functions/IVA";

import AddProduct from "./AddProduct/AddProduct";
import AddSupplier from "./AddSupplier/AddSupplier";
import ProductData from "./ProductData/ProductData";
import InvoiceData from "./InvoiceData/InvoiceData";
import SupplierData from "./SupplierData/SupplierData";

import style from "./Form.module.css";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import axios from "axios";

interface ImagesData {
  stockId: string;
  imageUrls: string[];
  imageFiles: File[];
}

interface Props {
  handleClose: () => void;
}

const initialState: Invoices = {
  id: "",
  fecha: new Date().toISOString().split("T")[0],
  numero: 1,
  pendiente: false,
  archivo: "",
  tipoImpositivo: TipoImpositivo.IVA,
  SuipplierId: "",
  StockId: [],
};

const initialStock: Stock = {
  id: "",
  fechaAlta: new Date().toISOString().split("T")[0],
  estado: "Nuevo",
  cantidad: 1,
  catalogo: true,
  IMEISerie: "",
  tipoCodigoDeBarras: "",
  codigoDeBarras: "",
  precioSinIVA: 0,
  precioIVA: 0,
  precioIVAINC: 0,
  recargo: 0,
  total: 0,
  detalles: "",
  Images: [],
  ProductId: "",
  SupplierId: "",
  InvoiceId: "",
};

export default function Form({ handleClose }: Props) {
  const config = useSelector((state: RootState) => state.config);
  const [images, setImages] = useState<ImagesData[]>([]);
  const [productsSelected, setProduct] = useState<string[]>([]);
  const [supplierSelected, setSupplier] = useState<Supplier | null>(null);
  const [stock, setStock] = useState<Stock[]>([]); // Datos de los productos seleccionados
  const [invoice, setInvoice] = useState<Invoices>(initialState); // Datos de la factura
  const [file, setFile] = useState<File | undefined>();
  const [addProducts, setFormProducts] = useState<boolean>(false);
  const [addSupplier, setFormSuppliers] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const stock = productsSelected.map((p, i) => {
      return { ...initialStock, id: i.toString(), ProductId: p };
    });
    setStock(stock);
  }, [productsSelected]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let invoiceURL: string = "";
    let imagesList: Array<{ stockId: string; imagesUrls: string[] }> = [];

    if (!invoice.pendiente && file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/upload/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        invoiceURL = response.data.path;
      } catch (error) {
        console.error(error);
      }
    }

    for (let image of images) {
      let url: string[] = [];

      for (let i = 0; i < image.imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("file", image.imageFiles[i]);

        try {
          const response = await axios.post("/upload/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          url.push(response.data.path);
        } catch (error) {
          console.error(error);
        }
      }

      imagesList.push({
        stockId: image.stockId,
        imagesUrls: url,
      });
    }

    const newInvoice = {
      ...invoice,
      detalles: stock.map((stock: Stock) => ({
        ...stock,
        Images: imagesList.find((imagesUrl) => imagesUrl.stockId === stock.id)
          ?.imagesUrls,
      })),
      archivo: invoiceURL,
      SupplierId: supplierSelected?.id,
    };

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
        swal(
          "Error",
          `Hubo un error al guardar el nuevo inventario: ${err.message}`,
          "error"
        );
      });
  }

  function handleChangeInvoice(name: string, value: string | number | boolean) {
    const newInvoice = { ...invoice, [name]: value };
    setInvoice(newInvoice);

    if (name === "pendiente") {
      if (value) {
        setFile(undefined);
      }
    }
  }

  function handleChangeProduct(
    id: string,
    name: string,
    value: string | number | boolean
  ) {
    const newStock: Stock[] = stock.map((s: Stock): Stock => {
      if (s.id === id) {
        switch (name) {
          case "precioSinIVA":
            return {
              ...s,
              ...calcularIVA(
                invoice.tipoImpositivo,
                name,
                Number(value),
                config.iva,
                config.recargo
              ),
            };
          case "precioIVA":
            return {
              ...s,
              ...calcularIVA(
                invoice.tipoImpositivo,
                name,
                Number(value),
                config.iva,
                config.recargo
              ),
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
    setStock(newStock);
  }

  /*   function handleValidation(stock: Stock, name: string, value: any) {
    if (name === "codigoDeBarras") {
      console.log(isBarCodeValid(stock.tipoCodigoDeBarras, value));
    }
    if (name === "IMEISerie") {
      console.log(isValidIMEI(value));
    }
  } */

  function handleDuplicate(newStock: Stock) {
    const newStockList = [
      ...stock,
      { ...newStock, id: (stock.length + 1).toString() },
    ];
    setStock(newStockList);
  }

  function handleRemove(stockId: string) {}

  function handleTemporal() {
    const newStockList = [
      ...stock,
      {
        ...initialStock,
        id: (stock.length + 1).toString(),
        estado: "Temporal",
      },
    ];
    setStock(newStockList);
    handleFormProduct();
  }

  function handleLocalClose(): void {
    handleClose();
    setProduct([]);
    setSupplier(null);
    setStock([]);
    setInvoice(initialState);
  }

  function handleSaveImages(
    stockId: string,
    imageUrls: string[],
    imageFiles: File[]
  ) {
    const imageSelected: ImagesData | undefined = images.find(
      (i: ImagesData) => i.stockId === stockId
    );
    if (imageSelected) {
      setImages(
        images.map((i: ImagesData) =>
          i.stockId === stockId
            ? {
                imageUrls,
                imageFiles,
                stockId,
              }
            : i
        )
      );
    } else {
      setImages([
        ...images,
        {
          imageUrls,
          imageFiles,
          stockId,
        },
      ]);
    }
  }

  /* Formularios */
  function handleFormProduct(): void {
    setFormProducts(!addProducts);
  }

  function handleFormSuppliers(): void {
    setFormSuppliers(!addSupplier);
  }

  return (
    <div className={style.background}>
      {addProducts ? (
        <AddProduct
          productsSelected={productsSelected}
          setProduct={setProduct}
          handleClose={handleFormProduct}
          handleTemporal={handleTemporal}
        />
      ) : null}
      {addSupplier ? (
        <AddSupplier
          supplierSelected={supplierSelected}
          setSupplier={setSupplier}
          handleClose={handleFormSuppliers}
        />
      ) : null}
      <form className={`toTop ${style.form}`} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar inventario</h4>
          <div className="btn-close" onClick={handleLocalClose} />
        </div>
        <div className={style.flex}>
          <div className={style.dataRight}>
            <InvoiceData
              invoice={invoice}
              handleChange={handleChangeInvoice}
              file={file}
              setFile={setFile}
            />
            <SupplierData
              supplier={supplierSelected}
              handleFormSuppliers={handleFormSuppliers}
            />
            <button type="submit" className="btn btn-success">
              Agregar inventario
            </button>
          </div>
          {/* Products */}
          <ProductData
            stock={stock}
            images={images}
            handleSaveImages={handleSaveImages}
            tipoImpositivo={invoice.tipoImpositivo}
            handleChange={handleChangeProduct}
            handleDuplicate={handleDuplicate}
            handleRemove={handleRemove}
            handleFormProduct={handleFormProduct}
          />
        </div>
      </form>
    </div>
  );
}
