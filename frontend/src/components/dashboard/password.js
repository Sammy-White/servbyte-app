import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { useFormik } from 'formik'
import { url } from '../auth/apiurl'
import { useState } from 'react'

const Password = () => {
    const [state, setState] = useState({msg:""})
    const validate = values => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 7) {
            errors.password = 'Password should be a minimum of 7 characters length'
        }

        if (!values.second_password) {
            errors.second_password = 'Required';
        } else if (values.second_password.length < 7) {
            errors.second_password = 'Password should be a minimum of 7 characters length'
        } else if (values.second_password !== values.password) {
            errors.second_password = 'Password does not match'
        }


        return errors;
    };


    const formik = useFormik({
        initialValues: {
            password:"",
            second_password:""
        },

        validate,
        onSubmit: values => {
            const first_password={
                password:values.password
            }
            fetch(url + '/customer/password/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem("uuu"))
                },
                body: JSON.stringify(first_password)
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                if(data){
                    return setState({msg:'Password updated successfully!'})
                }
            }).catch(function (e) {
                console.log(e)
            })
        },
    });

    return(
        <div style={{ marginTop: '50px' }}>
            {state ? <p style={{ color: 'green', fontWeight: "bolder" }}>{state.msg}</p> : null}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                size="lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {
                                formik.touched.password && formik.errors.password
                                ?
                                (<div className="error-msg">{formik.errors.password}</div>)
                                :
                                null
                            }
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                name="second_password"
                                placeholder="Re-enter password"
                                size="lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.second_password}
                            />
                            {
                                formik.touched.second_password && formik.errors.second_password
                                ?
                                (<div className="error-msg">{formik.errors.second_password}</div>)
                                :
                                null
                            }
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Button variant="secondary" type="submit">
                    Change Password
                </Button>
            </Form>
        </div>
    )
}
export default Password