import React, { useEffect, useState } from "react";
import Chart, {
  ReactGoogleChartEvent,
  ReactGoogleChartProps,
} from "react-google-charts";

import style from "./CategoriesTree.module.css";

type Node = {
  name: string;
  children?: Node[];
};

type Props = {
  categories: any;
  handleClose: () => void;
};

const CategoriesTree = ({ categories, handleClose }: Props) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [edit, setEdit] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setNewCategory(value);
  }

  function handleAdd() {}

  function handleSelect(event: ReactGoogleChartProps) {}

  const data = [
    ["Phrases"],
    ["cats are better than dogs"],
    ["cats eat kibble"],
    ["cats are better than hamsters"],
    ["cats are awesome"],
    ["cats are people too"],
    ["cats eat mice"],
    ["cats meowing"],
    ["cats in the cradle"],
    ["cats eat mice"],
    ["cats in the cradle lyrics"],
    ["cats eat kibble"],
    ["cats for adoption"],
    ["cats are family"],
    ["cats eat mice"],
    ["cats are better than kittens"],
    ["cats are evil"],
    ["cats are weird"],
    ["cats eat mice"],
  ];

  const options = {
    wordtree: {
      format: "implicit",
      word: "cats",
    },
  };

  const chartEvents = [
    {
      callback: (props: any) => {
        const chartWrapper = props.chartWrapper;
        const google = props.google;
        const chart = chartWrapper.getChart();
        chart.container.addEventListener("click", (ev: any) => console.log(ev));
      },
      eventName: "ready",
    },
  ];

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
            width="100%"
            height="400px"
            data={data}
            options={options}
            chartEvents={chartEvents}
          />
        </div>
        {edit ? (
          <div className={style.inputs}>
            <div className="form-floating">
              <input
                id="category"
                className="form-control"
                type="text"
                value={newCategory}
                onChange={handleChange}
              />
              <label htmlFor="category" className="form-label">
                New category:
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleAdd}
              type="button"
            >
              Add
            </button>
          </div>
        ) : null}
        <div className={style.buttons}>
          <button className="btn btn-primary" type="button">
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
      </div>
    </div>
  );
};

export default CategoriesTree;
