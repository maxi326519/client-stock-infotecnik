import { Product, SaleDetail, TipoImpositivoSale } from "../../../../../../../interfaces";

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
  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    handleChange(detail.id!, name, value);
  }

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;

    handleChange(detail.id!, name, value);
  }

  return (
    <div className={style.row}>
      <input
        name="descripcion"
        className="form-control"
        value={`${product?.marca}/${product?.modelo}`}
        placeholder="Descripcion"
        onChange={handleLocalChange}
      />

      <input
        name="cantidad"
        className="form-control"
        value={detail.cantidad}
        placeholder="Cantidad"
        onChange={handleLocalChange}
      />

      <input
        name="baseImponible"
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
          onChange={handleChangeSelect}
        >
          <option value="">Seleccionar tipo impositivo</option>
          <option value={TipoImpositivoSale.IVA}>I.V.A.</option>
          <option value={TipoImpositivoSale.RE}>Recargo</option>
          <option value={TipoImpositivoSale.REBU}>REBU</option>
        </select>
        <label htmlFor="tipoImpositivo">Tipo Impositivo:</label>
      </div>

      <input
        name="ivaMonto"
        className="form-control"
        value={detail.ivaPorcentaje}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
      />

      <input
        name="ivaMonto"
        className="form-control"
        value={detail.ivaMonto}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
      />

      <input
        name="recargoPorcentaje"
        className="form-control"
        value={detail.recargoPorcentaje}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
      />

      <input
        name="recargoMonto"
        className="form-control"
        value={detail.recargoMonto}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
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
