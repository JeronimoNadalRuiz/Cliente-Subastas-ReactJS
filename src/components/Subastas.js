import React, { Component, Fragment } from 'react';
import { GetData, PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/css/Subastas.css';
import thumbail from '../assets/images/thumbail.jpg';
import $ from 'jquery';

class Subastas extends Component {
    pujaRef = React.createRef();

    state = {
        subastas: [],
        status:false,
        puja:{}
    }
    
    componentDidMount () {
        CheckToken();
        this.subastas=[];
        this.getSubastas();
    }

    setStatus(){
        this.status=true;
    }


    getSubastas() {
        GetData('subasta/list', null, 'GET', true).then((res) => {
            if (res.status !== 'error') {
                this.setState({
                    subastas: res.message
                })
            }else {
                console.log(res);
            }
        });

    }


    pujar(id){

        var pujaValue = null;
        pujaValue = document.getElementById(id).value;
        var x = null
        x = {
            puja: {
                subastaId:id,
                puja:pujaValue
            }
        }

        var succesMessage = $(".idmsAlert");
        var errorMessage = $(".idmsAlert2");
        console.log(x);
        PostData('puja/create', x.puja, 'POST').then((res) => {
            if(res.status!=='error'){
                console.log(res);
                succesMessage.html("<p>Puja creada correcatmente.</p>").show();
                errorMessage.html("<p>Puja insufienciente</p>").hide();

            }else{
                succesMessage.html("<p>Puja creada correcatmente.</p>").hide();
                errorMessage.html("<p>Puja insufienciente</p>").show();

                console.log(res);
            }
        });
        var pujaValue = null;
        var x = null
                            
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
            const subastas2 = [];
            this.state.subastas.forEach(subasta=> subastas2.push(
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5">
                <div className="card mb-3 box-shadow">
                    <img className="card-img-top" src={thumbail} alt="Imagen subasta"/>
                    <div className="card-body">
                        <p className="card-text">{subasta.titulo}</p>
                        <p className="card-text">{subasta.descripcion}</p>
                        <p>Precio: {subasta.precio} €</p>
                        <div>
                            <input type="number" id={subasta.id} className="puja form-control" placeholder="Puja" ref={this.pujaRef} />
                            <button type="button"  onClick={() => {this.pujar(subasta.id)}} className="btn btn-danger mt-3">Pujar</button>
                        </div>
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
                                    <h1 className="h2">Subastas Activas</h1>
                                </div>
    
                                <div className="album bg-light">
                                    <div className="contenedor-subastas">
                                    <div style={{display:'none'}}  className="idmsAlert alert alert-success col-sm-12"></div>
                                        <div className="row"> 
                                        <div style={{display:'none'}}  className="idmsAlert2 alert alert-danger col-sm-12"></div>
                                            {subastas2}                  
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
export default Subastas;