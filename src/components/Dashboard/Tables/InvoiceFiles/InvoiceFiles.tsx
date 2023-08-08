import React, { useEffect, useState } from "react";
import { getFilesData, postFile, updateFile } from "../../../../redux/actions/invoiceFiles";
import { InvoiceFile } from "../../../../interfaces/invoices/InvoiceFile";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, loading } from "../../../../redux/actions/loading/loading";
import { bindTransactions } from "../../../../redux/actions/transactions";
import { RootState } from "../../../../interfaces";
import swal from "sweetalert";

import SearchBar from "./SearchBar/SearchBar";
import Table from "./Table/Table";
import NewFile from "./NewFile/NewFile";

import styles from "./InvoiceFiles.module.css";
import Filters from "./FIlters/Filters";

interface Props {
  handleClose: () => void;
  transactionId: string[];
}

interface Filters {
  unlinked: boolean,
  from: string;
  to: string;
}

const initFilters = (): Filters => ({
  unlinked: false,
  from: "01-08-2023",
  to: "30-08-2023",
});

export function InvoiceFiles({ handleClose, transactionId }: Props) {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions);
  const invoiceFiles = useSelector((state: RootState) => state.invoiceFiles);

  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(initFilters());
  const [selected, setSelected] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    handleGetData();
  }, []);

  function handleFilter(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handlePost(filaData: InvoiceFile, file: File) {
    dispatch(loading());
    dispatch<any>(postFile(filaData, file))
      .then(() => {
        dispatch(closeLoading());
        swal("Guardado", "Se guardó con exito", "success");
      })
      .catch((error: Error) => {
        dispatch(closeLoading());
        console.log(error.message);
        swal("Error", "No se pudo cargar el archivo, vuelva a intentar mas tarde", "error");
      })
  }

  function handleGetData() {
    dispatch(loading());
    dispatch<any>(getFilesData(filters.unlinked, filters.from, filters.to))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((error: Error) => {
        dispatch(closeLoading());
        console.log(error.message);
        swal("Error", "No se pudieron cargar los archivo, intente mas tarde", "error");
      })
  }

  function handleBindTransaction() {
    dispatch(loading());
    dispatch<any>(bindTransactions(transactionId, notes, selected))
      .then(() => {
        dispatch(closeLoading());
        swal("Actualizado", "Se vincularon todas las transacciones con éxito", "success");
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(closeLoading());
        swal("Error", "Erro al vincular las transacciones", "error");
      })
  }

  function handleUpdate(data: InvoiceFile) {
    dispatch(loading());
    dispatch<any>(updateFile(data))
      .then(() => {
        dispatch(closeLoading());
        swal("Actualizado", "Se actualizó los datos del archivo con éxito", "success");
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(closeLoading());
        swal("Error", "Erro al actualizar los datos del archivo", "error");
      })
  }

  function handleDelete(id: string) {
    dispatch(loading());
    dispatch(closeLoading());
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNotes(event.target.value);
  }

  function handleSelected(id: string) {
    selected === id ? setSelected("") : setSelected(id);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.close}>
          <h4>Facturas PDF</h4>
          <div className="btn-close" onClick={() => handleClose()} />
        </div>
        {transactionId &&
          <span className={styles.selected}>
            Movimiento: {transactionId.length === 1 ? transactions.find((data) => data.id === transactionId[0])?.movimiento : `${transactionId.length} seleccionados`}
          </span>
        }
        <div className={styles.controls}>
          <SearchBar
            search={search}
            handleChange={setSearch}
          />
          <Filters
            unlinked={filters.unlinked}
            fromDate={filters.from}
            toDate={filters.to}
            handleChange={handleFilter}
            handleSubmit={handleGetData}
          />
        </div>
        <Table
          data={invoiceFiles}
          selected={selected}
          update={handleUpdate}
          remove={handleDelete}
          handleSelected={handleSelected}
        />
        <NewFile submit={handlePost} />
        <div className={styles.bottomControls}>
          <div className="form-floating">
            <input
              id="notes"
              name="notes"
              className="form-control"
              value={notes}
              onChange={handleChange}
            />
            <label htmlFor="notes">Notas:</label>
          </div>
          <button className="btn btn-outline-success" type="button" onClick={handleBindTransaction}>Vincular</button>
        </div>
        <hr />
      </div>
    </div>
  );
}
