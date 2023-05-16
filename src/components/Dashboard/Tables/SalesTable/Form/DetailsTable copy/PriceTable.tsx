import { PriceDetail } from "../../../../../../interfaces";
import PriceRow from "./PriceRow/PriceRow";

import style from "./PriceTable.module.css";

interface Props {
  priceDetails: PriceDetail[];
  addDetail: () => void;
  removeDetail: (detailId: string) => void;
  changeDetail: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
}

export default function PriceTable({
  priceDetails,
  addDetail,
  removeDetail,
  changeDetail,
}: Props) {
  function handleChange(
    detailId: string,
    name: string,
    value: string | number
  ) {
    changeDetail(detailId, name, value);
  }

  function handleAdd() {
    addDetail();
  }

  function handleRemove(detailId: string) {
    removeDetail(detailId);
  }

  return (
    <div className={style.grid}>
      <div className={`${style.row} ${style.firstRow}`}>
        <span>Metodo de pago</span>
        <span>Monto</span>
        <span>Nro de operación</span>
        <span>
          <button className="btn btn-success" type="button" onClick={addDetail}>
            +
          </button>
        </span>
      </div>
      <div className={style.contentCard}>
        {priceDetails.length <= 0 ? (
          <div className={style.listEmpty}>
            <span>No hay detalles</span>
          </div>
        ) : (
          priceDetails.map((detail: PriceDetail) => (
            <PriceRow
              key={detail.id}
              detail={detail}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
