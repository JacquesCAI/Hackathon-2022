let currentScore = null;

WA.onInit().then(() => {
    const loadingP = document.getElementById("loadingP");
    loadingP.style.display = "none";

    const catalogDiv = document.getElementById("catalog");
    catalogDiv.style.display = "block";

    const queryString = location.search;
    const queryObject = queryString.substring(1).split("&").reduce((acc,query) => ({
        ...acc,
        [query.split("=")[0]]: query.split("=")[1]
    }), {})

    const mode = queryObject.mode??"default";

    Promise.all([
        catalogActions.getCatalog(location.hostname,WA.player.id, mode)
            .then(data => data.json()),
        scoreActions.getScore(location.hostname,WA.player.id)
            .then(data => data.json())
    ]).then(([catalog,score]) => {
        currentScore = score;
        document.getElementById("currentScore").innerText = "Score actuel : "+score+" jetons";
        hydrateItems(catalog);
        showCatalog(catalogDiv,catalog)
    })
})

const currentItemsByKey = {};

const formatItemAttr = {
    price: value => value+"€",
    qte: value => value === 0 ? "Vous n'en avez aucun" : "Vous en avez déjà "+value
}

const categoriesLabel = {
    accessory: "Accessoires",
    mode: "Mode",
    skin: "Skins"
}

function hydrateItems(catalog) {
    for (const items of Object.values(catalog)) {
        for (const [key,item] of Object.entries(items)) {
            currentItemsByKey[key] = item;
        }
    }
}

function showCatalog(div, catalog) {
    div.innerHTML = "";
    for (const [category,items] of Object.entries(catalog)) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("categoryDiv");

        const h2 = document.createElement("h2");
        h2.innerText = categoriesLabel[category]+" :";

        categoryDiv.appendChild(h2);

        div.appendChild(categoryDiv);

        for (const [itemKey, item] of Object.entries(items)) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("itemDiv");

            const h3 = document.createElement("h3");
            h3.innerText = item.name;

            itemDiv.appendChild(h3);

            for (const attr of ['price','qte']) {
                const attrDiv = document.createElement("div");
                attrDiv.innerText = formatItemAttr[attr](item[attr]);
                itemDiv.appendChild(attrDiv);
            }


            if (item.available) {
                const buyButton = document.createElement("input");
                buyButton.type = "button";
                buyButton.value = "Acheter";

                buyButton.addEventListener("click", () => {
                    if (!confirm("Voulez vous vraiment acheter cet article ?"))
                        return;

                    catalogActions.buyItem(location.hostname,WA.player.id,itemKey).then(res => {
                        if (res.status !== 201) {
                           console.log("Error "+res.status+" when attempt to buyItem");
                           alert("Erreur "+res.status);
                        }

                        currentScore -= item.price;

                        document.getElementById("currentScore").innerText = "Score actuel : "+currentScore+" jetons";

                        currentItemsByKey[itemKey].qte += 1;

                        for (const item of Object.values(currentItemsByKey)) {
                            item.available = item.price <= currentScore
                        }

                        showCatalog(div,catalog);
                    });
                })
                itemDiv.appendChild(buyButton);
            } else {
                const notAvailableDiv = document.createElement("div");
                notAvailableDiv.innerText = "Vous ne pouvez pas acheter cet article"
                itemDiv.appendChild(notAvailableDiv);
            }

            div.appendChild(itemDiv);
        }
    }
}