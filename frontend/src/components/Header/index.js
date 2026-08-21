import { Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
    const name = Cookies.get('user_name');
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('user_name')
        //const { history } = props
        //history.replace('/login')
        alert('Logged out successfully')
        setTimeout(()=>{
            window.location.replace('/login')
        },1000)
    }
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

                <input type="search" className="search" placeholder="searcg here"/>

                <ul className="nav-menu">

                    <Link to='/' className="nav-link">
                        <li className="nav-paths">
                            Home
                        </li>
                    </Link>
                    <Link to='/Products' className="nav-link">
                        <li className="nav-paths">
                            Products
                        </li>
                    </Link>
                    <Link to='/Cart' className="nav-link">
                        <li className="nav-paths">
                            Cart
                        </li>
                    </Link>
                </ul>
                <button type="button" className="logout-button" onClick={onClickLogout}>Logout</button>
            </div>
        </nav>
    )
}
export default withRouter(Header)