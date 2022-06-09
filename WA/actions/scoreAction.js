const url = "http://" + location.hostname + "/score"

window.actions = {};

window.actions.register = (userId, serverId, userName) => {
    fetch(url + "/" + userId + "/register", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            serverId, userName
        })
    });
}
window.actions.getScore = (userId) => {
    fetch(url + "/score/" + userId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    }).then((res)=>{
        return res
    })
}

window.actions.addScore = (userId, score) => {
    fetch(url + "/score/" + userId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            'score': score,
        })
    }).then((res)=>{
        return res
    })
}
