// RPG Turn-based battle

class Character {
    constructor(){
        this.hitpoints = 100;
        this.strength = 1;
        this.agility = 1;
        this.wisdom = 1;
    }
    attack(){
        
    }
}

class Spawn extends Character {
    consturctor(){
        super();
        this.drops = [];
        this.gold = 1;
    }
    transmogrify(){
        // if hero has unfair advantage, give spawn bonus stats
    }
}

class Hero extends Character {
    consturctor(){
        super();
        this.bag = [];
        this.gold = 0;
        this.skills = {};
    }
    special(){

    }
    active(){

    }
    passive(){

    }
}

class Warrior extends Hero {}
class Archer extends Hero {}
class Wizard extends Hero {}

function createHero() {

}

function startBattle() {

}