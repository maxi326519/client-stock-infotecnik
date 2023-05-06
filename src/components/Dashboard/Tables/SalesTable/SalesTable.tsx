import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, SaleDetail, SaleInvoice } from "../../../../interfaces";

import SaleRow from "./SaleRow/SaleRow";

import style from "./SalesTable.module.css";
import add from "../../../../assets/svg/add.svg";
import Form from "./Form/Form";

export default function SalesTable() {
  const sales = useSelector((state: RootState) => state.sales);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const searchStr = search.toLowerCase();
    const data: SaleDetail[] = [];

    sales.forEach((invoice: SaleInvoice) =>
      invoice.SaleDetails.map((detail: SaleDetail) => data.push(detail))
    );

    const filter = data.filter((sales: SaleDetail) => {
      if (searchStr === "") return true;
      return false;
    });

    setRows(filter);
  }, [sales, search]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleClose={handleForm} /> : null}
      <h3>Ventas</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar venta"
          onChange={handleChange}
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nueva venta</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Fecha</span>
          <span>Nro Factura</span>
          <span>Codigo</span>
          <span>Producto</span>
          <span>Cliente</span>
          <span>Total</span>
          <span>Detalles</span>
          <span>Eliminar</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay clientes</span>
            </div>
          ) : (
            rows?.map((sale: SaleDetail) => (
              <SaleRow key={sale.id} sale={sale} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
