import React, { Component } from 'react';

class Header extends Component {

    getUser(){
        if(localStorage.getItem("user")){
            var token = JSON.parse(localStorage.getItem("user"));
            return token.nombre;
        }
    }
    

    cerrarSesion(){
        localStorage.clear();
        window.location.assign('/');
    }
    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0"  href="#">Subastas</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" onClick={()=>this.cerrarSesion()} href="#">{this.getUser()} | Cerrar Sesión</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default Header;