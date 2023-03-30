import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Supplier } from "../../../../interfaces";

import UserRows from "./UserRows/UserRows";
import Form from "./Form/Form";

import styles from "../../Dashboard.module.css";
import style from "./UsersTable.module.css";

export default function UsersTable() {
  const user = useSelector((state: RootState) => state.users);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    setRows(user);
  }, [user]);

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={styles.dashboardList}>
{/*       {form ? <Form handleForm={handleForm} /> : null} */}
      <h3>Usuarios</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar usuario"
        />
        <button className="btn btn-primary" type="button" onClick={handleForm}>
          <span>Agregar usuario</span>
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Rol</span>
          <span>Nombre de usuario</span>
          <span>Nombre</span>
          <span>Contraseña</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay usuarios</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary" onClick={handleForm}>
                <span>Agregar usuario</span>
              </button>
            </div>
          ) : (
            rows?.map((user: Supplier) => (
              <UserRows key={user.id} user={user} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
