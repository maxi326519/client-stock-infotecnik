import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Client } from "../../../../../../interfaces";

import SupplierForm from "../../../SupplierTable/Form/Form";

import style from "./AddClient.module.css";

interface Props {
  clientSelected: Client | null;
  setClient: (selected: Client | null) => void;
  handleClose: () => void;
}

export default function AddClient({
  clientSelected,
  setClient,
  handleClose,
}: Props) {
  const clients: Client[] = useSelector(
    (state: RootState) => state.clients
  );
  const [rows, setRows] = useState<Client[]>([]);
  const [selected, setSelected] = useState<Client | null>(null);
  const [clientForm, setSupplierForm] = useState<boolean>(false);

  useEffect(() => {
    setSelected(clientSelected);
  }, [clientSelected]);

  useEffect(() => {
    setRows(clients);
  }, [clients]);

  function handleSubmit(): void {
    setClient(selected);
    handleClose();
    console.log(selected);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      clients.filter((c: Client) => {
        if (value === "") return true;
        if (c.id.toString() === value) return true;
        if (c.nombre.toLowerCase().includes(value.toLowerCase())) return true;
        if (c.direccion.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (c.poblacion.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (c.cifNif.toLowerCase().includes(value.toLowerCase())) return true;
        if (c.telefono.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  function handleSelect(
    event: React.MouseEvent<HTMLDivElement>,
    client: Client
  ): void {
    // Verificamos si ya esta este proveedor
    if (selected?.id !== client.id) {
      setSelected(client);
    } else {
      // Si esta lo eliminamos
      setSelected(null);
    }
  }

  function handleSupplierForm() {
    setSupplierForm(!clientForm);
  }

  return (
    <div className={style.container}>
      {clientForm ? <SupplierForm handleForm={handleSupplierForm} /> : null}
      <div className={`toTop ${style.window}`}>
        <div className={style.close}>
          <h5>Seleccione un cliente</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.content}>
          <div>
            <input
              id="search"
              className="form-control"
              type="search"
              placeholder="Buscar un cliente"
              onChange={handleSearch}
            />
          </div>
          <div className={style.table}>
            <div className={style.firstRow}>
              <span>Nombre</span>
              <span>Direccion</span>
              <span>Poblacion</span>
              <span>CIF / NIF</span>
              <span>Telefono</span>
            </div>
            <div className={style.data}>
              {rows?.map((client: Client) => (
                <div
                  className={`${style.row} ${selected?.id === client.id ? style.selected : ""
                    }`}
                  onClick={(e) => handleSelect(e, client)}
                >
                  <span>{client.nombre}</span>
                  <span>{client.direccion}</span>
                  <span>{client.poblacion}</span>
                  <span>{client.cifNif}</span>
                  <span>{client.telefono}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Agregar
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleSupplierForm}
          >
            Crear nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
