import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMarcas, postProduct } from "../../../../../redux/actions/products";
import {
  BarCode,
  Product,
  RootState,
  initProduct,
} from "../../../../../interfaces";
import swal from "sweetalert";
import {
  postCapacidades,
  postColores,
} from "../../../../../redux/actions/products";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import AddImages from "./AddImages/AddImages";
import CategoriesTree from "../CategoriesTree/CategoriesTree";
import Capacidades from "../Capacidades/Capacidades";
import Colores from "../Colores/Colores";

import style from "./Form.module.css";
import axios from "axios";
import Marcas from "../Marcas/Marcas";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const marcas = useSelector((state: RootState) => state.attributes.marcas);
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const [capacidadesForm, setCapacidadesForm] = useState(false);
  const [coloresForm, setColoresForm] = useState(false);
  const [marcasForm, setMarcasForm] = useState(false);
  const [product, setProduct] = useState(initProduct);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categoriesForm, setCategoriesForm] = useState<boolean>(false);
  const [error, setError] = useState({
    codigo: "",
    codigoDeBarras: "",
    modelo: "",
    marca: "",
    color: "",
    capacidad: "",
    descCorta: "",
    descLarga: "",
    categoria: "",
  });
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (handleValidations()) {
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
          imagesUrl.push(response.data.path);
        } catch (error) {
          console.error(error);
        }
      }

      const newProduct = {
        ...product,
        Images: imagesUrl,
      };

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
  }

  function handleValidations() {
    let newErrors = { ...error };
    let validation: boolean = true;

    if (product.codigo === "") {
      newErrors.codigo = "Debes agregar un codigo";
      validation = false;
    }
    if (product.tipoCodigoDeBarras !== "" && product.codigoDeBarras === "") {
      newErrors.codigoDeBarras = "Debes agregar un codigo";
      validation = false;
    }
    if (product.modelo === "") {
      newErrors.modelo = "Debes agregar un modelo";
      validation = false;
    }
    if (product.marca === "") {
      newErrors.marca = "Debes agregar una marca";
      validation = false;
    }
    if (product.color === "0") {
      newErrors.color = "Debes agregar un color";
      validation = false;
    }
    if (product.capacidad === "0") {
      newErrors.capacidad = "Debes agregar una capacidad";
      validation = false;
    }
    if (product.CategoryId === "") {
      newErrors.categoria = "Debes agregar una categoria";
      validation = false;
    }
    setError(newErrors);
    return validation;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.target.name);
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleChangeSelect(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleChangeTextArea(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleSelectedCategories(selected: string) {
    setProduct({ ...product, CategoryId: selected });
    setError({ ...error, categoria: "" });
  }

  function handleClose(): void {
    handleForm();
    setProduct(initProduct);
  }

  function handleCloseCategories(): void {
    setCategoriesForm(!categoriesForm);
  }

  function handleSubmitCapacidades(data: string[]) {
    dispatch<any>(postCapacidades(data));
  }

  function handleSubmitColores(data: string[]) {
    dispatch<any>(postColores(data));
  }

  function handleSubmitMarcas(data: string[]) {
    dispatch<any>(postMarcas(data));
  }

  function handleCapacidadesForm() {
    setCapacidadesForm(!capacidadesForm);
  }

  function handleColoresForm() {
    setColoresForm(!coloresForm);
  }

  function handleMarcasForm() {
    setMarcasForm(!marcasForm);
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
      {capacidadesForm ? (
        <Capacidades
          data={capacidades}
          handleClose={handleCapacidadesForm}
          handleSubmit={handleSubmitCapacidades}
        />
      ) : null}
      {coloresForm ? (
        <Colores
          data={colores}
          handleClose={handleColoresForm}
          handleSubmit={handleSubmitColores}
        />
      ) : null}
      {marcasForm ? (
        <Marcas
          data={marcas}
          handleClose={handleMarcasForm}
          handleSubmit={handleSubmitMarcas}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo producto</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.flex}>
          <div className={style.inputs}>
            {/* CODIGO */}
            <div className="form-floating">
              <input
                id={!error.codigo ? "floatingInputInvalid" : "codigo"}
                className={`form-control ${!error.codigo ? "" : "is-invalid"}`}
                name="codigo"
                type="text"
                placeholder="codigo"
                value={product.codigo}
                onChange={handleChange}
              />
              <label htmlFor="codigo">Codigo</label>
              <small>{error.codigo}</small>
            </div>

            {/* MARCA */}
            <div className="form-floating mb-3">
              <select
                id={error.marca ? "floatingInputInvalid" : "marca"}
                className={`form-select ${!error.marca ? "" : "is-invalid"}`}
                name="marca"
                value={product.marca}
                placeholder="marca"
                onChange={handleChangeSelect}
              >
                <option value="0">Seleccionar marca</option>
                {marcas.map((marca, i) => (
                  <option key={i} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
              <label htmlFor="marca">Marca</label>
              <small>{error.marca}</small>
            </div>

            {/* MODELO */}
            <div className="form-floating">
              <input
                id={!error.modelo ? "floatingInputInvalid" : "modelo"}
                className={`form-control ${!error.modelo ? "" : "is-invalid"}`}
                name="modelo"
                type="text"
                placeholder="modelo"
                value={product.modelo}
                onChange={handleChange}
              />
              <label htmlFor="modelo">Modelo</label>
              <small>{error.modelo}</small>
            </div>

            {/* COLOR */}
            <div className="form-floating mb-3">
              <select
                id={error.color ? "floatingInputInvalid" : "color"}
                className={`form-select ${!error.color ? "" : "is-invalid"}`}
                name="color"
                value={product.color}
                placeholder="color"
                onChange={handleChangeSelect}
              >
                <option value="0">Seleccionar color</option>
                {colores.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <label htmlFor="color">Color</label>
              <small>{error.color}</small>
            </div>

            {/*   CODIGO DE BARRAS */}
            <div className="form-floating">
              <input
                className={`form-control ${!error?.codigoDeBarras ? "" : "is-invalid"
                  }`}
                id={error?.codigoDeBarras ? "floatingInputInvalid" : "pass"}
                name="codigoDeBarras"
                value={product.codigoDeBarras}
                onChange={handleChange}
                disabled={product.tipoCodigoDeBarras === ""}
              />
              <label htmlFor="codigoDeBarras">Codigo de barra</label>
              <small>{error?.codigoDeBarras}</small>
            </div>

            {/* TIPO CODIGO DE BARRAS */}
            <div className="form-floating ">
              <select
                className="form-select"
                id="tipoCodigoDeBarras"
                name="tipoCodigoDeBarras"
                value={product.tipoCodigoDeBarras}
                onChange={handleChangeSelect}
              >
                <option value="">Ninguno</option>
                <option value={BarCode.Code128}>Code 128</option>
                <option value={BarCode.Code39}>Code 39</option>
                <option value={BarCode.UPCA}>UPC-A</option>
                <option value={BarCode.UPCE}>UPC-E</option>
                <option value={BarCode.EAN8}>EAN-8</option>
                <option value={BarCode.EAN13}>EAN-13</option>
              </select>
              <label htmlFor="tipoCodigoDeBarras">Seleccionar tipo</label>
            </div>

            {/* DESRIPCION CORTA */}
            <div className="form-floating">
              <input
                id={error.descCorta ? "floatingInputInvalid" : "descCorta"}
                className={`form-control ${!error.descCorta ? "" : "is-invalid"
                  }`}
                name="descCorta"
                placeholder="descCorta"
                type="text"
                value={product.descCorta}
                onChange={handleChange}
              />
              <label htmlFor="descCorta">Desc Corta</label>
              <small>{error.descCorta}</small>
            </div>

            {/* CAPACIDAD*/}
            <div className="form-floating mb-3">
              <select
                id={error.capacidad ? "floatingInputInvalid" : "capacidad"}
                className={`form-select ${!error.capacidad ? "" : "is-invalid"
                  }`}
                name="capacidad"
                value={product.capacidad}
                placeholder="capacidad"
                onChange={handleChangeSelect}
              >
                <option value="0">Seleccionar capacidad</option>
                {capacidades.map((cap, i) => (
                  <option key={i} value={cap}>
                    {cap}
                  </option>
                ))}
              </select>
              <label
                htmlFor={error.capacidad ? "floatingInputInvalid" : "capacidad"}
              >
                Capacidad
              </label>
              <small>{error.capacidad}</small>
            </div>

            {/* DESRIPCION LARGA */}
            <div className="form-floating">
              <textarea
                id={error.descLarga ? "floatingInputInvalid" : "descLarga"}
                className={`form-control ${!error.descLarga ? "" : "is-invalid"
                  }`}
                name="descLarga"
                placeholder="descLarga"
                value={product.descLarga}
                onChange={handleChangeTextArea}
              />
              <label htmlFor="descLarga">Desc Larga</label>
              <small>{error.descLarga}</small>
            </div>

            {/* CATEGORIAS */}
            <div
              className={`${style.categoria} ${!error.categoria ? "" : style.categoriaError
                }`}
            >
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleCloseCategories}
              >
                Agregar
              </button>
              <label htmlFor="categoria">
                {categories.find((cat) => cat[0] === product.CategoryId)?.[1]}
              </label>
              <small>{error.categoria}</small>
            </div>
          </div>

          {/* ADD IMAGES */}
          <AddImages
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        </div>

        {/* BUTTONS */}
        <div className={style.buttons}>
          <button className="btn btn-success" type="submit">
            Crear producto
          </button>
          <div className={style.buttonsForm}>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleCapacidadesForm}
            >
              Capacidades
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleColoresForm}
            >
              Colores
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleMarcasForm}
            >
              Marcas
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
