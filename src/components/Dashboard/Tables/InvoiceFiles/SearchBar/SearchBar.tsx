import { useState } from "react";
import {
  Search,
  initSearch,
} from "../../../../../interfaces/invoices/InvoiceFile";

import styles from "./SearchBar.module.css";

interface Props {
  submit: (search: Search) => void;
}

export default function SearchBar({ submit }: Props) {
  const [search, setSearch] = useState<Search>(initSearch());

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch({ ...search, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    submit(search);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        name="text"
        type="text"
        placeholder="Buscar factura"
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        placeholder="Buscar factura"
        onChange={handleChange}
      />
      <button className="btn btn-success" type="submit">
        Buscar
      </button>
    </form>
  );
}
