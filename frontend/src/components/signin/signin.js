import Footer from "../footer/footer"
import TopNav from "../navbar/navbar"
import {Link} from 'react-router-dom'
import { useState } from "react"
import { useFormik } from 'formik'
import { useHistory } from "react-router"
import { url } from "../auth/apiurl"
import { useSelector } from "react-redux"


const Signin = () => {
    const [state, setState] = useState({ loginErr: "" })
    const history = useHistory()
    const mealItems = useSelector(state => state.meals.meal)

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {  
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            fetch(url + '/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(function (res) {
                if (res.status === 400) {
                    return setState({ loginErr: "Unable to login!" })
                }
                return res.json()
            }).then(function (data) {
                localStorage.setItem('uuu', JSON.stringify(data.token))

                if (mealItems.length) {
                    history.push('/cart')
                } else {
                    history.push('/dashboard')
                }

            }).catch(function (e) {
                console.log(e)
            })
        },
    });

    return(
        <div>
            <TopNav />
            <div className="admin-login">
                <form className="admin-form" onSubmit={formik.handleSubmit}>
                    <span style={{ color: 'red', paddingLeft: '100px' }}>{state.loginErr}</span>
                    <div className="admin-row">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (<div className="error-msg">{formik.errors.email}</div>) : null}
                    </div>
                    <div className="admin-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (<div className="error-msg">{formik.errors.password}</div>) : null}
                        <small className="admin-forgot">Forgot password</small>
                    </div>

                    <button type="submit">Login</button>
                    <div className="home-signup"><Link to="/signup" className="signin_links">Don't have an account? <span>Sign up</span></Link></div>
                </form>
            </div>
            <Footer />  
        </div>
    )
}
export default Signin