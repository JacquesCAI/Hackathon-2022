const url = "http://" + location.hostname + "/score"

const actions = {
    addScore: (serverId,userId,score) =>
        fetch(url+"/"+serverId+"/"+userId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                score
            })
        }),
    getScore: (serverId,userId) =>
        fetch(url+"/"+serverId+"/"+userId)
}
