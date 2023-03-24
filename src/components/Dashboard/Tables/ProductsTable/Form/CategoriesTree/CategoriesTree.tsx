import { useState } from "react";
import Chart from "react-google-charts";

import style from "./CategoriesTree.module.css";

type Node = {
  name: string;
  children?: Node[];
};

interface Category {
  id: string;
  name: string;
  parent: string | null;
}

type Props = {
  categories: Category[];
  onCategorySelect: (category: Category | null) => void;
  onCategoryAdd: (category: Category) => void;
  handleClose: () => void;
};

const CategoriesTree = ({
  categories,
  onCategorySelect,
  onCategoryAdd,
  handleClose,
}: Props) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newCategory = event.target.value;
    setNewCategory(newCategory);
  }

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const handleAdd = () => {
    const newCategory: Category = {
      id: String(categories.length + 1),
      name: "New Category",
      parent: null,
    };
    onCategoryAdd(newCategory);
  };

  // Construir el array de datos para la gráfica
  const chartData = categories.map((category) => [
    category.parent ? category.parent : "",
    category.name,
    category.id,
  ]);

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
            width={"100%"}
            height={"400px"}
            chartType="TreeMap"
            loader={<div>Loading Chart</div>}
            data={[["Category", "Parent", "Size"], ...chartData]}
            options={{
              highlightOnMouseOver: true,
              maxDepth: 1,
              maxPostDepth: 2,
              minHighlightColor: "#8c6bb1",
              midHighlightColor: "#9ebcda",
              maxHighlightColor: "#edf8fb",
              minColor: "#f7f7f7",
              midColor: "#d9d9d9",
              maxColor: "#636363",
              headerHeight: 15,
              fontColor: "black",
              showScale: true,
              useWeightedAverageForAggregation: true,
            }}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 1) {
                    const [selectedItem] = selection;
                    const category = categories.find(
                      (c) => c.id === chartData[selectedItem.row + 1][2]
                    );
                    if (category) handleSelect(category);
                  } else {
                    setSelectedCategory(null);
                    onCategorySelect(null);
                  }
                },
              },
            ]}
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
        {selectedCategory && (
          <div>
            <h3>{selectedCategory.name}</h3>
            <p>Selected category ID: {selectedCategory.id}</p>
            <p>Parent category ID: {selectedCategory.parent || "none"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTree;
