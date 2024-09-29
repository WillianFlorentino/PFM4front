import { Alert } from "react-bootstrap";
import FormCadCargos from "./Formularios/FormCadCargo";

import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaCargos from "./Tabelas/TabelaCargos";
import { consultarTodos } from "../../servicos/cargoService";
import { ContextoUsuarioLogado } from "../../App";
export default function TelaCadastroCargo(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [cargoSelecionado, setCargoSelecionado] = useState({ codigo: 0, descricao: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeCargos, setListaDeCargos] = useState([]);
    
    useEffect(() => {
        consultarTodos(contextoUsuario.usuarioLogado.token).then((resposta) => {
            if (resposta.status){
                setListaDeCargos(resposta.listaCargos);
            }
            else{
                alert(resposta.mensagem);
            }
        })
    }, [listaDeCargos]);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Cargos
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCargos listaDeCargos={listaDeCargos} 
                                          setExibirTabela={setExibirTabela} 
                                          cargoSelecionado={cargoSelecionado}
                                          setCargoSelecionado={setCargoSelecionado}
                                          setModoEdicao={setModoEdicao}/> :
                        <FormCadCargos setExibirTabela={setExibirTabela}
                                           cargoSelecionado={cargoSelecionado}
                                           setCargoSelecionado={setCargoSelecionado}
                                           setModoEdicao={setModoEdicao} 
                                           modoEdicao={modoEdicao}/>
                }
            </Pagina>
        </div>
    );
}