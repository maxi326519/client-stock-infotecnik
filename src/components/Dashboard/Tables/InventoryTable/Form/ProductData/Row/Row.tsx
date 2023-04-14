import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Stock,
  BarCode,
  TipoImpositivo,
  Product,
  RootState,
} from "../../../../../../../interfaces";

import AddImages from "../../AddImages/AddImages";

import styles from "./Row.module.css";
import img from "../../../../../../../assets/svg/image.svg";

interface ImagesData {
  stockId: string;
  imageUrls: string[];
  imageFiles: File[];
}

interface Props {
  stock: Stock;
  images: ImagesData | undefined;
  handleSaveImages: (
    stockId: string,
    imageUrls: string[],
    imageFiles: File[]
  ) => void;
  tipoImpositivo: TipoImpositivo;
  handleChange: (
    productId: string,
    name: string,
    value: string | number | boolean
  ) => void;
  handleDuplicate: (stock: Stock) => void;
  handleRemove: (stockId: string) => void;
}

export default function Row({
  stock,
  images,
  handleSaveImages,
  tipoImpositivo,
  handleChange,
  handleDuplicate,
  handleRemove,
}: Props) {
  const products = useSelector((state: RootState) => state.products);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [imagesForm, setImagesForm] = useState(false);

  useEffect(() => {
    const product = products.find((p) => p.id === stock.ProductId);
    setCurrentProduct(product);
  }, [products, stock]);

  function handleClose(): void {
    setImagesForm(!imagesForm);
  }

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = event.target.name;
    const value: string = event.target.value;
    handleChange(stock.id, name, value);
  }

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const name: string = event.target.name;
    const value: string = event.target.value;

    handleChange(stock.id, name, value);
  }

  function handleChangeCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.checked;
    if (name === "temporal") {
      handleChange(stock.id, "estado", value ? "Temporal" : "Nuevo");
    } else if (name === "catalogo") {
      handleChange(stock.id, name, value);
    }
  }

  function handleSubmitImages(imageUrls: string[], imageFiles: File[]) {
    handleSaveImages(stock.id, imageUrls, imageFiles);
  }

  return (
    <div className={styles.container}>
      {imagesForm ? (
        <AddImages
          handleClose={handleClose}
          handleSubmit={handleSubmitImages}
          imageUrls={images?.imageUrls}
          imageFiles={images?.imageFiles}
        />
      ) : null}
      <div className={styles.item}>
        <div className={styles.productLeft}>
          <span>
            {currentProduct?.marca} - {currentProduct?.modelo}
          </span>
          <div className={styles.image} onClick={handleClose}>
            <img
              src={
                currentProduct?.Images?.[0]
                  ? `http://localhost:3001/images/${currentProduct?.Images[0]}`
                  : img
              }
              alt="img"
            />
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              id="cantidad"
              name="cantidad"
              value={stock.cantidad}
              onChange={handleLocalChange}
            />
            <label htmlFor="cantidad">Cantidad</label>
          </div>
        </div>
        <div className={styles.inputs}>
          {stock.estado !== "Temporal" ? (
            <div className={styles.top}>
              <div>
                <input
                  id="catalogo"
                  name="catalogo"
                  type="checkbox"
                  checked={stock.catalogo}
                  onChange={handleChangeCheck}
                />
                <label htmlFor="catalogo">Vista en catalogo</label>
              </div>
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => handleDuplicate(stock)}
              >
                Duplicar
              </button>
              <div className={styles.btnClose}>
                <div
                  className="btn-close"
                  onClick={() => handleRemove(stock.id)}
                />
              </div>
            </div>
          ) : null}
          <div className={styles.codes}>
            <div className="form-floating ">
              <select
                className="form-select"
                id="tipoCodigoDeBarras"
                name="tipoCodigoDeBarras"
                value={stock.tipoCodigoDeBarras}
                onChange={handleChangeSelect}
              >
                <option value={-1}>Ninguno</option>
                <option value={BarCode.Code128}>Code 128</option>
                <option value={BarCode.Code39}>Code 39</option>
                <option value={BarCode.UPCA}>UPC-A</option>
                <option value={BarCode.UPCE}>UPC-E</option>
                <option value={BarCode.EAN8}>EAN-8</option>
                <option value={BarCode.EAN13}>EAN-13</option>
              </select>
              <label htmlFor="tipoCodigoDeBarras">Seleccionar</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="codigoDeBarras"
                name="codigoDeBarras"
                value={stock.codigoDeBarras}
                onChange={handleLocalChange}
              />
              <label htmlFor="codigoDeBarras">Code</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="IMEISerie"
                name="IMEISerie"
                value={stock.IMEISerie}
                onChange={handleLocalChange}
              />
              <label htmlFor="IMEISerie">Nro de Serie/IMEI </label>
            </div>
          </div>
          <div
            className={
              tipoImpositivo === TipoImpositivo.recargo
                ? styles.recargo
                : tipoImpositivo === TipoImpositivo.REBU
                ? styles.rebu
                : styles.price
            }
          >
            {tipoImpositivo !== TipoImpositivo.REBU ? (
              <div className="form-floating">
                <input
                  className="form-control"
                  id="precioSinIVA"
                  name="precioSinIVA"
                  value={stock.precioSinIVA}
                  onChange={handleLocalChange}
                />
                <label htmlFor="precioSinIVA">Precio </label>
              </div>
            ) : null}
            <div className="form-floating">
              <input
                className="form-control"
                id="precioIVA"
                name="precioIVA"
                value={stock.precioIVA}
                onChange={handleLocalChange}
              />
              <label htmlFor="precioIVA">Precio I.V.A.</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="precioIVAINC"
                name="precioIVAINC"
                value={stock.precioIVAINC}
                onChange={handleLocalChange}
              />
              <label htmlFor="precioIVAINC">Precio de venta</label>
            </div>
            {tipoImpositivo === TipoImpositivo.recargo ? (
              <div className="form-floating">
                <input
                  className="form-control"
                  id="recargo"
                  name="recargo"
                  value={stock.recargo}
                  onChange={handleLocalChange}
                />
                <label htmlFor="recargo">Recargo</label>
              </div>
            ) : null}
            {tipoImpositivo === TipoImpositivo.recargo ? (
              <div className="form-floating">
                <input
                  className="form-control"
                  id="total"
                  name="total"
                  value={stock.total}
                  onChange={handleLocalChange}
                />
                <label htmlFor="total">Total</label>
              </div>
            ) : null}
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              id="detalles"
              name="detalles"
              value={stock.detalles}
              onChange={handleLocalChange}
            />
            <label htmlFor="detalles">Detalles</label>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
