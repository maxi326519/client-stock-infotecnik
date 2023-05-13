import { useEffect, useState } from "react";
import {
  ErrorSaleInvoice,
  SaleDetail,
  SaleInvoice,
  initErrorSaleInvoice,
  initSaleInvoice,
  initSaleDetail,
  initPriceDetail,
  RootState,
  Stock,
  Product,
} from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { postSaleInvoice } from "../../redux/actions/sales";
import { MetodoDePago, PriceDetail, TipoImpositivoSale } from "../../interfaces/sales";
import generateId from "../../functions/generateId";

export default function useSaleInvoice() {
  const dispatch = useDispatch();
  const stock = useSelector((state: RootState) => state.stock);
  const products = useSelector((state: RootState) => state.products);
  const config = useSelector((state: RootState) => state.config.iva);
  const [invoice, setInvoice] = useState<SaleInvoice>(initSaleInvoice);
  const [details, setDetails] = useState<SaleDetail[]>([]);
  const [priceDetails, setPriceDetails] = useState<PriceDetail[]>([]);
  const [errors, setError] = useState<ErrorSaleInvoice>(initErrorSaleInvoice);

  useEffect(() => {
    let total: number = 0;
    details.forEach(
      (details) =>
        (total +=
          details.cantidad *
          (Number(details.baseImponible) +
            Number(details.ivaMonto) +
            Number(details.recargoMonto)))
    );

    setInvoice({
      ...invoice,
      total: total,
    });
  }, [details]);

  function reset() {
    setInvoice(initSaleInvoice);
    setDetails([]);
  }

  function addDetail(stockId?: string[]) {
    if (stockId) {
      stockId.forEach((id) => {
        const currentStock: Stock | undefined = stock.find(
          (item) => item.id === id
        );
        if (currentStock) {
          const product = products.find(
            (p: Product) => p.id === currentStock.ProductId
          );
          const newDetail = {
            ...initSaleDetail,
            id: generateId(details),
            concepto: `${product?.marca} - ${product?.modelo}`,
            baseImponible: currentStock.precioSinIVA,
            ivaPorcentaje: config.ivaGeneral,
            ivaMonto: currentStock.precioIVA,
            ProductId: currentStock.ProductId,
            StockId: currentStock.id,
          };
          setDetails([...details, newDetail]);
        }
      });
    } else {
      const newDetail = {
        ...initSaleDetail,
        id: generateId(details),
      };
      setDetails([...details, newDetail]);
    }
  }

  function setDetail(detailId: string, name: string, value: string | number) {
    setDetails(
      details.map((detail) => {
        if (detail.id === detailId) {
          switch (name) {
            case "tipoImpositivo":
              if(value === TipoImpositivoSale.IVA){
                return {
                  ...detail,
                  [name]: value as TipoImpositivoSale,
                  ivaPorcentaje: config.ivaGeneral,
                  ivaMonto: Number(detail.baseImponible) * (Number(config.ivaGeneral) / 100),
                  recargoPorcentaje: 0,
                  recargoMonto: 0,
                }
              }else if (value === TipoImpositivoSale.RE){
                return {
                  ...detail,
                  [name]: value as TipoImpositivoSale,
                  ivaPorcentaje: config.ivaGeneral,
                  ivaMonto: Number(detail.baseImponible) * (Number(config.ivaGeneral) / 100),
                  recargoPorcentaje: config.recargo,
                  recargoMonto: Number(detail.baseImponible) * (Number(config.recargo) / 100),
                }
              }else if (value === TipoImpositivoSale.REBU){
                return {
                  ...detail,
                  [name]: value as TipoImpositivoSale,
                  ivaPorcentaje: 0,
                  ivaMonto: 0,
                  recargoPorcentaje: 0,
                  recargoMonto: 0,
                }
              }else return detail;
            case "baseImponible":
              return {
                ...detail,
                baseImponible: Number(value),
                ivaMonto: Number(value) * (Number(detail.ivaPorcentaje) / 100),
                recargoMonto: Number(value) * (Number(detail.recargoPorcentaje) / 100),
              }
            case "ivaPorcentaje":
              return {
                ...detail,
                ivaPorcentaje: Number(value),
                ivaMonto: detail.baseImponible * (Number(value) / 100),
              };
            case "ivaMonto":
              return {
                ...detail,
                ivaPorcentaje: (Number(value) * 100) / detail.baseImponible,
                ivaMonto: Number(value),
              };
            case "recargoPorcentaje":
              return {
                ...detail,
                recargoPorcentaje: Number(value),
                recargoMonto: detail.baseImponible * (Number(value) / 100),
              };
            case "recargoMonto":
              return {
                ...detail,
                recargoPorcentaje: (Number(value) * 100) / detail.baseImponible,
                recargoMonto: Number(value),
              };
            default:
              return { ...detail, [name]: value };
          }
        }
        return detail;
      })
    );
  }

  function removeDetail(detailId: string) {
    setDetails(details.filter((detail) => detail.id !== detailId));
  }

  function addPriceDetail() {
    const newDetail = {
      ...initPriceDetail,
      id: generateId(priceDetails),
    };
    setPriceDetails([...priceDetails, newDetail]);
  }

  function setPriceDetail(
    priceDetailId: string,
    name: string,
    value: string | number
  ) {
    const newValues = priceDetails.map((priceDetail) => {
      if (priceDetail.id === priceDetailId) {
        if (name === "metodoDePago" && value === MetodoDePago.tarjeta) {
          return {
            ...priceDetail,
            [name]: value,
            nroOperacion: 0,
          };
        } else {
          const { nroOperacion, ...rest } = priceDetail;
          return { ...rest, [name]: value };
        }
      } else {
        return priceDetail;
      }
    });
    console.log(newValues);
    setPriceDetails(newValues);
  }

  function removePriceDetail(priceDetailId: string) {
    setPriceDetails(
      priceDetails.filter((priceDetail) => priceDetail.id !== priceDetailId)
    );
  }

  function postInvoice() {
    const newSaleInvoice = {
      ...invoice,
      SaleDetails: details,
    };
    return dispatch<any>(postSaleInvoice(newSaleInvoice));
  }

  function validations() {
    let newErrors = { ...errors };
    let validation: boolean = true;
    let total: number = 0;
    details.forEach(
      (detail: SaleDetail): number =>
        (total += detail.cantidad * detail.baseImponible)
    );

    if (invoice.numero === "") {
      newErrors.numero = "Debes agregar un numero";
      validation = false;
    }
    if (invoice.total !== total) {
      newErrors.total = "El total no coincide con los datos ingresados";
      validation = false;
    }
    if (invoice.cantidad === 0) {
      newErrors.cantidad = "Debes agregar una cantidad";
      validation = false;
    }
    setError(newErrors);
    return validation;
  }

  return {
    invoice,
    details,
    priceDetails,
    errors,
    customs: {
      setInvoice,
      reset,
      addDetail,
      setDetail,
      removeDetail,
      validations,
      postInvoice,
      addPriceDetail,
      removePriceDetail,
      setPriceDetail,
    },
  };
}
