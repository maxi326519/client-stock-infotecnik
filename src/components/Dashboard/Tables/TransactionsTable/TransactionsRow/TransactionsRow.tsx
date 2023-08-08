import { Transactions } from "../../../../../interfaces";
import React from "react";
import dateFormat from "../../../../../functions/dateFormat";

import style from "./TransactionsRow.module.css";

import notes from "../../../../../assets/svg/notes.svg";
import invoice from "../../../../../assets/svg/invoice-table.svg";
import link from "../../../../../assets/svg/link.svg";
import edit from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  transaction: Transactions;
  checked: boolean;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (transaction: Transactions) => void;
  handleDelete: (id: string) => void;
  handleInvoice: (transactionId?: string) => void;
  handleViewNotes: (notes?: string) => void;
}

export default function TransactionsRow({ transaction, checked, handleCheck, handleUpdate, handleDelete, handleInvoice, handleViewNotes }: Props) {

  return (
    <div className={`${style.row} ${checked && style.selected}`}>
      <input
        id={transaction.id}
        checked={checked}
        placeholder="checked"
        type="checkbox"
        onChange={handleCheck}
      />
      <span>{dateFormat(transaction.fecha)}</span>
      <span>{transaction.fechaValor}</span>
      <span>
        <b>{transaction.movimiento}</b>
      </span>
      <span>{transaction.masDatos}</span>
      <span>€ {transaction.importe}</span>
      <button className="btn btn-outline-success table" type="button" onClick={() => handleViewNotes(transaction.notas || "")} disabled={!transaction.notas}>
        <img src={notes} alt="notes" />
      </button>
      {transaction.InvoiceFileId ? (
        <button className="btn btn-outline-success table" type="button">
          <img src={invoice} alt="invoice" />
        </button>
      ) : (
        <button className="btn btn-outline-success table" type="button" onClick={() => handleInvoice(transaction?.id)}>
          <img src={link} alt="link" />
        </button>
      )}
      <button
        className="btn btn-outline-success table"
        type="button"
      /*         onClick={() => handleUpdate(transaction.id)} */
      >
        <img src={edit} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger table"
        type="button"
        onClick={() => handleDelete(transaction.id)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
