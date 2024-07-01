import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import calificacionesService from "../../services/calificaciones.service";
import modalDialogService from "../../services/modalDialog.service";

export default function Calificaciones() {
    const [ AccionABMC, setAccionABMC ] = useState("L");

    const [ Nombre, setNombre ] = useState("");

    const [ Calificaciones, setCalificaciones ] = useState([]);

    const [ Calificacion, setCalificacion ] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Añadir reset para restablecer el formulario
    } = useForm({ defaultValues: Calificacion || { nombre: "" } });
    
    useEffect(() => {
        reset(Calificacion || { nombre: "" }); // Restablecer el formulario cuando Etiqueta cambie
    }, [Calificacion, reset]);
    

    // Cargar listas necesarias
    useEffect(() => {
        Buscar();
    }, []);

    async function Buscar (_nombre) {
        if (_nombre !== undefined)
            setNombre(_nombre);
        else
            _nombre = Nombre;

        const data = await calificacionesService.Buscar(_nombre);
        setCalificaciones(data);
    }

    async function BuscarPorId(calificacion, accionABMC) {
        const data = await calificacionesService.BuscarPorId(calificacion.id);
        setCalificacion(data);
        setAccionABMC(accionABMC);
    }

    function Modificar (calificacion) {
        BuscarPorId(calificacion, "M");
    }

    function Agregar () {
        const etiqueta = {
            id: 0,
            nombre: ""
        };
        setCalificacion(etiqueta);
        setAccionABMC("A");
    }

    async function Eliminar (calificacion) {
        modalDialogService.Confirm(
            "¿Está seguro que desea eliminar la calificación?",
            "Eliminar Calificación",
            undefined,
            undefined,
            async () => {
                await calificacionesService.Eliminar(calificacion.id);
                await Buscar();
                modalDialogService.Alert("La Calificación fue eliminada correctamente.", "Eliminar Calificación", undefined, undefined, undefined, undefined, "success");
            }
        );
    }

    async function Grabar (calificacion) {
        try {
            await calificacionesService.Grabar(calificacion);
        } catch (error) {
            modalDialogService.Alert(
                error?.response?.data?.message ?? error.toString(), 
                "Error al grabar la calificación",
                undefined,
                undefined,
                undefined,
                undefined,
                "danger"
            );
            return;
        }
    
        await Buscar();
        setCalificacion(null); // Restablecer el estado de Calificación
        Volver();
    
        modalDialogService.Alert("La Calificación fue grabada correctamente.", "Grabar Calificación", undefined, undefined, undefined, undefined, "success");
    }    

    function Volver () {
        setCalificacion(null); // Restablecer el estado de Calificación
        setAccionABMC("L");
    }    


    return (
        <div>
            <div className="tituloPagina mx-5 d-flex align-items-center justify-content-between">
                Calificaciones

                {AccionABMC === "L" && (
                    <>
                        <div className="form-group col-md-3 col-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filtrar por nombre..."
                                value={Nombre}
                                onChange={(e) => Buscar(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-outline-success" onClick={() => Agregar()}>
                            <i className="fa fa-plus"></i> Agregar Calificación
                        </button>
                    </>
                )}
            </div>

            {AccionABMC === "L" && Calificaciones?.length > 0 && (
                <table className="table table-hover table-sm mx-auto" style={{ maxWidth: '105rem' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Calificaciones.map((calificacion) => (
                            <tr key={calificacion.id}>
                                <td>{calificacion.id}</td>
                                <td>{calificacion.nombre}</td>
                                <td>
                                    <button className="btn btn-outline-warning mx-1" onClick={() => Modificar(calificacion)}>
                                        <i className="fa fa-palette"></i>
                                    </button>
                                    <button className="btn btn-outline-danger mx-1" onClick={() => Eliminar(calificacion)}>
                                        <i className="fa fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {AccionABMC === "L" && Calificaciones?.length === 0 && (
                <div className="text-center mt-5 alert">
                    <h4>
                        <i className="fa fa-tags text-note"></i>
                        {" No se encontraron Calificaciones "}
                        <i className="fa fa-tags text-note-sticky"></i>
                    </h4>
                </div>
            )}

            {AccionABMC !== "L" && (
                <form onSubmit={handleSubmit(Grabar)} noValidate className="mx-auto" style={{ maxWidth: '105rem' }} autoComplete="off">
                    <div className="row my-1">
                        <div className="col-md-7 col-9">
                            <div className="input-group">
                                <span className="input-group-text" id="nombreInput">Nombre</span>
                                <input
                                    type="text"
                                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                                    {...register("nombre", { required: true, maxLength: 50 })}
                                    aria-describedby="nombreInput"
                                />
                                {errors.nombre && <div className="invalid-feedback">El campo es requerido y debe tener menos de 50 caracteres.</div>}
                            </div>
                        </div>
                    </div> <hr />

                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" className="btn btn-outline-danger" onClick={Volver}>
                            <i className="fa fa-times"></i> Cancelar
                        </button>
                        <button type="submit" className="btn btn-outline-success">
                            <i className="fa fa-save"></i> Grabar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}