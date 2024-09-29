import TelaCadastroColaborador from "./componentes/Telas/TelaCadastroColaborador";
import TelaCadastroCargo from "./componentes/Telas/TelaCadastroCargo";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import TelaPlano from "./componentes/Telas/TelaPlano";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

export const ContextoUsuarioLogado = createContext(null);

function App() {
  
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    !usuarioLogado.logado ? 
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <TelaLogin />
    </ContextoUsuarioLogado.Provider> :
    <div className="App">
      <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        <BrowserRouter>
          <Routes>
            <Route path="/colaborador" element={<TelaCadastroColaborador />} />
            <Route path="/cargo" element={<TelaCadastroCargo />} />
            <Route path="/projeto" element={<TelaPlano />} />
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;