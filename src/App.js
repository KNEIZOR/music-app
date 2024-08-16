import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MusicApp from "./components/MusicApp";
import Login from "./components/Login";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/musicApp" element={<MusicApp />}/>
                    <Route path="*" element={<Login />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
