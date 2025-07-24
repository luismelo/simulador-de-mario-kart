class Player {
    constructor(name, speed = 0, manuveability = 0, power = 0, points = 0) {
        this.name = name;
        this.speed = speed;
        this.manuveability = manuveability;
        this.power = power;
        this.points = points;
    }
}

const player1 = new Player('Mario', 4, 3, 3, 0);
const player2 = new Player('Luigi', 3, 4, 4, 0);

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) {
        return 'straight';
    } else if (random < 0.66) {
        return 'curve';
    } else {
        return 'confrontation';
    }
}

async function diceRollResult(charactername, block, diceResult, attribute) {
    console.log(`${charactername} rolled ${diceResult} in a ${block} and attribute ${attribute} resulting ${diceResult + attribute}\n`);
}

async function playRaceEngine(player1, player2) {
    for (let round = 0; round <= 5; round++) {
        console.log(`Round ${round + 1}:\n`);

        let block = await getRandomBlock();
        console.log(`O bloco é: ${block}\n`);

        let dice1 = await rollDice();
        let dice2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block == 'straight') {
            totalTestSkill1 = player1.speed + dice1;
            totalTestSkill2 = player2.speed + dice2;
            await diceRollResult(player1.name, block, dice1, player1.speed);
            await diceRollResult(player2.name, block, dice2, player2.speed);

            console.log(`${player1.name} is racing straight with speed: ${totalTestSkill1}\n`);
            console.log(`${player2.name} is racing straight with speed: ${totalTestSkill2}\n`);

            if (totalTestSkill1 > totalTestSkill2) {
                player1.points++; 
             } else if (totalTestSkill2 > totalTestSkill1) {
                player2.points++; 
            }
        }

        if (block == 'curve') {
            totalTestSkill1 = player1.manuveability + dice1;
            totalTestSkill2 = player2.manuveability + dice2;

            await diceRollResult(player1.name, block, dice1, player1.manuveability);
            await diceRollResult(player2.name, block, dice2, player2.manuveability);

            console.log(`${player1.name} is navigating a curve with manuveability: ${totalTestSkill1}\n`);
            console.log(`${player2.name} is navigating a curve with manuveability: ${totalTestSkill2}\n`);
            if (totalTestSkill1 > totalTestSkill2) {
                player1.points++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                player2.points++;
            }  
        }

        if (block == 'confrontation') {
            totalTestSkill1 = player1.power + dice1;
            totalTestSkill2 = player2.power + dice2;
            console.log(`${player1.name} confronted: ${player2.name}`);

            if (totalTestSkill1 > totalTestSkill2 && player2.points > 0 ) {
                console.log(`${player1.name} attacks ${player2.name} and reduces their points by 1!\n`);
                player2.points--;
            }

            if (totalTestSkill2 > totalTestSkill1 && player1.points > 0) {
                console.log(`${player2.name} attacks ${player1.name} and reduces their points by 1!\n`);
                player1.points--;
            }  

            if (totalTestSkill1 == totalTestSkill2) {
                console.log('It\'s a tie in the confrontation!\n');
            }

            await diceRollResult(player1.name, block, dice1, player1.power);
            await diceRollResult(player2.name, block, dice2, player2.power);
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${player1.name} wins this round!\n`);
            player1.points++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${player2.name} wins this round!\n`);
            player2.points++;
        } else {
            console.log('It\'s a tie!\n');
        }
    }
}

async function displayFinalResults(player1, player2) {
    console.log('Final Results:\n');
    console.log(`${player1.name} Points: ${player1.points}\n`);
    console.log(`${player2.name} Points: ${player2.points}\n`);

    if (player1.points > player2.points) {
        console.log(`${player1.name} is the winner!\n`);
    } else if (player2.points > player1.points) {
        console.log(`${player2.name} is the winner!\n`);
    } else {
        console.log('It\'s a tie!\n');
    }
}

(async function main() {
    console.log('Let the race BEGIN!...\n');
    console.log(`${player1.name} VERSUS ${player2.name}\n`);

    await playRaceEngine(player1, player2);
    await displayFinalResults(player1, player2);
    console.log('Thanks for playing!\n');
})();

