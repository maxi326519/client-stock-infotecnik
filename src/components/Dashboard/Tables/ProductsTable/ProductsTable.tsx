import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Product } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import ProductRow from "./ProductRow/ProductRow";

import styles from "../../Dashboard.module.css";
import style from "./ProductsTable.module.css";
import Capacidades from "./Capacidades/Capacidades";
import Colores from "./Colores/Colores";
import { postCapacidades, postColores } from "../../../../redux/actions/products";

export default function ProductTable() {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: RootState) => state.products);
  const capacidades = useSelector((state: RootState) => state.attributes.capacidades);
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
    <div className={styles.dashboardList}>
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
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar producto"
        />
        <button className="btn btn-primary" type="button" onClick={handleForm}>
          Agregar producto
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.row} ${styles.firstrow}`}>
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Cateogria</span>
          <span>Detalle</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay productos</span>
              <span>¿Quieres agregar uno?</span>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleForm}
              >
                Agregar producto
              </button>
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
