import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { orders } from './components/actions/ordersAction';
import { user } from './components/actions/userAction';
import { url } from './components/auth/apiurl';
import ProtectedRoutes from './components/auth/protectedRoutes';
import Cart from "./components/cart/cart"
import SideNav from './components/dashboard/sidenav';
import Food from "./components/food/food"
import Home from "./components/home/home"
import Restaurant from "./components/restaurant/restaurant"
import Signin from "./components/signin/signin"
import Signup from "./components/signup/signup"

const App = () => {
  const dispatch = useDispatch()

  //Get Customer Profile
  useEffect(() => {
    fetch(url + '/customer/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem("uuu"))
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      dispatch(user(data))
    }).catch((e) => {
      console.log(e)
    })
  }, [dispatch])

  //get user orders
  useEffect(() => {
    fetch(url + '/order/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem("uuu"))
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      dispatch(orders(data))
    }).catch((e) => {
      console.log(e)
    })
  },[dispatch])


  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/food" component={Food} />
          <Route exact path="/restaurant/:id" component={Restaurant} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />  
          <ProtectedRoutes component={SideNav} />
        </Switch>
      </Router>
  );
}

export default App;     