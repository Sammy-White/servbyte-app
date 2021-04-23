import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { url } from '../auth/apiurl'
import Footer from '../footer/footer'
import TopNav from '../navbar/navbar'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'
import { meal } from '../actions/mealAction'

const Restaurant = ({match}) => {
    const id = match.params.id
    const history = useHistory()
    const dispatch = useDispatch()

    const [restaurant, setRestaurant] = useState({})
    const [meals, setMeals] = useState([])
    const [err, setErr] = useState("")
    const [show, setShow] = useState(true)
    
    //Current Restaurant
    useEffect(() => {
        fetch(url +'/provider/'+id, {
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
    }, [id])

    //Meals from current restaurant
    useEffect(() => {
        fetch(url + '/meals', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setMeals(data)
        }).catch((e) => {
            console.log(e)
        })
    },[])

    const resMeal = meals.filter((meal) => meal.restaurant === restaurant.name)  

    const addToCart = (mealData) => {
        const meals = localStorage.mealItem ? JSON.parse(localStorage.mealItem) : []
        const duplicate = meals.some((mealOne) => mealOne._id === mealData._id)

        if(!duplicate){
            meals.push(mealData)
            localStorage.setItem('mealItem', JSON.stringify(meals))
            dispatch(meal(meals))
            history.push('/cart')
        }else{
            setErr("Meal alrady in cart.")
            setShow(true)
        }
    }

    return(
        <div>
            <TopNav />
        <div style={{marginBottom:'80px'}}>
            <div className="restaurant">
                <div 
                    style={{ background:`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${restaurant.logo})`, height:'50vh'}}
                >
                </div>
                <div className="restaurant_details">
                    <h4>{restaurant.name} - {restaurant.city}</h4>
                    <div className="flex space-btw" style={{width:'300px'}}><span>{restaurant.email}</span>
                    <span>{restaurant.phone}</span></div>
                </div>
            </div>
            <div className="restaurant-container-food">
                {
                        err && show
                        ?
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Oh Sorry Duplicate Meal!</Alert.Heading>
                            <p>{err}</p>
                        </Alert>
                        :
                        null
                    }
                <h4>Meals</h4>
                <div className="restaurant_meals">
                    {
                       resMeal.map((res) => {
                            return(
                                <div className="card" key={res._id}>
                                    <img src={res.pics} alt="Avatar" width="100%" />
                                    <div className="container">
                                        <h5><b>{res.name}</b></h5>
                                        <p style={{ textAlign: 'justify' }}>{res.description}</p>
                                        <div className="flex space-btw"><span className="amount">₦{res.price}</span> <span className="time">{res.preparation_time}</span></div>
                                        <button 
                                            style={{cursor:'pointer', border:'none', backgroundColor:'white'}} 
                                            onClick={() => addToCart(res)}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="orange" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )
                       })
                    }
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default Restaurant