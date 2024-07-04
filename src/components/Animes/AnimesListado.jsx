import React from "react";

import AnimeItem from "./AnimeItem/AnimeItem";

export default function AnimesListado({
    Animes,
    Sitios,
    Calificaciones,
    Paginas,
    Pagina,
    Buscar,
    Consultar,
    Modificar,
    Eliminar,
    cambiarEstado,
    obtenerClaseCalificacion
}) {
    return (
        <div className="container px-4 py-5">
            {Animes && Animes.map((anime) => (
                <div key={anime.id}>
                    <div className="row featurette">
                        <AnimeItem 
                            Anime={anime}
                            {...{
                                Sitios,
                                Calificaciones,
                                Consultar,
                                Modificar,
                                Eliminar,
                                cambiarEstado,
                                obtenerClaseCalificacion
                            }}
                        />
                    </div>
                    <hr className="featurette-divider" />
                </div>
            ))}
        </div>
    );
}
