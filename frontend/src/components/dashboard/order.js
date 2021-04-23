import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useState } from 'react'
import ViewOrder from './vieworder'

const Order = () => {
    const orders = useSelector(state => state.orders.orders)
    const [modalShow, setModalShow] = useState(false)
    const [cart, setCart] = useState([])

    const getCart = (cart) => {
        setCart(cart)
    }


    return(
        <div>
            <Table responsive="sm">   
                <thead>
                    <tr>
                        <th>ORDER</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>Meal</th>
                        <th>TOTAL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length
                        ?
                        orders.map((order) => {
                            const date = moment(order.createdAt).format('DD/MM/YYYY')
                            const cart = order.cart
                            let total = 0
                            cart.map(cart => {

                                if(!cart.total_price){
                                    total += cart.price
                                }else{
                                    total += cart.total_price
                                }
                                return total
                            })

                            return(
                                <tr key={order._id}>
                                    <td>{order.paymentId}</td>
                                    <td>{date}</td>
                                    {order.delivered === false ? <td style={{ color: 'orange' }}>On Hold</td> : <td style={{ color: 'green' }}>Delivered</td>}
                                    <td>{cart.length}</td>
                                    <td>₦{total}</td>
                                    <td onClick={() => {setModalShow(true); getCart(cart)}} style={{cursor:'pointer'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td style={{textAlign:'center', paddingTop:'30px'}}>You have not place any order yet</td>
                        </tr>
                    }
                </tbody>
            </Table>
            <ViewOrder 
                show={modalShow}
                onHide={() => setModalShow(false)}
                cart={cart}
            />
        </div>
    )
}
export default Order