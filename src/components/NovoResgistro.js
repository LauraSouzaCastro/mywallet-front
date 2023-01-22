import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UsuarioContext } from '../contexts/UsuarioContext.js';
import axios from 'axios';
export default function NovoRegistro({tipo}){
    const [clicado, setClicado] = useState(false);
    const [registro, setRegistro] = useState({ valor: "", descricao: "", tipo });
    const { usuario } = useContext(UsuarioContext);
    const navigate = useNavigate();
    function salvar(event) {
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/nova-${tipo}`, registro, { headers: { 'Authorization': `Bearer ${usuario.token}` } });
        requisicao.then(() => { setClicado(false); });
        requisicao.catch((res) => { alert(res.response.data.message); setClicado(false); });
        navigate("/home");
    }
    return (
        <ContainerEntrada>
            <Topo>
                Nova {tipo === 'saida' ? 'saída' : 'entrada'}
            </Topo>
            <Formulario onSubmit={salvar} clicado={clicado}>
                <input disabled={clicado} required type="number" placeholder="Valor" min="0.01" step="0.01" value={registro.valor} onChange={e => setRegistro({ ...registro, valor: e.target.value })} />
                <input disabled={clicado} required type="text" placeholder="Descrição" value={registro.descricao} onChange={e => setRegistro({ ...registro, descricao: e.target.value })}/>
                <button disabled={clicado} type="submit">Salvar {tipo === 'saida' ? 'saída' : 'entrada'}</button>
            </Formulario>
        </ContainerEntrada>
    );
}

const ContainerEntrada = styled.div`
    min-height: 100vh;
    background-color: #8C11BE;
    padding: 25px 24px 16px 24px;
`;
const Topo = styled.div`
    width: 100%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    
`;
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    margin: 40px 0px;
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance:textfield;
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