import React, { useEffect } from "react";
import { useState } from "react";
import { Invoices, RootState } from "../../../../interfaces";
import { useSelector } from "react-redux";

import InvoiceRow from "./InvoiceRow/InvoiceRow";

import style from "./InvoiceTable.module.css";
import add from "../../../../assets/svg/add.svg";
import Form from "./Form/Form";

export default function InvoiceTable() {
  const invoices = useSelector((state: RootState) => state.invoices);
  const [rows, setRows] = useState<Invoices[]>([]);
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useState(false);

  useEffect(() => {
    const filter = invoices.filter(() => {
      if (search === "") return true;
      return true;
    });
    setRows(filter);
  }, [invoices, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleForm(): void {
    setForm(!form);
  }

  function handleStock() {}

  function handleSupplier() {}

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Facturas</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar factura"
          onChange={handleSearchChange}
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nueva Facturas</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Fecha</span>
          <span>Numero</span>
          <span>Archivo</span>
          <span>Tipo impositivo</span>
          <span>Total</span>
          <span>Productos</span>
          <span>Proveedor</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay facturas</span>
            </div>
          ) : (
            rows?.map((invoice: Invoices) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                handleStock={handleStock}
                handleSupplier={handleSupplier}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
