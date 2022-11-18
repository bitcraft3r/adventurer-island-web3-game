// fight logic
// calculate damange attack, received, and bonuses for damage and rewards
// determine winner

// - how would you model your `adventurer`? Your adventurer will want a **name** and **hitpoints**. What else would your adventurer need?
let adventurer = {
    name: "Brian",
    hitpoints: 10,
}
// - how would you model an `ogre`? Your ogre will want **hitpoints**.
let ogre = {
    hitpoints: 15,
}

// - Write a very small program that will simulate a battle between your adventurer and an ogre.
function ogreAttacks() {
    adventurer.hitpoints -= 1;
}

function adventurerAttacks() {
    ogre.hitpoints -= 2;
}

function battle(adv, ogr) {

    console.log(`Battle starting with ADV @ ${adv.hitpoints} HP, and OGR @ ${ogr.hitpoints} HP`);

    while (adv.hitpoints > 0 && ogr.hitpoints > 0) { // both alive, continue game
        ogreAttacks(); // ogre attacks adv
        adventurerAttacks(); // adv attacks ogre
        console.log(`ADV has ${adv.hitpoints} HP, and OGR has ${ogr.hitpoints} HP`);
    }

    console.log(`Battle ended with ADV @ ${adv.hitpoints} HP, and OGR @ ${ogr.hitpoints} HP`);
}

battle(adventurer, ogre);