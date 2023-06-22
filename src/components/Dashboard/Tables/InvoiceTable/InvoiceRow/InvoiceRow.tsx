import { Invoices } from "../../../../../interfaces";
import style from "./InvoiceRow.module.css";

import products from "../../../../../assets/svg/products.svg";
import supplier from "../../../../../assets/svg/supplier.svg";
import invoiceSvg from "../../../../../assets/svg/invoice.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  invoice: Invoices;
  handleStock: (stockId: string) => void;
  handleSupplier: (supplierId: string) => void;
  handleDelete: (invoiceId: string) => void;
}

export default function InvoiceRow({
  invoice,
  handleStock,
  handleSupplier,
  handleDelete,
}: Props) {

  

  return (
    <div className={style.row}>
      <span>{invoice.fecha}</span>
      <span>{invoice.numero}</span>
      <span>{invoice.tipoImpositivo}</span>
      <span>Total</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleStock(invoice.SupplierId)}
      >
        <img src={products} alt="products" />
      </button>
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={() => handleSupplier(invoice.SupplierId)}
      >
        <img src={supplier} alt="supplier" />
      </button>
      <a
        href={invoice.archivo}
        className="btn btn-outline-success"
        type="button"
      >
        <img src={invoiceSvg} alt="invoice" />
      </a>
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={() => handleDelete(invoice.id!)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
