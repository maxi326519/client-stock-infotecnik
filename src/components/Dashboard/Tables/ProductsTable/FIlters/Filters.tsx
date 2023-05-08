import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";
import { useState } from "react";
import { RootState } from "../../../../../interfaces";
import { useSelector } from "react-redux";

interface Props {
  marca: string;
  color: string;
  capacidad: string;
  categoria: string;
  handleChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleSubmit: () => void;
}

export default function Filters({
  marca,
  color,
  capacidad,
  categoria,
  handleChange,
  handleSubmit,
}: Props) {
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
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
          {/* MARCA */}
          <div className="form-floating">
            <select
              id="marca"
              className="form-control"
              name="marca"
              value={marca}
              onChange={handleChange}
            >
              <option>Seleccionar</option>
            </select>
            <label htmlFor="marca">Marca</label>
          </div>

          {/* COLOR */}
          <div className="form-floating">
            <select
              id="color"
              className="form-control"
              name="color"
              value={color}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {colores.map((color: string) => (
                <option value={color}>{color}</option>
              ))}
            </select>
            <label htmlFor="color">Color</label>
          </div>

          {/* CAPACIDADES */}
          <div className="form-floating">
            <select
              id="capacidad"
              className="form-control"
              name="capacidad"
              value={capacidad}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {capacidades.map((capacidad: string) => (
                <option value={capacidad}>{capacidad}</option>
              ))}
            </select>
            <label htmlFor="capacidad">Capacidades:</label>
          </div>

          {/* CATEGORIAS */}
          <div className="form-floating">
            <select
              id="categoria"
              className="form-control"
              name="categoria"
              value={categoria}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {categories.map((category: string) => (
                <option value={category[1]}>{category[1]}</option>
              ))}
            </select>
            <label htmlFor="categoria">Categorias</label>
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
