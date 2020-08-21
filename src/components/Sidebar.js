import React, { Component } from 'react';
import '../assets/css/Sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <ul className="nav flex-column mt-3">
                <li className="nav-item">
                    <a className="nav-link active" href="/subastas">Subastas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/subasta">Añadir Subasta</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/pujas">Mis Pujas</a>
                </li>
            </ul>
        )
    }
}
export default Sidebar;