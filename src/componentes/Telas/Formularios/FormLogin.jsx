import { Container, Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { login } from '../../../servicos/loginService';

import './Login.css';

export default function FormLogin(props) {
    const contexto = useContext(ContextoUsuarioLogado);
    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: ""
    });

    function realizarLogin(evento) {
        login(usuario.usuario, usuario.senha).then((resposta) => {
            if (resposta?.status) {
                contexto.setUsuarioLogado({
                    nome: usuario.usuario,
                    logado: true,
                    token: resposta.token,
                });
            } else {
                alert(resposta.mensagem);
            }
        }).catch((erro) => {
            alert(erro.message);
        });
        evento.stopPropagation();
        evento.preventDefault();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    }

    return (
        <div className="login-page">
            <div className="wrapper">
                <Form onSubmit={realizarLogin}>
                    <h1>Login</h1>
                    <Form.Group className="input-box" controlId="usuario">
                        <Form.Control
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Informe o nome do usuário"
                            value={usuario.nome}
                            onChange={manipularMudanca}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm3-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                    </Form.Group>
                    <Form.Group className="input-box" controlId="senha">
                        <Form.Control
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Informe a senha de acesso"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a3 3 0 0 0-3 3v3H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1V4a3 3 0 0 0-3-3zm1 6V4a1 1 0 0 0-2 0v3h2z" />
                        </svg>
                    </Form.Group>
                    <Button className="btn" type="submit">
                        Entrar
                    </Button>
                </Form>
                <div className="register-link">
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </div>
            </div>
        </div>
    );
}
