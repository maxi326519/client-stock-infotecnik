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
import { useApi } from "../../../../../hooks";

interface Props {
  sale: SaleInvoice;
}

export default function SaleRow({ sale }: Props) {
  /*   const dispatch = useDispatch(); */
  const api = useApi();
  const stocks = useSelector((state: RootState) => state.stock);
  const products = useSelector((state: RootState) => state.products);
  const invoices = useSelector((state: RootState) => state.sales);
  const [isDisabled, setDisabled] = useState(true);
  const [localSale, setLocalSale] = useState<SaleInvoice>(sale);
  const [invoice, setInvoice] = useState<SaleInvoice>();
  const [stock, setStock] = useState<Stock>();
  const [product, setProduct] = useState<Product>();

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
        value={localSale.fecha?.toISOString()?.split("T")[0]}
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

      <a
        href={`${api}/${sale.ticketUrl}`}
        className="btn btn-primary"
        target="_blank"
      >
        <img src={details} alt="details" />
      </a>

      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
