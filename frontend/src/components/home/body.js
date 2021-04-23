import img1 from '../../images/icons/icon1.svg'
import img2 from '../../images/icons/icon2.svg'
import img3 from '../../images/icons/icon3.svg'

const Body = () => {
    return(
        <div className="body">
            <h1 style={{textAlign:'center', marginBottom:'50px'}}>How it Works</h1>
            <div className="body-container">
                <div className="body-items">
                    <div>
                        <img src={img1} alt="pics" />
                        <h5>Choose a Category</h5>
                        <p>Select a category from the list of categories at the top</p>
                    </div>
                    <div>
                        <img src={img2} alt="pics" />
                        <h5>Browse your Restaurant</h5>
                        <p>Choose a restaurant from the available restaurant</p>
                    </div>
                    <div>
                        <img src={img3} alt="pics" />
                        <h5>Place an Order</h5>
                        <p>Make an order and get your meal delivered</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Body  