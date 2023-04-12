import { useState } from "react";

import styles from "./NavBar.module.css";

import user from "../../../assets/svg/user.svg";

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
    <div className={styles.navBar}>
      <div className={styles.imgContainer} onClick={handleMenuActive}>
        <img src={user} alt="user" />
      </div>
      <ul className={`${styles.menu} ${menu ? styles.menuActive : null}`}>
        <li onClick={handleProfile}>Perfil</li>
        <li onClick={handleConfiguration}>Configuracion</li>
        <li onClick={handleLogOut}>Salir</li>
      </ul>
    </div>
  );
}
