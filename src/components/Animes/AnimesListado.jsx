import React from "react";

import AnimeItem from "./AnimeItem/AnimeItem";

export default function AnimesListado({
    Animes,
    Sitios,
    Paginas,
    Pagina,
    Buscar,
    Consultar,
    Modificar,
    Eliminar,
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
                                Consultar,
                                Modificar,
                                Eliminar
                            }}
                        />
                    </div>
                    <hr className="featurette-divider" />
                </div>
            ))}
        </div>
    );
}
