import { useEffect, useState } from "react";
import { Product, SaleDetail, TipoImpositivoSale, initSaleDetail } from "../../../../../../../interfaces";

import style from "./DetailsRows.module.css";

interface Props {
  detail: SaleDetail;
  product: Product | undefined;
  handleChange: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
  handleRemove: (detailId: string) => void;
}

export default function DetailsRows({
  detail,
  product,
  handleChange,
  handleRemove,
}: Props) {
  const [localDetail, setLocalDetail] = useState<SaleDetail>(initSaleDetail);

  useEffect(() => {
    setLocalDetail(detail);
  }, [detail])

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setLocalDetail({ ...localDetail, [name]: value });
    handleChange(detail.id!, name, value);
  }

  return (
    <div className={style.row}>
      <input
        name="concepto"
        type="text"
        className="form-control"
        value={localDetail.concepto}
        placeholder="Concepto"
        onChange={handleLocalChange}
      />

      <input
        name="cantidad"
        type="numero"
        className="form-control"
        value={localDetail.cantidad}
        placeholder="Cantidad"
        onChange={handleLocalChange}
      />

      <input
        name="baseImponible"
        type="numero"
        className="form-control"
        value={localDetail.baseImponible.toFixed(2)}
        placeholder="Base Imponible"
        onChange={handleLocalChange}
      />

      {/* Tipo impositivo: */}
      <div className="form-floating">
        <select
          id="tipoImpositivo"
          className="form-control"
          name="tipoImpositivo"
          placeholder="tipoImpositivo"
          value={localDetail.tipoImpositivo}
          onChange={handleLocalChange}
        >
          <option value="">Seleccionar tipo impositivo</option>
          <option value={TipoImpositivoSale.IVA}>I.V.A.</option>
          <option value={TipoImpositivoSale.RE}>Recargo</option>
          <option value={TipoImpositivoSale.REBU}>REBU</option>
        </select>
        <label htmlFor="tipoImpositivo">Tipo Impositivo:</label>
      </div>

      <input
        name="ivaPorcentaje"
        type="numero"
        className="form-control"
        value={localDetail.ivaPorcentaje}
        placeholder="$ I.V.A."
        onChange={handleLocalChange}
      />

      <input
        name="ivaMonto"
        type="numero"
        className="form-control"
        value={localDetail.ivaMonto.toFixed(2)}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
      />

      <input
        name="recargoPorcentaje"
        type="numero"
        className="form-control"
        value={localDetail.recargoPorcentaje}
        placeholder="% Recargo"
        onChange={handleLocalChange}
      />

      <input
        name="recargoMonto"
        type="numero"
        className="form-control"
        value={localDetail.recargoMonto.toFixed(2)}
        placeholder="$ Recargo"
        onChange={handleLocalChange}
      />

      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleRemove(localDetail.id!)}
      >
        -
      </button>
    </div>
  );
}
