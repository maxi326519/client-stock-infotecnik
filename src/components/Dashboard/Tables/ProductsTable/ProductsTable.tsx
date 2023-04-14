import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";
import {
  postCapacidades,
  postColores,
} from "../../../../redux/actions/products";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";
import Capacidades from "./Capacidades/Capacidades";
import Colores from "./Colores/Colores";

import style from "./ProductsTable.module.css";
import add from "../../../../assets/svg/add.svg";

export default function ProductTable() {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: RootState) => state.products);
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const [rows, setRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [details, setDetails] = useState(false);
  const [capacidadesForm, setCapacidadesForm] = useState(false);
  const [coloresForm, setColoresForm] = useState(false);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleForm() {
    setForm(!form);
  }

  function handleDetails() {
    setDetails(!details);
  }

  function handleSubmitCapacidades(data: string[]) {
    dispatch<any>(postCapacidades(data));
  }

  function handleSubmitColores(data: string[]) {
    dispatch<any>(postColores(data));
  }

  function handleCapacidadesForm() {
    setCapacidadesForm(!capacidadesForm);
  }

  function handleColoresForm() {
    setColoresForm(!coloresForm);
  }

  return (
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? (
        <Form
          capacidades={capacidades}
          colores={colores}
          handleForm={handleForm}
          handleCapacidadesForm={handleCapacidadesForm}
          handleColoresForm={handleColoresForm}
        />
      ) : null}
      {details ? (
        <Details product={products[0]} handleDetails={handleDetails} />
      ) : null}
      {capacidadesForm ? (
        <Capacidades
          data={capacidades}
          handleClose={handleCapacidadesForm}
          handleSubmit={handleSubmitCapacidades}
        />
      ) : null}
      {coloresForm ? (
        <Colores
          data={colores}
          handleClose={handleColoresForm}
          handleSubmit={handleSubmitColores}
        />
      ) : null}
      <h3>Poductos</h3>
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar producto"
        />
        <button className="btn btn-success" type="button" onClick={handleForm}>
          <img src={add} alt="add" />
          <span>Nuevo producto</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.row} ${style.firstRow}`}>
          <span>Codigo</span>
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
