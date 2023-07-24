import React, { useState } from "react";
import {
  InvoiceFile,
  initInvoiceFile,
} from "../../../../../interfaces/invoices/InvoiceFile";

import styles from "./NewFile.module.css";

interface Props {
  submit: (file: File) => void;
}

export default function NewFile({ submit }: Props) {
  const [newInvoice, setNewInvoice] = useState<InvoiceFile>(initInvoiceFile());
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit() {
    if (file) submit(file);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setNewInvoice({ ...newInvoice, [event.target.name]: event.target.value });
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];
    if (file) setFile(file);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          name="date"
          type="date"
          onChange={handleChange}
          placeholder="Fecha"
        />
        <input
          name="description"
          type="text"
          onChange={handleChange}
          placeholder="Descripción"
        />
      </div>

      <div>
        <input type="file" onChange={handleFile} placeholder="Archivo" />
        <label htmlFor="type">Tipo de factura</label>
        <select id="type" name="type" onChange={handleChange}>
          <option value="">Seleccionar tipo</option>
        </select>
      </div>

      <button className="btn btn-outline-success" type="submit">
        Agregar
      </button>
    </form>
  );
}
