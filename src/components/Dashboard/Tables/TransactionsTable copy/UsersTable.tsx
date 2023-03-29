import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { RootState, Transactions } from "../../../../interfaces";

import TransactionsRow from "./UsersRow/UsersRow";

import styles from "../../Dashboard.module.css";
import style from "./TransactionsTable.module.css";

export default function UsersTable() {
  const transactions = useSelector((state: RootState) => state.transactions);
  const [rows, setRows] = useState<Transactions[]>([]);
  const [search, setSearch] = useState<string>("");
  const [transactionForm, setTransactionForm] = useState<boolean>(false);

  useEffect(() => {
    const filter = transactions.filter(() => {
      if (search === "") return true;
      return true;
    });
    setRows(filter);
  }, [transactions, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleInvoice(): void {}

  function handleClose(): void {
    setTransactionForm(!transactionForm);
  }

  return (
    <div className={styles.dashboardList}>
      <h3>Usuarios</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar movimiento"
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={style.row}>
          <span>Rol</span>
          <span>Nombre</span>
          <span>Usuario</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className={style.card}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((transaction: Transactions) => (
              <TransactionsRow
                key={transaction.id}
                transaction={transaction}
                handleInvoice={handleInvoice}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
