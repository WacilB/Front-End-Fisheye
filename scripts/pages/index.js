
async function init() {
    // Récupère-les datas des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // eslint-disable-next-line no-undef
    const callApi = new Api("./data/photographers.json");
    const  photographers  =  await callApi.getPhotographers();
    const tabPhotographers = [];
    console.log(photographersSection);
    // Création des objets photographer et insertion dans un tableau
    photographers.forEach(element => {
        // eslint-disable-next-line no-undef
        const photographer = new Photographer(element);
        tabPhotographers.push(photographer);
    });
    tabPhotographers.forEach(element => {
        // eslint-disable-next-line no-undef
        const photographerTemplate = new PhotographerTemplate(element);
        photographersSection.appendChild( photographerTemplate.createPhotographerCard());
    });
}
init().then(()=>console.log("Page ready "));