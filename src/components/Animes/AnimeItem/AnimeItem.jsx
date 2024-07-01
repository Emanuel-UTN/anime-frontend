import "./AnimeItem.css";
import React, { useState, useEffect } from "react";

import Url from "../extra-components/Url";

export default function AnimeItem({ Anime, Sitios, Consultar, Modificar, Eliminar }) {
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
                                            <div className="row">
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
                                                {/* Acciones */}
                                                <div className="col-md-4 content-details me-5">
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
                                            </div>
                                            {/* Contenidos */}
                                            <p className="card-text fs-5">{Anime.cantContenidos}</p>
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
                                                <div className="links my-1">
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