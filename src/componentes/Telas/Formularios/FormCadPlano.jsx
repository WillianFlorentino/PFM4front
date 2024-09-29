import { useEffect, useState, useContext } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import BarraBusca from "../../busca/BarraBusca";
import CaixaSelecao from "../../busca/CaixaSelecao";
import TabelaItensPlano from "../Tabelas/TabelaItensPlano";
import { buscarTodasPartesInteressadas } from "../../../servicos/parteinteressadaService";
import { ContextoUsuarioLogado } from "../../../App";
import { gravarProjeto } from "../../../servicos/projetoService";


export default function FormCadPlano(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [validado, setValidado] = useState(false);
    const [partesinteressadas, setPartesinteressadas] = useState([])
    const [parteinteressadaSelecionada, setParteinteressadaSelecionada] = useState({});
    const [colaboradorSelecionado, setColaboradorSelecionado] = useState({});

    
    

    useEffect(()=>{
        const token = contextoUsuario.usuarioLogado.token;
        buscarTodasPartesInteressadas(token).then((resposta)=>{
            if (resposta.status){
                setPartesinteressadas(resposta.listaPartesinteressadas);
            }
        })
    },[])

    //O estado venda possui correlação com a venda gerenciada no backend
    function pegaDataAtual(){
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    mes = mes < 10 ? `0${mes}`   : mes;
    let dia = dataAtual.getDate();
    return ano + '-' + mes + '-' + dia;
}
    const [plano, setPlano] = useState({
        codigo: 0,
        nomeprojeto: 0,
        parteinteressada: {},
        datainicio: pegaDataAtual(),
        totalcapital: 0,
        itens: [],
        funcao: "",
        
    });

    
    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setPlano({ ...plano, [alvo]: e.target.checked });
        }
        else {
            setPlano({ ...plano, [alvo]: e.target.value });
        }
    }

    
    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const token = contextoUsuario.usuarioLogado.token;
            gravarProjeto(plano, token).then((resposta) => {
                if(resposta.status){
                    alert(resposta.mensagem + " n° " + resposta.codigo);
                    props.setExibirTabela(true);
                }
                else{
                    alert(resposta.mensagem);
                }
            }).catch((erro) =>{
                alert(erro.message);
            })
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="idPlano">
                    <Form.Label style={{ color: 'white' }}>Projeto nº</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        defaultValue="0"
                        disabled
                        name="codigo"
                        value={plano.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="dataPlano">
                    <Form.Label style={{ color: 'white' }}>Nome do Projeto</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="nomeprojeto"
                        value={plano.nomeprojeto}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor o nome do Projeto.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="dataPlano">
                    <Form.Label style={{ color: 'white' }}>Data do Pedido</Form.Label>
                    <Form.Control
                        type="date"
                        required
                        name="datainicio"
                        value={plano.datainicio}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor informe a data do Plano.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="desconto">
                    <Form.Label style={{ color: 'white' }}>Capital Inicial do Projeto</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="0,00"
                        value={plano.totalcapital}
                        name="totalcapital"
                        onChange={manipularMudanca}
                        required
                         />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o valor total do pedido
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  as={Col} md="12" controlId="valorTotalTributos">
                    <Form.Label style={{ color: 'white' }}>Parte Interessada:</Form.Label>
                    <BarraBusca campoBusca={"nome"}
                        campoChave={"profissao"}
                        dados={partesinteressadas}
                        funcaoSelecao={(parteinteressada)=>{
                            setParteinteressadaSelecionada(parteinteressada);
                            setPlano({...plano, parteinteressada: parteinteressada});
                        }}
                        placeHolder={"Selecione uma Parte Interessada"}
                        valor={""} />
                </Form.Group>
            </Row>
            <Row>
                {
                    //Seção resposável por permitir que produtos sejam selecionados para a venda
                    //Demonstração de relacionamento muitos para muitos
                }
                <Container className="m-3 border">
                    <Row className="m-3">
                        <Col md={2}>
                            <Form.Label style={{ color: 'white' }}>Selecione um Colaborador</Form.Label>
                        </Col>
                        <Col>
                            <CaixaSelecao enderecoFonteDados={"http://localhost:4000/colaborador"}
                                campoChave={"codigo"}
                                campoExibicao={"nome"}
                                funcaoSelecao={setColaboradorSelecionado}
                                localLista={'listaColaboradores'}
                                tokenAcesso={contextoUsuario.usuarioLogado.token} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            //Seção ficará responsável por detalhar o produto selecionado
                        }
                        <Col md={10}>
                            <Row>
                                <Col md={1}>
                                    <Form.Group>
                                        <Form.Label style={{ color: 'white' }}>Código:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={colaboradorSelecionado?.codigo}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label style={{ color: 'white' }}>Nome do Colaborador:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        disabled
                                        value={colaboradorSelecionado?.nome}
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group as={Col} md="6" controlId="dataPlano">
    <Form.Label style={{ color: 'white' }}>Função</Form.Label>
    <Form.Control
        type="text"
        required
        name="funcao"
        value={plano.funcao}
        onChange={(e) => {
            setPlano({ ...plano, funcao: e.target.value });
        }}
    />
    <Form.Control.Feedback type="invalid">
        Por favor o nome do Projeto.
    </Form.Control.Feedback>
</Form.Group>
                        
                            
                                <Col md={1} className="middle">
                                    <Form.Group>
                                        <Form.Label style={{ color: 'white' }}>Integrar Colaborador</Form.Label>
                                        <Button onClick={() => {
                                            if (colaboradorSelecionado){
                                                setPlano({...plano, itens: [...plano.itens, {
                                                    "codigo": colaboradorSelecionado.codigo,
                                                    "nome": colaboradorSelecionado.nome,
                                                    "funcao": plano.funcao,
                                                }]});
                                            }
                                            
                                            //adicionar o item na lista de itens vendidos
                                            
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-bag-plus-fill"
                                                viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                            </svg>
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <p><strong>Lista de Colaboradores selecionados</strong></p>
                        <TabelaItensPlano
                            listaItens={plano.itens}
                            setPlano={setPlano}
                            dadosPlano={plano} />
                    </Row>
                </Container>
            </Row>
            <Button type="submit">Confirmar o Plano</Button> <Button variant="secondary" 
                                                                     onClick={
                                                                        () => props.setExibirTabela(true)
                                                                    }>Cancelar</Button>
        </Form>
    );
}