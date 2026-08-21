import Cookies from 'js-cookie'
import { Redirect, Link } from 'react-router-dom'
import './index.css'

import Header from '../Header'
const Home = () => {
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
                return <Redirect to='/login' />
        }
        return (
                <>
                        <Header />
                        <h1 className="home-heading"> Welcome, you arrived to the right place. This is the place to shop</h1>
                        <div className="home-container">
                             {/*   <div className="item-card"><Link>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQom6ImZqauWdcLpF8HpmtWBtg4zSF49ZDzBpBizMGJBg&s=10"
                                                alt="mobiles"
                                                className="items-img"
                                        />
                                        <h3>Mobiles</h3></Link>

                                </div>
                                <div >
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>Fashion</h3>
                                </div>
                                <div>
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>Electronics</h3>
                                </div>
                                <div>
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>sports</h3>
                                </div>
                                <div>
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>Furniture</h3>
                                </div>
                                <div>
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>kids and Toys</h3>
                                </div>
                                <div>
                                        <img src=""
                                                alt=""
                                                className="items-img"
                                        />
                                        <h3>Home</h3>
                                </div>
                                */}
                        </div> 
                </>
        )

}

export default Home