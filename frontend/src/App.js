import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navegacion from './componentes/Navegacion';
import Admin from './componentes/Admin';
import AdminListado from './componentes/AdminListado';
import Usuario from './componentes/Usuario';
import UsuarioListado from './componentes/UsuarioListado';
import Cliente from './componentes/Cliente';
import ClienteListado from './componentes/ClienteListado';
import Proveedor from './componentes/Proveedor';
import ProveedorListado from './componentes/ProveedorListado';
import Login from './componentes/Log';
import Index from './componentes/Index';
import Producto from './componentes/Producto';
import Catalogo from './componentes/Catalogo';


function App(){
    return (
    <Router>

        <Navegacion/>
        <Route path='/' exact component={Login}/>
        <Route path='/index' exact component={Index}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/adminListado' exact component={AdminListado}/>
        <Route path='/usuario' exact component={Usuario}/>
        <Route path='/usuarioListado' exact component={UsuarioListado}/>
        <Route path='/cliente' exact component={Cliente}/>
        <Route path='/clienteListado' exact component={ClienteListado}/>
        <Route path='/proveedor' exact component={Proveedor}/>
        <Route path='/producto' exact component={Producto}/>
        <Route path='/catalogo' exact component={Catalogo}/>


        
        
    </Router>
    );
}

export default App;