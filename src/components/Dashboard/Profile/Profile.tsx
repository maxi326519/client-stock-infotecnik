import { useState } from "react";
import styles from "./Profile.module.css";

interface Props {
  handleClose: () => void;
}

export default function Profile({ handleClose }: Props) {
  const [edit, setEdit] = useState();

  function handleEdit() {
    setEdit(edit);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Guardado");
  }

  function handleCancel() {
    setEdit(edit);
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h4>Perfil</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input id="name" className="form-control" />
            <label htmlFor="name">Nombre:</label>
          </div>
          <div className="form-floating mb-3">
            <input id="user" className="form-control" />
            <label htmlFor="user">Usuario:</label>
          </div>
          <div className="form-floating mb-3">
            <input id="email" className="form-control" />
            <label htmlFor="email">Correo:</label>
          </div>
        </div>
        {edit ? (
          <div>
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
}
