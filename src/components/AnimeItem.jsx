import React, { useState, useEffect } from "react";

import animesService from "../services/animes.service";

export default function AnimeItem() {
    const [Anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        animesService.BuscarPorId(2).then((response) => {
            setAnime(response);
            setLoading(false);
        });
    }, []);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    return (
        <div>
            {Anime && (
                <div id="carouselExampleControls" className="carousel slide card">
                    <div className="carousel-inner">
                        {Anime.contenidos.map((contenido, index) => (
                            <div key={contenido.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="row g-0">
                                    <div className="col-md-3 col-lg-2">
                                        <img src={contenido.imagenUrl} alt={contenido.title} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-9 col-lg-10">
                                        <div className="card-body">
                                            <h3 className="card-title">{contenido.title}</h3>
                                            <p className="card-text">{contenido.type}</p>
                                            <p className="card-text">{contenido.etiquetas.join(', ')}</p>
                                            <a href={contenido.urls} className="btn btn-primary">Ver más</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
}