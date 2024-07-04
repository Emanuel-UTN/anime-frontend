/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import modalDialogService from '../services/modalDialog.service';

export function ModalDialog() {
    const [mensaje, setMensaje] = useState("");
    const [titulo, setTitulo] = useState("");
    const [boton1, setBoton1] = useState("");
    const [boton2, setBoton2] = useState("");
    const [accionBoton1, setAccionBoton1] = useState(null);
    const [accionBoton2, setAccionBoton2] = useState(null);
    const [tipo, setTipo] = useState("");
    const [calificaciones, setCalificaciones] = useState([]);
    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState("");

    const handleAccionBoton1 = () => {
        if (accionBoton1) accionBoton1(calificacionSeleccionada);
        setMensaje((x) => (x = ""));
    }

    const handleAccionBoton2 = () => {
        if (accionBoton2) accionBoton2();
        setMensaje((x) => (x = ""));
    }

    const handleClose = () => {
        setMensaje((x) => (x = ""));
    }

    function Show(
        _mensaje,
        _titulo,
        _boton1,
        _boton2,
        _accionBoton1,
        _accionBoton2,
        _tipo,
        _calificaciones = []
    ) {
        setMensaje((x) => (x = _mensaje));
        setTitulo((x) => (x = _titulo));
        setBoton1((x) => (x = _boton1));
        setBoton2((x) => (x = _boton2));
        setAccionBoton1((x) => (x = _accionBoton1));
        setAccionBoton2((x) => (x = _accionBoton2));
        setTipo((x) => (x = _tipo));
        setCalificaciones((x) => (x = _calificaciones));
    }

    useEffect(() => {
        modalDialogService.subscribeShow(Show);
        return () => {
            modalDialogService.subscribeShow(null);
        }
    }, []);

    let classHeader = "";
    let faIcon = "";
    switch (tipo) {
        case "success":
            classHeader = "bg-success";
            faIcon = "fa-regular fa-circle-check";
            break;
        case "danger":
            classHeader = "bg-danger";
            faIcon = "fa-solid fa-triangle-exclamation";
            break;
        case "warning":
            classHeader = "bg-warning text-dark";
            faIcon = "fa-solid fa-triangle-exclamation";
            break;
        case "info":
            classHeader = "bg-info";
            faIcon = "fa-solid fa-circle-info";
            break;
        case "primary":
            classHeader = "bg-primary";
            faIcon = "fa-solid fa-circle-info";
            break;
        case "secondary":
            classHeader = "bg-secondary";
            faIcon = "fa-solid fa-circle-info";
            break;
        default:
            classHeader = "bg-success";
            faIcon = "fa-solid fa-circle-check";
            break;
    }

    if (mensaje === "") return null;

    return (
        <Modal show onHide={handleClose} backdrop="static" keyboard={mensaje !== "BloquearPantalla"}>
            <Modal.Header className={classHeader} closeButton={mensaje !== "BloquearPantalla"}>
                <Modal.Title> {titulo} </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ fontSize: "1.2em" }}>
                {mensaje === "BloquearPantalla" ? (
                    <div className="progress">
                        <div
                            className='progress-bar progress-bar-striped progress-bar-animated'
                            role='progressbar'
                            aria-valuenow={100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ flex: 1 }}
                        ></div>
                    </div>
                ) : (
                    <>
                        <p>
                            <i className={faIcon} style={{ fontSize: "1.6em", margin: "0.5em" }}></i>
                            {mensaje}
                        </p>
                        {calificaciones.length > 0 && (
                            <div className="mt-3">
                                <select
                                    className="form-select"
                                    value={calificacionSeleccionada}
                                    onChange={(e) => setCalificacionSeleccionada(e.target.value)}
                                >
                                    <option value="">Seleccione una calificación</option>
                                    {calificaciones.map((calificacion) => (
                                        <option key={calificacion.id} value={calificacion.nombre}>
                                            {calificacion.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}
            </Modal.Body>

            <Modal.Footer>
                {boton1 && (
                    <button className="btn btn-primary" onClick={handleAccionBoton1}>
                        {boton1}
                    </button>
                )}
                {boton2 && (
                    <button className="btn btn-secondary" onClick={handleAccionBoton2}>
                        {boton2}
                    </button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
