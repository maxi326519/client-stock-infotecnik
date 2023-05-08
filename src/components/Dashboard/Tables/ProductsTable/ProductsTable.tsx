import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";

import style from "./ProductsTable.module.css";
import add from "../../../../assets/svg/add.svg";
import Filters from "./FIlters/Filters";

export default function ProductTable() {
  const products: Product[] = useSelector((state: RootState) => state.products);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [details, setDetails] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState({
    marca: "",
    color: "",
    capacidad: "",
    categoria: "",
  });

  useEffect(() => {
    const searchStr = search.toLowerCase();
    const filter = products.filter((product: Product) => {
      if (searchStr === "") return true;
      if (product.id === Number(searchStr)) return true;
      if (product.codigo.toLocaleLowerCase().includes(searchStr)) return true;
      if (product.color.toLocaleLowerCase().includes(searchStr)) return true;
      if (product.marca.toLocaleLowerCase().includes(searchStr)) return true;
      if (product.modelo.toLocaleLowerCase().includes(searchStr)) return true;
      if (product.descCorta.toLocaleLowerCase().includes(searchStr))
        return true;
      if (product.descLarga.toLocaleLowerCase().includes(searchStr))
        return true;
      return false;
    });
    console.log(filter);
    setRows(filter);
  }, [products, search]);

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleForm() {
    setForm(!form);
  }

  function handleDetails() {
    setDetails(!details);
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleGetDataByFilter(){

  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? <Form handleForm={handleForm} /> : null}
      {details ? (
        <Details product={products[0]} handleDetails={handleDetails} />
      ) : null}
      <h3>Poductos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar producto"
          onChange={handleChangeSearch}
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo producto</span>
        </button>
        <Filters
          marca={filters.marca}
          color={filters.color}
          capacidad={filters.capacidad}
          categoria={filters.categoria}
          handleChange={handleFilterChange}
          handleSubmit={handleGetDataByFilter}
        />
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Codigo</span>
          <span>Codigo de Barra</span>
          <span>Cantidad</span>
          <span>Descripcion</span>
          <span>Cateogria</span>
          <span>Detalle</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((product: Product) => (
              <ProductRow
                key={product.id}
                product={product}
                handleDetails={handleDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
