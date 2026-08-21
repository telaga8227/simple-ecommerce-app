import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
//import Header from './components/Header'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
//import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AddProduct from './Admin/addProduct'
//import AllProducts from './components/AllProducts'
import './App.css';

const App = () => (
  <BrowserRouter>  
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={RegisterForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Products" component={Products} />
      <Route exact path="/Cart" component={Cart}/>
      <Route exact path="/admin/products" component={AddProduct} />

      <Route path="/not-found" component={NotFound}/>
      
      <Redirect to="/not-found"/>
    </Switch>
  </BrowserRouter>
)

export default App;
