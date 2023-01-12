import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <p>
                <Link to={"/"}>Homepage</Link>
            </p>
            <p>
                <Link to={"/discovery"}>DiscoveryPage</Link>
            </p>
            <p>
                <Link to={"/login"}>Login</Link>
            </p>
            <p>
                <Link to={"/register"}>Register</Link>
            </p>
        </div>
    );
}

export default Navbar;