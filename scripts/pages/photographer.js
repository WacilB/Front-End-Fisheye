/* eslint-disable */
async function init(){
    //Variables du DOM
    const photographHeader = document.querySelector(".header");
    const mediaSection = document.querySelector(".media");
    const $filterWrapper = document.querySelector(".filter");
    const listMedia = [];

    //récupérer les données du photographe
    const callApi = new Api("./data/photographers.json");

    //récupéré l'id du photographe en paramètre dans l'url
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get("id"));

    // Récupère les datas des photographes
    const photographerData = await callApi.getPhotographerById(id);
    const mediaData = await callApi.getMediasByPhotographerId(id);

    // List des médias du photograhe
    mediaData.forEach(mediaData => {
        if (mediaData.image) {
            listMedia.push(new Picture(mediaData));
        } else if (mediaData.video) {
            listMedia.push(new Video(mediaData));
        }
    });
    // Creation de l'objet photographe
    const photographer = new Photographer(photographerData);
    photographer.portfolio = listMedia;
    photographer.templatePhotographer = new PhotographerTemplate(photographer);
    photographer.templatePortfolio = new ListMediaTemplate(photographer);
    photographer.templateModal = new ModalTemplate(photographer);
    photographer.templateFilter = new FilterSelectTemplate();

    // Insertion des element dans le DOM
    photographHeader.appendChild( photographer.templatePhotographer.createPhotographerHeader());
    mediaSection.appendChild(photographer.templatePortfolio.createListMedia());
    mediaSection.appendChild(photographer.templatePhotographer.createPhotographerModalPrice());
    mediaSection.appendChild(photographer.templateModal.createModalSection());
    $filterWrapper.appendChild(photographer.templateFilter.createFilter());


    initLightbox(photographer);
    const modal = new Modal(photographer.templateModal);
    const filter = new FilterSelect(photographer.templateFilter, photographer);
    modal.init(photographer.templatePhotographer._buttonModal);
    filter.init();

    const targetNode = photographer.templateFilter.observerNode;
    const config = { attributes: true, attributeFilter: ["data-filter-value"] };
    const observer = new MutationObserver(() => {
        photographer.templatePortfolio.refreshListMedia(() => {
            // Rafraichi la lightbox après avoir effectué un filtre
            initLightbox(photographer);
        });
    });
    observer.observe(targetNode, config);
}

function initLightbox (photographer) {
    photographer.portfolio.forEach(media => {
        const links = Array.from(media.template.mediaWarper.querySelectorAll("a"));
        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                }, 500);
                const lightbox = new Lightbox(photographer, media);
                lightbox.init();
            });
        });
    });


}


init();