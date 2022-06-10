const catalogUrl = "http://" + location.hostname + "/catalog"

const catalogActions = {
    getCatalog: (serverId,userId,mode) =>
        fetch(catalogUrl+"/"+serverId+"/"+userId+"?mode="+mode),
    buyItem: (serverId,userId,itemKey) =>
        fetch(catalogUrl+"/"+serverId+"/"+userId+"/"+itemKey, {
            method: "PUT"
        })
}