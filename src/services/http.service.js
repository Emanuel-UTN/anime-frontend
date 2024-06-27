import axios from "axios";
import modalService from "./modalDialog.service";

const httpService = axios.create({
    headers: {
        "Content-type": "application/json"
    }
});

httpService.interceptors.request.use(
    (request) => {
        modalService.BloquearPantalla(true);

        return request;
    },
    (error) => {
        console.error("Error en la petición", error);
        return Promise.reject(error);
    }
);

httpService.interceptors.response.use(
    (response) => {
        modalService.BloquearPantalla(false);

        return response;
    },
    (error) => {
        console.error("Error en la respuesta", error);
        modalService.BloquearPantalla(false);

        // No autenticado
        if (error.response.status === 401)
            error.message = "Debe loguearse para acceder a este recurso";
        // No autorizado
        else if (error.response.status === 403)
            error.message = "No tiene permisos para acceder a este recurso";
        else
            error.message = "Actualmente tenemos inconvenientes en el servidor, por favor intente mas tarde";

        modalService.Alert(error.message, "Error", undefined, undefined, undefined, undefined, "danger");
        
        return Promise.reject(error);
    }
);