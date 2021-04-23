import { useDispatch, useSelector } from 'react-redux'
import { PaystackButton } from 'react-paystack'
import { alert, checkout, meal } from '../actions/mealAction'
import { url } from '../auth/apiurl'
import Footer from '../footer/footer'
import TopNav from '../navbar/navbar'
import { isAuthenticated } from '../auth/auth'
import { useHistory } from 'react-router'
import { orders } from '../actions/ordersAction'

const Cart = () => {
    const mealItems = useSelector(state => state.meals.meal)  
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    const history = useHistory()

    //get cart total price
    let total = 0
    mealItems.map((meal) => {
        let price = ""
        if(!meal.total_price){
            price = parseFloat(meal.price)
            total += price
        }else{
            price = parseFloat(meal.total_price)  
            total += price
        }
        return total
    })

    //delete meal from cart
    const deleteMeal = (e) => {
        const index = e.target.value
        mealItems.splice(index, 1)
        localStorage.setItem('mealItem', JSON.stringify(mealItems))
        const mealData = JSON.parse(localStorage.getItem('mealItem'))
        dispatch(meal(mealData))
    }

    //increase meal quantity 
    const increment = (e) => {
        const id = e.target.value
        mealItems.map((meal) => {
            meal.total_price = 0
            if(meal._id === id){
                meal.plates++
                let price = meal.price
                meal.total_price = meal.plates*price
            }
            return meal.total_price
        })

        localStorage.setItem('mealItem', JSON.stringify(mealItems))
        const mealData = JSON.parse(localStorage.getItem('mealItem'))
        dispatch(meal(mealData))
    }

    const decrement = (e) => {
        const id = e.target.value
        let reducedPrice = 0
        mealItems.map((meal) => {
            if(meal._id === id){
                if(meal.plates <= 1){
                    return meal.plates =1
                }
                meal.plates--
                reducedPrice = meal.total_price - meal.price
                meal.total_price = reducedPrice
            }
            return meal.total_price
        })
        localStorage.setItem('mealItem', JSON.stringify(mealItems))
        const mealData = JSON.parse(localStorage.getItem('mealItem'))
        dispatch(meal(mealData))
    }

    //sucess message after checkout  
    const handleSuccess = () => {
        const successMsg = `Your order will be delivered at the appropriate time!`
        const meal = []
        const show = true
        dispatch(checkout(successMsg))
        dispatch(alert(show))
        localStorage.removeItem('mealItem')
        localStorage.setItem('mealItem', JSON.stringify(meal))
    }

    //get orders
    const getOrders = () => {
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
    }

    //create order
    const handleOrder = (data) => {
        fetch(url +'/create/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem("uuu"))  
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json()
        }).then((order) => {
            getOrders()
        }).catch((e) => {
            console.log(e)
        })
    }

    //paystack payment checkout
    const componentProps = {
        email: user.email,
        amount: total * 100,
        publicKey: 'pk_test_c7d72ac92694b22363454aadca383e84c275adc4',
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        text: "Contiue to checkout",
        onSuccess(response) {
            let ref = response.reference
            let paymentRef = ref.slice(0, 6)
            const data = {
                customer_name: user.name,
                cart: mealItems,
                paymentId: paymentRef,
                customer_email:user.email
            }

            handleOrder(data)
            handleSuccess()
            history.push('/food')
            console.log('success')
        },
        onClose: () => {
            console.log('Closed!')
        }
    };

    //show message when user is not authenticated
    const unAuthenticated = () => {
        history.push('/signin')
    }


    return(
        <div>
        <TopNav />
        <div className="cart_background">
        <div className="restaurant-container-food">
            <div className="restaurant_meals">
            <div className="cart_header_background">
                <div className="cart_header">
                    <h3>My Cart {mealItems.length}</h3>
                </div><hr />
                    {
                        mealItems.map((meal, index) => {
                            return(
                                <div key={meal._id}>
                                    <div className="cart_product">
                                        <div className="cart_product_flex_one flex space-btw">
                                            <div className="cart_product_details flex space-btw">
                                                <div className="cart_product_details_img">
                                                    <img src={meal.pics} alt="cart_img" />
                                                </div>
                                                <div className="cart_product_details_links">
                                                    <li className="one">{meal.name}</li>
                                                    <li className="three"><small>{meal.restaurant}</small></li>
                                                    {
                                                        !meal.total_price
                                                        ?
                                                        <li className="four"><span><b>₦{meal.price}</b></span></li>
                                                        :
                                                        <li className="four"><span><b>₦{meal.total_price}</b></span></li>
                                                    }
                                                </div>
                                            </div>
                                            <span><small>Free Delivery</small></span>
                                        </div>
                                        <div className="cart_product_flex_two flex space-btw">
                                            <div className="cart_product_action flex space-btw">
                                                <div className="qty">
                                                    <li><span><button value={meal._id} onClick={(e) => decrement(e)}>-</button></span></li>
                                                    <li><span id="value">{meal.plates}</span></li>
                                                    <li><span><button value={meal._id} onClick={(e) => increment(e)}>+</button></span></li>
                                                </div>
                                                <div className="remove">
                                                    <li id="remove"><span><button value={index} onClick={(e) => deleteMeal(e)}>REMOVE</button></span></li>
                                                </div>
                                            </div>
                                            <div>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div><hr />
                                </div>
                            )
                        })
                    }

                            <div className="order">
                                {
                                    isAuthenticated() && mealItems.length
                                    ?
                                    <PaystackButton className="paystack-button"  {...componentProps} />
                                    :
                                    <button onClick={unAuthenticated}>Continue to checkout</button>
                                }
                            </div>
                        </div>

                        <div>
                            <div className="cart_product_price_background">
                                <div className="cart_product_price_header">
                                    <h4>PRICE DETAILS</h4>
                                </div><hr />
                                <div className="price_items flex space-btw">
                                    <p>Price ({mealItems.length})</p>
                                    <p>₦{total}</p>
                                </div>

                                <div className="delivery_charges flex space-btw">
                                    <p>Delivery Charges</p>
                                    <p style={{ color: "green", fontWeight: "bold" }}>FREE</p>
                                </div><hr />
                                <div className="total_amt flex space-btw">
                                    <p>Total Amount</p>
                                    <p>₦{total}</p>
                                </div><hr />
                                <div>
                                    <p style={{ color: "green", fontWeight: "bold" }}>You will save 10% on this order</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default Cart