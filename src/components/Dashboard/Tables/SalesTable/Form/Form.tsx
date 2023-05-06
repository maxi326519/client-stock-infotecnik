import { useDispatch } from "react-redux";
import { Client, TipoImpositivoSale } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import { HookSaleInvoice } from "../../../../../interfaces/sales";
import useSaleInvoice from "../../../../../hooks/saleInvoice";
import DetailsTable from "./DetailsTable/DetailsTable";

import style from "./Form.module.css";
import AddProduct from "./AddProduct/AddProduct";
import { useEffect, useState } from "react";
import PriceTable from "./DetailsTable copy/PriceTable";
import ClientData from "./ClientData/ClientData";
interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const { invoice, details, priceDetails, errors, customs }: HookSaleInvoice =
    useSaleInvoice();
  const [stockSelected, setStockSelected] = useState<string[]>([]);
  const [addStock, setAddStock] = useState<boolean>(false);
  const [clientSelected, setCLientSelected] = useState<Client | null>(null);
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(loading());
    customs
      .postInvoice()
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Su venta se guardo correctamente", "success");
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nueva venta", "error");
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    customs.setInvoice({ ...invoice, [event.target.name]: event.target.value });
  }

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    customs.setInvoice({ ...invoice, [event.target.name]: event.target.value });
  }

  function handleStockSelected(selected: string[]) {
    customs.addDetail(selected);
    setStockSelected(selected);
  }

  function handleEmptyProduct() {
    customs.addDetail();
  }

  function handleAddStock() {
    setAddStock(!addStock);
  }

  function handleAddClient() {}

  return (
    <div className={style.container}>
      {addStock ? (
        <AddProduct
          stockSelected={stockSelected}
          handleStockSelected={handleStockSelected}
          handleClose={handleAddStock}
          handleEmptyProduct={handleEmptyProduct}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nueva factura de venta</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.flex}>
          <div className={style.inputs}>
            {/* Numero: */}
            <div className="form-floating">
              <input
                id={!errors.numero ? "floatingInputInvalid" : "numero"}
                className={`form-control ${!errors.numero ? "" : "is-invalid"}`}
                name="numero"
                type="text"
                placeholder="numero"
                value={invoice.numero}
                onChange={handleChange}
              />
              <label htmlFor="numero">Numero:</label>
              <small>{errors.numero}</small>
            </div>
            {/* Fecha */}
            <div className="form-floating">
              <input
                id="fecha"
                className="form-control"
                name="fecha"
                type="date"
                placeholder="fecha"
                value={invoice.fecha.toISOString().split("T")[0]}
                onChange={handleChange}
              />
              <label htmlFor="fecha">Fecha:</label>
            </div>
            {/* Tipo impositivo: */}
            <div className="form-floating">
              <select
                id="tipoImpositivo"
                className="form-control"
                name="tipoImpositivo"
                placeholder="tipoImpositivo"
                value={invoice.tipoImpositivo}
                onChange={handleChangeSelect}
              >
                <option value="">Seleccionar tipo impositivo</option>
                <option value={TipoImpositivoSale.Compuesto}>Compuesto</option>
                <option value={TipoImpositivoSale.IVA}>I.V.A.</option>
                <option value={TipoImpositivoSale.RE}>Recargo</option>
                <option value={TipoImpositivoSale.REBU}>REBU</option>
              </select>
              <label htmlFor="tipoImpositivo">Tipo Impositivo:</label>
            </div>
            {/* Total: */}
            <div className="form-floating">
              <input
                id={!errors.total ? "floatingInputInvalid" : "total"}
                className={`form-control ${!errors.total ? "" : "is-invalid"}`}
                name="total"
                type="number"
                placeholder="total"
                value={invoice.total}
                onChange={handleChange}
              />
              <label htmlFor="total">Total:</label>
              <small>{errors.total}</small>
            </div>
            <div className={style.generated}>
              <input id="generated" type="checkbox" />
              <label htmlFor="generated">Generar factura</label>
            </div>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddStock}
            >
              Seleccionar producto
            </button>
            <DetailsTable
              details={details}
              addDetail={customs.addDetail}
              removeDetail={customs.removeDetail}
              changeDetail={customs.setDetail}
            />
            <PriceTable
              priceDetails={priceDetails}
              addDetail={customs.addPriceDetail}
              removeDetail={customs.removePriceDetail}
              changeDetail={customs.setPriceDetail}
            />

            <ClientData
              client={clientSelected}
              error={""}
              handleFormSuppliers={handleAddClient}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
