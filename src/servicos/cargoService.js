const urlBase = "http://localhost:4000/cargo";

export async function gravar(cargo, token) {
    const resposta = await fetch(urlBase,
        {
            method: "POST",
            headers: { 
                        "Content-Type": "application/json",
                        "Authorization": token
                     },
            credentials: 'include',
            body: JSON.stringify(cargo)
        });
    return await resposta.json();
}

export async function atualizar(cargo, token) {
    const resposta = await fetch(urlBase,
        {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
             },
            credentials: 'include',
            body: JSON.stringify(cargo)
        });
    return await resposta.json();
}

// export async function excluir(cargo, token) {
//     const resposta = await fetch(urlBase,
//         {
//             method: "DELETE",
//             headers: { 
//                 "Content-Type": "application/json",
//                 "Authorization": token
//              },
//             credentials: 'include',
//             body: JSON.stringify(cargo)
//         });
//     return await resposta.json();
// }

export async function excluir(codigo, token) {
    try {
        const resposta = await fetch(`${urlBase}/${codigo}`, { // Certifique-se de que o código está na URL
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
            credentials: 'include',
        });

        if (!resposta.ok) {
            // Lança um erro se a resposta não for OK
            const erroTexto = await resposta.json(); // Modificado para tratar como JSON
            throw new Error(erroTexto.mensagem || "Erro ao enviar a requisição");
        }

        return await resposta.json();
    } catch (erro) {
        throw new Error(erro.message || "Erro ao enviar a requisição");
    }
}


export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, 
        {
            method: "GET",
            headers: { 
                "Authorization": token
             },
             credentials: 'include'
        });
    return await resposta.json();
}