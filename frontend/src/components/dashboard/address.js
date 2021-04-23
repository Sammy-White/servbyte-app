import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import { url } from '../auth/apiurl'
import { user } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

const Address = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.user.user)

    const validate = values => {
        const errors = {};

        if (!values.address) {
            errors.address = "Required"
        }
        return errors;
    };


    const formik = useFormik({
        initialValues: {
            address: "",
        },

        validate,
        onSubmit: values => {

            fetch(url + '/customer/address/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem("uuu"))
                },
                body: JSON.stringify(values)
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                console.log(data)
                dispatch(user(data))
            }).catch(function (e) {
                console.log(e)
            })
        },
    });


    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="address"
                        placeholder="Enter your delivery address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address || data.address}
                    />
                    {formik.touched.address && formik.errors.address ? (<div className="error-msg">{formik.errors.address}</div>) : null}
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Save Address
                </Button>
            </Form>
        </div>
    )
}
export default Address