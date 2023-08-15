import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header>
            <div className="nav-area">
                <Link to="/" className="logo">
                    Distributed Systems
                </Link>
                <Navbar/>
            </div>
        </header>
    );
};

export default Header;
