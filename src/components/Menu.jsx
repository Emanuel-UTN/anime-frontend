// src/components/Menu.jsx

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Menu() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleThemeChange = (newTheme) => {
        toggleTheme(newTheme);
    };

    return (
        <header className={`p-3 mb-3 border-bottom ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} fixed-top`}>
            <div className="navbar navbar-expand-md">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#!">
                        <i className="fa-solid fa-dragon"></i>
                        &nbsp;<span>Animes</span>
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
                                <NavLink to="/Inicio" className="nav-link">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Por-Ver" className="nav-link">Por Ver</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Vistos" className="nav-link">Vistos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Animes" className="nav-link">Animes</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a href="#!" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Recursos <i className="fa fa-layer-group"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <NavLink to="/Etiquetas" className="dropdown-item">Etiquetas</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/Calificaciones" className="dropdown-item">Calificaciones</NavLink>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <NavLink to="/Sitios" className="dropdown-item">Sitios Web</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                            <li className="nav-item dropdown">
                                <button 
                                    className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" 
                                    id="bd-theme"
                                    type="button"
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    data-bs-display="static"
                                    aria-label="Toggle theme"
                                >
                                    <i className={`bi my-1 theme-icon-active fa ${theme === 'light' ? 'fa-sun' : theme === 'dark' ? 'fa-moon' : 'fa-circle-half-stroke'}`}></i>
                                    <span className="d-lg-none ms-2" id="bd-theme-text">Toggle theme</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                                    <li>
                                        <button 
                                            type="button" 
                                            className={`dropdown-item d-flex align-items-center ${theme === 'light' ? 'active' : ''}`} 
                                            onClick={() => handleThemeChange('light')}
                                        >
                                            <i className="bi me-2 opacity-50 theme-icon fa fa-sun"></i>
                                            Light
                                            {theme === 'light' && <i className="bi ms-auto fa fa-check"></i>}
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            type="button" 
                                            className={`dropdown-item d-flex align-items-center ${theme === 'dark' ? 'active' : ''}`} 
                                            onClick={() => handleThemeChange('dark')}
                                        >
                                            <i className="bi me-2 opacity-50 theme-icon fa fa-moon"></i>
                                            Dark
                                            {theme === 'dark' && <i className="bi ms-auto fa fa-check"></i>}
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            type="button" 
                                            className={`dropdown-item d-flex align-items-center ${theme === 'auto' ? 'active' : ''}`} 
                                            onClick={() => handleThemeChange('auto')}
                                        >
                                            <i className="bi me-2 opacity-50 theme-icon fa fa-circle-half-stroke"></i>
                                            Auto
                                            {theme === 'auto' && <i className="bi ms-auto fa fa-check"></i>}
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}