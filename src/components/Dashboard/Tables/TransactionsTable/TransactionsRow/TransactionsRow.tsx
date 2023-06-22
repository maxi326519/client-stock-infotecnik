import { Transactions } from "../../../../../interfaces";
import { useEffect, useState } from "react";
import dateFormat from "../../../../../functions/dateFormat";

import style from "./TransactionsRow.module.css";

import invoice from "../../../../../assets/svg/invoice-table.svg";
import link from "../../../../../assets/svg/link.svg";
import edit from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../../../redux/actions/transactions";
import swal from "sweetalert";

interface Props {
  transaction: Transactions;
  handleInvoice: (invoiceid: string) => void;
}

export default function TransactionsRow({ transaction, handleInvoice }: Props) {
  const dispatch = useDispatch();
  const [fecha, setFecha] = useState<string>("");

  useEffect(() => {
    const dia = transaction.fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (transaction.fecha.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0");
    const anio = transaction.fecha.getUTCFullYear().toString();
    const fechaStr = `${dia}/${mes}/${anio}`;
    setFecha(fechaStr);
  }, [transaction]);

  function handleDelete() {
    swal({
      text: "¿Seguro que desea eliminar este movimiento?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if ((response = "Si")) {
        dispatch(loading());
        dispatch<any>(deleteTransaction(transaction.id))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó el movimiento con éxito", "success");
          })
          .catch(() => {
            dispatch(closeLoading());
            swal("Error", "No se pudo eliminar el movimiento", "error");
          });
      }
    });
  }

  return (
    <div className={style.row}>
      <span>{dateFormat(fecha)}</span>
      <span>{transaction.fechaValor}</span>
      <span>
        <b>{transaction.movimiento}</b>
      </span>
      <span>{transaction.masDatos}</span>
      <span>€ {transaction.importe}</span>
      {transaction.invoiceId ? (
        <button className="btn btn-outline-success table" type="button">
          <img src={invoice} alt="invoice" />
        </button>
      ) : (
        <button className="btn btn-outline-success table" type="button">
          <img src={link} alt="link" />
        </button>
      )}
      <button
        className="btn btn-outline-success table"
        type="button"
        onClick={() => handleInvoice(transaction?.invoiceId || "")}
      >
        <img src={edit} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger table"
        type="button"
        onClick={handleDelete}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
