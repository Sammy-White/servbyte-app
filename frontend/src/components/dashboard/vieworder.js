import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

const ViewOrder = (props) => {
    const cart = props.cart
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-sizes-title-lg" style={{marginTop:'80px'}} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"><h4>My Orders</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Plates</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(meal => {
                                return (
                                    <tr key={meal._id}>
                                        <td><img src={meal.pics} alt="pics" width="50" height="50" /></td>
                                        <td>{meal.name}</td>
                                        <td>{meal.plates}</td>
                                        <td>{meal.price}</td>
                                        <td>{meal.category}</td>
                                        <td>{meal.description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}
export default ViewOrder