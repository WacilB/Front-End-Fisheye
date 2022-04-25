function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/images/photographers/${portrait}`;

  function getUserCardDOM() {
    //Constante  éléments HTML
    const article = document.createElement("article");
    const h2= name;
    const h3 = `${city}, ${country}`;
    const h4 = tagline;
    const p = `${price}€/jour`;
    const alt = `Photo de profile de ${name}`;
    
    //Afficher les elements dans la balise article
    article.innerHTML =`
    <a href="photographer.html?id=${id}">
    <img src="${picture}" alt="${alt}">
    <h2>${h2}</h2>
    </a>
    <h3>${h3}</h3>
    <h4>${h4}</h4>
    <p>${p}</p>
    
    `

    return article;
  }
  return { name, picture, getUserCardDOM };
}

