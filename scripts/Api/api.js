 class Api {
   
    constructor (url) {
      this._url = url
    }

    async getPhotographers () {
      return fetch(this._url)
        .then(response => response.json())
        .then(response => {
        
          return response.photographers
        })
        .catch(err => {
          throw new Error('La requete api getPhotographer a échoué : ', err)
        })
    }
  
}

