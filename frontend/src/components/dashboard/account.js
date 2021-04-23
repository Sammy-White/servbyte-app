import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { url } from '../auth/apiurl'
import { user } from '../actions/userAction'

const Account = () => {
    const data = useSelector(state => state.user.user)  
    const name = data.name
    const email = data.email

    const dispatch = useDispatch()

    const validate = values => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required"
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.phone) {
            errors.phone = "Required"
        }

        return errors;
    };


    const formik = useFormik({
        initialValues: {
            name: name,
            email: email,
            phone: "",
        },

        validate,
        onSubmit: values => {

            fetch(url + '/customer/main/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem("uuu"))
                },
                body: JSON.stringify(values)
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                dispatch(user(data))
            }).catch(function (e) {
                console.log(e)
            })
        },
    });

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control 
                                type="text" 
                                name="name" 
                                placeholder="name" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (<div className="error-msg">{formik.errors.name}</div>) : null}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control 
                                type="email" 
                                name="email" 
                                placeholder="Email address" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (<div className="error-msg">{formik.errors.email}</div>) : null}
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control 
                                type="text" 
                                name="phone" 
                                placeholder="Phone" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone ? (<div className="error-msg">{formik.errors.phone}</div>) : null}
                        </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                </Form.Row>
                <Button variant="secondary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    )
}
export default Account