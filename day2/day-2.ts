#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as rd from 'readline'

const loadedCubes = {
  red: 12,
  green: 13,
  blue: 14
}

let sumOfValidGameIds: number = 0;
let sumOfPowers: number = 0;

var reader = rd.createInterface(fs.createReadStream('input.txt'));
reader.on('line', (line: string) => {

  let validGame: boolean = true;
  let minBlue: number = 0;
  let minGreen: number = 0;
  let minRed: number = 0;
  let gamePower: number = 0;

  let gameData = line.split(':');
  let gameId = Number(gameData[0].split(' ')[1]);
  let grabs = gameData[1].split(';');

  grabs.forEach(grab => {
    let cubes = grab.split(',');
    cubes.forEach(cube => {
      let cubeInfo = cube.trim().split(' ');
      let cubeData = {
        count: cubeInfo[0],
        color: cubeInfo[1]
      };
      if (cubeData.count > loadedCubes[cubeData.color]) {
        validGame = false;
      }
      switch(cubeData.color) {
        case 'blue': {
          if (Number(cubeData.count) > minBlue) {
            minBlue = Number(cubeData.count);
          }
          break;
        }
        case 'green': {
          if (Number(cubeData.count) > minGreen) {
            minGreen = Number(cubeData.count);
          }
          break;
        }
        case 'red': {
          if (Number(cubeData.count) > minRed) {
            minRed = Number(cubeData.count);
          }
          break;
        }
      }
    });
  });

  gamePower = minBlue * minRed * minGreen;

  if(validGame) {
    sumOfValidGameIds += gameId;
  }
  sumOfPowers += gamePower;
});

reader.on('close', () => {
  console.log(`sum of valid games: ${sumOfValidGameIds}`);
  console.log(`sum of powers: ${sumOfPowers}`);
});
