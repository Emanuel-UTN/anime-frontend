import React, { useEffect, useState } from "react";

export default function Url({ url, handleLinkClick, Sitios, data_text }) {
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
                    data-text={data_text}
                >
                    <img src={sitio.image} alt={url.site} className="icon-link" />
                </a>
            )}
        </div>
    );
}