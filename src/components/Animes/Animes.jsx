import React, { useState, useEffect } from "react";

import animesService from "../../services/animes.service";
import modalDialogService from "../../services/modalDialog.service";

import sitiosService from "../../services/sitios.service";
import etiquetasService from "../../services/etiquetas.service";
import calificacionesService from "../../services/calificaciones.service";

import AnimesBuscar from "./AnimesBuscar";
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

    const [ show, setShow ] = useState(false);

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

        const data = await animesService.Buscar(Titulo, Tipo, EnEmision, Estado, Calificacion, EtiquetasBusqueda, _pagina);
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

    async function cambiarEstado (anime)  {
        if (anime.estado === "Por Ver" || anime.estado === "Visto") {
            modalDialogService.Confirm(
                `¿Está seguro que desea ${anime.estado === "Por Ver" ? "comenzar" : "volver"} a ver el anime?`, 
                "Comenzar a ver " + anime.title, 
                undefined,
                undefined, 
                () => {
                    anime.estado = "Viendo";
                    Grabar(anime);
                }, 
                undefined, 
                "primary"
            );
            
        } else if (anime.estado === "Viendo") {
            modalDialogService.Prompt(
                "Seleccione una calificación",
                "Calificación",
                "Aceptar",
                "Cancelar",
                (calificacion) => {
                    if (calificacion) {
                        anime.estado = "Visto";
                        anime.calificacion = calificacion;
                        Grabar(anime);
                    }
                },
                null,
                "primary",
                Calificaciones
            );
        }
    };

    const obtenerClaseCalificacion = (calificacion) => {
        const index = Calificaciones.findIndex((cal) => cal.nombre === calificacion);
        let icono = "fa-solid fa-star"; // Icono por defecto si no se encuentra la calificación

        if (index >= Calificaciones.length * 0.7) {
            return {
                clase: "bg-success",
                icono: "fa-solid fa-star"
            };
        } else if (index >= Calificaciones.length * 0.4) {
            return {
                clase: "bg-warning",
                icono: "fa-solid fa-star"
            };
        } else if (index > 0) {
            return {
                clase: "bg-danger",
                icono: "fa-solid fa-star"
            };
        } else {
            return {
                clase: "bg-secondary",
                icono: icono
            }
        }
    };

    async function Grabar (anime) {
        let nuevoAnime = {}
        try {
            nuevoAnime = await animesService.Grabar(anime);
        } catch (error) {
            modalDialogService.Alert(
                error?.response?.data?.message ?? error.toString(), 
                `Error al ${typeof anime === "string" ? 'buscar' : 'grabar'} el anime`,
                undefined, 
                undefined, 
                undefined, 
                undefined, 
                "danger"
            );
            return;
        }

        if (typeof anime !== "string") {
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
        } else {
            setAnime(nuevoAnime);
            setAccionABMC("A");
        }
    }

    function Volver(){
        setAccionABMC("L");
    }


    return (
        <div>
            <div className="tituloPagina mx-5">
                Animes {props.Estado ? ` - ${props.Estado}` : ""}
                {AccionABMC === "L" && (
                    <button className="btn btn-outline-success float-end" onClick={() => setShow(true)}>
                        <i className="fa fa-plus"></i> Nuevo Anime
                    </button>
                )}
            </div>

            <NuevoAnimeForm nuevoAnime={Grabar} show={show} setShow={setShow} Agregar={Agregar}/>

            {props.Busqueda && AccionABMC === "L" && (
                <AnimesBuscar 
                    {...{
                        Titulo, setTitulo,
                        Tipo, setTipo,
                        EnEmision, setEnEmision,
                        Estado, setEstado,
                        Calificacion, setCalificacion,
                        EtiquetasBusqueda, setEtiquetasBusqueda,
                        Etiquetas,
                        Calificaciones,
                        Buscar
                    }}
                />
            )}

            {AccionABMC === "L" && Animes?.length > 0 && (
                <AnimesListado 
                    {...{
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
                        obtenerClaseCalificacion,
                        Grabar,
                        Volver
                    }}
                />
            )}
        </div>
    )
}

import { Modal, Form, Button } from "react-bootstrap";

function NuevoAnimeForm({ nuevoAnime, show, setShow, Agregar }) {
    const [nombreAnime, setNombreAnime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        nuevoAnime(nombreAnime);
        setNombreAnime("");
        setShow(false)
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton className="bg-success">
                <Modal.Title>Agregar nuevo Anime</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Group className="input-group flex-nowrap my-3" controlId="nombreAnime">
                        <span className="input-group-text">Nombre</span>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del Anime"
                            value={nombreAnime}
                            onChange={(e) => setNombreAnime(e.target.value)}
                            className="form-control"
                            autoFocus
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2 mt-2" title="Defini uno nuevo de cero" onClick={() => {
                                setShow(false)
                                Agregar();
                            }} >
                            <i className="fa-regular fa-clipboard"></i> Definir
                        </Button>
                        <Button variant="success" type="submit" className="mt-2" title="Buscar automaticamente">
                            <i className="fa fa-search"></i> Buscar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}