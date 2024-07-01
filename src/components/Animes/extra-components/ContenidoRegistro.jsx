import React, { useEffect, useState } from "react";

import Url from "./Url";
import EtiquetasForm from "./EtiquetasForm";

export default function ContenidoRegistro({ 
    index, 
    contenido, 
    Sitios, 
    Etiquetas, 
    register, 
    errors, 
    setValue, 
    watch,
    actualizarEnEmision
}) {
    const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(
        watch(`contenidos[${index}].etiquetas`) || []
    );
    const [imagenUrl, setImagenUrl] = useState(contenido.imagenUrl || '');
    const [show, setShow] = useState(false);

    useEffect(() => {
        setImagenUrl(contenido.imagenUrl || '');
    }, [contenido, setValue, index]);

    useEffect(() => {
        setValue(`contenidos[${index}].etiquetas`, etiquetasSeleccionadas);
    }, [etiquetasSeleccionadas, setValue, index]);

    const handleImagenUrlChange = (event) => {
        const newUrl = event.target.value;
        setImagenUrl(newUrl);
        setValue(`contenidos[${index}].imagenUrl`, newUrl);
    };

    const agregarUrl = () => {
        const updatedUrls = [...contenido.urls, { site: '', url: '' }];
        setValue(`contenidos[${index}].urls`, updatedUrls);
        setValue(`contenidos`, watch('contenidos'));
    }; 

    const actualizarEtiquetas = (nuevasEtiquetas) => {
        setEtiquetasSeleccionadas(nuevasEtiquetas);
    };
    
    const handleLinkClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="container-fluid contenido-form">
            <div className="row">
                <h1 className="h2 my-2 text-info">Contenido {index + 1} <i className="fa-solid fa-clapperboard"></i></h1>
            </div>
            <div className="row">
                {/* Imagen */}
                <div className="col-md-4 col-lg-3">
                    <img 
                        src={imagenUrl} 
                        alt={contenido.title} 
                        className="img-fluid rounded-start anime-image"
                    />
                    <input 
                        type="text"
                        {...register(`contenidos[${index}].imagenUrl`, {
                            required: {
                                value: true,
                                message: `La URL de la imagen del contenido ${index + 1} es requerida`
                            },
                            pattern: {
                                value: /^(ftp|http|https):\/\/[^ "]+$/,
                                message: `La URL de la imagen del contenido ${index + 1} no es válida`
                            }
                        })}
                        placeholder={"URL de la imagen"}
                        className={"form-control fs-4" + (errors?.contenidos?.[index]?.imagenUrl ? " is-invalid" : "")}
                        aria-label="URL de la imagen"
                        aria-describedby={`contenido[${index}]-imagenUrl-input`}
                        value={imagenUrl}
                        onChange={handleImagenUrlChange}
                    />
                    {errors?.contenidos?.[index]?.imagenUrl && (
                        <div className="text-danger my-1">
                            <i className="fa fa-circle-exclamation mx-2"></i>
                            {errors.contenidos[index].imagenUrl.message}
                        </div>
                    )}
                </div>

                <div className="col-md-8 col-lg-9">
                    {/* Titulo */}
                    <div className="row my-3">
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text md fs-4" id={`contenido[${index}]-title-input`}>Titulo</span>
                            <input 
                                type="text"
                                {...register(`contenidos[${index}].title`, {
                                    required: {
                                        value: true,
                                        message: `El titulo del contenido ${index + 1} es requerido`
                                    }
                                })}
                                placeholder={"Titulo Contenido " + (index + 1)}
                                className={"form-control fs-4" + (errors?.contenidos?.[index]?.title ? " is-invalid" : "")}
                                aria-label="Titulo"
                                aria-describedby={`contenido[${index}]-title-input`}
                            />
                        </div>
                        {errors?.contenidos?.[index]?.title && (
                            <div className="text-danger my-1">
                                <i className="fa fa-circle-exclamation mx-2"></i>
                                {errors.contenidos[index].title.message}
                            </div>
                        )}
                    </div>

                    <div className="row my-2">
                        {/* Tipo */}
                        <div className="col-md-3 col-sm-6">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text md fs-5" id={`contenido[${index}]-type-input`}>Tipo</span>
                                <select 
                                    {...register(`contenidos[${index}].type`, {
                                        required: {
                                            value: true,
                                            message: `El tipo del contenido ${index + 1} es requerido`
                                        }
                                    })}
                                    className={"form-control fs-5" + (errors?.contenidos?.[index]?.type ? " is-invalid" : "")}
                                    placeholder="Tipo"
                                    aria-label="Tipo"
                                    aria-describedby={`contenido[${index}]-type-input`}
                                >
                                    <option value="" key={0}></option>
                                    <option value="Anime" key={1}>Anime</option>
                                    <option value="Película" key={2}>Película</option>
                                    <option value="OVA" key={3}>OVA</option>
                                </select>
                            </div>
                            {errors?.contenidos?.[index]?.type && (
                                <div className="text-danger my-1">
                                    <i className="fa fa-circle-exclamation mx-2"></i>
                                    {errors.contenidos[index].type.message}
                                </div>
                            )}
                        </div>

                        {/* En Español */}
                        <div className="col-md-3 col-sm-6">
                            <div className="input-group flex-nowrap">
                                <label
                                    className={`btn fs-5 enEspañol ${watch(`contenidos[${index}].enEspanol`) ? 'active' : 'bg-transparent'}`}
                                    style={{ borderRadius: '0.5rem', padding: '0.375rem 0.75rem' }}
                                >
                                    <i className="fa fa-language mx-1"></i> En Español <i className={`fa-circle fa-${watch(`contenidos[${index}].enEspanol`) ? 'solid' : 'regular'}`}></i>
                                    <input
                                        {...register(`contenidos[${index}].enEspanol`)}
                                        type="checkbox"
                                        className="form-check-input mt-0 visually-hidden"
                                        aria-label={`contenido[${index}]-enEspanol-input`}
                                        checked={watch(`contenidos[${index}].enEspanol`)}
                                        onChange={(e) => {
                                            const newEnEspanol = e.target.checked;
                                            setValue(`contenidos[${index}].enEspanol`, newEnEspanol);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                        
                        {/* En Emisión */}
                        <div className="col-md-3 col-sm-6">
                            <div className="btn-group flex-nowrap" aria-label="radio toggle button">
                                <label
                                    className={`btn fs-5 enEmision ${watch(`contenidos[${index}].enEmision`) ? 'active' : 'bg-transparent'}`}
                                    onClick={() => {
                                        const newEnEmision = !contenido.enEmision;
                                        setValue(`contenidos[${index}].enEmision`, newEnEmision);
                                        actualizarEnEmision();
                                    }}
                                    style={{
                                        borderRadius: '0.5rem', // Ajusta según tu diseño
                                        padding: '0.375rem 0.75rem' // Ajusta según tu diseño
                                    }}
                                >
                                    <i className="fa-solid fa-tv mx-1"></i> En Emisión <i className={`fa fa-toggle-${watch(`contenidos[${index}].enEmision`) ? 'on' : 'off'}`}></i>
                                </label>
                                <input
                                    {...register(`contenidos[${index}].enEmision`)}
                                    type="checkbox"
                                    className="btn-check"
                                    id={`btn-radio-${index}`}
                                    checked={contenido.enEmision}
                                    onChange={() => {
                                        const newEnEmision = !contenido.enEmision;
                                        setValue(`contenidos[${index}].enEmision`, newEnEmision);
                                    }}
                                    aria-label={`contenido[${index}]-enEmision-input`}
                                />
                            </div>
                        </div>
                    </div> 
                    <hr />
                    
                    {/* Etiquetas */}
                    <div className="row my-2">
                        <div className="etiquetas-container my-2">
                            <div className="fs-5">
                                <i className="fa fa-tags"></i> {watch(`contenidos[${index}].etiquetas`).join(', ') || 'Sin Etiquetas'}
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mx-3"
                                    onClick={() => {
                                        setShow(true);
                                    }}
                                >
                                    <i className="fa fa-tags"></i> Modificar
                                </button>
                            </div>
                            <EtiquetasForm {...{ show, setShow, etiquetasSeleccionadas, actualizarEtiquetas, register, index }} etiquetasDisponibles={Etiquetas}/>
                        </div>
                    </div>
                    <hr />

                    {/* Sitios */}
                    <div className="container my-2">
                        {contenido.urls && contenido.urls.map((url, urlIndex) => (
                            <div className="row my-1" key={urlIndex}>
                                <div className="col-md-10">
                                    <div className="input-group flex-nowrap">
                                        <select 
                                            {...register(`contenidos[${index}].urls[${urlIndex}].site`, {
                                                required: {
                                                    value: true,
                                                    message: `El sitio de la URL ${urlIndex + 1} del contenido ${index + 1} es requerido`
                                                }
                                            })}
                                            className="input-group-text md fs-5"
                                            id={`contenido[${index}]-url-${urlIndex}-input`}
                                            onChange={(e) => {
                                                setValue(`contenidos[${index}].urls[${urlIndex}].site`, e.target.value);
                                            }}
                                        >
                                            {Sitios.map((sitio) => (
                                                <option value={sitio.nombre} key={sitio.nombre}>{sitio.nombre}</option>
                                            ))}
                                        </select>

                                        <input 
                                            type="text"
                                            {...register(`contenidos[${index}].urls[${urlIndex}].url`, {
                                                required: {
                                                    value: true,
                                                    message: `La URL ${urlIndex + 1} del contenido ${index + 1} es requerida`
                                                }
                                            })}
                                            placeholder={`URL ${urlIndex + 1}`}
                                            className={"form-control fs-5" + (errors?.contenidos?.[index]?.urls?.[urlIndex]?.url ? " is-invalid" : "")}
                                            aria-label={`URL ${urlIndex + 1}`}
                                            aria-describedby={`contenido[${index}]-url-${urlIndex}-input`}
                                            onChange={(e) => {
                                                setValue(`contenidos[${index}].urls[${urlIndex}].url`, e.target.value);
                                            }}
                                        />

                                        <span className="input-group-text fs-5">
                                            <Url 
                                                key={urlIndex}
                                                url={watch(`contenidos[${index}].urls[${urlIndex}]`)}
                                                handleLinkClick={handleLinkClick}
                                                Sitios={Sitios}
                                                data_text={""}
                                            />
                                        </span>
                                    </div>
                                    {errors?.contenidos?.[index]?.urls?.[urlIndex] && (
                                        <div className="text-danger my-1">
                                            <i className="fa fa-circle-exclamation mx-2"></i>
                                            {errors.contenidos[index].urls[urlIndex].message}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-2">
                                    {/* Botón para eliminar URL dentro del mapeo de las URLs */}
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                            const updatedUrls = contenido.urls.filter((u, i) => i !== urlIndex);
                                            setValue(`contenidos[${index}].urls`, updatedUrls);
                                            setValue(`contenidos`, watch('contenidos'));
                                        }}
                                    >
                                        <i className="fa fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Botón para añadir nuevas URLs después del bloque que muestra las URLs */}
                        <button 
                            type="button" 
                            className="btn btn-outline-primary my-2"
                            onClick={agregarUrl}
                        >
                            <i className="fa fa-plus"></i> Añadir URL
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}