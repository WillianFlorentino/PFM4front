import Pagina from "../Templates/Pagina";
import FormCadPlano from "./Formularios/FormCadPlano";
import TabelaPlanos from "./Tabelas/TabelaPlanos";
import { buscaTodosProjetos } from "../../servicos/projetoService";
import { ContextoUsuarioLogado } from "../../App";

import { useContext, useEffect, useState } from "react";


export default function TelaPlano(props){
    
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProjetos, setListaDeProjetos] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        buscaTodosProjetos(token).then((resposta) => {
            if (resposta.status) {
                setListaDeProjetos(resposta.listaProjetos);
            }
        })
    })


    return (
        <Pagina>
            <h1 className=" mb-02 text-center">Gestão de Planos</h1>
            {
                exibirTabela ? 
                <TabelaPlanos exibirTabela={exibirTabela} 
                setExibirTabela={setExibirTabela}
                listaDeProjetos={listaDeProjetos}/> 
                : 
                <FormCadPlano exibirTabela={exibirTabela} setExibirTabela={setExibirTabela}/>
            }
        </Pagina>
    );
        
}