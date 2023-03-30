import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSuppllier } from "../../../../../redux/actions/suppliers";
import { Supplier } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import edit from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

import style from "./UserRows.module.css";

interface Props {
  user: Supplier;
}

export default function SupplieRows({ user }: Props) {
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar el proveedor?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(deleteSuppllier(user.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el proveedor con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el proveedor",
              "error"
            );
          });
      }
    });
  }

  return (
    <div className={style.row}>
      <input
        className="form-control"
        value={user.numero}
        placeholder="Numero"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.nombre}
        placeholder="Nombre"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.direccion}
        placeholder="Direccion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.telefono}
        placeholder="Telefono"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.poblacion}
        placeholder="Poblacion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.postal}
        placeholder="Postal"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={user.cifNif}
        placeholder="CIF NIF"
        disabled={isDisabled}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleDisabled}
      >
        <img src={edit} alt="edit" />
      </button>
      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
