import "./Inicio.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import statsService from "../services/stats.service";

import Animes from "./Animes/Animes";

export default function Inicio() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        statsService.Buscar().then((response) => {
            setStats(response);
        });
    }, []);
    
    return (
        <div>
            <h1 className="tituloPagina mx-4">Inicio</h1>
            
            <div className="container-fluid">
                <div className="row my-2">
                    <div className="col-md-10 col-11 mx-auto border border-danger-subtle rounded-4">
                        <div className="tituloPagina mt-2">
                            <h2 className="d-flex justify-content-between">
                                <div>
                                    <i className="fa fa-eye" /> ¿Qué es lo que has visto?
                                </div>
                                <div>
                                    <i className="fa fa-question" /> ¿Cómo te resultó lo que viste?
                                </div>
                            </h2>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-5 col-6 mx-auto">
                                <table className="table table-sm table-bordered border-danger-subtle table-rounded">
                                    <thead className="table">
                                        <tr>
                                            <th className="rounded-top-start">Animes Registrados</th>
                                            <th className="text-center">Por Ver</th>
                                            <th className="text-center rounded-top-end">Vistos</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="table-rounded-bottom">
                                            <td className="rounded-bottom-start">{stats.animes_registrados}</td>
                                            <td className="text-center">{stats.animes_por_ver}</td>
                                            <td className="text-center rounded-bottom-end">{stats.animes_vistos}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-7 col-6 mx-auto">
                                <table className="table table-sm table-bordered border-danger-subtle table-rounded">
                                    <thead className="table">
                                        <tr>
                                            {stats.animes_calificados?.map((animes, index) => index !== 0 && (
                                                <th className={`text-center ${index === 1 ? "rounded-top-start" : ""} ${index === stats.animes_calificados.length - 1 ? "rounded-top-end" : ""}`} key={index}>{animes.calificacion}</th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="table-rounded-bottom">
                                            {stats.animes_calificados?.map((animes, index) => index !== 0 && (
                                                <td className={`text-center ${index === 1 ? "rounded-bottom-start" : ""} ${index === stats.animes_calificados.length - 1 ? "rounded-bottom-end" : ""}`} key={index}>{animes.cantidad}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-md-10 col-11 mx-auto border border-secondary rounded-5">
                        <div className="tituloPagina mt-2">
                            <h2 className="text-center"><i className="fa fa-check" /> ¿Qué estás viendo?</h2>
                        </div>
                        <Animes Busqueda={false} Titulo={false} Estado="Viendo"/>
                        <div className="my-2 text-center">
                            <Link to="/Por-Ver" className="btn btn-md btn-outline-primary rounded-pill">
                                <i className="fa fa-star" /> Ver más
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}