import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Client } from "../../../../interfaces";

import ClientRows from "./ClientRows/ClientRows";
import Form from "./Form/Form";

import style from "./ClientsTable.module.css";
import add from "../../../../assets/svg/add.svg";

export default function ClientsTable() {
  const clients = useSelector((state: RootState) => state.clients);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const searchStr = search.toLowerCase();
    const filter = clients.filter((client: Client) => {
      if (searchStr === "") return true;
      if (client.numero.toString().includes(searchStr)) return true;
      if (client.nombre.toLocaleLowerCase().includes(searchStr)) return true;
      if (client.direccion.toLocaleLowerCase().includes(searchStr)) return true;
      if (client.poblacion.toString().includes(searchStr)) return true;
      if (client.postal.toString().includes(searchStr)) return true;
      if (client.cifNif.toLocaleLowerCase().includes(searchStr)) return true;
      if (client.telefono.toString().includes(searchStr)) return true;
      return false;
    });
    setRows(filter);
  }, [clients, search]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleForm(): void {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      <h3>Clientes</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar cliente"
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleForm}
        >
          <b>+</b> Nuevo cliente
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Nombre</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>CP</span>
          <span>Poblacion</span>
          <span>CIF / NIF</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay clientes</span>
            </div>
          ) : (
            rows?.map((client: Client) => (
              <ClientRows key={client.id} client={client} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
