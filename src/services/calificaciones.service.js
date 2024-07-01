import { config } from "../config";
const urlResource = config.urlResourceCalificaciones;

import httpService from "./http.service";

async function Buscar (nombre = "") {
    const resp = await httpService.get(urlResource, { params: { nombre } });
    return resp.data;
}

async function BuscarPorId (id) {
    const resp = await httpService.get(`${urlResource}/${id}`);
    return resp.data;
}

async function Grabar (Calificacion) {
    if (Calificacion.id === 0) {
        const resp = await httpService.post(urlResource, Calificacion);
        return resp.data;
    }else {
        const resp = await httpService.put(`${urlResource}/${Calificacion.id}`, Calificacion);
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