import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product, RootState, Stock } from "../../../../../../interfaces";

import style from "./AddProduct.module.css";

interface Props {
  stockSelected: string[];
  handleStockSelected: (selected: string[]) => void;
  handleClose: () => void;
  handleEmptyProduct: () => void;
}

export default function AddProduct({
  stockSelected,
  handleStockSelected,
  handleClose,
  handleEmptyProduct,
}: Props) {
  const stock: Stock[] = useSelector((state: RootState) => state.stock);
  const products: Product[] = useSelector((state: RootState) => state.products);
  const [rows, setRows] = useState<Stock[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(stockSelected);
  }, [stockSelected]);

  useEffect(() => {
    setRows(stock);
  }, [stock]);

  function handleSubmit(): void {
    handleStockSelected(selected);
    handleClose();
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setRows(
      stock.filter((s: Stock) => {
        if (value === "") return true;
        if (s.IMEISerie.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
  }

  function handleSelect(id: string): void {
    // Verificamos si ya existe el producto en la lista
    if (!selected.find((s) => s.toLowerCase() === id.toLowerCase())) {
      const newSelect = rows.find(
        (r) => id.toLowerCase() === r.id.toLowerCase()
      );

      // Verificamos si no pudo encontrar nada
      if (newSelect !== undefined) {
        setSelected([...selected, newSelect.id]);
      }
    } else {
      // Si existe lo eliminamos
      setSelected(selected.filter((s) => s !== id));
    }
  }

  return (
    <div className={style.container}>
      <div className={`toTop ${style.window}`}>
        <div className={style.close}>
          <h5>Seleccione los productos</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.searchData}>
          <div className={style.search}>
            <label htmlFor="search"></label>
            <input
              className="form-control"
              id="search"
              type="search"
              placeholder="Buscar en el stock"
              onChange={handleSearch}
            />
          </div>

          <div className={style.table}>
            <div className={style.firstRow}>
              <span>Fecha</span>
              <span>IMEI /  Serie</span>
              <span>Codigo de barras</span>
              <span>Cantidad</span>
              <span>Total</span>
            </div>
            <div className={style.data}>
              {rows?.map((s: Stock) => (
                <div
                  className={`${style.row} ${
                    selected.find((se) => se === s.id) ? style.selected : ""
                  }`}
                  onClick={() => handleSelect(s.id)}
                >
                  <span>{s.fechaAlta}</span>
                  <span>{s.IMEISerie}</span>
                  <span>{s.cantidad}</span>
                  <span>{s.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Agregar
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleEmptyProduct}
          >
            Vacio
          </button>
        </div>
      </div>
    </div>
  );
}
