import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Account from './account';
import Address from './address';
import Dashboard from './dashboard';
import Order from './order';
import { Switch, Route } from 'react-router-dom'
import Password from './password';
import TopNav from '../navbar/navbar';
import Footer from '../footer/footer';

const SideNav = () => {

    
    return(
        <div>
        <TopNav />
        <div
            style={{ display: 'flex', height: 'auto', overflow: 'scroll initial', marginTop:'70px' }}
        >
        <div className="row">
            <div className="col-2">
            <CDBSidebar textColor="black" backgroundColor="#ffffff">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                Dashboard
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/dashboard" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/account" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-user-alt">Account</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/order" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-shopping-cart">Orders</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/change-password" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-user-edit">Password</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/address" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-map-marker-alt">
                               Address
                            </CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                
            </CDBSidebar>
                </div>
                <div className="col-9 sidenav_main">
                   <Switch>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/account' component={Account} />
                        <Route exact path='/order' component={Order} />
                        <Route exact path='/change-password' component={Password} />
                        <Route exact path='/address' component={Address} />
                   </Switch>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default SideNav