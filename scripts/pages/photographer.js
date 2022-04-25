//mettre le code JavaScript lié à la page photographer.html

//récupéré l'id du photographe en paramètre dans l'url 
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id')); 
console.log(id);



async function sortby(photographers,id){


    //Filtre le Json et retourne seulement l'objet du bon photographe 
    let filter = photographers.filter(function (photographe){
        return photographe.id === id
    })
    console.log(filter);
}

async function init(){
    //récupérer les données du photographe
    const callApi = new Api("./data/photographers.json")
    const photographers = await callApi.getPhotographers()
    sortby(photographers, id)
}

init()

// async function displayPhotgraphes(photographersp){

//     console.log(photographersp)
// }
