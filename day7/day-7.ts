#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'



const getHandType = (hand: string) => {

  const charCountMap = new Map<string, number>();
  for (const char of hand) {
    const count = charCountMap.get(char) || 0;
    charCountMap.set(char, count + 1);
  }

  switch(charCountMap.size) {
    case 1: {
      return 6; // 5 of a kind
    }
    case 2: {
      if ([...charCountMap.values()].includes(4)) {
        return 5; // 4 of a kind
      } 
      if ([...charCountMap.values()].includes(3)) {
        return 4; // full house
      }
      break;
    }
    case 3: {
      if ([...charCountMap.values()].includes(3)) {
        return 3; // 3 of a kind
      } 
      if ([...charCountMap.values()].includes(2)) {
        return 2; // 2 pair
      }
      break;
    }
    case 4: {
      return 1; // one pair
    }
    case 5: {
      return 0; // high card
    }
  }

};

const getHandType2 = (hand: string) => {

  const charCountMap = new Map<string, number>();
  for (const char of hand) {
    const count = charCountMap.get(char) || 0;
    charCountMap.set(char, count + 1);
  }

  // console.log(charCountMap);
  // if(charCountMap.get('J')) {
  //   console.log(`what? : ${charCountMap.get('J')}`)
  // }
 

  switch(charCountMap.size) {
    case 1: {
      return 6; // 5 of a kind
    }
    case 2: {
      if ([...charCountMap.values()].includes(4)) {
        if(charCountMap.get('J')) return 6;
        return 5; // 4 of a kind
      } 
      if ([...charCountMap.values()].includes(3)) {
        if(charCountMap.get('J')) return 6;
        return 4; // full house
      }
      break;
    }
    case 3: {
      if ([...charCountMap.values()].includes(3)) {
        if(charCountMap.get('J')) return 5;
        return 3; // 3 of a kind
      } 
      if ([...charCountMap.values()].includes(2)) {
        if(charCountMap.get('J') == 2) return 5;
        if(charCountMap.get('J') == 1) return 4;
        return 2; // 2 pair
      }
      break;
    }
    case 4: {
      // if the pair is not J and j exists, make it 3 of a kind
      if(charCountMap.get('J')) return 3;
      return 1; // one pair
    }
    case 5: {
      // if one is a j, then set it to 1, one pair
      if (charCountMap.get('J')) return 1;
      return 0; // high card
    }
  }

};

const partOne = () => {
  const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

  let reader = rd.createInterface(fs.createReadStream('input.txt'));
  let allHands = [];

  reader.on('line', (line: string) => {
    let currentHand = line.trim().split(/[ ]+/g);

    allHands.push({
      cards: currentHand[0],
      hand: getHandType(currentHand[0]),
      bid: Number(currentHand[1])
    });

  });

  reader.on('close', () => {
    // console.log(allHands);
    allHands.sort((a, b) => a.hand - b.hand)
    // console.log(allHands);
    allHands.sort((a, b) => {

      if (a.hand === b.hand) {

        for (let i = 0; i < a.cards.length; i++) {
          console.log(`a char: ${a.cards.charAt(i)} b char: ${b.cards.charAt(i)}`)
          let aChar = a.cards.charAt(i);
          let bChar = b.cards.charAt(i);
          console.log('rank a ' + ranks.indexOf(aChar))
          console.log('rank b ' + ranks.indexOf(bChar))

          if(ranks.indexOf(aChar) < ranks.indexOf(bChar)) {
           
            console.log('returning 1')
            return 1;
          }
          if(ranks.indexOf(aChar) > ranks.indexOf(bChar)) {
            console.log('returning -1')
            return -1;
          }
         
        }
        console.log('returning 0')
        return 0;

      }
      return 0; // No change if hands are different
    });

    console.log(allHands);
    let totalWinnings = 0;
    for (let i = 0; i < allHands.length; i++) {
     
      let winnings = (allHands[i].bid * (i+1))
      totalWinnings += winnings;
    };
    console.log(`total winnings: ${totalWinnings}`)
  });
}

const partTwo = () => {

  const ranks = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

  let reader = rd.createInterface(fs.createReadStream('input.txt'));
  let allHands = [];

  reader.on('line', (line: string) => {
    let currentHand = line.trim().split(/[ ]+/g);

    allHands.push({
      cards: currentHand[0],
      hand: getHandType2(currentHand[0]),
      bid: Number(currentHand[1])
    });

  });

  reader.on('close', () => {
    // console.log(allHands);
    allHands.sort((a, b) => a.hand - b.hand)
    // console.log(allHands);
    allHands.sort((a, b) => {
      if (a.hand === b.hand) {
        for (let i = 0; i < a.cards.length; i++) {
          let aChar = a.cards.charAt(i);
          let bChar = b.cards.charAt(i);
          if(ranks.indexOf(aChar) < ranks.indexOf(bChar)) {
            return 1;
          }
          if(ranks.indexOf(aChar) > ranks.indexOf(bChar)) {
            return -1;
          }
        }
        return 0;
      }
      return 0; // No change if hands are different
    });

    let totalWinnings = 0;
    for (let i = 0; i < allHands.length; i++) {
      // console.log(`${allHands[i].cards} ${allHands[i].hand}`)
      let winnings = (allHands[i].bid * (i+1))
      totalWinnings += winnings;
    };
    console.log(`total winnings: ${totalWinnings}`)
  });
}

// partOne();
partTwo();


// 252618551 too high
// 252245606 too high
// 252235479
// 252143556
// 252113488
