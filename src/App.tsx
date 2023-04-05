import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboad from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Loading from "./components/Loading/Loading";
import { RootState } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getAttributes, getProduct } from "./redux/actions/products";
import { getSuppliers } from "./redux/actions/suppliers";
import { getInvoice } from "./redux/actions/invoices";
import { getInventory } from "./redux/actions/inventory";
import { closeLoading } from "./redux/actions/loading/loading";
import swal from "sweetalert";
import { getTransactions } from "./redux/actions/transactions";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    redirect("/dashboard");
    Promise.all([
      dispatch<any>(getInvoice()),
      dispatch<any>(getProduct()),
      dispatch<any>(getAttributes()),
      dispatch<any>(getSuppliers()),
      dispatch<any>(getInventory()),
      dispatch<any>(getTransactions()),
    ])
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((err: any) => {
        swal(
          "Error",
          "Ocurrio un error al cargar los datos, intentelo mas tarde",
          "error"
        );
        dispatch(closeLoading());
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboad />} />
      </Routes>
    </div>
  );
}

export default App;
