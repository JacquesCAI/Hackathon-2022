const url = "http://" + location.hostname + "/score"

const actions = {
    register: (userId,serverId,userName) =>
        fetch(url+"/"+userId+"/register", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                serverId, userName
            })
        }),
    addScore: (userId,score) =>
        fetch(url+"/"+userId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                score
            })
        }),
    getScore: userId =>
        fetch(url+"/"+userId)
}
