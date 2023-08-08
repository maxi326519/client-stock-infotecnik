
import styles from "./ViewNotes.module.css";

interface Props {
  notes: string;
  handleClose: () => void;
}

export default function ViewNotes({ notes, handleClose }: Props) {

  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Notas</h4>
          <div
            className="btn-close"
            onClick={handleClose}
          />
        </div>
        <span>{notes}</span>
      </form>
    </div>
  );
}
