import { InvoiceFile } from "../../../../../interfaces/invoices/InvoiceFile";
import Row from "./Row/Row";

import styles from "./Table.module.css";

interface Props {
  data: InvoiceFile[];
  view: (url: string) => void;
  update: (data: InvoiceFile) => void;
  remove: (id: string) => void;
}

export default function Table({ data, view, update, remove }: Props) {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>Fecha</span>
        <span>Descripción</span>
        <span>View</span>
        <span>edit</span>
        <span>Delete</span>
      </div>
      <div className={styles.body}>
        {data.map((item: InvoiceFile) => (
          <Row item={item} view={view} update={update} remove={remove} />
        ))}
      </div>
      <div className={styles.footer}>Datos: {data.length}</div>
    </div>
  );
}
