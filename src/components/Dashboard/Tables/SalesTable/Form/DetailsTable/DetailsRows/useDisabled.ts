import { useEffect, useState } from "react";
import { TipoImpositivoSale } from "../../../../../../../interfaces";

interface Disabled {
  iva: boolean;
  recargo: boolean;
}

export default function useDisabled(tipoImpositivoSale: TipoImpositivoSale) {
  const [disabled, setDisabled] = useState<Disabled>();

  useEffect(() => {
    if (tipoImpositivoSale === TipoImpositivoSale.IVA) {
      setDisabled({
        iva: false,
        recargo: true,
      });
    } else if (tipoImpositivoSale === TipoImpositivoSale.RE) {
      setDisabled({
        iva: false,
        recargo: false,
      });
    } else if (tipoImpositivoSale === TipoImpositivoSale.REBU) {
      setDisabled({
        iva: true,
        recargo: true,
      });
    }
  }, [tipoImpositivoSale]);

  return disabled;
}
