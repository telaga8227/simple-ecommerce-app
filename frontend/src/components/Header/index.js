import { NavLink, Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
    const name = Cookies.get('user_name');
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('user_name')
        //const { history } = props
        //history.replace('/login')
        alert('Logged out successfully')
        setTimeout(() => {
            window.location.replace('/login')
        }, 1000)
    }
    const renderCartItemsCount = () => (
        <CartContext.Consumer>
            {value => {
                const { cartList } = value
                const cartItemsCount = cartList.length
                return (
                    <>
                        {cartItemsCount > 0 ? (
                            <span className="cart-count-badge">{cartList.length}</span>
                        ) : null}
                    </>
                )

            }}
        </CartContext.Consumer>
    )


    return (
        <CartContext.Consumer>
            {value => {
                {/*const { searchInput, changeSearchInput, enterSearchInput } = value
                const onKeyDownSearch = event => {
                    if (event.key === 'Enter') {
                        enterSearchInput()
                        props.history.push('./products')
                    }
                }*/}

                return (
                    <nav className="nav-header">
                        <div className="nav-content">
                            <Link to='/'>
                                <img className="nav-website-logo"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF6fpEYz80AuHz0Omu-7c9iAWHsTrigFRpH80ij2-ArGxf0uQCN91-kSK&s=10"
                                    alt="website-logo"
                                />
                            </Link>

                            <p className="user-name">Hello {name} </p>

                            {/*<input type="search" className="search" placeholder="search here"
                                value={searchInput}
                                onChange={(e) => changeSearchInput(e.target.value)}
                                onKeyDown={onKeyDownSearch} /> */}

                            <ul className="nav-menu">

                                
                                    <li className="nav-paths">
                                        <NavLink exact to='/' className= "nav-link" activeClassName="active">
                                        Home
                                        </NavLink>
                                    </li>
                                
                                <NavLink to='/Products' className= "nav-link" activeClassName="active">
                                    <li className="nav-paths">
                                        Products
                                    </li>
                                </NavLink>
                                <NavLink to='/Cart' className= "nav-link" activeClassName="active">
                                    <li className="nav-paths">
                                        Cart
                                        {renderCartItemsCount()}
                                    </li>
                                </NavLink>
                            </ul>
                            <button type="button" className="logout-button" onClick={onClickLogout}>Logout</button>
                        </div>
                    </nav>
                )
            }}
        </CartContext.Consumer>
    )
}
export default withRouter(Header)

