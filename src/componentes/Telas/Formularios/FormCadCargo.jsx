import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../../App';
import { gravar, atualizar } from '../../../servicos/cargoService';

export default function FormCadCargos(props) {
    const [cargo, setCargo] = useState(props.cargoSelecionado);
    const [validado, setValidado] = useState(false);
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function manipularMudanca(evento) {
        setCargo({
            ...cargo,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                gravar(cargo,token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
            else {
                atualizar(cargo, token).then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setCargoSelecionado( { codigo: 0, descricao: "" });
                    props.setExibirTabela(true);

                    setValidado(false);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }

        }
        else{
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col md={2}>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    onChange={manipularMudanca}
                                    value={cargo.codigo}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código do cargo!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Cargo:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição do cargo"
                                    id="descricao"
                                    name="descricao"
                                    onChange={manipularMudanca}
                                    value={cargo.descricao}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição do cargo!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit" variant='success'>Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}