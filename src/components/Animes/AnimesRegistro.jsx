import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AnimesRegistro.css"; // Asegúrate de importar tu archivo CSS

import ContenidoRegistro from "./extra-components/ContenidoRegistro";
import modalDialogService from "../../services/modalDialog.service";

export default function AnimeRegistro({
  AccionABMC,
  Anime,
  Sitios,
  Etiquetas,
  Calificaciones,
  obtenerClaseCalificacion,
  Grabar,
  Volver
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues
  } = useForm({ values: Anime });

  const onSubmit = (data) => {
    Grabar(data);
  };

  const cambiarContenidos = (index1, index2) => {
    const nuevosContenidos = [...contenidos];
    
    // Intercambiar posiciones
    const temp = nuevosContenidos[index1];
    nuevosContenidos[index1] = nuevosContenidos[index2];
    nuevosContenidos[index2] = temp;

    // Intercambiar ids
    const tempId = nuevosContenidos[index1].id;
    nuevosContenidos[index1].id = nuevosContenidos[index2].id;
    nuevosContenidos[index2].id = tempId;

    setValue('contenidos', nuevosContenidos);
    setValue("contenidosActualizados", true);
  };

  const agregarContenido = () => {
    const nuevosContenidos = [
        ...getValues("contenidos"),
        {
            id: Date.now(),
            title: "",
            type: "",
            enEspanol: false,
            enEmision: false,
            etiquetas: [],
            urls: [],
            imagenUrl: "",
        },
    ];
    setValue("contenidos", nuevosContenidos);
    actualizarEnEmision();
  };

  const eliminarContenido = (index) => {
    const contenidos = getValues("contenidos");
    const nuevoContenidos = contenidos.filter((_, i) => i !== index);
    setValue("contenidos", nuevoContenidos);
    actualizarEnEmision();
  };

  const actualizarEnEmision = () => {
    const enEmision = watch("contenidos").some((contenido) => contenido.enEmision);
    setValue("enEmision", enEmision);
  };

  useEffect(() => {
    setValue("contenidos", Anime.contenidos);
  }, [Anime.contenidos, setValue]);

  const contenidos = watch("contenidos");

  function fusionarContenidos(index1, index2) {
    const nuevosContenidos = [...contenidos];
  
    const cont1 = nuevosContenidos[index1];
    const cont2 = nuevosContenidos[index2];
  
    if (!cont1 || !cont2) {
      return;
    }
  
    if (cont1.type !== cont2.type) {
      return modalDialogService.Alert(
        'Los contenidos deben ser del mismo tipo para poder fusionarlos',
        'Los contenidos son distintos',
        undefined,
        undefined,
        undefined,
        undefined,
        'warning'
      );
    }
  
    // Fusionar contenidos
    cont1.enEspanol = cont1.enEspanol || cont2.enEspanol;
    cont1.enEmision = cont1.enEmision || cont2.enEmision;
  
    cont1.etiquetas = Array.from(new Set([...cont1.etiquetas, ...cont2.etiquetas]));
    cont1.urls = Array.from(new Set([...cont1.urls, ...cont2.urls]));
  
    if (cont2.imagenUrl.includes('animeflv')) {
      cont1.imagenUrl = cont2.imagenUrl;
    }
  
    nuevosContenidos[index1] = cont1;
    nuevosContenidos.splice(index2, 1);
  
    setValue('contenidos', nuevosContenidos);
    setValue('contenidosActualizados', true);
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="anime-registro-form">
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* Titulo */}
          <div className="row my-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text md fs-1" id="anime-title-input">Titulo</span>
              <input 
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "El titulo del anime es requerido"
                  }
                })}
                placeholder="Titulo"
                className={"form-control fs-1" + (errors.title ? " is-invalid" : "")}
                aria-label="Titulo"
                aria-describedby="anime-title-input"
              />
            </div>
            {errors?.title && (
              <div className="text-danger my-1">
                <i className="fa fa-circle-exclamation mx-2"></i>
                {errors.title.message}
              </div>
            )}
          </div>

          <div className="row my-2">
            {/* Tipo */}
            <div className="col-md-3 col-sm-6">
              <div className="input-group flex-nowrap">
                <span className="input-group-text md fs-3" id="anime-type-input">Tipo</span>
                <select 
                  {...register("type", {
                    required: {
                      value: true,
                      message: "El tipo del anime es requerido"
                    }
                  })}
                  className={"form-control fs-3" + (errors.type ? " is-invalid" : "")}
                  placeholder="Tipo"
                  aria-label="Tipo"
                  aria-describedby="anime-type-input"
                >
                  <option value="" key={0}></option>
                  <option value="Serie" key={1}>Serie</option>
                  <option value="Película" key={2}>Película</option>
                  <option value="OVA" key={3}>OVA</option>
                </select>
              </div>
              {errors?.type && (
                <div className="text-danger my-1">
                  <i className="fa fa-circle-exclamation mx-2"></i>
                  {errors.type.message}
                </div>
              )}
            </div>

            {/* En Emisión */}
            <div className="col-md-3 col-sm-6">
                <div className="input-group flex-nowrap">
                    <label
                        className={`btn fs-3 enEmision ${watch("enEmision") ? 'active' : 'bg-transparent'}`}
                        style={{ borderRadius: '0.5rem', padding: '0.375rem 0.75rem' }}
                    >
                        <i className="fa-solid fa-tv mx-1"></i> En Emisión
                        <input
                            type="checkbox"
                            className="form-check-input mt-0 visually-hidden"
                            aria-label="anime-enEmision-input"
                            readOnly
                            checked={watch("enEmision")}
                            
                        />
                    </label>
                </div>
            </div>

            {/* Estado */}
            <div className="col-md-2 col-sm-3">
              <div className="input-group flex-nowrap">
                <select 
                  {...register("estado", {
                    required: {
                      value: true,
                      message: "El estado del anime es requerido"
                    }
                  })}
                  className={`form-control fs-3 bg-${watch("estado") === "Por Ver" ? 'success' : watch("estado") === "Viendo" ? 'warning' : 'danger' }` + (errors.estado ? " is-invalid" : "")}
                  placeholder="Estado"
                  aria-label="Estado"
                  aria-describedby="anime-estado-input"
                >
                  <option value="Por Ver" className="bg-success" key={1} defaultChecked>Por Ver</option>
                  <option value="Viendo" className="bg-warning" key={2}>Viendo</option>
                  <option value="Visto" className="bg-danger" key={3}>Visto</option>
                </select>
              </div>
              {errors?.estado && (
                  <div className="text-danger my-1">
                      <i className="fa fa-circle-exclamation mx-2"></i>
                      {errors.estado.message}
                  </div>
              )}
            </div>

            {/* Calificación */}
            <div className="col-md-2 col-sm-3">
              <div className="input-group flex-nowrap">
                <select 
                  {...register("calificacion", {
                    required: {
                      value: true,
                      message: "La calificación del anime es requerida"
                    }
                  })}
                  className={`form-control fs-3 ${obtenerClaseCalificacion(watch("calificacion")).clase}` + (errors.calificacion ? " is-invalid" : "")}
                  placeholder="Calificación"
                  aria-label="Calificación"
                  aria-describedby="anime-calificacion-input"
                >
                  {Calificaciones.map((calificacion) => (
                    <option value={calificacion.nombre} key={calificacion.id} defaultChecked={calificacion.nombre === "Sin Calificar"} className={`${obtenerClaseCalificacion(calificacion.nombre).clase}`}>
                      {calificacion.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.calificacion && (
                  <div className="text-danger my-1">
                      <i className="fa fa-circle-exclamation mx-2"></i>
                      {errors.calificacion.message}
                  </div>
              )}
            </div>
          </div>

          {/* Contenidos */}
          {contenidos && contenidos.map((contenido, index) => (
            <div key={index} className="row my-3">
              <hr />
              <ContenidoRegistro 
                {...{
                  AccionABMC,
                  index,
                  contenido,
                  Sitios,
                  Etiquetas,
                  register,
                  errors,
                  setValue,
                  watch,
                  actualizarEnEmision
                }}
              />
              {AccionABMC !== "C" && (
                <div>
                  {/* Acciones */}
                  {index < contenidos.length - 1 && (
                    <button 
                      type="button" 
                      className="btn btn-secondary float-start mx-1"
                      onClick={() => cambiarContenidos(index, index + 1)}
                    >
                      <i className="fa fa-arrow-down"></i>
                    </button>
                  )}
                  {index > 0 && (
                    <button 
                      type="button" 
                      className="btn btn-secondary float-start mx-1"
                      onClick={() => cambiarContenidos(index, index - 1)}
                    >
                      <i className="fa fa-arrow-up"></i>
                    </button>
                  )}
                  <button 
                    type="button" 
                    className="btn btn-danger float-end mx-1"
                    onClick={() => eliminarContenido(index)}
                  >
                    <i className="fa fa-xmark"></i>
                  </button>
                </div>
              )}
            </div>
          ))}

          {AccionABMC !== "C" && (
            <div className="row my-3">
              <button
                type="button"
                className="btn btn-outline-primary mb-3"
                onClick={agregarContenido}
              >
                <i className="fa fa-plus"></i> Añadir Contenido
              </button>
              <FusionarContenidos {...{ contenidos, fusionarContenidos}} />
            </div>
          )}
        </fieldset>
        <hr />

        {/* Botones */}
        <div className="row justify-content-center">
          <div className="col text-center botones">
            <button className="btn btn-outline-danger" type="button" onClick={() => Volver()}>
              <i className="fa fa-undo"></i>
              {AccionABMC !== "C" ? " Cancelar" : " Volver"}
            </button>
            {AccionABMC !== "C" && (
              <button className="btn btn-outline-success" type="submit">
                <i className="fa fa-save"></i> Grabar
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

import { Modal, Form, Button, Row, Col, Image } from "react-bootstrap";

function FusionarContenidos({ contenidos, fusionarContenidos }) {
  const [show, setShow] = useState(false);
  const [index1, setIndex1] = useState(-1);
  const [index2, setIndex2] = useState(-1);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIndex1(-1);
    setIndex2(-1);
    setShow(true);
  };

  const fusionar = () => {
    if (index1 !== -1 && index2 !== -1) {
      fusionarContenidos(index1, index2);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="outline-warning" onClick={handleShow}>
        <i className="fa fa-repeat"></i> Fusionar Contenidos
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fusionar Contenidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>
              Debes seleccionar dos contenidos para fusionar. Ten en cuenta que
              el primer contenido se mantendrá la mayor parte de las cosas.
            </p>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Contenido 1</Form.Label>
                  <Form.Control as="select" onChange={(e) => setIndex1(parseInt(e.target.value))}>
                    <option value={-1}></option>
                    {contenidos.map((contenido, index) => (
                      index !== index2 && (
                        <option value={index} key={index}>
                          {`${index + 1} ${contenido.title}`}
                        </option>
                      )
                    ))}
                  </Form.Control>
                  {index1 !== -1 && (
                    <Image
                      src={contenidos[index1]?.imagenUrl}
                      alt={contenidos[index1]?.title}
                      className="img-fluid rounded-start anime-image"
                      thumbnail
                    />
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Contenido 2</Form.Label>
                  <Form.Control as="select" onChange={(e) => setIndex2(parseInt(e.target.value))}>
                    <option value={-1}></option>
                    {contenidos.map((contenido, index) => (
                      index !== index1 && (
                        <option value={index} key={index}>
                          {`${index + 1} ${contenido.title}`}
                        </option>
                      )
                    ))}
                  </Form.Control>
                  {index2 !== -1 && (
                    <Image
                      src={contenidos[index2]?.imagenUrl}
                      alt={contenidos[index2]?.title}
                      className="img-fluid rounded-start anime-image"
                      thumbnail
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={fusionar} disabled={index1 === -1 || index2 === -1}>
            Fusionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}