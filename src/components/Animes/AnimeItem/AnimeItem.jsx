import "./AnimeItem.css";
import React, { useState, useEffect } from "react";

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
                                    <div className="col-md-3 col-lg-2">
                                        <img src={contenido.imagenUrl} alt={contenido.title} className="img-fluid rounded-start anime-image" />
                                    </div>
                                    <div className="col-md-9 col-lg-10">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md">
                                                    <h3 className="card-title">
                                                        {Anime.title}
                                                        <span className={`AnimeType ${Anime.type}`}>{Anime.type}</span>
                                                        {Anime.enEmision && (
                                                            <span className="EnEmision">
                                                                <i className="fa-solid fa-tv mx-1"></i> En Emision
                                                            </span>
                                                        )}
                                                    </h3>
                                                </div>
                                                <div className="col-md-4 content-details me-5">
                                                    <button className="btn btn-outline-primary mx-1" onClick={() => Consultar(Anime)} title="Consultar">
                                                        <i className="fa fa-eye"></i>
                                                    </button>
                                                    <button className="btn btn-outline-warning mx-1" onClick={() => Modificar(Anime)} title="Modificar">
                                                        <i className="fa fa-palette"></i>
                                                    </button>
                                                    <button className="btn btn-outline-danger mx-1" onClick={() => Eliminar(Anime)} title="Eliminar">
                                                        <i className="fa fa-trash-can"></i>
                                                    </button>
                                                </div>
                                            </div>
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
                                                            index={index}
                                                            handleLinkClick={handleLinkClick}
                                                            Sitios={Sitios}
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

function Url({ url, index, handleLinkClick, Sitios }) {
    const [sitio, setSitio] = useState(null);

    useEffect(() => {
        Sitios && Sitios.map((sitio) => (
            sitio.nombre === url.site && setSitio(sitio)
        ));
    }, [Sitios, url.site]);

    return (
        <div className="link mx-1">
            {sitio && sitio.nombre === url.site && (
                <a
                    className="icon-link icon-link-hover"
                    href={`${sitio.url}${url.url}`}
                    onClick={handleLinkClick}
                    target="_blank" // Abre el enlace en una nueva pestaña
                    rel="noopener noreferrer"
                    data-text={url.url}
                >
                    <img src={sitio.image} alt={url.site} className="icon-link" />
                </a>
            )}
        </div>
    );
}