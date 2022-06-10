const scoreUrl = "http://" + location.hostname + "/score"

const scoreActions = {
    addScore: (serverId,userId,score) =>
        fetch(scoreUrl+"/"+serverId+"/"+userId, {
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
        fetch(scoreUrl+"/"+serverId+"/"+userId)
}
