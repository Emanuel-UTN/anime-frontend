import httpService from "./http.service";

import { config } from "../config";
const urlResource = config.urlResourceAnimes;

async function Buscar(Titulo, Tipo, EnEmision, Estado, Calificacion, Etiquetas, Pagina) {
    const resp = await httpService.get(urlResource, {
        params: {
            titulo: Titulo,
            tipo: Tipo,
            enEmision: EnEmision,
            estado: Estado,
            calificacion: Calificacion,
            etiquetas: Etiquetas,
            Pagina: Pagina
        }
    });

    return resp.data;
}

async function BuscarPorId(Id) {
    const resp = await httpService.get(`${urlResource}/${Id}`);

    return resp.data;
}

async function Grabar(Anime) {
    if (typeof Anime === "string") {
        const resp = await httpService.post(urlResource, { params: { nombre: Nombre }});

        return resp.data;
    }
    else if (Anime.id === 0) {
        const resp = await httpService.post(urlResource, Anime);

        return resp.data;
    }else {
        const resp = await httpService.put(`${urlResource}/${Anime.id}`, Anime);

        return resp.data;
    }
}

async function Eliminar(Id) {
    const resp = await httpService.delete(`${urlResource}/${Id}`);

    return resp.data;
}

export default {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
}