import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

import './Pagina.css'

export default function Pagina(props) {
    return (
        <>
            <Cabecalho titulo="Sistema EcoMais" />
            <Menu />
            <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                <Container>
                    {props.children}
                </Container>
            </div>
           
        </>
        
    );
}
