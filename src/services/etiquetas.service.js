import { config } from "../config";
const urlResource = config.urlResourceEtiquetas;

import httpService from "./http.service";

async function Buscar () {
    const resp = await httpService.get(urlResource);
    return resp.data;
}

async function BuscarPorId (id) {
    const resp = await httpService.get(`${urlResource}/${id}`);
    return resp.data;
}

async function Grabar (Etiqueta) {
    if (Etiqueta.id === 0) {
        const resp = await httpService.post(urlResource, Etiqueta);
        return resp.data;
    }else {
        const resp = await httpService.put(`${urlResource}/${Etiqueta.id}`, Etiqueta);
        return resp.data;
    }
}

async function Eliminar (id) {
    const resp = await httpService.delete(`${urlResource}/${id}`);
    return resp.data;
}

export default {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar,
}