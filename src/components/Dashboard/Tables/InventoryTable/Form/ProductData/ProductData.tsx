import { useState } from "react";
import { useSelector } from "react-redux";
import { Stock, RootState, TipoImpositivo } from "../../../../../../interfaces";

import Row from "./Row/Row";

import styles from "./ProductData.module.css";
interface Props {
  stock: Stock[];
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
