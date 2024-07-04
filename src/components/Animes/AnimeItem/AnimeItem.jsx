import "./AnimeItem.css";
import React, { useState, useEffect } from "react";
import Url from "../extra-components/Url";

export default function AnimeItem({ Anime, Sitios, Calificaciones, Consultar, Modificar, Eliminar, cambiarEstado, obtenerClaseCalificacion }) {
    const [loading, setLoading] = useState(true);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, [Anime]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const handleLinkClick = (event) => {
        event.stopPropagation();
    };

    const obtenerNombreBoton = (estado) => {
        switch (estado) {
            case "Por Ver":
                return (
                    <>
                        <i className="fa-solid fa-play-circle me-2"></i>Empezar a Ver
                    </>
                );
            case "Viendo":
                return (
                    <>
                        <i className="fa-solid fa-check-circle me-2"></i>Terminar de Ver
                    </>
                );
            case "Visto":
                return (
                    <>
                        <i className="fa-solid fa-undo me-2"></i>Volver a Ver
                    </>
                );
            default:
                return "";
        }
    };

    const obtenerClaseEstado = (estado) => {
        switch (estado) {
            case "Por Ver":
                return "bg-success";
            case "Viendo":
                return "bg-warning";
            case "Visto":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    return (
        <div>
            {Anime && (
                <div id={`carouselExampleControls-${Anime.id}`} className="carousel slide carousel-fade card">
                    <div className="carousel-inner">
                        {Anime.contenidos.map((contenido, index) => (
                            <div key={contenido.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="row g-0 content-container">
                                    {/* Imagen */}
                                    <div className="col-md-3 col-lg-2">
                                        <img src={contenido.imagenUrl} alt={contenido.title} className="img-fluid rounded-start anime-image" />
                                    </div>
                                    <div className="col-md-9 col-lg-10">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-md">
                                                    <h3 className="card-title">
                                                        {/* Titulo */}
                                                        {Anime.title}
                                                        {/* Tipo */}
                                                        <span className={`AnimeType ${Anime.type}`}>{Anime.type}</span>
                                                        {/* En Emision */}
                                                        {Anime.enEmision && (
                                                            <span className="EnEmision">
                                                                <i className="fa-solid fa-tv mx-1"></i> En Emision
                                                            </span>
                                                        )}
                                                    </h3>
                                                </div>
                                                <div className="col-md-4 text-end">
                                                    {/* Calificación */}
                                                    {Anime.calificacion !== "Sin Calificar" && (
                                                        <span className={`badge fs-5 me-3 ${obtenerClaseCalificacion(Anime.calificacion).clase}`}>
                                                            <i className={obtenerClaseCalificacion(Anime.calificacion).icono}></i>
                                                            {Anime.calificacion}
                                                        </span>
                                                    )}
                                                    {/* Estado */}
                                                    <span className={`badge fs-5 ${obtenerClaseEstado(Anime.estado)}`}>
                                                        {Anime.estado}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md">
                                                    <p className="fs-5">{Anime.cantContenidos}</p>
                                                    <div className="content-details mt-4">
                                                        <div className="row">
                                                            <h4 className="card-title">
                                                                {contenido.title}
                                                                <span className={`Type ${contenido.type}`}>{contenido.type}</span>
                                                                {contenido.enEspanol && (
                                                                    <span className="Type Español">
                                                                        <i className="fa fa-language mx-1"></i> Español
                                                                    </span>
                                                                )}
                                                            </h4>
                                                        </div>
                                                        <div className="row">
                                                            <p className="card-text mt-1">{contenido.etiquetas.join(', ')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-3 col-sm-2">
                                                    <div className="btn-group">
                                                        <button className="btn btn-outline-primary" onClick={() => Consultar(Anime)} title="Consultar">
                                                            <i className="fa fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-outline-warning" onClick={() => Modificar(Anime)} title="Modificar">
                                                            <i className="fa fa-palette"></i>
                                                        </button>
                                                        <button className="btn btn-outline-danger" onClick={() => Eliminar(Anime)} title="Eliminar">
                                                            <i className="fa fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 col-sm-6 text-center estado-container">
                                                    <button
                                                        className="btn btn-lg btn-outline-success"
                                                        onClick={() => cambiarEstado(Anime)}
                                                    >
                                                        {obtenerNombreBoton(Anime.estado)}
                                                    </button>
                                                </div>

                                                <div className="col-4 d-flex my-1">
                                                    {contenido.urls?.map((url, index) => (
                                                        <Url
                                                            key={index}
                                                            url={url}
                                                            handleLinkClick={handleLinkClick}
                                                            Sitios={Sitios}
                                                            data_text={url.url}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls-${Anime.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" hidden></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls-${Anime.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" hidden></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
}