import Users from "./UsersTable/UsersTable";
import Inventory from "./InventoryTable/InventoryTable";
import Products from "./ProductsTable/ProductsTable";
import Supplier from "./SupplierTable/SupplierTable";
import Clients from "./ClientsTable/ClientsTable";
import Invoice from "./InvoiceTable/InvoiceTable";
import Transactions from "./TransactionsTable/TransactionsTable";

import styles from "../Dashboard.module.css";

interface Props {
  table: number;
}

export default function Tables({ table }: Props) {
  return (
    <div className={styles.table}>
      {table === 1 ? (
        <Users />
      ) : table === 2 ? (
        <Inventory />
      ) : table === 3 ? (
        <Products />
      ) : table === 4 ? (
        <Supplier />
      ) : table === 5 ? (
        <Clients />
      ) : table === 6 ? (
        <Invoice />
      ) : (
        <Transactions />
      )}
    </div>
  );
}
