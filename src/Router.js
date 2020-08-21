import React, {Component} from 'react';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import login from './components/Login';
import registro from './components/Registro';
import subastas from './components/Subastas';
import subasta from './components/AddSubasta';
import lote from './components/AddLote';
import articulo from './components/AddArticulo';
import pujas from './components/Pujas';

class Router extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={login} />
                    <Route exact={true} path="/registro" component={registro} />
                    <Route exact={true} path="/subastas" component={subastas} />
                    <Route exact={true} path="/pujas" component={pujas} />
                    <Route exact={true} path="/subasta" component={subasta} />
                    <Route exact={false} path="/lote/:subastaId" component={lote} />
                    <Route exact={false} path="/articulo/:loteId" component={articulo} />
                </Switch>
          </BrowserRouter>
        );
    }
}

export default Router;