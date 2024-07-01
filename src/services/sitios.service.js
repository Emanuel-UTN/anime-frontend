import { config } from "../config";
const urlResource = config.urlResourceSitios;

import httpService from "./http.service";

async function Buscar (nombre = "") {
    const resp = await httpService.get(urlResource, { params: { nombre } });
    return resp.data;
}

async function BuscarPorId (nombre) {
    const resp = await httpService.get(`${urlResource}/${nombre}`);
    return resp.data;
}

async function Actualizar (Sitio) {
    const resp = await httpService.put(`${urlResource}/${Sitio.nombre}`, Sitio);
    return resp.data;
}

async function Grabar (Sitio) {
    const resp = await httpService.post(urlResource, Sitio);
    return resp.data;
}

async function Eliminar (nombre) {
    const resp = await httpService.delete(`${urlResource}/${nombre}`);
    return resp.data;
}

export default {
    Buscar,
    BuscarPorId,
    Actualizar,
    Grabar,
    Eliminar,
}