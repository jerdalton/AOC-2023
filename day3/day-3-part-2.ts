#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'

const rePotentialGears = /\*/g;
const reNumbers = /\d+/g;
let sumOfGearRatios = 0;
let currentLine = null;
let lineToCheck = null;
let lineBeforeLineToCheck = null;
let totalGears = 0;


var reader = rd.createInterface(fs.createReadStream('input.txt'));

reader.on('line', (line: string) => {
  currentLine = {numbers: {}, potentialGears: {}};
  let match;
  while ((match = reNumbers.exec(line)) != null) {
    currentLine.numbers[match.index] = match[0];
  };
  while((match = rePotentialGears.exec(line)) != null) {
    currentLine.potentialGears[match.index] = match[0];
  };

  if (lineToCheck == null && lineBeforeLineToCheck == null) {
    lineToCheck = currentLine;
  }
  else if (lineToCheck != null && lineBeforeLineToCheck == null) {
    for(const index in lineToCheck.potentialGears) {
      let beforeGear = Number(index) - 1;
      let afterGear = Number(index) + 1;
      let adjacentNumbers = [];
      for(const numberIndex in currentLine.numbers) {
        let numEnd = Number(numberIndex) + (currentLine.numbers[numberIndex].length - 1);
        if(beforeGear <= Number(numEnd) && Number(numberIndex) <= afterGear){
          adjacentNumbers.push(currentLine.numbers[numberIndex])
        }
      }

      for(const numberIndex in lineToCheck.numbers) {
        let numEnd = Number(numberIndex) + (lineToCheck.numbers[numberIndex].length - 1);
        if(Number(numEnd) == beforeGear || Number(numberIndex) == afterGear){
          adjacentNumbers.push(lineToCheck.numbers[numberIndex])
        }
      }

      if(adjacentNumbers.length == 2) {
        totalGears++;
        sumOfGearRatios += Number(adjacentNumbers[0]) * Number(adjacentNumbers[1])
      }
    }
    lineBeforeLineToCheck = lineToCheck;
    lineToCheck = currentLine;
  }
  else {
    for(const index in lineToCheck.potentialGears) {
      let beforeGear = Number(index) - 1;
      let afterGear = Number(index) + 1;
      let adjacentNumbers = [];
      for(const numberIndex in currentLine.numbers) {
        let numEnd = Number(numberIndex) + (currentLine.numbers[numberIndex].length - 1);
        if(beforeGear <= Number(numEnd) && Number(numberIndex) <= afterGear){
          adjacentNumbers.push(currentLine.numbers[numberIndex])
        }
      }

      for(const numberIndex in lineToCheck.numbers) {
        let numEnd = Number(numberIndex) + (lineToCheck.numbers[numberIndex].length - 1);
        if(Number(numEnd) == beforeGear || Number(numberIndex) == afterGear){
          adjacentNumbers.push(lineToCheck.numbers[numberIndex])
        }
      }

      for(const numberIndex in lineBeforeLineToCheck.numbers) { // line 1, check ranges..
        let numEnd = Number(numberIndex) + (lineBeforeLineToCheck.numbers[numberIndex].length - 1);
        if(beforeGear <= Number(numEnd) && Number(numberIndex) <= afterGear){
          adjacentNumbers.push(lineBeforeLineToCheck.numbers[numberIndex])
        }
      }

      adjacentNumbers.forEach(number => console.log(number))
      if(adjacentNumbers.length == 2) {
        sumOfGearRatios += Number(adjacentNumbers[0]) * Number(adjacentNumbers[1])
      }
    }

    lineBeforeLineToCheck = lineToCheck;
    lineToCheck = currentLine;
  }
});

reader.on('close', () => {
  lineToCheck = currentLine;
  for(const index in lineToCheck.potentialGears) {
    let beforeGear = Number(index) - 1;
    let afterGear = Number(index) + 1;
    let adjacentNumbers = [];
  
    for(const numberIndex in lineToCheck.numbers) {
      let numEnd = Number(numberIndex) + (lineToCheck.numbers[numberIndex].length - 1);
      if(Number(numEnd) == beforeGear || Number(numberIndex) == afterGear){
        adjacentNumbers.push(lineToCheck.numbers[numberIndex])
      }
    }

    for(const numberIndex in lineBeforeLineToCheck.numbers) {
      let numEnd = Number(numberIndex) + (lineBeforeLineToCheck.numbers[numberIndex].length - 1);
      if(beforeGear <= Number(numEnd) && Number(numberIndex) <= afterGear){
        adjacentNumbers.push(lineBeforeLineToCheck.numbers[numberIndex])
      }
    }
    if(adjacentNumbers.length == 2) {
      sumOfGearRatios += Number(adjacentNumbers[0]) * Number(adjacentNumbers[1])
    }
  }

  console.log(sumOfGearRatios);
});
