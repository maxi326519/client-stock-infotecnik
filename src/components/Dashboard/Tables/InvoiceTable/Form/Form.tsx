import { useState } from "react";
import { useDispatch } from "react-redux";
import { Invoices, TipoImpositivo } from ".././../../../../interfaces";
import { postInvoice } from "../../../../../redux/actions/invoices";
import swal from "sweetalert";

import style from "./Form.module.css";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import DetaisTable from "./ClientsTable/DetaisTable";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Invoices = {
    id: "",
    fecha: new Date().toISOString().split("T")[0],
    numero: 0,
    pendiente: true,
    archivo: "",
    tipoImpositivo: TipoImpositivo.IVA,
    InvoiceDestails: [],
    SuipplierId: "",
    StockId: [],
  };

  const [invoice, setInvoice] = useState(initialState);
  const dispatch = useDispatch();

  

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInvoice({ ...invoice, [event.target.name]: event.target.value });
  }

  function handleChangeCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.checked;

    setInvoice({ ...invoice, [name]: value });
  }

  function handleClose(): void {
    setInvoice(initialState);
    handleForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(loading());
    dispatch<any>(postInvoice(invoice))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Se guardo el cliente correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo ", "error");
        console.log(err);
      });
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo cliente</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.inputs}>
          <div className="form-floating">
            <input
              id="numero"
              name="numero"
              type="text"
              className="form-control"
              value={invoice.numero}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="numero">
              Numero
            </label>
            <small></small>
          </div>

          <div className="form-floating">
            <input
              id="fecha"
              name="fecha"
              type="date"
              className="form-control"
              value={invoice.fecha}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="fecha">
              Fecha
            </label>
            <small></small>
          </div>

          <div className={style.pending}>
            <input
              id="pendiente"
              name="pendiente"
              type="checkbox"
              checked={invoice.pendiente}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="pendiente">Pendiente</label>
          </div>

          <div className="form-floating">
            <input
              id="archivo"
              name="archivo"
              type="file"
              className="form-control"
              value={invoice.archivo}
              onChange={handleChange}
              disabled={invoice.pendiente}
            />
            <label className="form-label" htmlFor="archivo">
              PDF
            </label>
            <small></small>
          </div>

          <DetaisTable />

          <button className="btn btn-success" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
