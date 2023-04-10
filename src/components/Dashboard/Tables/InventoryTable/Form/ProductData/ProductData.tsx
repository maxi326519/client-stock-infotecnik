import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, RootState, TipoImpositivo } from "../../../../../../interfaces";

import Row from "./Row/Row";

import styles from "./ProductData.module.css";

interface ImagesData {
  stockId: string;
  imageUrls: string[];
  imageFiles: File[];
}

interface Props {
  stock: Stock[];
  images: ImagesData[];
  handleSaveImages: (stockId: string, imageUrls: string[], imageFiles: File[]) => void;
  tipoImpositivo: TipoImpositivo;
  handleChange: (
    productId: string,
    name: string,
    value: string | number | boolean
  ) => void;
  handleDuplicate: (stock: Stock) => void;
}

export default function ProductData({
  stock,
  images,
  handleSaveImages,
  tipoImpositivo,
  handleChange,
  handleDuplicate,
}: Props) {


  return (
    <div className={styles.productAdd}>
      <h5>Productos</h5>
      <div className={styles.list}>
        {stock.map((s) => {
          return (
            <Row
              stock={s}
              images={images.find((i) => i.stockId === s.id)}
              handleSaveImages={handleSaveImages}
              tipoImpositivo={tipoImpositivo}
              handleChange={handleChange}
              handleDuplicate={handleDuplicate}
            />
          );
        })}
      </div>
    </div>
  );
}
