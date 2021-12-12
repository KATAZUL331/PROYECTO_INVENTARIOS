import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navegacion from './componentes/Navegacion';
import Admin from './componentes/Admin';
import AdminListado from './componentes/AdminListado';
import Usuario from './componentes/Usuario';
import UsuarioListado from './componentes/UsuarioListado';
import ClienteListado from './componentes/ClienteListado';
import Cliente from './componentes/Cliente';
import Login from './componentes/Log';
import Index from './componentes/Index';
import Producto from './componentes/Producto';



function App(){
    return (
    <Router>

        <Navegacion/>
        <Route path='/' exact component={Login}/>
        <Route path='index' exact ccdomponent={Index}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/adminListado' exact component={AdminListado}/>
        <Route path='/usuario' exact component={Usuario}/>
        <Route path='/usuarioListado' exact component={UsuarioListado}/>
        <Route path='/cliente' exact component={Cliente}/>
        <Route path='/clienteListado' exact component={ClienteListado}/>
        <Route path='/producto' exact component={Producto}/>
        <Route path='/producto/' exact component={Producto}/>


        
        
    </Router>
    );
}

export default App;