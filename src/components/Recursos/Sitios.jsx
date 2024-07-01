import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import sitiosService from "../../services/sitios.service";
import modalDialogService from "../../services/modalDialog.service";

export default function Sitios() {
    const [ AccionABMC, setAccionABMC ] = useState("L");

    const [ Nombre, setNombre ] = useState("");

    const [ Sitios, setSitios ] = useState([]);

    const [ Sitio, setSitio ] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Añadir reset para restablecer el formulario
        watch
    } = useForm({ defaultValues: Sitio || { nombre: "" } });
    
    useEffect(() => {
        reset(Sitio || { nombre: "" }); // Restablecer el formulario cuando Sitio cambie
    }, [Sitio, reset]);
    

    // Cargar listas necesarias
    useEffect(() => {
        Buscar();
    }, []);

    async function Buscar (_nombre) {
        if (_nombre !== undefined)
            setNombre(_nombre);
        else
            _nombre = Nombre;

        const data = await sitiosService.Buscar(_nombre);
        setSitios(data);
    }

    async function BuscarPorId(sitio, accionABMC) {
        const data = await sitiosService.BuscarPorId(sitio.nombre);
        setSitio(data);
        setAccionABMC(accionABMC);
    }

    function Modificar (sitio) {
        BuscarPorId(sitio, "M");
    }

    function Agregar () {
        const sitio = {
            id: 0,
            nombre: ""
        };
        setSitio(sitio);
        setAccionABMC("A");
    }

    async function Eliminar (sitio) {
        modalDialogService.Confirm(
            "¿Está seguro que desea eliminar la sitio?",
            "Eliminar Sitio",
            undefined,
            undefined,
            async () => {
                await sitiosService.Eliminar(sitio.nombre);
                await Buscar();
                modalDialogService.Alert("La Sitio fue eliminada correctamente.", "Eliminar Sitio", undefined, undefined, undefined, undefined, "success");
            }
        );
    }

    async function Grabar (sitio) {
        try {
            if (AccionABMC === "A")
                await sitiosService.Grabar(sitio);
            else if (AccionABMC === "M")
                await sitiosService.Actualizar(sitio);
            else
                throw new Error("Acción no definida.");
        } catch (error) {
            modalDialogService.Alert(
                error?.response?.data?.message ?? error.toString(), 
                "Error al grabar la sitio",
                undefined,
                undefined,
                undefined,
                undefined,
                "danger"
            );
            return;
        }
    
        await Buscar();
        setSitio(null); // Restablecer el estado de Sitio
        Volver();
    
        modalDialogService.Alert("La Sitio fue grabada correctamente.", "Grabar Sitio", undefined, undefined, undefined, undefined, "success");
    }    

    function Volver () {
        setSitio(null); // Restablecer el estado de Sitio
        setAccionABMC("L");
    }    


    return (
        <div>
            <div className="tituloPagina mx-5 d-flex align-items-center justify-content-between">
                Sitios

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
                            <i className="fa fa-plus"></i> Agregar Sitio
                        </button>
                    </>
                )}
            </div>

            {AccionABMC === "L" && Sitios?.length > 0 && (
                <table className="table table-hover table-sm mx-auto" style={{ maxWidth: '105rem' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Url <i className="fa fa-link"></i> </th>
                            <th>Logo <i className="fa fa-image"></i> </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Sitios.map((sitio) => (
                            <tr key={sitio.nombre}>
                                <td>{sitio.nombre}</td>
                                <td>
                                    <a href={sitio.url} target="_blank" rel="noreferrer" className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                        {sitio.url}
                                    </a>
                                </td>
                                {sitio.image && (
                                    <td>
                                        <img src={sitio.image} alt="Logo del Sitio" className="icon-link" />
                                    </td>
                                )}
                                {!sitio.image && <td></td>}
                                <td>
                                    <button className="btn btn-outline-warning mx-1" onClick={() => Modificar(sitio)}>
                                        <i className="fa fa-palette"></i>
                                    </button>
                                    <button className="btn btn-outline-danger mx-1" onClick={() => Eliminar(sitio)}>
                                        <i className="fa fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {AccionABMC === "L" && Sitios?.length === 0 && (
                <div className="text-center mt-5 alert">
                    <h4>
                        <i className="fa fa-tags text-danger"></i>
                        {" No se encontraron Sitios "}
                        <i className="fa fa-tags text-danger"></i>
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
                                    disabled={AccionABMC === "M"}
                                />
                                {errors.nombre && <div className="invalid-feedback">El campo es requerido y debe tener menos de 50 caracteres.</div>}
                            </div>
                        </div>
                    </div> 
                    <div className="row my-1">
                        <div className="col-md-7 col-9">
                            <div className="input-group">
                                <span className="input-group-text" id="urlInput">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control ${errors.url ? "is-invalid" : ""}`}
                                    {...register("url", { 
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        }, 
                                        maxLength: {
                                            value: 200,
                                            message: "El campo debe tener menos de 200 caracteres."
                                        },
                                        pattern: {
                                            value: /^(http|https):\/\/[^ "]+$/,
                                            message: "El campo debe ser una URL válida."
                                        }
                                    })}
                                    aria-describedby="urlInput"
                                />
                                {errors.url && <div className="invalid-feedback">{errors.url.message}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-7 col-9">
                            <div className="input-group">
                                <span className="input-group-text" id="imageInput">
                                    <i className="fa fa-image"></i>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                    {...register("image", { 
                                        required: {
                                            value: true,
                                            message: "El campo es requerido."
                                        }, 
                                        maxLength: {
                                            value: 200,
                                            message: "El campo debe tener menos de 200 caracteres."
                                        },
                                        pattern: {
                                            value: /^(http|https):\/\/[^ "]+$/,
                                            message: "El campo debe ser una URL válida."
                                        }
                                    })}
                                    aria-describedby="imageInput"
                                />
                                {watch('image') && (
                                    <span className="input-group-text">
                                        <img src={watch('image')} className="icon-link" />
                                    </span>
                                )}
                                {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
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