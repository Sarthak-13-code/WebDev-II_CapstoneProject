import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <div style={{
            background: dark ? "#0f172a" : "#1e293b",
            color: "white",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <h2>AI Dashboard</h2>

            <button onClick={toggleTheme}>
                {dark ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    );
}

export default Navbar;