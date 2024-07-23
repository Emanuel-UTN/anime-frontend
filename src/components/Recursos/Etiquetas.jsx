import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import etiquetasService from "../../services/etiquetas.service";
import modalDialogService from "../../services/modalDialog.service";

export default function Etiquetas() {
    const [ AccionABMC, setAccionABMC ] = useState("L");

    const [ Nombre, setNombre ] = useState("");

    const [ Etiquetas, setEtiquetas ] = useState([]);

    const [ Etiqueta, setEtiqueta ] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Añadir reset para restablecer el formulario
    } = useForm({ defaultValues: Etiqueta || { nombre: "" } });
    
    useEffect(() => {
        reset(Etiqueta || { nombre: "" }); // Restablecer el formulario cuando Etiqueta cambie
    }, [Etiqueta, reset]);
    

    // Cargar listas necesarias
    useEffect(() => {
        Buscar();
    }, []);

    async function Buscar (_nombre) {
        if (_nombre !== undefined)
            setNombre(_nombre);
        else
            _nombre = Nombre;

        const data = await etiquetasService.Buscar(_nombre);
        setEtiquetas(data);
    }

    async function BuscarPorId(etiqueta, accionABMC) {
        const data = await etiquetasService.BuscarPorId(etiqueta.id);
        setEtiqueta(data);
        setAccionABMC(accionABMC);
    }

    function Modificar (etiqueta) {
        BuscarPorId(etiqueta, "M");
    }

    function Agregar () {
        const etiqueta = {
            id: 0,
            nombre: ""
        };
        setEtiqueta(etiqueta);
        setAccionABMC("A");
    }

    async function Eliminar (etiqueta) {
        modalDialogService.Confirm(
            "¿Está seguro que desea eliminar la etiqueta?",
            "Eliminar Etiqueta",
            undefined,
            undefined,
            async () => {
                await etiquetasService.Eliminar(etiqueta.id);
                if(Etiquetas.length === 1)
                    setEtiquetas([]);
                else
                    await Buscar();
                modalDialogService.Alert("La Etiqueta fue eliminada correctamente.", "Eliminar Etiqueta", undefined, undefined, undefined, undefined, "success");
            }
        );
    }

    async function Grabar (etiqueta) {
        try {
            await etiquetasService.Grabar(etiqueta);
        } catch (error) {
            modalDialogService.Alert(
                error?.response?.data?.message ?? error.toString(), 
                "Error al grabar la etiqueta",
                undefined,
                undefined,
                undefined,
                undefined,
                "danger"
            );
            return;
        }
    
        await Buscar();
        setEtiqueta(null); // Restablecer el estado de Etiqueta
        Volver();
    
        modalDialogService.Alert("La Etiqueta fue grabada correctamente.", "Grabar Etiqueta", undefined, undefined, undefined, undefined, "success");
    }    

    function Volver () {
        setEtiqueta(null); // Restablecer el estado de Etiqueta
        setAccionABMC("L");
    }    


    return (
        <div>
            <div className="tituloPagina mx-5 d-flex align-items-center justify-content-between">
                Etiquetas

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
                            <i className="fa fa-plus"></i> Agregar Etiqueta
                        </button>
                    </>
                )}
            </div>

            {AccionABMC === "L" && Etiquetas?.length > 0 && (
                <table className="table table-hover table-sm mx-auto" style={{ maxWidth: '105rem' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Etiquetas.map((etiqueta) => (
                            <tr key={etiqueta.id}>
                                <td>{etiqueta.id}</td>
                                <td>{etiqueta.nombre}</td>
                                <td>
                                    <button className="btn btn-outline-warning mx-1" onClick={() => Modificar(etiqueta)}>
                                        <i className="fa fa-palette"></i>
                                    </button>
                                    <button className="btn btn-outline-danger mx-1" onClick={() => Eliminar(etiqueta)}>
                                        <i className="fa fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {AccionABMC === "L" && Etiquetas?.length === 0 && (
                <div className="text-center mt-5 alert">
                    <h4>
                        <i className="fa fa-tags text-danger"></i>
                        {" No se encontraron Etiquetas "}
                        <i className="fa fa-tags text-danger"></i>
                    </h4>
                </div>
            )}

            {AccionABMC !== "L" && (
                <form onSubmit={handleSubmit(Grabar)} noValidate className="mx-auto" style={{ maxWidth: '105rem' }} autoComplete="off">
                    <div className="row">
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