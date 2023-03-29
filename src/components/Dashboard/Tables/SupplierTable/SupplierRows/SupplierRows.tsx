import { useState } from "react";
import { Supplier } from "../../../../../interfaces";

import style from "./SupplierRows.module.css";

import edit from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import { useDispatch } from "react-redux";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import { deleteSuppllier } from "../../../../../redux/actions/suppliers";
import swal from "sweetalert";

interface Props {
  supplier: Supplier;
}

export default function SupplieRows({ supplier }: Props) {
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
        dispatch<any>(deleteSuppllier(supplier.id))
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
        value={supplier.numero}
        placeholder="Numero"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.nombre}
        placeholder="Nombre"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.direccion}
        placeholder="Direccion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.telefono}
        placeholder="Telefono"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.poblacion}
        placeholder="Poblacion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.postal}
        placeholder="Postal"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={supplier.cifNif}
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
