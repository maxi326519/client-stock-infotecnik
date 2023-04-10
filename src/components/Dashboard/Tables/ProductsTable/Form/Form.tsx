import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../../../../redux/actions/products";
import { Product, RootState } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import AddImages from "./AddImages/AddImages";
import CategoriesTree from "../CategoriesTree/CategoriesTree";

import style from "./Form.module.css";
import axios from "axios";

interface Props {
  capacidades: string[];
  colores: string[];
  handleForm: () => void;
  handleCapacidadesForm: () => void;
  handleColoresForm: () => void;
}

export default function Form({
  capacidades,
  colores,
  handleForm,
  handleCapacidadesForm,
  handleColoresForm,
}: Props) {
  const initialState: Product = {
    id: "",
    codigo: "",
    modelo: "",
    marca: "",
    color: "",
    capacidad: "",
    descLarga: "",
    descCorta: "",
    CategoryId: "",
    Images: [],
  };
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const [product, setProduct] = useState(initialState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categoriesForm, setCategoriesForm] = useState<boolean>(false);

  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let imagesUrl: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", imageFiles[i]);

      try {
        const response = await axios.post("/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data.path);
        imagesUrl.push(response.data.path);
      } catch (error) {
        console.error(error);
      }
    }

    const newProduct = {
      ...product,
      Images: imagesUrl,
    };

    console.log(newProduct);

    dispatch(loading());
    dispatch<any>(postProduct(newProduct))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal("Guardado", "Su producto se guardo correctamente", "success");
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
        swal("Error", "Hubo un error al guardar el nuevo producto", "error");
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleChangeSelect(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleChangeTextArea(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleSelectedCategories(selected: string) {
    setProduct({ ...product, CategoryId: selected });
  }

  function handleClose(): void {
    handleForm();
    setProduct(initialState);
  }

  function handleCloseCategories(): void {
    setCategoriesForm(!categoriesForm);
  }

  return (
    <div className={style.container}>
      {categoriesForm ? (
        <CategoriesTree
          categories={categories}
          handleSelected={handleSelectedCategories}
          handleClose={handleCloseCategories}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar productos</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.flex}>
          <div className={style.inputs}>
            <div className="mb-3 form-floating">
              <input
                id="codigo"
                name="codigo"
                className="form-control"
                type="text"
                value={product.codigo}
                onChange={handleChange}
              />
              <label htmlFor="codigo">Codigo</label>
            </div>

            <div className="mb-3 form-floating">
              <input
                id="modelo"
                name="modelo"
                className="form-control"
                type="text"
                value={product.modelo}
                onChange={handleChange}
              />
              <label htmlFor="modelo">Modelo</label>
            </div>

            <div className="mb-3 form-floating">
              <input
                id="marca"
                name="marca"
                className="form-control"
                type="text"
                value={product.marca}
                onChange={handleChange}
              />
              <label htmlFor="marca">Marca</label>
            </div>

            <div className="mb-3 form-floating">
              <select
                id="color"
                name="color"
                className="form-select"
                value={product.color}
                onChange={handleChangeSelect}
              >
                <option value="0">Seleccionar color</option>
                {colores.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <label htmlFor="color">Colores</label>
            </div>

            <div className="mb-3 form-floating">
              <select
                id="capacidad"
                name="capacidad"
                className="form-select"
                value={product.capacidad}
                onChange={handleChangeSelect}
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

            <div className="mb-3 form-floating">
              <textarea
                id="descLarga"
                name="descLarga"
                className={`form-control ${style.textArea}`}
                value={product.descLarga}
                onChange={handleChangeTextArea}
              />
              <label htmlFor="descLarga">Desc Larga</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                id="descCorta"
                name="descCorta"
                className="form-control"
                type="text"
                value={product.descCorta}
                onChange={handleChange}
              />
              <label htmlFor="descCorta">Desc Corta</label>
            </div>
            <div className={style.categoria}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleCloseCategories}
              >
                Agregar
              </button>
              <label htmlFor="categoria">{product.CategoryId}</label>
            </div>
          </div>
          <AddImages
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        </div>
        <div className={style.buttons}>
          <button className="btn btn-success" type="submit">
            Agregar
          </button>
          <div className={style.buttonsForm}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCapacidadesForm}
            >
              Capacidades
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleColoresForm}
            >
              Colores
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
