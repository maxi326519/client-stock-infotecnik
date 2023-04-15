import { useState } from "react";

import styles from "./NavBar.module.css";

import user from "../../../assets/svg/user.svg";
import profile from "../../../assets/svg/user.svg";
import config from "../../../assets/svg/menu/config.svg";
import logout from "../../../assets/svg/menu/logout.svg";

interface Props {
  handleCloseProfile: () => void;
  handleCloseConfiguration: () => void;
}

export default function NavBar({
  handleCloseProfile,
  handleCloseConfiguration,
}: Props) {
  const [menu, setMenu] = useState<boolean>(false);

  function handleMenuActive() {
    setMenu(!menu);
  }

  function handleProfile() {
    setMenu(!menu);
    handleCloseProfile();
  }

  function handleConfiguration() {
    setMenu(!menu);
    handleCloseConfiguration();
  }

  function handleLogOut() {}

  return (
    <div className={`toLeft ${styles.navBar}`}>
      <div className={styles.imgContainer} onClick={handleMenuActive}>
        <img src={user} alt="user" />
      </div>
      <div
        className={`${styles.backMenu} ${menu ? styles.backActive : null}`}
        onClick={handleMenuActive}
      >
        <ul className={styles.menu}>
          <li onClick={handleProfile}>
            <img src={profile} alt="profile" />
            Perfil
          </li>
          <li onClick={handleConfiguration}>
            <img src={config} alt="config" />
            Configuracion
          </li>
          <li onClick={handleLogOut}>
            <img src={logout} alt="logout" />
            Salir
          </li>
        </ul>
      </div>
    </div>
  );
}
