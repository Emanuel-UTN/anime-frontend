import React, { useState, useEffect } from "react";

import animesService from "../../services/animes.service";
import modalDialogService from "../../services/modalDialog.service";

import sitiosService from "../../services/sitios.service";
import etiquetasService from "../../services/etiquetas.service";
import calificacionesService from "../../services/calificaciones.service";

import AnimesListado from "./AnimesListado";
import AnimesRegistro from "./AnimesRegistro";

export default function Animes(props) {
    const [ AccionABMC, setAccionABMC ] = useState("L");

    const [ Animes, setAnimes ] = useState([]);
    const [ Anime, setAnime ] = useState(null);

    const [ Titulo, setTitulo ] = useState("");
    const [ Tipo, setTipo ] = useState("");
    const [ EnEmision, setEnEmision ] = useState(null);
    const [ Estado, setEstado ] = useState(props.Estado);
    const [ Calificacion, setCalificacion ] = useState("");
    const [ EtiquetasBusqueda, setEtiquetasBusqueda ] = useState("");

    const [ Sitios, setSitios ] = useState([]);
    const [ Etiquetas, setEtiquetas ] = useState([]);
    const [ Calificaciones, setCalificaciones ] = useState([]);

    const [ Pagina, setPagina ] = useState(1);
    const [ Paginas, setPaginas ] = useState([]);

    // Cargar listas necesarias
    useEffect(() => {
        async function BuscarListas (servicio, setDatos) {
            const resp = await servicio.Buscar();
            setDatos(resp);
        }

        BuscarListas(sitiosService, setSitios);
        BuscarListas(etiquetasService, setEtiquetas);
        BuscarListas(calificacionesService, setCalificaciones);

        if (!props.Busqueda) 
            Buscar();
    }, []);

    async function Buscar (_pagina) {
        if (_pagina)
            setPagina(_pagina);
        else
            _pagina = Pagina;

        const data = await animesService.Buscar(Titulo, Tipo, EnEmision, Estado, Calificacion, Etiquetas, _pagina);
        setAnimes(data);

        if (data.RegistrosTotal) {
            const arrPaginas = [];
            for (let i = 1; i < Math.ceil(data.RegistrosTotal / 25); i++)
                arrPaginas.push(i);

            setPaginas(arrPaginas);
        }
    }

    async function BuscarPorId(anime, accionABMC) {
        const data = await animesService.BuscarPorId(anime.id);

        setAnime(data);
        setAccionABMC(accionABMC);
    }

    function Consultar(anime) {
        BuscarPorId(anime, "C");
    }

    function Modificar(anime) {
        BuscarPorId(anime, "M");
    }

    function Agregar() {
        const anime = {
            id: 0,
            title: "",
            type: "",
            enEmision: false,
            estado: "Por Ver",
            calificacion: "Sin Calificar",
            contenidos: [],
        };
        setAnime(anime);
        setAccionABMC("A");
    }

    async function Eliminar (anime) {
        modalDialogService.Confirm(
            "¿Está seguro que desea eliminar el anime?",
            "Eliminar Anime",
            undefined,
            undefined,
            async () => {
                await animesService.Eliminar(anime.id);
                await Buscar();
                modalDialogService.Alert("El anime fue eliminado correctamente.", "Eliminar Anime", undefined, undefined, undefined, undefined, "success");
            }
        );
    }

    async function Grabar (anime) {
        try {
            await animesService.Grabar(anime);
        } catch (error) {
            modalDialogService.Alert(error?.response?.data?.message ?? error.toString(), "Error al grabar el anime", undefined, undefined, undefined, undefined, "danger");
            return;
        }

        await Buscar();
        Volver();

        modalDialogService.Alert(
            `El anime fue ${AccionABMC === "A" ? 'agregado' : 'modificado'} correctamente.`, 
            "Grabar Anime",
            undefined, 
            undefined, 
            undefined, 
            undefined, 
            "success"
        );
    }

    function Volver(){
        setAccionABMC("L");
    }


    return (
        <div>
            <div className="tituloPagina mx-5">
                Animes {props.Estado ? ` - ${props.Estado}` : ""}
            </div>

            {props.Busqueda && AccionABMC === "L" && (
                <div>
                    Busqueda aqui...
                </div>
            )}

            {AccionABMC === "L" && Animes?.length > 0 && (
                <AnimesListado 
                    {...{
                        Animes,
                        Sitios,
                        Paginas,
                        Pagina,
                        Buscar,
                        Consultar,
                        Modificar,
                        Eliminar
                    }}
                />
            )}

            {AccionABMC === "L" && Animes?.length === 0 && (
                <div className="text-center mt-5 alert">
                    <h1>
                        <i className="fa-solid fa-biohazard text-danger"></i>
                        {" No se encontraron Animes "}
                        <i className="fa-solid fa-biohazard text-danger"></i>
                    </h1>
                </div>
            )}

            {AccionABMC !== "L" && (
                <AnimesRegistro
                    {...{
                        AccionABMC,
                        Anime,
                        Sitios,
                        Etiquetas,
                        Calificaciones,
                        Grabar,
                        Volver
                    }}
                />
            )}
        </div>
    )
}