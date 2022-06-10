/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
bootstrapExtra();
import casino from "./casino";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('infoZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("infoPopup","Bienvenue dans la zone VIP!",[]);
    })


    WA.ui.registerMenuCommand('Votre classement',{
        iframe: '/ranking/index.html'
    })

    WA.room.onEnterLayer('vipInfoZone').subscribe(async () => {
        const playerId = WA.player.id;
        let chips = 0;

        await fetch(`http://localhost:80/score/${playerId}`)
            .then(res => res.json())
            .then(data => chips = data)
            .catch(err => console.log(err));
        
        if (chips > 1000) 
            currentPopup = WA.ui.openPopup("VipZonePopup","Vous avez accès à la zone VIP!",[]);
        else
            currentPopup = WA.ui.openPopup("VipZonePopup",`Il vous manque ${1000 - chips} jetons pour entrer dans la zone VIP!`,[]);
    })

    WA.room.onEnterLayer('vip-exit').subscribe(async () => {
        const playerId = WA.player.id;
        let chips = 0;

        await fetch(`http://localhost:80/score/${playerId}`)
            .then(res => res.json())
            .then(data => chips = data)
            .catch(err => console.log(err));

        if (chips > 999) 
            WA.nav.goToRoom("vip.json");
    })

    WA.room.onLeaveLayer('infoZone').subscribe(closePopUp)
    
    WA.room.onLeaveLayer('vipInfoZone').subscribe(closePopUp)

    casino();

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
