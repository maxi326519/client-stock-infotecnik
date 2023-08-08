import styles from "./SearchBar.module.css";

interface Props {
  search: string;
  handleChange: (search: string) => void;
}

export default function SearchBar({ search, handleChange }: Props) {

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }

  return (
    <div className={styles.searchBar}>
      {/* SEARCH BAR */}
      <div className="form-floating">
        <input
          id="search"
          type="text"
          value={search}
          className="form-control"
          onChange={handleSearch}
        />
        <label htmlFor="search">Buscar</label>
      </div>
    </div>
  );
}
