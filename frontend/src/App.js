import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navegacion from './componentes/Navegacion';
import Admin from './componentes/Admin';
import UsuarioListado from './componentes/UsuarioListado';
import Usuario from './componentes/Usuario';
import ClienteListado from './componentes/ClienteListado';
import Cliente from './componentes/Cliente';
import Login from './componentes/Login';
import Index from './componentes/Index'


function App(){
    return (
    <Router>

        <Navegacion/>
        <Route path='/' exact component={Login}/>
        <Route path='index' exact component={Index}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/usuarioListado' exact component={UsuarioListado}/>
        <Route path='/usuario' exact component={Usuario}/>
        <Route path='/cliente' exact component={Cliente}/>
        <Route path='/clienteListado' exact component={ClienteListado}/>

        
    </Router>
    );
}

export default App;