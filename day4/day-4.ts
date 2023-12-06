#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'

const partOne = () => {
  let totalPoints = 0;
  var reader = rd.createInterface(fs.createReadStream('input.txt'));

  reader.on('line', (line: string) => {
    let cardPoints = 0;
    let numbers = line.split(':')[1].split('|');
    let winningNumbers = numbers[0].trim().split(/[ ]+/g);
    let myNumbers = numbers[1].trim().split(/[ ]+/g);
    const winners = winningNumbers.filter(num => myNumbers.includes(num));
    if (winners.length > 0) {
      cardPoints += 1;
      for (let i = 1; i < winners.length; i++){
        cardPoints *= 2;
      }
    }
    totalPoints += cardPoints;
  });

  reader.on('close', () => {
    console.log(totalPoints);
  });
};

const partTwo = () => {

  let cardsObject = {};
  let lineNumber = 0;

  let reader = rd.createInterface(fs.createReadStream('input.txt'));
  reader.on('line', (line: string) => {
    ++lineNumber;
    let numbers = line.split(':')[1].split('|');
    let winningNumbers = numbers[0].trim().split(/[ ]+/g);
    let myNumbers = numbers[1].trim().split(/[ ]+/g);
    const matchingNumbers = winningNumbers.filter(num => myNumbers.includes(num));

    cardsObject[lineNumber] = {
      matches: matchingNumbers.length,
      copiesWon: 0
    }
  });

  reader.on('close', () => {

    let copiesIndex = 0;

    for(let card in cardsObject) {
      console.log(card, cardsObject[card])
      if (cardsObject[card].matches > 0){
        for (let i=1; i <= cardsObject[card].matches; i++){
          let nextCard = Number(card) + i;
          cardsObject[nextCard].copiesWon++;
          // console.log(nextCard, cardsObject[nextCard])
        }
      }

      if (cardsObject[card].copiesWon > 0) {
        for (let i=1; i <= cardsObject[card].matches; i++){
          for (let j = 0; j < cardsObject[card].copiesWon; j++) {
            let nextCard = Number(card) + i;
            cardsObject[nextCard].copiesWon++;
            console.log(nextCard, cardsObject[nextCard])
          }
        }
      }

      // check here and break?
      if (cardsObject[card].matches == 0 && cardsObject[card].copiesWon == 0 ) {
        console.log('breaking? ')
        copiesIndex = Number(card);
        break;
      }
    }
    console.log(JSON.stringify(cardsObject))
    console.log(`copiesIndex : ${copiesIndex}`)
    let sum = Object.keys(cardsObject).length;
    copiesIndex = copiesIndex > 0 ? copiesIndex : sum
    for (let i = 1; i <= copiesIndex; i ++) {
      sum += cardsObject[i].copiesWon;
    }
    console.log(`total cards: ${sum}`)


  });

  
};


// partOne();
partTwo();
