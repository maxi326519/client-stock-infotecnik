import { Supplier } from "../../../../../../interfaces";

import styles from "./SupplierData.module.css";

interface Props {
  supplier: Supplier | null;
  handleFormSuppliers: () => void;
}

export default function SupplierData({ supplier, handleFormSuppliers }: Props) {
  return (
    <div className={styles.container}>
      <hr></hr>
      <div className={styles.header}>
        <h5>Proveedor</h5>
        {supplier ? (
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleFormSuppliers}
          >
            Cambiar
          </button>
        ) : null}
      </div>
      {!supplier ? (
        <div className={styles.panelAdd}>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleFormSuppliers}
          >
            Seleccionar
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.container}>
            <span className={styles.tittle}>Nombre:</span>
            <span className={styles.data}>{supplier?.nombre}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>Direccion:</span>
            <span className={styles.data}>{supplier?.direccion}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>Telefono:</span>
            <span className={styles.data}>{supplier?.telefono}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>CIF / NIF:</span>
            <span className={styles.data}>{supplier?.cifNif}</span>
          </div>
        </div>
      )}
    </div>
  );
}
