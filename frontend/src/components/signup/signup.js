import Footer from "../footer/footer"
import TopNav from "../navbar/navbar"
import { Link, useHistory } from 'react-router-dom'
import { useState } from "react"
import { useFormik } from 'formik'
import { url } from "../auth/apiurl"
import { useSelector } from "react-redux"

const Signup = () => {
    const [state, setState] = useState({email:""})
    const mealItems = useSelector(state => state.meals.meal)
    const history = useHistory()

    const validate = values => {   
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 7) {
            errors.password = 'Password should be a minimum of 7 characters length'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            fetch(url + '/create/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if (res.status === 400) {
                    return setState({ email: 'Email alrady exist!' })
                }
                return res.json()
            }).then((data) => {
                localStorage.setItem('uuu', JSON.stringify(data.token))
                
                if (mealItems.length) {
                    history.push('/cart')
                } else {
                    history.push('/dashboard')
                }
            }).catch((e) => {
                console.log(e)
            })
        },
    });

    return(
            <div>
                <TopNav />
                <div className="admin-login">
                    <form className="admin-form" onSubmit={formik.handleSubmit}>
                        <div className="admin-row">
                            <label htmlFor="email">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (<div className="error-msg">{formik.errors.name}</div>) : null}
                        </div>

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
                            {state ? <span style={{ color: 'red' }}>{state.email}</span> : null}
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

                        <button type="submit">Register</button>
                        <div className="home-signup"><Link to="/signin" className="signin_links">Already have an account? <span>Sign in</span></Link></div>
                    </form>
                </div>
                <Footer />
            </div>
    )
}
export default Signup