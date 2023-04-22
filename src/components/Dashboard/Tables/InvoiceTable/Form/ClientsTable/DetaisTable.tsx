import { useState } from "react";
import { InvoiceDestails } from "../../../../../../interfaces";
import DetailsRows from "./DetailsRows/DetailsRows";

import style from "./DetaisTable.module.css";

const initialDetail = {
  id: "",
  concepto: "",
  cantidad: 0,
  baseImponible: 0,
  ivaPorcentaje: 0,
};

export default function DetaisTable() {
  const [details, setDetails] = useState<any>([]);
  const [newDetail, setNewDetial] = useState<any>(initialDetail);

  function handleNewDetail(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setNewDetial({ ...newDetail, [name]: value });
  }

  function handleAddDetail() {
    let newId: string = details.length.toString();

    while (details.some((d: InvoiceDestails) => d.id === newId)) {
      newId = (Number(newId) + 1).toString();
    }

    const detail = {
      ...newDetail,
      id: newId,
    };

    setNewDetial(initialDetail);
    setDetails([...details, detail]);
  }

  function handleChange(
    detailId: string,
    name: string,
    value: string | number
  ) {
    setDetails(
      details.map((detail: InvoiceDestails) => {
        if (detail.id === detailId) {
          return {
            ...detail,
            [name]: value,
          };
        } else {
          return detail;
        }
      })
    );
  }

  function handleRemove(detailId: string) {
    setDetails(
      details.filter((detail: InvoiceDestails) => detail.id !== detailId)
    );
  }

  return (
    <div className={style.grid}>
      <div className={`${style.row} ${style.firstRow}`}>
        <span>Concepto</span>
        <span>Cant.</span>
        <span>Precio</span>
        <span>IVA</span>
        <span></span>
      </div>
      <div className={style.contentCard}>
        {details.length <= 0 ? (
          <div className={style.listEmpty}>
            <span>No hay detalles</span>
          </div>
        ) : (
          details?.map((detail: InvoiceDestails) => (
            <DetailsRows
              key={detail.id}
              detail={detail}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
      <div className={style.inputs}>
        <input
          id="concepto"
          name="concepto"
          value={newDetail.concepto}
          placeholder="Concepto"
          onChange={handleNewDetail}
        />
        <input
          id="cantidad"
          name="cantidad"
          value={newDetail.cantidad}
          placeholder="Cantidad"
          type="number"
          onChange={handleNewDetail}
        />
        <input
          id="baseImponible"
          name="baseImponible"
          value={newDetail.baseImponible}
          placeholder="Precio"
          type="number"
          onChange={handleNewDetail}
        />
        <input
          id="ivaPorcentaje"
          name="ivaPorcentaje"
          value={newDetail.ivaPorcentaje}
          placeholder="IVA"
          type="number"
          onChange={handleNewDetail}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleAddDetail}
        >
          +
        </button>
      </div>
    </div>
  );
}
