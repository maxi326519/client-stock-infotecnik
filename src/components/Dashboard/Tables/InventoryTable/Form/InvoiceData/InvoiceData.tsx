import { useState } from "react";
import { Invoices, TipoImpositivo } from "../../../../../../interfaces";

import styles from "./InvoiceData.module.css";

interface Props {
  invoice: Invoices;
  handleChange: (name: string, value: string | number) => void;
  setFile: (file: File) => void;
}

export default function InvoiceData({ invoice, handleChange, setFile }: Props) {
  const [pending, setpending] = useState<boolean>(false);

  function handleCheck() {
    setpending(!pending);
  }

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;

    handleChange(name, value);
  }

  function handleLocalSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const name = event.target.name;

    if (Number(value) === TipoImpositivo.IVA) {
      handleChange("tipoImpositivo", TipoImpositivo.IVA);
    } else if (Number(value) === TipoImpositivo.REBU) {
      handleChange("tipoImpositivo", TipoImpositivo.REBU);
    } else if (Number(value) === TipoImpositivo.recargo) {
      handleChange("tipoImpositivo", TipoImpositivo.recargo);
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>){
    const file = event.target.files?.[0];

    if(file) setFile(file);
  }

  return (
    <div className={styles.container}>
      <hr></hr>
      <h5>Factura</h5>
      <div className={styles.pending}>
        <input
          id="pendiente"
          name="pendiente"
          type="checkbox"
          checked={pending}
          className="btn btn-success"
          onChange={handleCheck}
        />
        <label htmlFor="pendiente">Pendiente</label>
      </div>
      <div className={styles.data}>
        <div className="form-floating">
          <input
            id="numero"
            name="numero"
            className="form-control"
            type="number"
            value={invoice.numero}
            onChange={handleLocalChange}
          />
          <label htmlFor="numero" className="form-label">
            Numero
          </label>
        </div>

        <div className="form-floating">
          <input
            id="fecha"
            name="fecha"
            className="form-control"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={invoice.fecha}
            onChange={handleLocalChange}
          />
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
        </div>

        <div className="form-floating">
          <select
            id="tipoImpositivo"
            name="tipoImpositivo"
            className="form-control"
            value={invoice.tipoImpositivo}
            onChange={handleLocalSelect}
          >
            <option value={TipoImpositivo.IVA}>IVA</option>
            <option value={TipoImpositivo.recargo}>Recargo</option>
            <option value={TipoImpositivo.REBU}>REBU</option>
          </select>
          <label htmlFor="tipoImpositivo" className="form-label">
            Tipo Impositivo:
          </label>
        </div>

        <div className="form-floating">
          <input
            id="archivo"
            name="archivo"
            className="form-control"
            type="file"
            placeholder="archivo"
            disabled={pending}
            onChange={handleFile}
          />
        </div>
      </div>
    </div>
  );
}
