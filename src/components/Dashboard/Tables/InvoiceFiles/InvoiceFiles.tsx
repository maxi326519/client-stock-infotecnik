import { InvoiceFile } from "../../../../interfaces/invoices/InvoiceFile";
import { useDispatch } from "react-redux";
import { loading } from "../../../../redux/actions/loading/loading";

import styles from "./InvoiceFiles.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Table from "./Table/Table";
import NewFile from "./NewFile/NewFile";

interface Props {
  handleClose: () => void;
}

export function InvoiceFiles({ handleClose }: Props) {
  const dispatch = useDispatch();

  function handleGet() {
    dispatch(loading());
  }

  function handlePost() {
    dispatch(loading());
  }

  function handleView(url: string) {}

  function handleUpdate(data: InvoiceFile) {
    dispatch(loading());
  }

  function handleDelete(id: string) {
    dispatch(loading());
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.close}>
          <h4>Facturas PDF</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <SearchBar submit={handleGet} />
        <hr></hr>
        <NewFile submit={handlePost} />
        <hr></hr>
        <Table
          data={[]}
          view={handleView}
          update={handleUpdate}
          remove={handleDelete}
        />
      </div>
    </div>
  );
}
