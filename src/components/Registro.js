import React, { Component } from 'react';
import { PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import '../assets/css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter,faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'//import axios from 'axios';
import { faUser, faKey, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

class Registro extends Component {
    
    emailRef = React.createRef();
    passwordRef = React.createRef();
    nombreRef=React.createRef();

    componentDidMount(){
        CheckToken("/subastas");
    }

    state = {
       user:{}
    }

    changeState = () =>{
        this.setState({
            user: {
                email:this.emailRef.current.value,
                password:this.passwordRef.current.value,
                nombre:this.nombreRef.current.value,
                getToken:false
            }
        })
    }

    registro = (e) => {
        e.preventDefault();
        var errorMessage = $("#idmsAlert");
        this.changeState();

        PostData('user/register', this.state.user,'POST', false).then((res) => {
            if(res.status!=='error'){
                errorMessage.html("<p>El usuario ya existe.</p>").hide();
                $(".card").height(300);
                console.log(res);
                this.login();
        
            }else{
                errorMessage.html("<p>El usuario ya existe.</p>").show();
                $(".card").height(356);
                console.log(res);
            }
        });
    }

    login = () =>{
        PostData('user/login', this.state.user,'POST', false).then((res) => {
            if(res.status!=='error'){
                localStorage.setItem('user',JSON.stringify(res));
                // eslint-disable-next-line
                this.setState({...this.state.user.getToken=true});
                this.saveToken();
            }else{
                console.log(res);
            }
        });

    }

    saveToken = ()=>{
        PostData('user/login', this.state.user,'POST', false).then((res) => {
            //console.log(res);
            localStorage.setItem('token',JSON.stringify(res));
            console.log(localStorage.getItem('user'));
            console.log(localStorage.getItem('token'));
            window.location.assign('/subastas');
        });
    }

    render() {
        return (
            <div className="all">

            
            <div className="container">
                 <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Registro</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><FontAwesomeIcon icon={faFacebook}/></span>
                                    <span><FontAwesomeIcon icon={faTwitter}/></span>
                                    <span><FontAwesomeIcon icon={faGoogle}/></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form  id="formValidation" onSubmit={this.registro}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                                        </div>
                                        <input type="text" required className="form-control" placeholder="Nombre" ref={this.nombreRef} onChange={this.changeState}/>
                                        
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faMailBulk}/></span>
                                        </div>
                                        <input type="email" required className="form-control" placeholder="email" ref={this.emailRef} onChange={this.changeState}/>
                                        
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faKey}/></span>
                                        </div>
                                        <input type="password" required className="form-control" placeholder="password" ref={this.passwordRef} onChange={this.changeState}/>
                                    </div>
                                    <div style={{display:'none'}} id="idmsAlert" className="alert alert-danger col-sm-12"></div>

                                    <div className="form-group">
                                        <input type="submit" value="Registro" className="btn float-left offset-4 login_btn"/>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Registro;