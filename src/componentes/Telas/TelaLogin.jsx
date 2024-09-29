import { Container } from "react-bootstrap";
import FormLogin from "./Formularios/FormLogin";

export default function TelaLogin(props) {
    return (
        <div className="login-page">
            <Container className='login-container d-flex align-items-center justify-content-center'>
                <FormLogin />
            </Container>
        </div>
    );
}