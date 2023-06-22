import React, { useEffect } from "react";
import { useState } from "react";
import { RootState, Transactions } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getDateRange } from "../../../../functions/getDateRange";
import {
  getTransactions,
  postTransactions,
} from "../../../../redux/actions/transactions";
import {
  closeLoading,
  loading,
} from "../../../../redux/actions/loading/loading";
import swal from "sweetalert";

import TransactionsRow from "./TransactionsRow/TransactionsRow";
import ImportExcel from "./ImportExcel/ImportExcel";
import Filters from "./FIlters/Filters";

import style from "./TransactionsTable.module.css";
import importSvg from "../../../../assets/svg/import.svg";
import usePagination from "../../../../hooks/pagination/usePagination";

export default function TransactionsTable() {
  const dispatch = useDispatch();

  const transactions = useSelector((state: RootState) => state.transactions);
  const [rows, setRows] = useState<Transactions[]>([]);
  const { list, page, pageActions } = usePagination(rows);

  const [search, setSearch] = useState<string>("");
  const [transactionForm, setTransactionForm] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    fromDate: new Date().toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
    linked: "",
  });

  useEffect(() => {
    console.log(list);
    console.log(page);
  }, [list]);

  useEffect(() => {
    const { from, to } = getDateRange();
    setFilters({
      ...filters,
      fromDate: from,
      toDate: to,
    });
  }, []);

  useEffect(() => {
    const filter = transactions.filter((data) => {
      const from = new Date(filters.fromDate).getTime();
      const to = new Date(filters.toDate).getTime();

      if (filters.linked !== "" && data.vinculada.toString() !== filters.linked)
        return false;
      if (data.fecha.getTime() < from) return false;
      if (data.fecha.getTime() >= to) return false;
      if (search === "") return true;
      return true;
    });
    setRows(filter.slice(1, 15));
  }, [transactions, search, filters]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleInvoice(): void {}

  function handleData(data: any) {
    dispatch(loading());
    dispatch<any>(postTransactions(data))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Se importaron sus movimientos con exito", "success");
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
        swal(
          "Error",
          "Error al guardar los movimientos, intentelo mas tarde",
          "error"
        );
      });
  }

  function getData() {
    dispatch(loading());
    dispatch<any>(
      getTransactions(filters.fromDate, filters.toDate, filters.linked)
    )
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
        swal(
          "Error",
          "Error al cargar las movimientos, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose(): void {
    setTransactionForm(!transactionForm);
  }

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {transactionForm ? (
        <ImportExcel handleData={handleData} handleClose={handleClose} />
      ) : null}
      <h3>Movimientos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar movimiento"
          onChange={handleSearchChange}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleClose}
        >
          <img src={importSvg} alt="importSvg" />
          <span>Importar</span>
        </button>
        <Filters
          fromDate={filters.fromDate}
          toDate={filters.toDate}
          linked={filters.linked}
          handleChange={handleFilterChange}
          handleSubmit={getData}
        />
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
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
                handleInvoice={handleInvoice}
              />
            ))
          )}
        </div>
        <div className={style.pagination}>
          <button
            disabled={page.current <= 1}
            onClick={pageActions.prevPage}
          >{`<`}</button>
          <span>{`${page.current} de ${page.length}`}</span>
          <button
            disabled={page.current >= page.length}
            onClick={pageActions.nextPage}
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
}
