import { useState } from "react";
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
import AddClient from "./AddClient/AddClient";
import PriceTable from "./DetailsTable copy/PriceTable";
import ClientData from "./ClientData/ClientData";
interface Props {
  handleClose: () => void;
}

interface InputCheck {
  numero: boolean;
  total: boolean;
}

export default function Form({ handleClose }: Props) {
  const { invoice, details, priceDetails, errors, customs }: HookSaleInvoice =
    useSaleInvoice();
  const [stockSelected, setStockSelected] = useState<string[]>([]);
  const [clientSelected, setCLientSelected] = useState<Client | null>(null);
  const [addStock, setAddStock] = useState<boolean>(false);
  const [addClient, setAddClient] = useState<boolean>(false);
  const [invoiceType, setInvoiceType] = useState<number>(1);
  const [generate, setGenerate] = useState(false);
  const [disabled, setDisabled] = useState<InputCheck>({
    numero: false,
    total: false,
  });
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

  function handleAddClient() {
    setAddClient(!addClient);
  }

  function handleDisabled(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.checked;

    setDisabled({ ...disabled, [name]: value });
  }

  function handleGenerate(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Generate:", event.target.checked);
    setGenerate(event.target.checked);
  }

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
      {addClient ? (
        <AddClient
          clientSelected={clientSelected}
          setClient={setCLientSelected}
          handleClose={handleAddClient}
        />
      ) : null}
      <form className={`toTop ${style.form}`} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nueva factura de venta</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.flex}>
          <div className={style.inputs}>
            {/* TIPO FACTURA */}
            <div className={style.invoiceType}>
              <button
                className={`btn btn-${invoiceType === 1 ? "" : "outline-"}success`}
                type="button"
                onClick={() => setInvoiceType(1)}
              >Particular</button>
              <button
                className={`btn btn-${invoiceType === 2 ? "" : "outline-"}success`}
                type="button"
                onClick={() => setInvoiceType(2)}
              >Empresa</button>
            </div>

            {/* NUMERO: */}
            <div className="form-floating">
              <input
                id={!errors.numero ? "floatingInputInvalid" : "numero"}
                className={`form-control ${!errors.numero ? "" : "is-invalid"}`}
                name="numero"
                type="text"
                placeholder="numero"
                value={invoice.numero}
                onChange={handleChange}
                disabled={!disabled.numero}
              />
              <input
                className={style.inputCheck}
                type="checkbox"
                name="numero"
                checked={disabled.numero}
                onChange={handleDisabled}
              />
              <label htmlFor="numero">Numero:</label>
              <small>{errors.numero}</small>
            </div>

            {/* FECHA */}
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

            {/* TIPO IMPOSITIVO: */}
            <div className="form-floating">
              <select
                id="tipoImpositivo"
                className="form-control"
                name="tipoImpositivo"
                placeholder="tipoImpositivo"
                value={invoice.tipoImpositivo}
                onChange={handleChangeSelect}
              >
                <option value={TipoImpositivoSale.Compuesto}>Compuesto</option>
                <option value={TipoImpositivoSale.IVA}>I.V.A.</option>
                <option value={TipoImpositivoSale.RE}>Recargo</option>
                <option value={TipoImpositivoSale.REBU}>REBU</option>
              </select>
              <label htmlFor="tipoImpositivo">Tipo Impositivo:</label>
            </div>

            {/* TOTAL: */}
            <div className="form-floating">
              <input
                id={!errors.total ? "floatingInputInvalid" : "total"}
                className={`form-control ${!errors.total ? "" : "is-invalid"}`}
                name="total"
                type="number"
                placeholder="total"
                value={invoice.total}
                onChange={handleChange}
                disabled={!disabled.total}
              />
              <input
                className={style.inputCheck}
                type="checkbox"
                name="total"
                checked={disabled.total}
                onChange={handleDisabled}
              />
              <label htmlFor="total">Total:</label>
              <small>{errors.total}</small>
            </div>

            {/* GENERAR FACTURA */}
            <div className={style.generated}>
              <input id="generated" name="generated" type="checkbox" checked={generate} onChange={handleGenerate} />
              <label htmlFor="generated">Generar factura</label>
            </div>

            {/* AGREGAR CLIENTE */}
            <div className={`${style.client} ${invoiceType === 2 ? "toBottom" : "hiddenUp"}`}>
              <ClientData
                client={clientSelected}
                error={""}
                handleFormSuppliers={handleAddClient}
              />
            </div>
          </div>
          <div className={style.tables}>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddStock}
            >
              Seleccionar producto
            </button>
            <DetailsTable
              details={details}
              tipoImpositivoSale={invoice.tipoImpositivo}
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
          </div>
        </div>
      </form>
    </div>
  );
}
