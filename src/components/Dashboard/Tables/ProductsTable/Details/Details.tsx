import { useEffect, useState } from "react";
import { Product, RootState } from "../../../../../interfaces";
import swal from "sweetalert";

import style from "./Details.module.css";
import ImageEditor from "./ImageEditor/ImageEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../../../../redux/actions/products";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function Details({ product, handleDetails }: Props) {
  const dispatch = useDispatch();
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const [localProduct, setLocalProduct] = useState<Product>(product);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [imageUrls, setImageUrls] = useState<string[]>(product?.imgGenerica);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log("Update", product);
    setLocalProduct(product);
    setImageUrls(product?.imgGenerica);
  }, [product]);

  function handleDisabled(): void {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const editProduct: Product = {
      ...localProduct,
      [event.target.name]: event.target.value,
    };
    setLocalProduct(editProduct);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const editProduct: Product = {
      ...localProduct,
      [event.target.name]: event.target.value,
    };
    setLocalProduct(editProduct);
  }

  function handleSave() {
    swal({
      text: "¿Quiere guardar los cambios?",
      buttons: {
        si: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(updateProduct(localProduct))
          .then(() => {
            handleDisabled();
            dispatch(closeLoading());
            swal("Actualizado", "Producto actualizado con exito", "success");
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Hubo un error al intentar actualizar el producto, intentelo mas tarde",
              "error"
            );
          });
      }
    });
  }

  function handleCancel() {
    swal({
      text: "¿Seguro que no desea guardar los cambios?",
      buttons: {
        si: true,
        cancel: true,
      },
    }).then(() => {
      handleDisabled();
      setLocalProduct(product);
    });
  }

  function handleRemove(): void {
    swal({
      title: "¡Atencion!",
      text: "¿Estas seguro que desea eliminar el producto? \n Recuerda que este cambio no se puede deshacer",
      icon: "warning",
      buttons: {
        eliminar: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch<any>(deleteProduct(product?.id))
          .then(() => {
            handleDetails();
            swal("Eliminado", "Se elimino el producto con exito", "success");
          })
          .catch(() => {
            swal(
              "Error",
              "Hubo un error al intentar eliminar el peducto, intentalo mas tarde",
              "Error"
            );
          });
      }
    });
  }

  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.btnClose}>
          <button className="btn btn-danger" onClick={handleDetails}>
            x
          </button>
        </div>

        <div className={style.data}>
          <div className={style.inputs}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="codigo"
                name="codigo"
                type="text"
                value={localProduct?.codigo}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="codigo">Codigo</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="modelo"
                name="modelo"
                type="text"
                value={localProduct?.modelo}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="modelo">Modelo</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="marca"
                name="marca"
                type="text"
                value={localProduct?.marca}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="marca">Marca</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="color"
                name="color"
                value={localProduct?.color}
                onChange={handleSelectChange}
                disabled={isDisabled}
              >
                <option value="0">Seleccionar color</option>
                {colores.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="capacidad"
                name="capacidad"
                value={localProduct?.capacidad}
                onChange={handleSelectChange}
                disabled={isDisabled}
              >
                <option value="0">Seleccionar capacidad</option>
                {capacidades.map((cap, i) => (
                  <option key={i} value={cap}>
                    {cap}
                  </option>
                ))}
              </select>
              <label htmlFor="capacidad">Capacidad</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="descLarga"
                name="descLarga"
                type="text"
                value={localProduct?.descLarga}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="descLarga">Descripcion larga</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="descCorta"
                name="descCorta"
                type="text"
                value={localProduct?.descCorta}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="descCorta">Descripcion corta</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="categoria"
                type="text"
                value={localProduct?.CategoryId}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="categoria">Familia</label>
            </div>
          </div>
          <div className={style.rightData}>
            <ImageEditor
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </div>
        </div>
        <div className={style.btnContainer}>
          {isDisabled ? (
            <div className={style.leftButtons}>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleDisabled}
              >
                Editar
              </button>
            </div>
          ) : (
            <div className={style.leftButtons}>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          )}
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleRemove}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
