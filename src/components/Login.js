import React, { Component } from 'react';
import { PostData } from '../services/PostData';
import { CheckToken } from '../services/CheckToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter,faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'//import axios from 'axios';
import { faKey, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

class Login extends Component {

    emailRef = React.createRef();
    passwordRef = React.createRef();
    state = {
       user:{}
    }

    componentDidMount(){
        CheckToken("/subastas");
    }

    changeState = () =>{
        this.setState({
            user: {
                email:this.emailRef.current.value,
                password:this.passwordRef.current.value,
                getToken:false
            }
        })
    }

    login = (e) => {
        
        e.preventDefault();

        this.changeState();
        
        var errorMessage = $("#idmsAlert");

        PostData('user/login', this.state.user, 'POST', false).then((res) => {
            if(res.status!=='error'){
                errorMessage.html("<p>No existe el usuario.</p>").hide();           
                $(".card").height(300);

                localStorage.setItem('user',JSON.stringify(res));
                // eslint-disable-next-line
                this.setState({...this.state.user.getToken=true});
                this.saveToken();
            }else{
                errorMessage.html("<p>No existe el usuario.</p>").show();
                $(".card").height(356);
            }
        });
    }

    saveToken = ()=>{
        PostData('user/login', this.state.user,'POST', false).then((res) => {
            localStorage.setItem('token',JSON.stringify(res));
            window.location.assign("/subastas");
        });
    }

    render() {
        return (
            <div className="all">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><FontAwesomeIcon icon={faFacebook}/></span>
                                    <span><FontAwesomeIcon icon={faTwitter}/></span>
                                    <span><FontAwesomeIcon icon={faGoogle}/></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form  id="formValidation" onSubmit={this.login}>
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
                                        <input type="submit" value="Login" className="btn float-left offset-4 login_btn"/>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    ¿No tienes una cuenta?<a href="/registro">Regístrate</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Login;