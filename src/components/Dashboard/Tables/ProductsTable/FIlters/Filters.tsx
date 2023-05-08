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
  handleSubmit: (filters: any) => void;
}

export default function Filters({
  marca,
  color,
  capacidad,
  categoria,
  handleSubmit,
}: Props) {
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const marcas = useSelector((state: RootState) => state.attributes.marcas);
  const [filter, setFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    marca: marca,
    color: color,
    capacidad: capacidad,
    categoria: categoria
  });

  function handleFilter() {
    setFilter(!filter);
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
    setFilters({ ...filters, [event.target.name]: event?.target.value })
  }

  function handleSetFilter(){
    handleSubmit(filters);
    handleFilter();
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
              value={filters.marca}
              onChange={handleChange}
            >
              <option>Seleccionar</option>
              {marcas.map((marca: string) => (
                <option value={marca}>{marca}</option>
              ))}
            </select>
            <label htmlFor="marca">Marca</label>
          </div>

          {/* COLOR */}
          <div className="form-floating">
            <select
              id="color"
              className="form-control"
              name="color"
              value={filters.color}
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
              value={filters.capacidad}
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
              value={filters.categoria}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {categories.map((category: string) => (
                <option value={category[0]}>{category[1]}</option>
              ))}
            </select>
            <label htmlFor="categoria">Categorias</label>
          </div>

          <button
            className="btn btn-success"
            type="button"
            onClick={handleSetFilter}
          >
            Aplicar
          </button>
        </div>
      ) : null}
    </div>
  );
}
