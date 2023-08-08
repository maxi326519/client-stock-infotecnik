import React, { useState } from "react";
import { InvoiceFile } from "../../../../../../interfaces/invoices/InvoiceFile";

import styles from "./Row.module.css";
import viewSvg from "../../../../../../assets/svg/view.svg";
import editSvg from "../../../../../../assets/svg/edit.svg";
import removeSvg from "../../../../../../assets/svg/delete.svg";

interface Props {
  item: InvoiceFile;
  selected: string;
  update: (item: InvoiceFile) => void;
  remove: (id: string) => void;
  handleSelected: (id: string) => void;
}

export default function Row({ item, selected, update, remove, handleSelected }: Props) {
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
    if (!disabled) update(edit);
    setDisabled(!disabled);
  }

  return (
    <div className={`${styles.row} ${item.id === selected && styles.selected}`}>
      <input
        type="checkbox"
        className="form-check-input"
        checked={item.id === selected}
        placeholder="Fecha"
        onClick={() => handleSelected(item.id!)}
      />

      <input
        name="date"
        type="date"
        className="form-control"
        placeholder="Fecha"
        onChange={handleChange}
        disabled={disabled}
      />

      <select
        id="type"
        name="type"
        className="form-select"
        value={edit.type}
        placeholder="Tipo de factura"
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Seleccionar</option>
        <option value="Compra">Compra</option>
        <option value="Venta">Venta</option>
        <option value="Servicios">Servicios</option>
      </select>
      <label htmlFor="type">.</label>

      <input
        id="description"
        name="description"
        placeholder="description"
        className="form-control"
        value={edit.description}
        onChange={handleChange}
        disabled={disabled}
      />

      <a className="btn btn-outline-success-outline" href={"http://" + edit.url} target="_blank" rel="noreferrer">
        <img src={viewSvg} alt="view" />
      </a>
      <button className="btn btn-outline-success-outline" onClick={handleDisabled} type="button">
        <img src={editSvg} alt="edit" />
      </button>
      <button className="btn btn-outline-success-outline" onClick={() => remove(item.id!)} type="button">
        <img src={removeSvg} alt="remove" />
      </button>
    </div>
  );
}
