import location from '../../images/icons/geo-alt-fill.svg'
import phone from '../../images/icons/telephone-fill.svg'
import envelope from '../../images/icons/envelope-fill.svg'

const Footer = () => {
    return(
        <div className="footer">
            <div className="inner-footer">
                <div className="footer-items">     
                    <h3>Quick Links</h3>
                    <div className="border1"></div>
                    <ul className="links">
                        <li>Food</li>
                        <li>Laundry</li>
                        <li>Pharmacy</li>
                        <li>Grocery</li>
                    </ul>
                </div>

                <div className="footer-items">
                    <h3>Contact us</h3>
                    <div className="border1"></div>
                    <ul className="links">
                        <li><img src={location} alt="img" /> Servbyte Inc.</li>
                        <li><img src={phone} alt="img" /> +23411440226</li>
                        <li><img src={envelope} alt="img" /> servbyte.com.ng</li>
                    </ul>

                </div>

            </div>
        </div>
    )
}
export default Footer