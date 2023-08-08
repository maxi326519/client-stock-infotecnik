import React, { useState } from "react";
import {
  ErrorInvoiceFile,
  InvoiceFile,
  initErrorInvoiceFile,
  initInvoiceFile,
} from "../../../../../interfaces/invoices/InvoiceFile";

import Input from "../../../../../componentss/Inputs/Input";

import styles from "./NewFile.module.css";
import arrowDown from "../../../../../assets/svg/arrow-down.svg";


interface Props {
  submit: (filaData: InvoiceFile, file: File) => void;
}

export default function NewFile({ submit }: Props) {
  const [newInvoice, setNewInvoice] = useState<InvoiceFile>(initInvoiceFile());
  const [error, setError] = useState<ErrorInvoiceFile>(initErrorInvoiceFile());
  const [file, setFile] = useState<File | null>(null);
  const [view, setView] = useState(false);

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (file && validations()) {
      submit(newInvoice, file);
      setNewInvoice(initInvoiceFile());
      setError(initErrorInvoiceFile());
      setView(false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;

    if (type === "date") {
      setNewInvoice({ ...newInvoice, [name]: new Date(value) });
    } else {
      setNewInvoice({ ...newInvoice, [name]: value });
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];
    if (file) setFile(file);
  }

  function handleView() {
    setView(!view);
  }

  function validations() {
    let errors: ErrorInvoiceFile = initErrorInvoiceFile();
    let value = true;


    if (newInvoice.date === null) {
      errors.date = "Debe seleccionar una fecha";
      value = false;
    }

    if (newInvoice.description === "") {
      errors.description = "Debe agregar una descripción";
      value = false;
    }

    if (newInvoice.type === "") {
      errors.type = "Debe seleccionar un tipo";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <form className={`${styles.form} ${view && styles.view}`} onSubmit={handleSubmit}>
      <h5>Agregar nueva factura</h5>
      <button type="button" onClick={handleView}>
        <img src={arrowDown} alt="arrow down" />
      </button>
      <div className={styles.inputs}>
        <Input
          name="date"
          type="date"
          label="Fecha"
          value={newInvoice.date?.toISOString().split("T")[0]}
          handleChange={handleChange}
        />
        <Input
          name="file"
          type="file"
          label="Factura"
          value=""
          handleChange={handleFile}
        />
        <div className="form-floating">
          <select id="type" name="type" className="form-select" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="Compra">Compra</option>
            <option value="Venta">Venta</option>
            <option value="Servicios">Servicios</option>
          </select>
          <label className="form-label" htmlFor="type">Tipo de factura</label>
        </div>
        <Input
          name="description"
          type="text"
          label="Descripción"
          value={newInvoice.description}
          handleChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Agregar
        </button>
      </div>
    </form>
  );
}
