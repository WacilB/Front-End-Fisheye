
    async function init() {
        // Récupère-les datas des photographes
        const photographersSection = document.querySelector(".photographer_section");
        const callApi = new Api("./data/photographers.json")
        const  photographers  =  await callApi.getPhotographers();
        const tabPhotographers = []
        console.log(photographersSection)
       // Création des objets photographer et insertion dans un tableau
        photographers.forEach(element => {
            const photographer = new Photographer(element)
            tabPhotographers.push(photographer)
        })
        tabPhotographers.forEach(element => {
            const photographerTemplate = new PhotographerTemplate(element)
            photographersSection.appendChild( photographerTemplate.createPhotographerCard())
        })
    }
     init().then(()=>console.log("Page ready "))