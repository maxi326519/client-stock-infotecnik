import { Product, RootState } from "../../../../../interfaces";

import style from "./ProductRow.module.css";
import details from "../../../../../assets/svg/details.svg";
import { useSelector } from "react-redux";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function ProductCard({ product, handleDetails }: Props) {
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );

  return (
    <div className={style.row}>
      <input
        className="form-control"
        id="id"
        placeholder="id"
        type="text"
        value={`0000000${product.id}`.slice(-7)}
        disabled={true}
      />
      <input
        className="form-control"
        id="codigo"
        placeholder="Codigo"
        type="text"
        value={product.codigo}
        disabled={true}
      />
      <input
        className="form-control"
        id="codigoDeBarras"
        placeholder="codigoDeBarras"
        type="text"
        value={product.codigoDeBarras}
        disabled={true}
      />
      <input
        className="form-control"
        id="cantidad"
        placeholder="Codigo"
        type="text"
        value={product.cantidad}
        disabled={true}
      />
      <input
        className="form-control"
        id="marca"
        placeholder="Msarca"
        type="text"
        value={`${product.marca} / ${product.modelo} / ${product.color} / ${product.capacidad}`}
        disabled={true}
      />
      <input
        className="form-control"
        id="categoria"
        placeholder="Categoria"
        type="text"
        value={
          categories.find((cat: any) => cat[0] === product.CategoryId)?.[1] ||
          ""
        }
        disabled={true}
      />
      <button className="btn btn-success" type="button" onClick={handleDetails}>
        <img src={details} alt="details" />
      </button>
      <span></span>
    </div>
  );
}
