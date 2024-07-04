import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AnimesRegistro.css"; // Asegúrate de importar tu archivo CSS

import ContenidoRegistro from "./extra-components/ContenidoRegistro";

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
                className="btn btn-outline-primary"
                onClick={agregarContenido}
              >
                <i className="fa fa-plus"></i> Añadir Contenido
              </button>
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