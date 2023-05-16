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
      {/* TIPO IMPOSITIVO */}
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

      {/* MONTO */}
      <input
        name="monto"
        className="form-control"
        value={detail.monto}
        type="number"
        placeholder="Monto"
        onChange={handleLocalChange}
      />

      {/* NRO DE OPEERACION / NRO DE CONTRATO */}
      <div className="form-floating">
        <input
          name="nroOperacion"
          className="form-control"
          value={detail.nroOperacion !== undefined ? detail.nroOperacion : "-"}
          placeholder={detail.metodoDePago === MetodoDePago.tarjeta ? "Nro de operación" : "Nro de contrato"}
          onChange={handleLocalChange}
          disabled={detail.nroOperacion === undefined}
        />
        <label className="form-label">{detail.metodoDePago === MetodoDePago.tarjeta ? "Nro de operación" : "Nro de contrato"}</label>
      </div>

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
