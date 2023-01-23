import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Cadastro() {
    const [clicado, setClicado] = useState(false);
    const [cadastro, setCadastro] = useState({ nome: "", email: "", senha: "", senhaConfirmada: "" });
    const navigate = useNavigate();
    function cadastrar(event) {
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, cadastro);
        requisicao.then(() => navigate("/"));
        requisicao.catch((res) => { alert(res.response.data); setClicado(false); });
    }
    return (
        <ContainerCadastro>
            <h1>MyWallet</h1>
            <Formulario onSubmit={cadastrar} clicado={clicado}>
                <input disabled={clicado} required type="text" placeholder="Nome" value={cadastro.nome} onChange={e => setCadastro({ ...cadastro, nome: e.target.value })} data-test="name"/>
                <input disabled={clicado} required type="email" placeholder="E-mail" value={cadastro.email} onChange={e => setCadastro({ ...cadastro, email: e.target.value })} data-test="email"/>
                <input disabled={clicado} required type="password" placeholder="Senha" value={cadastro.senha} onChange={e => setCadastro({ ...cadastro, senha: e.target.value })} data-test="password"/>
                <input disabled={clicado} required type="password" placeholder="Confirme a senha" value={cadastro.senhaConfirmada} onChange={e => setCadastro({ ...cadastro, senhaConfirmada: e.target.value })} data-test="conf-password"/>
                <button disabled={clicado} type="submit" data-test="sign-up-submit">Cadastrar</button>
            </Formulario>
            <Link to="/">Já tem uma conta? Entre agora!</Link>
        </ContainerCadastro>
    );
}

const ContainerCadastro = styled.div`
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
        margin-bottom: 8px;
        opacity: ${props => props.clicado ? "0.7" : "1"};
    }
`;