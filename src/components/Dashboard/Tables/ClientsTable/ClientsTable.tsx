import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Supplier } from "../../../../interfaces";

import ClientRows from "./ClientRows/ClientRows";
import Form from "./Form/Form";

import styles from "../../Dashboard.module.css";
import style from "./ClientsTable.module.css";

export default function ClientsTable() {
  const supplier = useSelector((state: RootState) => state.suppliers);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    setRows(supplier);
  }, [supplier]);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Clientes</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar cliente"
        />
        <button className="btn btn-primary" type="button" onClick={handleForm}>
          <span>Agregar cliente</span>
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Nombre</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>CP</span>
          <span>Poblacion</span>
          <span>CIF / NIF</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay clientes</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary" onClick={handleForm}>
                <span>Agregar cliente</span>
              </button>
            </div>
          ) : (
            rows?.map((supplier: Supplier) => (
              <ClientRows key={supplier.id} supplier={supplier} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
