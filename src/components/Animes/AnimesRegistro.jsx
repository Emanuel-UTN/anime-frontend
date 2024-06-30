import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AnimesRegistro.css"; // Asegúrate de importar tu archivo CSS

import ContenidoRegistro from "./ContenidoRegistro";

export default function AnimeRegistro({
  AccionABMC,
  Anime,
  Sitios,
  Etiquetas,
  Calificaciones,
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

  function eliminarContenido(index) {
    const contenidos = getValues("contenidos");
    const nuevoContenidos = contenidos.filter((_, i) => i !== index);
    setValue("contenidos", nuevoContenidos);
  }

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
                <span className="input-group-text md fs-3" id="anime-enEmision-input" style={{"backgroundColor": "coral", color: "wheat"}}>
                  <i className="fa-solid fa-tv mx-1"></i> En Emisión
                </span>
                <div className="input-group-text">
                  <input 
                    {...register("enEmision")}
                    className="form-check-input mt-0"
                    type="checkbox"
                    aria-label="anime-enEmision-input" />
                </div>
              </div>
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
                  watch
                }}
              />
              {AccionABMC !== "C" && (
                <div>
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
        </fieldset>
        <hr />

        {/* Botones */}
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button className="btn btn-primary" type="submit">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button className="btn btn-warning" type="button" onClick={() => Volver()}>
              <i className="fa fa-undo"></i>
              {AccionABMC !== "C" ? " Cancelar" : " Volver"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}