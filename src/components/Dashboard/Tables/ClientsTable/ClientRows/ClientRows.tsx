import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteClient } from "../../../../../redux/actions/clients";
import { Client } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import edit from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

import style from "./ClientRows.module.css";

interface Props {
  client: Client;
}

export default function ClientRows({ client }: Props) {
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar al cliente?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(deleteClient(client.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el cliente con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el cliente",
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
        value={client.numero}
        placeholder="Numero"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.nombre}
        placeholder="Nombre"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.direccion}
        placeholder="Direccion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.telefono}
        placeholder="Telefono"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.poblacion}
        placeholder="Poblacion"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.postal}
        placeholder="Postal"
        disabled={isDisabled}
      />
      <input
        className="form-control"
        value={client.cifNif}
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
