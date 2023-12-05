#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'

const reNumbers = /\d+/g;
const reSymbols = /([^0-9.])/g;
let sumOfParts = 0;
let currentLine = null;
let lineToCheck = null;
let lineBeforeLineToCheck = null;


var reader = rd.createInterface(fs.createReadStream('input.txt'));

reader.on('line', (line: string) => {
  currentLine = {line: line, numbers: {}, symbols: {}};
  // find and index numbers for the current line
  let match;
  while ((match = reNumbers.exec(line)) != null) {
    currentLine.numbers[match.index] = match[0];
  }
  while((match = reSymbols.exec(line)) != null) {
    currentLine.symbols[match.index] = match[0];
  }

  if (lineToCheck == null && lineBeforeLineToCheck == null) {
    lineToCheck = currentLine;
  } 
  else if (lineToCheck != null && lineBeforeLineToCheck == null) {
    for(const index in lineToCheck.numbers) {
      let partNumber = false;
      let before = Number(index) - 1;
      let after = Number(index) + lineToCheck.numbers[index].length;
      for(const symbolsIndex in lineToCheck.symbols) {
        if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
          partNumber = true;
        }
      }
      for(const symbolsIndex in currentLine.symbols) {
        if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
          partNumber = true;
        }
      }
      if(partNumber) {
        sumOfParts += Number(lineToCheck.numbers[index])
      }
    }
    lineBeforeLineToCheck = lineToCheck;
    lineToCheck = currentLine;
  } 
  else {

    for(const index in lineToCheck.numbers) {
      let partNumber = false;
      let before = Number(index) - 1;
      let after = Number(index) + lineToCheck.numbers[index].length;
      for(const symbolsIndex in lineToCheck.symbols) {
        if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
          partNumber = true;
        }
      }
      for(const symbolsIndex in currentLine.symbols) {
        if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
          partNumber = true;
        }
      }
      for(const symbolsIndex in lineBeforeLineToCheck.symbols) {
        if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
          partNumber = true;
        }
      }
      if(partNumber) {
        sumOfParts += Number(lineToCheck.numbers[index])
      }
    }
    // then set up for next round
    lineBeforeLineToCheck = lineToCheck;
    lineToCheck = currentLine;
  };


});


reader.on('close', () => {
  lineToCheck = currentLine;
  for(const index in lineToCheck.numbers) {
    let partNumber = false;
    let before = Number(index) - 1;
    let after = Number(index) + lineToCheck.numbers[index].length;
    for(const symbolsIndex in lineToCheck.symbols) {
      if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
        partNumber = true;
      }
    }
    for(const symbolsIndex in lineBeforeLineToCheck.symbols) {
      if (Number(symbolsIndex) >= before && Number(symbolsIndex) <= after) {
        partNumber = true;
      }
    }
    if(partNumber) {
      sumOfParts += Number(lineToCheck.numbers[index])
    }
  }

  console.log(`sum of part numbers: ${sumOfParts}`);
});
