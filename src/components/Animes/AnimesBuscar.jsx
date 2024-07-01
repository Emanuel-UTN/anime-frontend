import React, { useState } from "react";

import EtiquetasForm from "./extra-components/EtiquetasForm";

export default function AnimesBuscar({
    Titulo = '', setTitulo,
    Tipo = '', setTipo,
    EnEmision = false, setEnEmision,
    Estado = '', setEstado,
    Calificacion = '', setCalificacion,
    EtiquetasBusqueda = [], setEtiquetasBusqueda,
    Etiquetas,
    Calificaciones,
    Buscar
}) {
    const [showEtiquetas, setShowEtiquetas] = useState(false);

    const actualizarEtiquetasBusqueda = (etiquetasSeleccionadas) => {
        setEtiquetasBusqueda(etiquetasSeleccionadas);
    };

    return (
        <>
            <form className="mx-auto" style={{maxWidth: '105rem'}}>
                <div className="container-fluid">

                    <div className="row justify-content-between my-1">
                        
                        {/* Titulo */}
                        <div className="col-9 col-md-8">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Titulo}
                                    placeholder="Titulo del Anime"
                                    onChange={(e) => setTitulo(e.target.value)}
                                    id="TituloInput"
                                />
                                <label htmlFor="TituloInput">Titulo del Anime</label>
                            </div>
                        </div>

                        {/* En Emisión */}
                        <div className="col-4 col-md-3">
                        <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={EnEmision}
                                    onChange={(e) => setEnEmision(e.target.value)}
                                    id="EnEmisionSelect"
                                >
                                    <option value={null}></option>
                                    <option value={false}>NO</option>
                                    <option value={true}>SÍ</option>
                                </select>
                                <label htmlFor="EnEmisionSelect">En Emision</label>
                            </div>
                        </div>

                    </div>

                    <div className="row justify-content-between mt-4 mb-1">

                        {/* Tipo */}
                        <div className="col-4 col-md-3">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={Tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    id="TipoSelect"
                                >
                                    <option value="">Selecciona un Tipo de Anime</option>
                                    <option value="Serie">Serie</option>
                                    <option value="Película">Película</option>
                                    <option value="OVA">OVA</option>
                                </select>
                                <label htmlFor="TipoSelect">Tipo</label>
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="col-4 col-md-3">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={Estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    id="EstadoSelect"
                                >
                                    <option value="">Selecciona un Estado</option>
                                    <option value="Por Ver">Por Ver</option>
                                    <option value="Viendo">Viendo</option>
                                    <option value="Visto">Visto</option>
                                </select>
                                <label htmlFor="EstadoSelect">Estado</label>
                            </div>
                        </div>

                        {/* Calificación */}
                        <div className="col-4 col-md-3">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    value={Calificacion}
                                    onChange={(e) => setCalificacion(e.target.value)}
                                    id="CalificacionSelect"
                                >
                                    <option value="">Selecciona una Calificación</option>
                                    {Calificaciones.map((calificacion) => (
                                        <option value={calificacion.nombre} key={calificacion.id}>{calificacion.nombre}</option>
                                    ))}
                                </select>
                                <label htmlFor="CalificacionSelect">Calificación</label>
                            </div>
                        </div>

                    </div>

                    <div className="row justify-content-between mt-4 mb-1">

                        {/* Etiquetas */}
                        <div className="col-9 col-md-7">
                            <div className="input-group">
                                <div className="form-control d-flex justify-content-between align-items-center">
                                    <span>
                                        {EtiquetasBusqueda.length > 0
                                            ? EtiquetasBusqueda.join(", ")
                                            : "Seleccionar Etiquetas"}
                                    </span>
                                    <button
                                        className="btn btn-link text-danger"
                                        type="button"
                                        onClick={() => setEtiquetasBusqueda([])}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className="fa fa-circle-xmark"></i>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowEtiquetas(true)}
                                >
                                    <i className="fa fa-tags"></i>
                                </button>
                            </div>
                        </div>

                        <div className="col text-center">
                            <button
                                type="button"
                                className="btn btn-primary fs-5"
                                onClick={Buscar}
                            >
                                <i className="fa fa-search"></i> Buscar
                            </button>
                        </div>

                    </div>
                </div>
            </form>

            {/* Modal de Etiquetas */}
            <EtiquetasForm
                show={showEtiquetas}
                setShow={setShowEtiquetas}
                etiquetasSeleccionadas={EtiquetasBusqueda}
                etiquetasDisponibles={Etiquetas}
                actualizarEtiquetas={actualizarEtiquetasBusqueda}
            />
        </>
    );
}