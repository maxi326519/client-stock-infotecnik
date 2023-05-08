import { useDispatch, useSelector } from "react-redux";
import { Config, RootState } from "../../../interfaces";
import { useEffect, useState } from "react";
import { updateConfig } from "../../../redux/actions/configurations";
import { closeLoading, loading } from "../../../redux/actions/loading/loading";
import swal from "sweetalert";

import styles from "./Configuration.module.css";
import configSvg from "../../../assets/svg/menu/config.svg";
import { IVA } from "./IVA/IVA";
import { Business } from "./Business/Business";

interface Props {
  handleClose: () => void;
}

export default function Configuration({ handleClose }: Props) {
  const config: Config = useSelector((state: RootState) => state.config);
  const [selection, setSelection] = useState<number>(1);

  return (
    <div className={styles.background}>
      <div className={`toTop ${styles.container}`}>
        <div className={styles.close}>
          <img src={configSvg} alt="config" />
          <h5>Configuracion</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={styles.topMenu}>
          <span onClick={() => setSelection(1)}>Impuestos</span>
          <span onClick={() => setSelection(2)}>Empresa</span>
        </div>
        { selection === 1 ? <IVA config={config.iva} /> : null}
        { selection === 2 ? <Business config={config.business} /> : null }
      </div>
    </div>
  );
}
