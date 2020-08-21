import React, { Component, Fragment } from 'react';
import { GetData, PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/css/Subastas.css';
import thumbail from '../assets/images/thumbail.jpg';
import $ from 'jquery';

class Pujas extends Component {
    

    state = {
        subastas: [],
        status:false
    }
    
    componentDidMount () {
        CheckToken();
        this.getSubastas();
    }

    setStatus(){
        this.status=true;
    }
    
    getSubastas() {
        GetData('puja/user/list', null, 'GET', true).then((res) => {
            if (res.status !== 'error') {
                console.log(res.message);
                this.setState({
                    subastas: res.message
                })

            }else {
                console.log(res);
            }
        });

    }

    getFinSubasta(fecha){
        var ms=  Math.abs(new Date() - new Date(fecha));
        var days = Math.floor(ms / (24*60*60*1000));
        var daysms=ms % (24*60*60*1000);
        var hours = Math.floor((daysms)/(60*60*1000));
        var hoursms=ms % (60*60*1000);
        var minutes = Math.floor((hoursms)/(60*1000));
        var minutesms=ms % (60*1000);
        var sec = Math.floor((minutesms)/(1000));
        return days+"d "+hours+":"+minutes+":"+sec;
    }


    render() {

        if(this.state.status=true){
            const subastas3 = [];
            this.state.subastas.forEach(subasta=> subastas3.push(
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5">
                <div className="card mb-3 box-shadow">
                    <img className="card-img-top" src={thumbail} alt="Imagen subasta"/>
                    <div className="card-body">
                        <p className="card-text">{subasta.titulo}</p>
                        <p className="card-text">{subasta.descripcion}</p>
                        <p>Precio: {subasta.precio} €</p>
                        <small className="text-muted">La subasta acaba en: {this.getFinSubasta(subasta.fechaFin.date)}</small>
                    </div>
                </div>
            </div>
            ))
            return (
                <Fragment>
                    <Header />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 col-sm-12 col-xs-12 bg-light" id="sidebar">
                                <Sidebar />
                            </div>
                            <main className="col-md-10" id="page-content-wrapper">
    
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mt-3 mb-3 border-bottom">
                                    <h1 className="h2"> Mis Pujas</h1>
                                </div>
    
                                <div className="album bg-light">
                                    <div className="contenedor-subastas">
                                        <div className="row"> 
                                            {subastas3}                  
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </Fragment>
            ) 
        }else{
            return (<div></div>)
        }
            
            
    }
}
export default Pujas;