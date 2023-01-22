import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from 'react';
import { UsuarioContext } from '../contexts/UsuarioContext.js';
import axios from 'axios';

export default function Login() {
    const [clicado, setClicado] = useState(false);
    const [login, setLogin] = useState({ email: "", senha: "" });
    const { setUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();
    function entrar(event) {
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/`, login);
        requisicao.then((res) => {
            setUsuario(res.data);
            navigate("/home");
        });
        requisicao.catch((res) => { alert(res.response.data); setClicado(false); });
    }
    return (
        <ContainerLogin>
            <h1>MyWallet</h1>
            <Formulario onSubmit={entrar} clicado={clicado}>
                <input disabled={clicado} required type="email" placeholder="E-mail" value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} />
                <input disabled={clicado} required type="password" placeholder="Senha" value={login.senha} onChange={e => setLogin({ ...login, senha: e.target.value })}/>
                <button disabled={clicado} type="submit">Entrar</button>
            </Formulario>
            <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
        </ContainerLogin>
    );
}

const ContainerLogin = styled.div`
    min-height: 100vh;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
    a{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        text-decoration: none;
    }    
`;
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    margin: 24px 0px;
    input{
        width: 326px;
        height: 58px;
        background-color: ${props => props.clicado ? "#F2F2F2" : "#FFFFFF"};
        border-radius: 5px;
        border: none;
        margin-bottom: 13px;
        padding-left: 15px;
        font-size: 20px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
        color: ${props => props.clicado ? "#AFAFAF" : "#000000"};
    }
    button{
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        border-radius: 5px;
        border: none;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        margin-bottom: 12px;
        opacity: ${props => props.clicado ? "0.7" : "1"};
    }
`;