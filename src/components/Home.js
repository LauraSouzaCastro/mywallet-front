import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    function adicionarEntrada(){
        navigate("/nova-entrada");
    }
    function adicionarSaida(){
        navigate("/nova-saida");
    }
    return (
        <ContainerHome>
            <Topo>
                <h1>Olá, Fulano</h1>
                <ion-icon name="log-out-outline"></ion-icon>
            </Topo>
            <ContainerRegistros>
                <p>Não há registros de<br/>entrada ou saída</p>
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
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        margin: auto;
    }
`;