/**
 * 
 * Characters have 3 attributes: STR, AGI, WIS
 * STR: Determines attack damage
 * AGI: Decreases damage received, plus chance to dodge attack
 * WIS: Chance to deal critical hit
 * 
 */

class Character {
    constructor(name){
        this.name = name;
        this.hitpoints = 100;
        this.strength = 0;
        this.agility = 0;
        this.wisdom = 0;
        this.damageBase = 5;
        this.damageAttack = this.damageBase;
        this.damageDefence = 0;
        // this.
    }
    generateStat(number){
        return Math.floor(Math.random()*number) + 1; // returns 1 to number; enter value above 1
    }
}

class Adventurer extends Character {
    constructor(name){
        super(name);
        this.strength = this.generateStat(10);
        this.agility = this.generateStat(10);
        this.wisdom = this.generateStat(10);
        this.damageAttack += this.strength;
        this.damageDefence += this.agility / 2;
        // % chance to get critical hit = 2.5% to 25%
        this.luck = this.wisdom / 40;
        // critical hit dmg = noraml dmg + 5 dmg + randomized dmg based on strength
        this.criticalHitDamageExtra = this.damageBase + this.generateStat(this.strength);
    }
    attack(defender){
        let baseDmg = this.damageAttack - defender.damageDefence;
        let finalDmg;
    
        if (Math.random() < this.luck){ // 2.5% to 25% chance to deal critical damage
            finalDmg = baseDmg + this.criticalHitDamageExtra;
            console.log(`CRITICAL HIT!`)
        } else finalDmg = baseDmg;
    
        if (Math.random() < this.agility/20){ // 5% - 50% chance to dodge
            finalDmg = 0;
            console.log(`DOGED!!!`);
        } else defender.hitpoints -= finalDmg;

        console.log(`${this.name} attacked for ${finalDmg} damage. ${defender.name} has ${defender.hitpoints}HP left.`)
    }
    battle(defender){
        while (this.hitpoints > 0 && defender.hitpoints > 0){
            this.attack(defender);
            defender.attack(this);
        }
        if (this.hitpoints <= 0 && defender.hitpoints <= 0){
            console.log(`it's a tie`) 
        } else if (this.hitpoints <= 0 && defender.hitpoints > 0) console.log(`${defender.name} wins!`);
        else if (this.hitpoints > 0 && defender.hitpoints <= 0) console.log(`${this.name} wins!`);
    }
}

let player = new Adventurer("Hero");
let computer = new Adventurer("Nemesis");
console.log(player);
console.log(computer);

player.battle(computer);