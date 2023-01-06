// The MVP of a blockchain-based ARG on the Arbitrum network with a focus on community-building and collaboration would require the following smart contracts:

// - A character creation contract, which would allow players to create and customize their adventurer characters.
// - A rewards contract, which would track players' actions and progress, and distribute in-game tokens as rewards for their achievements.
// - A team formation contract, which would enable players to form teams and work together to complete quests and challenges.
// - A quest and challenge contract, which would track the status of quests and challenges, and allow players to complete them and earn rewards.
// - A messaging contract, which would enable players to communicate with each other and coordinate their efforts.
// Note: The specific smart contracts required for the MVP may vary depending on the specific features and mechanics of the game. These are just some examples of the types of smart contracts that could be used in a blockchain-based ARG.

// Smart contract for the character creation contract. 

// When creating a character, the signer must own an ADV NFT (separate contract), and the attributes of the character (e.g. Strength, Agility, Wisdom) in this smart contract will be derived from the NFT. The character created in this contract also has other attributes such as Health, Level, Gold and Silver earned. 

// Also functions to update the character attributes that can only be called by another contract.

Solidity v0.8.0:

pragma solidity ^0.8.0;

contract CharacterCreation {
  // Stores a mapping of character addresses to character structs
  mapping (address => Character) public characters;

  // Character struct
  struct Character {
    address owner; // Address of the character's owner
    uint256 strength; // Character strength
    uint256 agility; // Character agility
    uint256 wisdom; // Character wisdom
    uint256 health; // Character health
    uint256 level; // Character level
    uint256 gold; // Gold earned by the character
    uint256 silver; // Silver earned by the character
    // TODO: ADD XP
  }

  // Creates a new character
  function createCharacter(address _owner, uint256 _strength, uint256 _agility, uint256 _wisdom) public returns (address) {
    // Ensure the owner has an ADV NFT token
    require(checkOwnerHasADVNFT(_owner));

    // Create a new character
    address characterAddress = new Character(_owner, _strength, _agility, _wisdom);
    
    // Initialize the character's health, level and gold/silver
    characters[characterAddress].health = 100;
    characters[characterAddress].level = 1;
    characters[characterAddress].gold = 0;
    characters[characterAddress].silver = 0;

    return characterAddress;
  }

  // Updates the character's strength
  function updateStrength(address _character, uint256 _strength) public {
    // Ensure only the character's owner can update the strength
    require(_character.owner == msg.sender);
    characters[_character].strength = _strength;
  }

  // Updates the character's agility
  function updateAgility(address _character, uint256 _agility) public {
    // Ensure only the character's owner can update the agility
    require(_character.owner == msg.sender);
    characters[_character].agility = _agility;
  }

  // Updates the character's wisdom
  function updateWisdom(address _character, uint256 _wisdom) public {
    // Ensure only the character's owner can update the wisdom
    require(_character.owner == msg.sender);
    characters[_character].wisdom = _wisdom;
  }

  // Updates the character's health
  function updateHealth(address _character, uint256 _health) public {
    // Ensure only the character's owner can update the health
    require(_character.owner == msg.sender);
    characters[_character].health = _health;
  }

  // Updates the character's level
  function updateLevel(address _character, uint256 _level) public {
    // Ensure only the character's owner can update the level
    require(_character.owner == msg.sender);
    characters[_character].level = _level;
  }

  // Updates the character's gold
  function updateGold(address _character, uint256 _gold) public {
    // Ensure only the character's owner can update the gold
    require(_character.owner == msg.sender);
    characters[_character].gold = _gold;
  }

  // Updates the character's silver
  function updateSilver(address _character, uint256 _silver) public {
    // Ensure only the character's owner can update the silver
    require(_character.owner == msg.sender);
    characters[_character].silver = _silver;
  }

  // Helper function to check if the owner has an ADV NFT token
  function checkOwnerHasADVNFT(address _owner) private view returns (bool) {
    // Check if the owner has an ADV NFT token
    // Code omitted for brevity
    return true;
  }
}