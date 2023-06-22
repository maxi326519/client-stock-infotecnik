import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";

import style from "./ProductsTable.module.css";
import add from "../../../../assets/svg/add.svg";
import Filters from "./FIlters/Filters";
import {
  closeLoading,
  loading,
} from "../../../../redux/actions/loading/loading";
import { getProduct } from "../../../../redux/actions/products";
import swal from "sweetalert";

export default function ProductTable() {
  const dispatch = useDispatch();
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
      console.log(filters);

      if (filters.marca !== "" && product.marca !== filters.marca) return false;
      if (filters.color !== "" && product.color !== filters.color) return false;
      if (filters.capacidad !== "" && product.capacidad !== filters.capacidad)
        return false;
      if (
        filters.categoria !== "" &&
        product.CategoryId.toString() !== filters.categoria.toString()
      )
        return false;

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
  }, [products, search, filters]);

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

  function handelFilterSubmit(filters: any) {
    setFilters(filters);
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
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleForm}
        >
          <b>+</b> Nuevo producto
        </button>
        <Filters
          marca={filters.marca}
          color={filters.color}
          capacidad={filters.capacidad}
          categoria={filters.categoria}
          handleSubmit={handelFilterSubmit}
        />
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Numero</span>
          <span>Codigo</span>
          <span>Codigo de Barra</span>
          <span>Descripcion</span>
          <span>Cantidad</span>
          <span>Cateogria</span>
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
