const url = "http://"+location.hostname+"/score"

window.actions = {};

window.actions.register = (userId,serverId,userName) =>
    fetch(url+"/"+userId+"/register", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            serverId, userName
        })
    });