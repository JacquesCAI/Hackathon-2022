/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

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

    WA.room.onEnterLayer('vipInfoZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("VipZonePopup","Vous avez accès à la zone VIP!",[]);
    })

    WA.room.onLeaveLayer('infoZone').subscribe(closePopUp)
    
    WA.room.onLeaveLayer('vipInfoZone').subscribe(closePopUp)

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
