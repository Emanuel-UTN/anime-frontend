import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

export default function EtiquetasForm({
    show,
    setShow,
    etiquetasSeleccionadas,
    etiquetasDisponibles,
    actualizarEtiquetas
}) {
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        // Cargar etiquetas seleccionadas al inicio si es necesario
    }, []);

    const etiquetasFiltradas = etiquetasDisponibles.filter((etiqueta) =>
        etiqueta.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header className="bg-primary" closeButton>
                <Modal.Title>Seleccionar Etiquetas</Modal.Title>
                <Form.Control
                    type="text"
                    className="bg-primary-subtle"
                    placeholder="Filtrar por nombre..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ marginLeft: "auto", width: "250px" }}
                />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        {etiquetasFiltradas.map((etiqueta) => (
                            <Col key={etiqueta.id} xs={12} sm={6} md={4}>
                                <div className="input-group flex-nowrap my-1">
                                    <div className="input-group-text">
                                        <input
                                            className="form-check-input mt-0"
                                            type="checkbox"
                                            checked={etiquetasSeleccionadas.includes(etiqueta.nombre)}
                                            onChange={() => {
                                                const updatedEtiquetas = etiquetasSeleccionadas.includes(etiqueta.nombre)
                                                    ? etiquetasSeleccionadas.filter((e) => e !== etiqueta.nombre)
                                                    : [...etiquetasSeleccionadas, etiqueta.nombre];
                                                actualizarEtiquetas(updatedEtiquetas);
                                            }}
                                            aria-label={`etiqueta-${etiqueta.id}-input`}
                                            id={`etiqueta-${etiqueta.id}-input`}
                                        />
                                    </div>
                                    <span className="input-group-text md fs-5" id={`etiqueta-${etiqueta.id}-input`}>
                                        {etiqueta.nombre}
                                    </span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
