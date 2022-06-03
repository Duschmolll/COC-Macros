
let resultObject = {
    encounterBool: false, encounterSize: 0, ressourceType: 'None', ressourceSize: 0, text: ''
}
let maisonDeVille = {
    name: 'Maison De Ville', encounterDice: '1d4', rationLuck: 4, rationDice: '1d6', ammoLuck: 5, ammoDice: '1d4', transportDice: '1d4'
};
let maisonEnCampagne = {
    name: 'Maison en Campagne', encounterDice: '1d4', rationLuck: 3, rationDice: '1d8', ammoLuck: 4, ammoDice: '1d4', transportDice: '1d6'
};
let entrepot = {
    name: 'Entrepôt / Industrie', encounterDice: '1d6', rationLuck: 1, rationDice: '1d4', ammoLuck: 2, ammoDice: '1d4', transportDice: '1d12'
};
let garage = {
    name: 'Garage / Station', encounterDice: '1d6', rationLuck: 1, rationDice: '1d4', ammoLuck: 2, ammoDice: '1d4', transportDice: '1d20'
};
let commerce = {
    name: 'Centre Commercial', encounterDice: '1d8', rationLuck: 3, rationDice: '1d12', ammoLuck: 5, ammoDice: '1d8', transportDice: '1d12'
};
let hopital = {
    name: 'Hôpital', encounterDice: '1d10', rationLuck: 4, rationDice: '1d10', ammoLuck: 0, ammoDice: '1d4', transportDice: '1d10'
};

let dialogEditor = new Dialog({
    title: `Building Loot Table`,
    content: ``,
    buttons: {
        maisonDeVille: {
            label: `Maison de Ville`,
            callback: () => {
                buildingChecking(maisonDeVille);
            }
        },
        maisonEnCampagne: {
            label: `Maison en Campagne`,
            callback: () => {
                buildingChecking(maisonEnCampagne);
            }
        },
        entrepot: {
            label: `Entrepôt / Industrie`,
            callback: () => {
                buildingChecking(entrepot);
            }
        },
        garage: {
            label: `Garage / Station`,
            callback: () => {
                buildingChecking(garage);
            }
        },
        commerce: {
            label: `Centre Commercial`,
            callback: () => {
                buildingChecking(commerce);
            }
        },
        hopital: {
            label: `Hôpital`,
            callback: () => {
                buildingChecking(hopital);
            }
        },
        close: {
            icon: "<i class='fas fa-tick'></i>",
            label: `Close`
        },
    },
    default: "close",
    close: () => { }

});


function buildingChecking(a) {
    let encRoll = new Roll('1d6');
    encRoll.evaluate();

    encRoll.result <= 2 ? (encNumRoll = new Roll(a.encounterDice), encNumRoll.evaluate(), resultObject.encounterBool = true, resultObject.encounterSize = encNumRoll.result)
        : resultObject.encounterBool = false;

    let ressRoll = new Roll("1d6");
    ressRoll.evaluate();

    ressRoll.result <= a.rationLuck ? (resultObject.ressourceType = 'Provisions', ressNumRoll = new Roll(a.rationDice), ressNumRoll.evaluate(), resultObject.ressourceSize = ressNumRoll.result)
        : ressRoll.result <= a.ammoLuck ? (resultObject.ressourceType = 'Munitions', ressNumRoll = new Roll(a.ammoDice), ressNumRoll.evaluate(), resultObject.ressourceSize = ressNumRoll.result)
            : (resultObject.ressourceType = 'Transports', ressNumRoll = new Roll(a.transportDice), ressNumRoll.evaluate(), resultObject.ressourceSize = ressNumRoll.result);

    resultObject.text = `<h1>${a.name}</h1>`
    resultObject.text += resultObject.encounterBool == true ? `<h2>Encounter !</h2>
        <div><i class="fas fa-dice-d20"></i> <strong>${resultObject.encounterSize}</a> formes indistinques apparaissent !</strong></div>` : '';
    resultObject.text += `<h2>Loot</h2>
    <div><i class="fas fa-dice-d20"></i> <strong>${resultObject.ressourceSize}</strong> point(s) de <strong>${resultObject.ressourceType}</strong></div>`;

    ChatMessage.create({
        user: game.user._id,
        whisper: [game.user._id],
        content: resultObject.text
    });
};




// buildingChecking(maisonDeVille);



dialogEditor.render(true);