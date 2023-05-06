import { MetodoDePago, PriceDetail } from "../../../../../../../interfaces";

import style from "./PriceRow.module.css";

interface Props {
  detail: PriceDetail;
  handleChange: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
  handleRemove: (detailId: string) => void;
}

export default function PriceRow({
  detail,
  handleChange,
  handleRemove,
}: Props) {
  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(detail.id, event.target.name, event.target.value);
  }

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    handleChange(detail.id, event.target.name, event.target.value);
  }

  return (
    <div className={style.row}>
      {/* Tipo impositivo: */}
      <div className="form-floating">
        <select
          id="metodoDePago"
          className="form-control"
          name="metodoDePago"
          placeholder="metodoDePago"
          value={detail.metodoDePago}
          onChange={handleChangeSelect}
        >
          <option value="">Seleccionar tipo impositivo</option>
          <option value={MetodoDePago.efectivo}>EFECTIVO</option>
          <option value={MetodoDePago.tarjeta}>TARJETA</option>
          <option value={MetodoDePago.transferenciaBancaria}>
            TRANSFERENCIA BANCARIA
          </option>
          <option value={MetodoDePago.bizum}>BIZUM</option>
          <option value={MetodoDePago.contratoCompraventa}>
            CONTRATO COMPRAVENTA
          </option>
        </select>
        <label htmlFor="metodoDePago">Metodo de pago:</label>
      </div>

      <input
        name="monto"
        className="form-control"
        value={detail.monto}
        type="number"
        placeholder="Monto"
        onChange={handleLocalChange}
      />

      <input
        name="nroOperacion"
        className="form-control"
        value={detail.nroOperacion !== undefined ? detail.nroOperacion : "-"}
        placeholder="Nro de operación"
        onChange={handleLocalChange}
        disabled={detail.nroOperacion === undefined}
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
