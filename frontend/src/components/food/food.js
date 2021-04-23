import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { url } from '../auth/apiurl'
import Footer from '../footer/footer'
import TopNav from '../navbar/navbar'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { alert } from '../actions/mealAction'

const Food = () => {
    const [cities, setCities] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [currentCity, setCurrentCity] = useState([])
    let currentRes = ""

    const dispatch = useDispatch()
    const successMsg = useSelector(state => state.meals.checkout )
    const alertMsg = useSelector(state => state.meals.alert)

    const handleCity = (e) => {
        setCurrentCity(e.target.value)
    }

    //Cities
    useEffect(() => {
        fetch(url+'/cities', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setCities(data[0].cities)
        }).catch((e) => {
            console.log(e)
        })
    },[])

    //Restaurants
    useEffect(() => {
        fetch(url + '/providers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setRestaurant(data)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const allRes = restaurant.filter((res) => res.city === currentCity)

    //Check out alert
    const handleAlert = () => {
        const show = false
        dispatch(alert(show))  
    }
    
    return(
        <div>
        <TopNav />
        <div style={{marginBottom:'100px', marginTop:"100px"}}>
        <div className="body-container-food">
            <h2 style={{textAlign:'center', marginBottom:'50px'}}>Servbyte Foods</h2>
            {
                successMsg && alertMsg
                ?
                <Alert variant="success" onClose={() => handleAlert()} dismissible>
                    <Alert.Heading>Payment Successful!</Alert.Heading>
                    <p>{successMsg}</p>
                    <p>Thanks for your patronage</p>
                </Alert>
                :
                null
            }
            <h5 style={{marginBottom: '20px' }}>Select your Preferred City</h5>
            <div className="food_city">
                <Form.Group>
                    <Form.Control as="select" size="lg" onChange={(e) => handleCity(e)}>
                        {
                            cities.map((city,i) => {
                                return <option  value={city} key={i}>{city}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </div>
            <div className="food_restaurant">
                <h5>Choose a Restaurant</h5>
                <div className="food_restaurants_info"> 
                    {
                        allRes.map((res) => {
                            currentRes = res
                                return (
                                    <div key={currentRes._id}>
                                        <Link to={`/restaurant/${currentRes._id}`} className="food_links">
                                        <img src={currentRes.logo} alt="pics" />   
                                        <p>{currentRes.name}</p>
                                        </Link>
                                    </div>
                                )
                        })
                    }
                    {currentRes === "" ? <div style={{textAlign:'center'}}><h4>Select your city to see available restaurant</h4></div>:null}
                </div>
            </div>
        </div>
        </div>
        <Footer />
        </div>
    )
}
export default Food