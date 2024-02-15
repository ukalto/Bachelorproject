import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import ChordSystem from "./routes/chord-system/ChordSystem";
import Kademlia from "./routes/kademlia/Kademlia";
import Berkeley from "./routes/berkeley/Berkeley";
import LamportsLogicalClocks from "./routes/lamports-logical-clocks/LamportsLogicalClocks";
import DiffieHellman from "./routes/diffie-hellman/DiffieHellman";
import CryptoSystem from "./routes/crypto-system/CryptoSystem";
import Greedy from "./routes/greedy/Greedy";
import Layout from "./components/Layout";
import 'react-toastify/dist/ReactToastify.css';
import VectorClock from "./routes/vector-clock/VectorClock.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="chord-system" element={<ChordSystem/>}/>
                    <Route path="kademlia" element={<Kademlia/>}/>
                    <Route path="berkeley" element={<Berkeley/>}/>
                    <Route path="lamports-logical-clocks" element={<LamportsLogicalClocks/>}/>
                    <Route path="vector-clock" element={<VectorClock/>}/>
                    <Route path="diffie-hellman" element={<DiffieHellman/>}/>
                    <Route path="crypto-system" element={<CryptoSystem/>}/>
                    <Route path="greedy" element={<Greedy/>}/>
                    <Route path="*" element={<p>Not found!</p>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;

