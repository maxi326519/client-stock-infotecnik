import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState, User } from "../../../interfaces";

interface Props {
  handleClose: () => void;
}

export default function Profile({ handleClose }: Props) {
  const profile: User = useSelector((state: RootState) => state.profile);
  const [editUser, setEditUser] = useState<User>({
    id: "",
    rol: "",
    name: "",
    userName: "",
    email: "",
  });
  const [edit, setEdit] = useState();

  useEffect(() => {
    setEditUser(profile);
  }, [profile]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Guardado");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  }

  function handleEdit() {
    setEdit(edit);
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
            <input
              id="name"
              name="name"
              value={editUser.name}
              className="form-control"
              onChange={handleChange}
            />
            <label htmlFor="name">Nombre:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="userName"
              name="userName"
              value={editUser.userName}
              className="form-control"
              onChange={handleChange}
            />
            <label htmlFor="userName">Usuario:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="email"
              name="email"
              value={editUser.email}
              className="form-control"
              onChange={handleChange}
            />
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
