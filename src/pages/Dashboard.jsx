import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";

function Dashboard() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [day, setDay] = useState("");
    const [productivity, setProductivity] = useState("");

    const { dark } = useContext(ThemeContext);

    useEffect(() => {
        fetch("/mockData.json")
            .then((res) => res.json())
            .then((result) => setData(result));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredData = data.filter((item) =>
        item.day.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const total = data.reduce((sum, item) => sum + item.productivity, 0);
    const avg = data.length ? (total / data.length).toFixed(2) : 0;
    const maxDay =
        data.length > 0
            ? data.reduce((max, item) =>
                  item.productivity > max.productivity ? item : max
              )
            : null;

    const handleAdd = (e) => {
        e.preventDefault();
        if (!day || !productivity) return;

        const newEntry = {
            day,
            productivity: Number(productivity),
        };

        setData([...data, newEntry]);
        setDay("");
        setProductivity("");
    };

    const cardStyle = {
        flex: 1,
        padding: "15px",
        borderRadius: "8px",
        background: dark ? "#1e293b" : "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center"
    };

    return (
        <div
            style={{
                display: "flex",
                background: dark ? "#020617" : "#f1f5f9",
                color: dark ? "white" : "black",
                minHeight: "100vh"
            }}
        >
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Navbar />

                <div style={{ padding: "25px", maxWidth: "900px", margin: "auto" }}>
                    
                    <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

                    {/* 🔹 Stats */}
                    <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
                        <div style={cardStyle}>
                            <h4>Total</h4>
                            <p>{total}</p>
                        </div>

                        <div style={cardStyle}>
                            <h4>Average</h4>
                            <p>{avg}</p>
                        </div>

                        <div style={cardStyle}>
                            <h4>Best Day</h4>
                            <p>{maxDay ? maxDay.day : "-"}</p>
                        </div>
                    </div>

                    {/* 🔹 Form */}
                    <div style={{
                        marginBottom: "20px",
                        padding: "15px",
                        borderRadius: "8px",
                        background: dark ? "#1e293b" : "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    }}>
                        <h3>Add Entry</h3>

                        <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <input
                                type="text"
                                placeholder="Day"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                style={{ padding: "8px", flex: 1 }}
                            />

                            <input
                                type="number"
                                placeholder="Productivity"
                                value={productivity}
                                onChange={(e) => setProductivity(e.target.value)}
                                style={{ padding: "8px", flex: 1 }}
                            />

                            <button type="submit" style={{ padding: "8px 12px" }}>
                                Add
                            </button>
                        </form>
                    </div>

                    {/* 🔹 Search */}
                    <input
                        type="text"
                        placeholder="Search by day..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "8px",
                            width: "100%",
                            marginBottom: "15px",
                            borderRadius: "6px"
                        }}
                    />

                    {/* 🔹 Data List */}
                    <div style={{
                        padding: "15px",
                        borderRadius: "8px",
                        background: dark ? "#1e293b" : "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    }}>
                        <h3>Productivity Data</h3>

                        {filteredData.length === 0 ? (
                            <p>No results found</p>
                        ) : (
                            filteredData.map((item, index) => (
                                <p key={index} style={{ padding: "5px 0" }}>
                                    {item.day} — {item.productivity}
                                </p>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;