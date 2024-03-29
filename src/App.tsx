import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RootState } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getAttributes, getProduct } from "./redux/actions/products";
import { getSuppliers } from "./redux/actions/suppliers";
import { getInvoice } from "./redux/actions/invoices";
import { getInventory } from "./redux/actions/inventory";
import { closeLoading, loading } from "./redux/actions/loading/loading";
import { getTransactions } from "./redux/actions/transactions";
import { getConfig } from "./redux/actions/configurations";
import { getClients } from "./redux/actions/clients";
import { getUsers } from "./redux/actions/user";
import { persistence } from "./redux/actions/login";
import { getDateRange } from "./functions/getDateRange";
import { getSales } from "./redux/actions/sales";
import { useApi } from "./hooks";
import swal from "sweetalert";
import axios from "axios";

import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Dashboad from "./components/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Animation.css";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state.loading);
  const api = useApi();

  useEffect(() => {
    axios.defaults.baseURL = api;

    const data = localStorage.getItem("user");
    let userData = null;

    if (data) userData = JSON.parse(data);

    if (userData && api) {
      const { from, to } = getDateRange();
      dispatch(loading());
      dispatch<any>(getInvoice);
      dispatch<any>(persistence(userData))
        .then(() => {
          Promise.all([
            dispatch<any>(getProduct()),
            dispatch<any>(getAttributes()),
            dispatch<any>(getSuppliers()),
            dispatch<any>(getClients()),
            dispatch<any>(getInventory()),
            dispatch<any>(getUsers()),
            dispatch<any>(getConfig()),
            dispatch<any>(getInvoice(from, to)),
            dispatch<any>(getSales(from, to)),
            dispatch<any>(getTransactions(from, to)),
          ])
            .then(() => {
              redirect("/dashboard");
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
        })
        .catch((err: any) => {
          console.log(err);
          redirect("/login");
        });
    } else {
      redirect("/login");
    }
  }, [dispatch, redirect, api]);

  return (
    <div className="App">
      {load ? <Loading /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboad />} />
      </Routes>
    </div>
  );
}

export default App;
