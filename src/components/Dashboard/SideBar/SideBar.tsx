import users from "../../../assets/svg/users.svg";
import inventory from "../../../assets/svg/inventory.svg";
import products from "../../../assets/svg/products.svg";
import supplier from "../../../assets/svg/supplier.svg";
import clients from "../../../assets/svg/clients.svg";
import invoices from "../../../assets/svg/invoices.svg";
import bank from "../../../assets/svg/bank.svg";

import styles from "./SideBar.module.css";

interface Props {
  table: number;
  changeTable: (number: number) => void;
}

export default function SideBar({ table, changeTable }: Props) {
  return (
    <div className={styles.sideBar}>
      <div className={styles.user}>
        <div className={styles.containerImg}>
          <img src={users} alt="user" />
        </div>
      </div>
      <button
        className={table === 1 ? styles.selected : "1"}
        type="button"
        onClick={() => changeTable(1)}
      >
        <img src={users} alt="users" />
        Usuarios
      </button>
      <button
        className={table === 2 ? styles.selected : "2"}
        type="button"
        onClick={() => changeTable(2)}
      >
        <img src={inventory} alt="inventory" />
        Inventario
      </button>
      <button
        className={table === 3 ? styles.selected : "3"}
        type="button"
        onClick={() => changeTable(3)}
      >
        <img src={products} alt="products" />
        Productos
      </button>
      <button
        className={table === 4 ? styles.selected : "4"}
        type="button"
        onClick={() => changeTable(4)}
      >
        <img src={supplier} alt="supplier" />
        Proveedores
      </button>
      <button
        className={table === 5 ? styles.selected : "5"}
        type="button"
        onClick={() => changeTable(5)}
      >
        <img src={clients} alt="clients" />
        Clientes
      </button>
      <button
        className={table === 6 ? styles.selected : "6"}
        type="button"
        onClick={() => changeTable(6)}
      >
        <img src={invoices} alt="invoices" />
        Facturas
      </button>
      <button
        className={table === 7 ? styles.selected : "7"}
        type="button"
        onClick={() => changeTable(7)}
      >
        <img src={bank} alt="movimientos" />
        Movimientos
      </button>
    </div>
  );
}
