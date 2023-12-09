#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'

const areAllZero = (arr: number[]): boolean => {
  return arr.every((value) => value === 0);
}

const getForwardValue = (lineExtrapolation) => {
  let nextValue = 0;
  for (let i = lineExtrapolation.length - 1; i > 0; i--) {
     nextValue = nextValue + lineExtrapolation[i - 1][ lineExtrapolation[i - 1].length - 1 ]
  }
  return nextValue;
}

const getBackwardValue = (lineExtrapolation) => {
  let nextValue = 0;
  for (let i = lineExtrapolation.length - 1; i > 0; i--) {
     nextValue = lineExtrapolation[i - 1][0] - nextValue
  }

  return nextValue;
}

const partOne = () => {

  let nextValues = []
  let sumNextValues = 0;
  let reader = rd.createInterface(fs.createReadStream('input.txt'));

  reader.on('line', (line: string) => {
    let currentLine = line.split(/[ ]/g);
    let lineAsNumbers = currentLine.map((val) => Number(val));
    let lineExtrapolation = [];
    lineExtrapolation.push(lineAsNumbers);
    let differences = []
    do {
      for (let i = 1; i < lineAsNumbers.length; i++) {
        differences.push(lineAsNumbers[i] - lineAsNumbers[i - 1]);
      }
      lineExtrapolation.push(differences)
      if(areAllZero(differences)) {
        break;
      }
      lineAsNumbers = differences;
      differences = [];
    } while(true);

    // let nextValue = getForwardValue(lineExtrapolation);
    let nextValue = getBackwardValue(lineExtrapolation);

    sumNextValues += nextValue;
    nextValues.push(nextValue);
    // console.log(nextValues)

  });

  reader.on('close', () => {
    console.log(`sumNextValues: ${sumNextValues}`)
  });

}

partOne();
