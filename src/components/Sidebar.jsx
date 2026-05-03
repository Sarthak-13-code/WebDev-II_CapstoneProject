import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div style={{
            width: "200px",
            background: "#0f172a",
            color: "white",
            height: "100vh",
            padding: "20px"
        }}>
            <h3>Menu</h3>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link></li>
                <li><Link to="/" style={{ color: "white" }}>Logout</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;