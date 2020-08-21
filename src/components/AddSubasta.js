import React, { Component, Fragment } from 'react';
import { PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/css/Subastas.css';
import DateTimePicker from 'react-datetime-picker';
import $ from 'jquery';

class AddSubasta extends Component {

    tituloRef = React.createRef();
    descripcionRef = React.createRef();
    precioRef = React.createRef();

    fechaInicioForm;
    fechaFinForm;

    state = {
        subasta:{},
        subastas:[]
    }

    componentDidMount() {
        CheckToken();
        //this.getSubastas();
    }

    changeState = () =>{
        this.setState({
            subasta: {
                titulo:this.tituloRef.current.value,
                descripcion:this.descripcionRef.current.value,
                precio:this.precioRef.current.value,
                fechaInicio:this.state.subasta.fechaInicio,
                fechaFin:this.state.subasta.fechaFin,
                user: JSON.parse(localStorage.getItem("user")).sub
            }
        })
    }

    /*getSubastas() {
        GetData('subasta/user/list', null, 'GET', true).then((res) => {
            if (res.status !== 'error') {
                console.log(res);
                this.setState({
                    subastas: res.message
                })
            } else {
                
                console.log(res);
            }
        });
    }*/

    changeFechaInicio = (e) =>{
        var año = new Date(e).getFullYear();
        var mes= ("0" + (new Date(e).getMonth() + 1)).slice(-2);
        var dia = new Date(e).getDate();
        var hora =  new Date(e).getHours();
        var minutos =  new Date(e).getMinutes();
        var segundos =  new Date(e).getSeconds();

        var fecha=año+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
        
        // eslint-disable-next-line
        this.setState({...this.state.subasta.fechaInicio=fecha}); 
        
        this.fechaInicioForm=e;    

    }


    changeFechaFin = (e) =>{
        var año = new Date(e).getFullYear();
        var mes= ("0" + (new Date(e).getMonth() + 1)).slice(-2);
        var dia = new Date(e).getDate();
        var hora =  new Date(e).getHours();
        var minutos =  new Date(e).getMinutes();
        var segundos =  new Date(e).getSeconds();

        var fecha=año+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
         
        // eslint-disable-next-line
        this.setState({...this.state.subasta.fechaFin=fecha}); 
        this.fechaFinForm=e;    
    }


    enviar = (e) => {
        var succesMesage = $("#idmsAlert");

        e.preventDefault();
        this.changeState();
        PostData('subasta/create', this.state.subasta, 'POST').then((res) => {
            if(res.status!=='error'){
                succesMesage.html("<p>Subasta creada correctamente</p>").show();
                document.getElementById("addForm").reset();
                //this.getSubastas(); 
                window.location.assign("/lote/"+res.message.id);

            }else{
                console.log(res);
            }
        });
    }

    render() {
        /*const subastas = [];
        this.state.subastas.forEach(subasta=> subastas.push(
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5">
                <div className="card mb-3 box-shadow">
                    <img className="card-img-top" src={thumbail} alt="Imagen subasta"/>
                    <div className="card-body">
                        <p className="card-text">{subasta.titulo}</p>
                        <p className="card-text">{subasta.descripcion}</p>
                        <p>Precio: {subasta.precio} €</p>
                        <div>
                            <button type="button" className="btn btn-danger">Añadir Lote</button>
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
                                <h1 className="h2">Añadir Subasta</h1>
                            </div>

                            <div className="album bg-light">
                                <div className="contenedor-subastas">
                                    <div className="row">   
                                        <form id="addForm"  onSubmit={this.enviar}>
                                            <div style={{display:'none'}} id="idmsAlert" className="alert alert-success col-sm-12"></div>
                                            <div className="form-group">
                                                <label for="titulo">Título</label>
                                                <input required onChange={this.changeState} type="text" className="form-control" placeholder="Título" ref={this.tituloRef}/>
                                            </div>
                                            <div className="form-group">
                                                <label for="descripcion">Descripción</label>
                                                <textarea onChange={this.changeState} className="form-control" rows="3" id="comment" placeholder="Descripción"ref={this.descripcionRef}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label for="precio">Precio</label>
                                                <input required onChange={this.changeState} type="number" className="form-control" placeholder="Precio" ref={this.precioRef}/>
                                            </div>
                                            <div className="form-group">
                                                <label for="fechaInicio">Fechia Inicio</label>
                                                <DateTimePicker format='yyyy-MM-dd HH:mm:ss' name="fechaInicio" className="date-time" onChange={this.changeFechaInicio} value={this.fechaInicioForm}/>
                                            </div>
                                            <div className="form-group">
                                                <label for="fechaInicio">Fechia Fin</label>
                                                <DateTimePicker format='yyyy-MM-dd HH:mm:ss' name="fechFin" className="date-time" onChange={this.changeFechaFin}    value={this.fechaFinForm}/>
                                            </div>

                                            <input type="submit" value="Siguiente" className="btn btn-primary" />   
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
export default AddSubasta;