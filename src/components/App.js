import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './globalStyles';
import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./Home";
import NovaEntrada from "./NovaEntrada";
import NovaSaida from "./NovaSaida";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
                <Route path="/nova-entrada" element={<NovaEntrada />} />
                <Route path="/nova-saida" element={<NovaSaida />} />
            </Routes>
        </BrowserRouter>
    );
}