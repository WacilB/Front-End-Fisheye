// eslint-disable-next-line no-unused-vars
class Api {
   
    constructor (url) {
        this._url = url;
    }

    async getPhotographers () {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => {


                return response.photographers;
            })
            .catch(err => {
                throw new Error("La requete api getPhotographer a échoué : ", err);
            });
    }
    async getPhotographerById (userId) {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => {
                return response.photographers.filter(photographer => photographer.id === userId)[0];
            })
            .catch(err => {
                throw new Error("La requete api getPhotographer a échoué : ", err);
            });
    }
    async getMediasByPhotographerId (userId) {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => {
                return response.media.filter(media => media.photographerId === userId);
            })
            .catch(err => {
                throw new Error("La requete api getPhotographer a échoué : ", err);
            });
    }
}