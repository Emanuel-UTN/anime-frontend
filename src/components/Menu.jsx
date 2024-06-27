import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <div className="navbar navbar-expand-md navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href='#!' style={{ color: "crimson"}}>
                    <i className="fa-solid fa-dragon"></i>
                    &nbsp;<i>Animes</i>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to={"/Inicio"} className="nav-link"> Inicio </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/Por-Ver"} className="nav-link"> Por Ver </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/Vistos"} className="nav-link"> Vistos </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/Animes"} className="nav-link"> Animes </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#!" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Mas </a>

                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                <li>
                                    <NavLink to={"/Etiquetas"} className="dropdown-item dropdown-menu-dark"> Etiquetas </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/Calificaciones"} className="dropdown-item dropdown-menu-dark"> Calificaciones </NavLink>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <NavLink to={"/Sitios"} className="dropdown-item dropdown-menu-dark"> Sitios Web </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}