import { Client } from "../../../../../../interfaces";

import styles from "./ClientData.module.css";

interface Props {
  client: Client | null;
  error: string;
  handleFormSuppliers: () => void;
}

export default function ClientData({
  client,
  error,
  handleFormSuppliers,
}: Props) {
  return (
    <div className={styles.container}>
      <hr></hr>
      <div className={styles.header}>
        <h5>Cliente</h5>
        {client ? (
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleFormSuppliers}
          >
            Cambiar
          </button>
        ) : null}
      </div>
      {!client ? (
        <div className={`${styles.panelAdd} ${error ? styles.error : ""}`}>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleFormSuppliers}
          >
            Seleccionar
          </button>
          <small>{error}</small>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.container}>
            <span className={styles.tittle}>Nombre:</span>
            <span className={styles.data}>{client?.nombre}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>Direccion:</span>
            <span className={styles.data}>{client?.direccion}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>Telefono:</span>
            <span className={styles.data}>{client?.telefono}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.tittle}>CIF / NIF:</span>
            <span className={styles.data}>{client?.cifNif}</span>
          </div>
        </div>
      )}
    </div>
  );
}
