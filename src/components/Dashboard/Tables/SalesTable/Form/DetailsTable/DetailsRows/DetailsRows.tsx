import { SaleDetail, TipoImpositivoSale, initSaleDetail } from "../../../../../../../interfaces";

import style from "./DetailsRows.module.css";
import useDisabled from "./useDisabled";

interface Props {
  detail: SaleDetail;
  tipoImpositivoSale: TipoImpositivoSale;
  handleChange: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
  handleRemove: (detailId: string) => void;
}

export default function DetailsRows({
  detail,
  tipoImpositivoSale,
  handleChange,
  handleRemove,
}: Props) {
  const disabled = useDisabled(detail.tipoImpositivo);

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;

    handleChange(detail.id!, name, value);
  }

  return (
    <div className={style.row}>
      <input
        name="concepto"
        type="text"
        className="form-control"
        value={detail.concepto}
        placeholder="Concepto"
        onChange={handleLocalChange}
      />

      <input
        name="cantidad"
        type="numero"
        className="form-control"
        value={detail.cantidad}
        placeholder="Cantidad"
        onChange={handleLocalChange}
      />

      <input
        name="baseImponible"
        type="numero"
        className="form-control"
        value={detail.baseImponible}
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
          value={detail.tipoImpositivo}
          onChange={handleLocalChange}
          disabled={tipoImpositivoSale !== TipoImpositivoSale.Compuesto}
        >
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
        value={detail.ivaPorcentaje}
        placeholder="$ I.V.A."
        onChange={handleLocalChange}
        disabled={disabled?.iva}
      />

      <input
        name="ivaMonto"
        type="numero"
        className="form-control"
        value={detail.ivaMonto}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
        disabled={disabled?.iva}
      />

      <input
        name="recargoPorcentaje"
        type="numero"
        className="form-control"
        value={detail.recargoPorcentaje}
        placeholder="% Recargo"
        onChange={handleLocalChange}
        disabled={disabled?.recargo}
      />

      <input
        name="recargoMonto"
        type="numero"
        className="form-control"
        value={detail.recargoMonto}
        placeholder="$ Recargo"
        onChange={handleLocalChange}
        disabled={disabled?.recargo}
      />

      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleRemove(detail.id!)}
      >
        -
      </button>
    </div>
  );
}
