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
      <span>{`0000000${product.id}`.slice(-7)}</span>
      <span>{product.codigo}</span>
      <span>{product.codigoDeBarras}</span>
      <span>{`${product.marca} / ${product.modelo} / ${product.color} / ${product.capacidad}`}</span>
      <span>{product.cantidad}</span>
      <span>
        {categories.find((cat: any) => cat[0] === product.CategoryId)?.[1] ||
          ""}
      </span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={handleDetails}
      >
        <img src={details} alt="details" />
      </button>
      <span></span>
    </div>
  );
}
