import { useState } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";

import style from "./CategoriesTree.module.css";
import add from "../../../../../../assets/svg/add.svg";
import remove from "../../../../../../assets/svg/delete.svg";
import root from "../../../../../../assets/svg/tree.svg";

const tree = [
  ["id", "childLabel", "parent", "size", { role: "style" }],
  [0, "categorias", -1, 1, "red"],
];

type Node = {
  name: string;
  children?: Node[];
};

type Props = {
  categories: any;
  handleClose: () => void;
};

const CategoriesTree = ({ categories, handleClose }: Props) => {
  const [selectedNode, setSelectedNode] = useState<string>("categorias");
  const [newCategory, setNewCategory] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(tree);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setNewCategory(value);
  }

  function handleSuibmit() {
    setEdit(false);
  }

  function handleCancel() {
    setData(tree);
    setEdit(false);
  }

  function handleAdd() {
    if (newCategory === "") return false;
    const newData = [...data];
    const selected = newCategory.toLocaleLowerCase();
    let exist = false;

    data.forEach((node: any) =>
      node.includes(selected) ? (exist = true) : null
    );

    if (!exist) {
      data.forEach((node: any) => {
        if (node.includes(selectedNode)) {
          newData.push([
            data.length - 1,
            selected,
            Number(node[0]),
            1,
            "black",
          ]);
        }
      });
      setData(newData);
    }
  }

  function handleRemove() {
    if (selectedNode === "categorias") return false;
    swal({
      text: `¿Seguro que desea eliminar la categoria "${selectedNode}"?`,
      icon: "warning",
      buttons: { confirm: true, cancel: true },
    }).then((res: any) => {
      if (res) {
        const remove = data.find((node: any) => node.includes(selectedNode));
        const filter = data.filter((node: any) => {
          if (node.includes(selectedNode)) {
            return false;
          }
          console.log(node[2], remove[0]);
          if (node[2] === remove[0]) {
            return false;
          }
          return true;
        });
        console.log(filter);
        setSelectedNode("categorias");
        setData(filter);
      }
    });
  }

  function handleSelect({ chartWrapper }: any) {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection) {
      setSelectedNode(selection.word);
      setColor(selection.word);
    }
  }

  function handleRoot() {
    setSelectedNode("categorias");
    setColor("categorias");
  }

  function setColor(word: string) {
    const color = data.map((node: any) => {
      // Si se encuentra cambiar de color
      if (node.includes(word)) {
        return node.map((col: any) => {
          if (col === "black") {
            return "red";
          }
          return col;
        });
      }
      // Si no verifica si tiene el color rojo y cambiarlo a black
      if (node.includes("red")) {
        return node.map((col: any) => {
          if (col === "red") {
            return "black";
          }
          return col;
        });
      }
      return node;
    });
    setData(color);
  }

  const options = {
    wordtree: {
      format: "explicit",
      type: "suffix",
    },
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.close}>
          <h4>Categorias</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.chartContainer}>
          <Chart
            chartType="WordTree"
            width="max-content"
            height="500px"
            data={data}
            options={options}
            chartEvents={[
              {
                eventName: "select",
                callback: handleSelect,
              },
            ]}
          />
        </div>
        {edit ? (
          <div className={style.edits}>
            <div className={style.inputs}>
              <button
                className="btn btn-success"
                type="button"
                disabled={selectedNode === "categorias"}
                onClick={handleRoot}
              >
                <img src={root} alt="root" />
              </button>
              <div className="form-floating">
                <input
                  id="category"
                  className="form-control"
                  type="text"
                  value={newCategory}
                  onChange={handleChange}
                />
                <label htmlFor="category" className="form-label">
                  Nueva categoria:
                </label>
              </div>
              <button
                className="btn btn-success"
                onClick={handleAdd}
                type="button"
              >
                <img src={add} alt="add" />
              </button>
              <button
                className="btn btn-danger"
                onClick={handleRemove}
                type="button"
                disabled={selectedNode === "categorias"}
              >
                <img src={remove} alt="remove" />
              </button>
            </div>
            <div className={style.buttons}>
              <button
                className="btn btn-success"
                type="button"
                disabled={selectedNode === "categorias"}
                onClick={handleSuibmit}
              >
                Guardar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className={style.buttons}>
            <button
              className="btn btn-primary"
              type="button"
              disabled={selectedNode === "categorias"}
            >
              Seleccionar
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setEdit(!edit)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTree;
