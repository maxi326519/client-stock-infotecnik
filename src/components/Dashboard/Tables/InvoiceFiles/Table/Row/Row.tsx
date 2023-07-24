import React, { useState } from "react";
import { InvoiceFile } from "../../../../../../interfaces/invoices/InvoiceFile";

import styles from "./Row.module.css";

interface Props {
  item: InvoiceFile;
  view: (url: string) => void;
  update: (item: InvoiceFile) => void;
  remove: (id: string) => void;
}

export default function Row({ item, view, update, remove }: Props) {
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState<InvoiceFile>(item);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
  }

  function handleDisabled() {
    setDisabled(!disabled);
  }

  return (
    <div className={styles.row}>
      <input
        name="date"
        value={edit.date}
        placeholder="Fecha"
        onChange={handleChange}
        disabled={true}
      />
      <label htmlFor="type">Tipo</label>
      <select
        id="type"
        name="type"
        value={edit.type}
        placeholder="Tipo de factura"
        onChange={handleChange}
        disabled={disabled}
      >
        <option>Seleccionar</option>
      </select>
      <input
        name="description"
        value={edit.description}
        placeholder="Descripción"
        onChange={handleChange}
        disabled={disabled}
      />
      <button onClick={() => view(item.url)} type="button">
        <img src="" alt="view" />
      </button>
      <button onClick={handleDisabled} type="button">
        <img src="" alt="update" />
      </button>
      <button onClick={() => remove(item.id!)} type="button">
        <img src="" alt="remove" />
      </button>
    </div>
  );
}
