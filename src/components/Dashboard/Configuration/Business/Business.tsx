import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, loading } from "../../../../redux/actions/loading/loading";
import { updateConfig } from "../../../../redux/actions/configurations";
import swal from "sweetalert";

import styles from "./Business.module.css";
import img from "../../../../assets/svg/image.svg"

interface Props {
    config: any;
}

export function Business({ config }: Props){
    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    const [editConfig, setEditConfig] = useState<any>({
        name: "",
        adress: "",
        image: "",
    });

    useEffect(() => {
        console.log(config);
        setEditConfig(config);
    }, [config]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch(loading());
        dispatch<any>(updateConfig(editConfig))
            .then(() => {
                dispatch(closeLoading());
                setEdit(!edit);
                swal(
                    "Actualizado",
                    "Se actualizó correctamente la configuración",
                    "success"
                );
            })
            .catch((err: any) => {
                console.log(err);
                swal(
                    "Error",
                    "Ocurrió un error al actualizar la configuración, inténtelo más tarde",
                    "error"
                );
            });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditConfig({ ...editConfig, [event.target.name]: event.target.value });
    }

    function handleEdit() {
        setEdit(!edit);
    }

    function handleCancel() {
        setEditConfig(config);
        setEdit(!edit);
    }

    return (
        <form className={styles.config} onSubmit={handleSubmit}>
            <div>
                <div>
                    <img src={editConfig.image || img } alt="logo" />
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="ivaSuperReducido"
                        name="ivaSuperReducido"
                        value={editConfig.name}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        disabled={!edit}
                    />
                    <label htmlFor="ivaSuperReducido">Nombre:</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        id="ivaReducido"
                        name="ivaReducido"
                        value={editConfig.adress}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        disabled={!edit}
                    />
                    <label htmlFor="ivaReducido">Dirección:</label>
                </div>
            </div>

            {edit ? (
                <div className={styles.bntContainer}>
                    <button className="btn btn-success" type="submit">
                        Guardar
                    </button>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                </div>
            ) : (
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleEdit}
                >
                    Editar
                </button>
            )}
        </form>
    )
}