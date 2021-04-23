import { useSelector } from "react-redux"

const Dashboard = () => {
    const user = useSelector(state => state.user.user)

    return(
        <div>
            <p>Hello <b>{user.name}</b></p>
            <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        </div>
    )
}
export default Dashboard