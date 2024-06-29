import "./AnimeItem.css";
import React, { useState, useEffect } from "react";

export default function AnimeItem({ Anime, Sitios }) {
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
                                            <h3 className="card-title">
                                                {Anime.title}
                                                <span className={`AnimeType ${Anime.type}`}>{Anime.type}</span>
                                                {Anime.enEmision && (<span className="EnEmision">En Emision</span>)}
                                            </h3>
                                            <p className="card-text fs-5">{Anime.cantContenidos}</p>
                                            <div className="content-details mt-4">
                                                <div className="row">
                                                    <h4 className="card-title">
                                                        {contenido.title}
                                                        <span className={`Type ${contenido.type}`}>{contenido.type}</span>
                                                        {contenido.enEspanol && (<span className="Type Español">Español</span>)}
                                                    </h4>
                                                </div>
                                                <div className="row">
                                                    <p className="card-text mt-1">{contenido.etiquetas.join(', ')}</p>
                                                </div>
                                                <div className="links my-1">
                                                    {contenido.urls?.map((url, index) => (
                                                        <Url {...{
                                                            url, index, handleLinkClick, Sitios
                                                        }}/>
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

function Url({ url, index, handleLinkClick, Sitios}) {
    const [sitio, setSitio] = useState(null);

    useEffect(() => {
        Sitios && Sitios.map((sitio) => (
            sitio.nombre === url.site && setSitio(sitio)
        ));
    }, [Sitios, url.site])
    return (
        <div key={index} className="link mx-1">
            {sitio && sitio.nombre === url.site && (
                    <a
                        className="icon-link icon-link-hover"
                        href={`${sitio.url}${url.url}`}
                        key={index}
                        onClick={handleLinkClick}
                        target="_blank" // Abre el enlace en una nueva pestaña
                        rel="noopener noreferrer"
                        data-text={url.url}
                    >
                        <img src={sitio.image} alt={url.site} className="icon-link" />
                    </a>
                )}
        </div>
    )
}