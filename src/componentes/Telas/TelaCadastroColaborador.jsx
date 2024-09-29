import { Alert } from "react-bootstrap";
import FormCadColaboradores from "./Formularios/FormCadColaborador";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaColaboradores from "./Tabelas/TabelaColaboradores";

import { consultarTodos } from "../../servicos/colaboradorService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroColaborador(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [colaboradorSelecionado, setColaboradorSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        categoria: {
            codigo: 0,
            descricao: ""
        },
        urlImagem: "",
        qtdEstoque: 0,
        dataValidade: "",
    });
    const [listaDeColaboradores, setListaDeColaboradores] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            setListaDeColaboradores(resposta.listaColaboradores);
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela]);
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Colaborador
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaColaboradores listaDeColaboradores={listaDeColaboradores} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setColaboradorSelecionado={setColaboradorSelecionado} 
                                        setAtualizarTela={setAtualizarTela}/> :
                        <FormCadColaboradores setExibirTabela={setExibirTabela}
                                         setModoEdicao={setModoEdicao}
                                         modoEdicao={modoEdicao}
                                         setColaboradorSelecionado={setColaboradorSelecionado}
                                         colaboradorSelecionado={colaboradorSelecionado}
                                         setAtualizarTela={setAtualizarTela} />
                }
            </Pagina>
        </div>
    );

}