import httpService from "./http.service";

import { config } from "../config";
const urlResource = config.urlResourceStats;

async function Buscar() {
    const resp = await httpService.get(urlResource);

    return resp.data;
}

export default {
    Buscar
}