import { useEffect, useState } from "react";
/* import { useDispatch } from "react-redux"; */
import {
  Product,
  RootState,
  SaleDetail,
  SaleInvoice,
  Stock,
} from "../../../../../interfaces";
import swal from "sweetalert";
/* import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading"; */

import details from "../../../../../assets/svg/details.svg";
import save from "../../../../../assets/svg/save.svg";
import cancel from "../../../../../assets/svg/cancel.svg";

import deleteSvg from "../../../../../assets/svg/delete.svg";

import style from "./SaleRow.module.css";
import { useSelector } from "react-redux";

interface Props {
  sale: SaleDetail;
}

export default function SaleRow({ sale }: Props) {
  /*   const dispatch = useDispatch(); */
  const stocks = useSelector((state: RootState) => state.stock);
  const products = useSelector((state: RootState) => state.products);
  const invoices = useSelector((state: RootState) => state.sales);
  const [isDisabled, setDisabled] = useState(true);
  const [localSale, setLocalSale] = useState<SaleDetail>(sale);
  const [invoice, setInvoice] = useState<SaleInvoice>();
  const [stock, setStock] = useState<Stock>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const newstock = stocks.find((stock) => stock.id === sale.StockId);
    const newproduct = products.find(
      (product) => product.id === sale.ProductId
    );
    const newinvoice = invoices.find(
      (invoice: SaleInvoice) => invoice.id === sale.SaleInvoiceId
    );

    if (newstock) setStock(newstock);
    if (newproduct) setProduct(newproduct);
    if (newinvoice) setInvoice(newinvoice);
  }, [sale, invoices, stocks, products]);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setLocalSale({ ...localSale, [name]: value });
  }

  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar al cliente?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      /*       if (res) {
        dispatch(loading());
        dispatch<any>(deleteClient(client.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el cliente con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el cliente",
              "error"
            );
          });
      } */
    });
  }

  return (
    <div className={style.row}>
      <input
        name="date"
        className="form-control"
        value={localSale.date?.toISOString().split("T")[0]}
        placeholder="date"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="numero"
        className="form-control"
        value={invoice?.numero}
        placeholder="numero"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="codigo"
        className="form-control"
        value={product?.codigo}
        placeholder="codigo"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="codigo"
        className="form-control"
        value={`${product?.marca}/${product?.modelo}/${product?.capacidad}`}
        placeholder="codigo"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="nombreCliente"
        className="form-control"
        value={""}
        placeholder="nombreCliente"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <input
        name="total"
        className="form-control"
        value={invoice?.total}
        placeholder="total"
        disabled={isDisabled}
        onChange={handleChange}
      />

      <button
        className="btn btn-primary"
        type="button"
        onClick={handleDisabled}
      >
        <img src={details} alt="details" />
      </button>

      {/*       {isDisabled ? (
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleDisabled}
        >
          <img src={edit} alt="edit" />
        </button>
      ) : (
        <div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleUpdate}
          >
            <img src={save} alt="edit" />
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleDisabled}
          >
            <img src={cancel} alt="edit" />
          </button>
        </div>
      )} */}
      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
