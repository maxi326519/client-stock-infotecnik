import { InvoiceFile } from "../../../../../interfaces/invoices/InvoiceFile";
import Row from "./Row/Row";

import styles from "./Table.module.css";

interface Props {
  data: InvoiceFile[];
  selected: string;
  update: (data: InvoiceFile) => void;
  remove: (id: string) => void;
  handleSelected: (id: string) => void;
}

export default function Table({ data, selected, update, remove, handleSelected }: Props) {
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
        {data?.map((item: InvoiceFile) => (
          <Row item={item} selected={selected} update={update} remove={remove} handleSelected={handleSelected} />
        ))}
      </div>
      <div className={styles.footer}>Datos: {data.length}</div>
    </div>
  );
}
