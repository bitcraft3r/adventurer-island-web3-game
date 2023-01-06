pragma solidity ^0.8.0;

contract Adv3nturers {

    // Stores the state of each challenge (not started, in progress, completed)
    uint8[] public challengeStates;

    // Stores the solutions to each challenge
    string[] public challengeSolutions;

    // The contract constructor initializes the challenges
    constructor() public {
        challengeStates = [0, 0, 0];
        challengeSolutions = ["future", "forest", "hiddenworld"];
    }

    // A function that allows players to start a challenge
    function startChallenge(uint8 challengeNumber) public {
        // Check if the challenge has already been started or completed
        require(challengeStates[challengeNumber] == 0, "Challenge already started or completed");
        // Update the challenge state to "in progress"
        challengeStates[challengeNumber] = 1;
    }

    // A function that allows players to submit a solution to a challenge
    function submitSolution(uint8 challengeNumber, string memory solution) public {
        // Check if the challenge has been started but not completed
        require(challengeStates[challengeNumber] == 1, "Challenge not started or already completed");
        // Check if the solution is correct
        require(challengeSolutions[challengeNumber] == solution, "Incorrect solution");
        // Update the challenge state to "completed"
        challengeStates[challengeNumber] = 2;
    }
    
    // A function that allows players to solve a riddle 
    function solveRiddle(uint8 challengeNumber, string memory solution) public {
        // Check if the challenge has already been started or completed
        require(challengeStates[challengeNumber] == 0, "Challenge already started or completed");
        // Check if the solution is correct
        require(challengeSolutions[challengeNumber] == solution, "Incorrect solution");
        // Update the challenge state to "completed"
        challengeStates[challengeNumber] = 2;
    }
    
    // A function that allows players to decode a cipher message
    function decodeCipher(uint8 challengeNumber, string memory solution) public {
        // Check if the challenge has already been started or completed
        require(challengeStates[challengeNumber] == 0, "Challenge already started or completed");
        // Check if the solution is correct
        require(challengeSolutions[challengeNumber] == solution, "Incorrect solution");
        // Update the challenge state to "completed"
        challengeStates[challengeNumber] = 2;
    }
}