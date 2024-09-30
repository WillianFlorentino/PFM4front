const urlBase = 'http://localhost:4000/projeto';

export async function gravarProjeto(projeto, token){
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        credentials: 'include',
        body: JSON.stringify(projeto)
    });
    
    if (!resposta.ok) {
        const mensagemErro = await resposta.text(); 
        throw new Error(`Erro ao gravar projeto: ${mensagemErro}`);
    }
    
    return await resposta.json();

}

export async function buscaTodosProjetos(token){
    const resposta = await fetch(urlBase, {
      method: 'GET',
      headers: {
        'Authorization': token
      },
      credentials: 'include'
    });
  
    const dados = await resposta.json();
    console.log(dados); 
  
    return dados;
  }