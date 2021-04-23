import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { isAuthenticated } from '../auth/auth'
import { url } from '../auth/apiurl'

const TopNav = () => {
    const history = useHistory()
    const avatar = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>

    const handleHome = () => {
        history.push('/')
    }

    const handleFood = () => {
        history.push('/food')
    }

    const handleLogin = () => {
        history.push('/signin')
    }

    const handleRegister = () => {
        history.push('/signup')
    }

    const onLogout = () => {
        fetch(url + '/customer/logout', {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('uuu'))
            }
        }).then(function (res) {
            
            if (res.status === 200) {
                localStorage.removeItem('uuu')
                history.push('/')
            }
            return res.json()
        }).then(function (data) {
            // console.log(data)
        }).catch(function (e) {
            // console.log(e)
        })
    }


    return(
        <div>
        {
            isAuthenticated()
            ?
            <div className="topnav">
            <Navbar className="topnav" collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand ><b style={{ color: 'red', cursor: 'pointer' }} onClick={handleHome}>SERVBYTE</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }} onClick={handleFood}>Food</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Laundry</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Pharmacy</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Grocery</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={avatar} id="basic-nav-dropdown" className="user">
                            <li className="dashboard"><Link to="/dashboard">Dashboard</Link></li>
                            <li  style={{cursor:'pointer'}} onClick={onLogout}>Logout</li>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
            :
            <div className="topnav">
            <Navbar  collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand ><b style={{ color: 'red', cursor: 'pointer' }} onClick={handleHome}>SERVBYTE</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }} onClick={handleFood}>Food</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Laundry</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Pharmacy</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }}>Grocery</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }} onClick={handleRegister}>Sign Up</Nav.Link>
                        <Nav.Link style={{ color: 'black', fontSize: '18px' }} onClick={handleLogin}>Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>  
            </Navbar>
            </div>
        }
        </div>
        
    )
}
export default TopNav