import React, { Component, Fragment } from 'react';
import { PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/css/Subastas.css';
import $ from 'jquery';

class AddLote extends Component {

    tituloRef = React.createRef();
    descripcionRef = React.createRef();
    subastaId;
    //siguiente=false;
    //lote;

    state = {
        lote:{}/*,
        lotes:[]*/
    }

    componentDidMount() {
        CheckToken();
        var pathArray = window.location.pathname.split('/');
        this.subastaId=pathArray[pathArray.length-1];
        //this.getLotes();
    }

    /*getLotes() {
        GetData('lote/subasta/'+this.subastaId, null, 'GET').then((res) => {
            if (res.status !== 'error') {
                console.log(res);
                this.setState({
                    lotes: res.message
                })
            } else {
                console.log(res);
            }
        });
    }*/

    changeState = () =>{

        this.setState({
            lote: {
                titulo:this.tituloRef.current.value,
                descripcion:this.descripcionRef.current.value,
                user: JSON.parse(localStorage.getItem("user")).sub,
                subastaId: this.subastaId
            }
        })
        console.log(this.state)
    }

    enviar = (e) => {
        var succesMesage = $("#idmsAlert");
        var alertMessage = $("#idmsAlert2");

        e.preventDefault();
        this.changeState();
        PostData('lote/create', this.state.lote, 'POST').then((res) => {
            if(res.status!=='error'){
                succesMesage.html("<p>Lote creado correctamente</p>").show();
                document.getElementById("addForm").reset(); 
                //this.getLotes();
                window.location.assign("/articulo/"+res.message.id);
            }else{
                alertMessage.html("<p>No puedes agregar lotes a subastas que no te pertenecen</p>").show();
                console.log(res);
            }
        });
    }

    /*siguiente(){
        var btnSiguiente = $("#siguiente");
        if(this.siguiente==true){
            btnSiguiente.removeAttr("disabled");
            window.location.assign("/articulo/"+res.message.id);

        }
    }*/
    render() {
        /*const lotes = [];
        this.state.lotes.forEach(lote=> lotes.push(
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5">
                <div className="card mb-3 box-shadow">
                    <img className="card-img-top" src={thumbail} alt="Imagen subasta"/>
                    <div className="card-body">
                        <p className="card-text">{lote.titulo}</p>
                        <p className="card-text">{lote.descripcion}</p>
                        <div>
                            <button type="button" className="btn btn-danger">Añadir artículo</button>
                        </div>
                    </div>
                </div>
            </div>
        ))*/

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
                                <h1 className="h2">Añadir Lote</h1>
                            </div>

                            <div className="album bg-light">
                                <div className="contenedor-subastas">
                                    <div className="row">   
                                        <form id="addForm"  onSubmit={this.enviar}>
                                            <div style={{display:'none'}} id="idmsAlert" className="alert alert-success col-sm-12"></div>
                                            <div style={{display:'none'}} id="idmsAlert2" className="alert alert-danger col-sm-12"></div>

                                            <div className="form-group">
                                                <label for="titulo">Título</label>
                                                <input required onChange={this.changeState} type="text" className="form-control" placeholder="Título" ref={this.tituloRef}/>
                                            </div>
                                            <div className="form-group">
                                                <label for="descripcion">Descripción</label>
                                                <textarea onChange={this.changeState} className="form-control" rows="3" id="comment" placeholder="Descripción"ref={this.descripcionRef}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" value="Añadir" className="btn btn-primary" />
                                            </div>
                                        </form>                                   
                                    </div>
                                    <div className="row">   
                                        
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default AddLote;