import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from '../contexts/UsuarioContext.js';
import { useContext, useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';

export default function Home(){
    const navigate = useNavigate();
    const { usuario } = useContext(UsuarioContext);
    const [registros, setRegistros] = useState([]);
    const [saldo, setSaldo] = useState([]);
    useEffect(() => {
        const requisicao = axios.get(`${process.env.REACT_APP_API_URL}/home`, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then((res) => {setRegistros(res.data.registros); setSaldo(res.data.saldo);});
        requisicao.catch((res) => { alert(res.response.data); });
    }, [ usuario.token]);

    function adicionarEntrada(){
        navigate("/nova-entrada");
    }
    function adicionarSaida(){
        navigate("/nova-saida");
    }
    return (
        <ContainerHome>
            <Topo>
                <h1>Olá, {usuario.nome}</h1>
                <ion-icon name="log-out-outline"></ion-icon>
            </Topo>
            <ContainerRegistros registros={registros}>
                <Registros>{registros.map(m => <Registro key={m._id}><span><Data>{m.data}</Data>{m.descricao}</span><Valor tipo={m.tipo}>{m.valor}</Valor></Registro>)}</Registros>
                <p>Não há registros de<br/>entrada ou saída</p>
                <span><strong>SALDO</strong><Saldo saldo={saldo}>{saldo}</Saldo></span>
            </ContainerRegistros>
            <Rodape>
                <div onClick={adicionarEntrada}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova<br/>entrada</p>
                </div>
                <div onClick={adicionarSaida}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova<br/>saída</p>
                </div>
            </Rodape>
        </ContainerHome>
    );
}

const ContainerHome = styled.div`
    min-height: 100vh;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 25px 24px 16px 24px;
`;
const Topo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 31px;
    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    ion-icon{
        font-size: 30px;
        color: #FFFFFF;
    }
`;
const Rodape = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    div{
        width: 155px;
        height: 114px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        background-color: #A328D6;
        border-radius: 5px;
        padding: 10px;
        ion-icon{
            font-size: 30px;
        }
        p{
            padding-left: 4px;
        }
    }
`;
const ContainerRegistros = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    height: 66vh;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    justify-content: space-between;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        margin: auto;
        display: ${props => props.registros.length === 0 ? "flex" : "none"};
    }
    strong{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 17px;
        margin: 0px 15px;
    }
    span{
        display: flex;
        justify-content: space-between;
    }

`;
const Registro = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

const Data = styled.span`
    color: #C6C6C6;
    margin-right: 10px;
`;
const Valor = styled.span`
    color: ${props => props.tipo === 'saida' ? '#C70000' : '#03AC00'};
`;
const Saldo = styled.span`
    color: ${props => props.saldo < 0 ? '#C70000' : '#03AC00'};
    padding-right: 11px;
`;

const Registros = styled.div`
    width: 100%;
    height: 58vh;
    overflow-y: scroll;
    padding: 0px 12px
`;
