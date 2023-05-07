import { Transactions } from "../../../../../interfaces";
import style from "./TransactionsRow.module.css";

import invoice from "../../../../../assets/svg/invoices.svg";
import link from "../../../../../assets/svg/link.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import { useEffect, useState } from "react";

interface Props {
  transaction: Transactions;
  handleInvoice: (invoiceid: string) => void;
}

export default function TransactionsRow({ transaction, handleInvoice }: Props) {
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

  return (
    <div className={style.row}>
      <span>{fecha}</span>
      <span>{transaction.fechaValor}</span>
      <span>{transaction.movimiento}</span>
      <span>{transaction.masDatos}</span>
      <span>{transaction.importe}</span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction?.invoiceId || "")}
      >
        <img src={invoice} alt="invoice" />
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleInvoice(transaction?.invoiceId || "")}
      >
        <img src={link} alt="link" />
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleInvoice(transaction?.invoiceId || "")}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
      <span></span>
    </div>
  );
}
