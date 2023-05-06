import { RootState, SaleDetail } from "../../../../../../interfaces";
import DetailsRows from "./DetailsRows/DetailsRows";

import style from "./DetailsTable.module.css";
import { useSelector } from "react-redux";

interface Props {
  details: SaleDetail[];
  addDetail: (stockId?: string[]) => void;
  removeDetail: (detailId: string) => void;
  changeDetail: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
}

export default function DetaisTable({
  details,
  addDetail,
  removeDetail,
  changeDetail,
}: Props) {
  const products = useSelector((state: RootState) => state.products);

  function handleChange(
    detailId: string,
    name: string,
    value: string | number
  ) {
    changeDetail(detailId, name, value);
  }


  function handleAddDetail() {
    addDetail();
  }
  
  function handleRemove(detailId: string) {
    removeDetail(detailId);
  }

  return (
    <div className={style.grid}>
      <div className={`${style.row} ${style.firstRow}`}>
        <span>Concepto</span>
        <span>Cant.</span>
        <span>Precio</span>
        <span>Impositivo</span>
        <span>%IVA</span>
        <span>$IVA</span>
        <span>%RE</span>
        <span>$RE</span>
        <span></span>
        <button
        className="btn btn-success"
        type="button"
        onClick={handleAddDetail}
      >
        +
      </button>
      </div>
      <div className={style.contentCard}>
        {details.length <= 0 ? (
          <div className={style.listEmpty}>
            <span>No hay detalles</span>
          </div>
        ) : (
          details?.map((detail: SaleDetail) => (
            <DetailsRows
              key={detail.id}
              detail={detail}
              product={products.find(
                (product) => product.id === detail.ProductId
              )}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
