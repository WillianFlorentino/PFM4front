export async function buscarTodasPartesInteressadas(token){

    const resposta = await fetch("http://localhost:4000/parteinteressada",
        {
            method: "GET",
            headers: {
                "Authorization": token
            
             },
             credentials: 'include'
        }
    );

    return await resposta.json();
};

