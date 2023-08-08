import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";
import { useState } from "react";

interface Props {
  unlinked: boolean;
  fromDate: string;
  toDate: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: () => void;
}

export default function Filters({
  unlinked,
  fromDate,
  toDate,
  handleChange,
  handleSubmit,
}: Props) {
  const [filter, setFilter] = useState<boolean>(false);

  function handleFilter() {
    setFilter(!filter);
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      {filter ? (
        <div className={style.filterContainer}>
          <div className="form-floating">
            <select
              id="unlinked"
              className="form-control"
              name="unlinked"
              value={unlinked.toString()}
              onChange={handleChange}
            >
              <option value="false">Todas</option>
              <option value="true">No vinculadas</option>
            </select>
            <label htmlFor="unlinked">Tipo:</label>
          </div>

          <div className="form-floating">
            <input
              id="fromDate"
              className="form-control"
              name="fromDate"
              value={fromDate}
              type="date"
              onChange={handleChange}
            />
            <label htmlFor="fromDate">Desde:</label>
          </div>
          <div className="form-floating">
            <input
              id="toDate"
              className="form-control"
              name="toDate"
              value={toDate}
              type="date"
              onChange={handleChange}
            />
            <label htmlFor="toDate">Hasta:</label>
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Aplicar
          </button>
        </div>
      ) : null}
    </div>
  );
}
