export default function casino() {
    WA.ui.registerMenuCommand('Votre classement',{
        iframe: '/ranking/index.html'
    })

    WA.room.website.create({
        name: "casino Script",
        url: "/casinoRegister/index.html",
        position: {
            x: -1,
            y: -1,
            width: 1,
            height: 1,
        },
        visible: true,
        allowApi: true,
        origin: "map",
        scale: 1,
    });
}