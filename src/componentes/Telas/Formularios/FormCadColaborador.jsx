import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../../busca/CaixaSelecao';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { atualizar, gravar } from '../../../servicos/colaboradorService'
import InputMask from 'react-input-mask';

export default function FormCadColaboradores(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [cargoSelecionado, setCargoSelecionado] = useState(props.colaboradorSelecionado.cargo);
    const [colaborador, setColaborador] = useState(props.colaboradorSelecionado);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento){
        setColaborador({
            ...colaborador,
            [evento.target.name]: evento.target.value
        });
    }

    //máscara

    

    function manipularSubmissao(evento){
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if(formulario.checkValidity()){
            const dados = { ...colaborador, cargo: cargoSelecionado };
            if(!props.modoEdicao){
                gravar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);    
                    }
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
                
            }
            else{
                atualizar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setModoEdicao(false);
                    setColaborador({
                        codigo: 0,
                        nome: "",
                        cpf: 0,
                        contato: 0,
                        cargo: {
                            codigo: 0,
                            descricao: ""
                        },
                        endereco: "",
                        bairro: "",
                        numero: "",
                        dataNascimento: "",
                        email: ""
                    })
                    props.setColaboradorSelecionado({ codigo: 0,
                        nome: "",
                        cpf: 0,
                        contato: 0,
                        cargo: {
                            codigo: 0,
                            descricao: ""
                        },
                        endereco: "",
                        bairro: "",
                        numero: "",
                        dataNascimento: "",
                        email: ""});
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
            }
            setValidado(false);
        }
        else{
            setValidado(true);
        }
        evento.stopPropagation();
        evento.preventDefault();    
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="codigo">
                    <Form.Label style={{ color: 'white' }} >Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={colaborador.codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do colaborador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12" controlId="nome">
                    <Form.Label style={{ color: 'white' }} >Nome:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={colaborador.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o Nome do Colaborador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="cpf">
                    <Form.Label style={{ color: 'white' }} >CPF:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="cpf"></InputGroup.Text>
                        <InputMask
                            mask="999.999.999-99" // Define a máscara para CPF
                            value={colaborador.cpf}
                            onChange={manipularMudanca}
                        >
                            {() => (
                                <Form.Control
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    aria-describedby="cpf"
                                    required
                                />
                            )}
                        </InputMask>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o CPF!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="contato">
                    <Form.Label style={{ color: 'white' }} >Contato:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="contato"></InputGroup.Text>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={colaborador.contato}
                            onChange={manipularMudanca}
                        >
                            {() => (
                                <Form.Control
                                    type="text"
                                    id="contato"
                                    name="contato"
                                    aria-describedby="contato"
                                    required
                                />
                            )}
                        </InputMask>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o contato!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="endereco">
                    <Form.Label style={{ color: 'white' }} >Endereço:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="endereco">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="endereco"
                            name="endereco"
                            aria-describedby="endereco"
                            onChange={manipularMudanca}
                            value={colaborador.endereco}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o Endereço!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="bairro">
                    <Form.Label style={{ color: 'white' }} >Bairro:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="bairro"></InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="bairro"
                            name="bairro"
                            aria-describedby="bairro"
                            onChange={manipularMudanca}
                            value={colaborador.bairro}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o bairro!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="numero">
                    <Form.Label style={{ color: 'white' }} >Número:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="numero"></InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="numero"
                            name="numero"
                            aria-describedby="numero"
                            onChange={manipularMudanca}
                            value={colaborador.numero}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o número!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="dataNascimento">
                    <Form.Label style={{ color: 'white' }} >Data Nascimento:</Form.Label>
                    <InputMask
                        mask="99/99/9999"
                        value={colaborador.dataNascimento}
                        onChange={manipularMudanca}
                    >
                        {() => (
                            <Form.Control
                                type="text"
                                id="dataNascimento"
                                name="dataNascimento"
                                aria-describedby="dataNascimento"
                                required
                            />
                        )}
                    </InputMask>
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de nascimento do colaborador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="email">
                    <Form.Label style={{ color: 'white' }} >E-mail:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={colaborador.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o E-mail do colaborador!</Form.Control.Feedback>
                </Form.Group>
                <Col md={8}>
                    <Form.Label style={{ color: 'white' }} >Cargo:</Form.Label>
                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/cargo"} 
                                  campoChave={"codigo"}
                                  campoExibicao={"descricao"}
                                  funcaoSelecao={setCargoSelecionado}
                                  localLista={"listaCargos"}
                                  tokenAcesso={contextoUsuario.usuarioLogado.token}/>
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}