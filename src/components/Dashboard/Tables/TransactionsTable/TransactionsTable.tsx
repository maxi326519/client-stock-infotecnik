import React, { useEffect } from "react";
import { useState } from "react";
import { Transactions } from "../../../../interfaces";
import { getDateRange } from "../../../../functions/getDateRange";
import { InvoiceFiles } from "../InvoiceFiles/InvoiceFiles";
import { useTransactions } from "../../../../hooks/Transactions";
import usePagination from "../../../../hooks/pagination/usePagination";
import swal from "sweetalert";

import TransactionsRow from "./TransactionsRow/TransactionsRow";
import Filters from "./FIlters/Filters";
import ImportExcel from "./ImportExcel/ImportExcel";
import ViewNotes from "./ViewNotes/ViewNotes";

import style from "./TransactionsTable.module.css";
import importSvg from "../../../../assets/svg/import.svg";
import link from "../../../../assets/svg/link.svg";

export default function TransactionsTable() {
  const transactions = useTransactions();

  const [rows, setRows] = useState<Transactions[]>([]);
  const { list, page, pageActions } = usePagination(rows);

  const [invoiceFiles, setInvoiceFiles] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>("");

  const [transactionForm, setTransactionForm] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState({
    ...getDateRange(),
    linked: "",
  });

  useEffect(() => {
    if (transactions.data.length === 0) transactions.get(filters.from, filters.to, filters.linked);
  }, []);

  useEffect(() => {
    const filter = transactions.data.filter((data) => {
      if (search === "") return true;
      if (data.importe.toString().includes(search)) return true;
      if (data.movimiento.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (data.masDatos?.toLowerCase().includes(search.toLowerCase())) 
        return true;
      return false;
    });
    setRows(filter);
  }, [transactions.data, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleInvoice(id?: string): void {
    // If invoiceFiles is false
    if (!invoiceFiles) {

      // If id exist 
      if (id) {
        setTransactionId([id]);
        setInvoiceFiles(true);
      } else if (transactionId.length > 0) {
        setInvoiceFiles(true);
      }
    } else {
      setInvoiceFiles(false);
      setTransactionId([]);
    }
  }

  function handleClose(): void {
    setTransactionForm(!transactionForm);
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id
    const checked = event.target.checked;

    // If check is true delete the id
    if (checked) {
      setTransactionId([...transactionId, id]);
    } else { // If check is false add the id
      setAllChecked(false);
      setTransactionId(transactionId.filter((currentId) => currentId !== id));
    }
  }

  function handleCheckAll() {
    if (allChecked) {
      setAllChecked(false);
      setTransactionId([]);
    } else {
      setAllChecked(true);
      setTransactionId(rows.map((row) => row.id));
    }
  }

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleViewNotes(notes?: string) {
    setNotes(notes || "");
  }

  /* CRUD */
  function handleImportTransactions(data: Transactions) {
    transactions.set(data)
      .then(() => {
        handleClose();
        swal("Guardado", "Se importaron los movimientos con éxito", "success");
      })
      .catch(() => swal("Error", "Error al guardar los movimientos, inténtelo más tarde", "error"));
  }

  function handleGetTransactions() {
    transactions.get(filters.from, filters.to, filters.linked)
      .then(() => {
        // Reset data checked and search bar
        setAllChecked(false);
        setTransactionId([]);
        setSearch("");
      })
      .catch(() => swal("Error", "Error al cargar los movimientos, inténtelo más tarde", "error"));
  }

  function handleUpdateTransaction(data: Transactions) {
    transactions.update(data)
      .then(() => swal("Actualizado", "Se actualizó el movimiento con éxito", "error"))
      .catch(() => swal("Error", "Error al cargar los movimientos, inténtelo más tarde", "error"));
  }

  function handleDeleteTransaction(id: string) {
    swal({
      text: "¿Seguro que desea eliminar este movimiento?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if ((response = "Si")) {
        transactions.remove(id)
          .then(() => swal("Eliminado", "Se eliminó el movimiento con éxito", "success"))
          .catch(() => swal("Error", "No se pudo eliminar el movimiento", "error"));
      }
    });
  }
  /* CRUD */

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {transactionForm ? (
        <ImportExcel handleData={handleImportTransactions} handleClose={handleClose} />
      ) : null}
      {invoiceFiles && <InvoiceFiles handleClose={handleInvoice} transactionId={transactionId} />}
      {notes && <ViewNotes notes={notes} handleClose={handleViewNotes} />}
      <h3>Movimientos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar movimiento"
          onChange={handleSearchChange}
        />
        <Filters
          fromDate={filters.from}
          toDate={filters.to}
          linked={filters.linked}
          handleChange={handleFilterChange}
          handleSubmit={handleGetTransactions}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleClose}
        >
          <img src={importSvg} alt="importSvg" />
          <span>Importar</span>
        </button>
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={() => handleInvoice()}
          disabled={transactionId.length === 0}
        >
          <img src={link} alt="link" />
          {transactionId.length} seleccionados
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <input
            checked={allChecked}
            placeholder="check all"
            type="checkbox"
            onChange={handleCheckAll}
          />
          <span>Fecha</span>
          <span>Fecha Valor</span>
          <span>Movimiento</span>
          <span>Mas datos</span>
          <span>Importe</span>
          <span>Acciones</span>
        </div>
        <div className={style.contentCard}>
          {list.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay movimientos</span>
            </div>
          ) : (
            list?.map((transaction: Transactions) => (
              <TransactionsRow
                key={transaction.id}
                transaction={transaction}
                checked={transactionId.some((id) => id === transaction.id)}
                handleCheck={handleCheck}
                handleUpdate={handleUpdateTransaction}
                handleDelete={handleDeleteTransaction}
                handleInvoice={handleInvoice}
                handleViewNotes={handleViewNotes}
              />
            ))
          )}
        </div>
        <div className={style.pagination}>
          <span>{transactions.data.length} Movimientos</span>
          <button
            disabled={page.current <= 1}
            type="button"
            onClick={pageActions.prevPage}
          >{`<`}</button>
          <span>{`${page.current} de ${page.length}`}</span>
          <button
            disabled={page.current >= page.length}
            type="button"
            onClick={pageActions.nextPage}
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
}
