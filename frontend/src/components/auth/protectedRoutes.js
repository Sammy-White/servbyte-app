import { Redirect, Route } from "react-router"
import { isAuthenticated } from "./auth"

const ProtectedRoutes = ({component: Component, ...rest}) => {

    return(
        <Route {...rest} render={
            props => isAuthenticated()
                ?
                (<Component {...props} />)
                :
            (<Redirect to={{ pathname: '/' }} />)
        }
        />
    )
}
export default ProtectedRoutes