#!/usr/bin/env ts-node



const records = [
  {
    time: 48,
    distance: 261
  },
  {
    time: 93,
    distance: 1192
  },
  {
    time: 84,
    distance: 1019
  },
  {
    time: 66,
    distance: 1063
  },
];

const partOneTest = [
  {
    time: 7,
    distance: 9
  },
  {
    time: 15,
    distance: 40
  },
  {
    time: 30,
    distance: 200
  }
];

const partTwoTest = {
  time: 71530,
  distance: 940200
}

const partTwoRace = {
  time: 48938466,
  distance: 261119210191063
}

const partOne = () => {

  let outcomes = [];

  records.forEach(record => {
    let beats = 0;
    for (let i = 0; i < record.time; i++){
      let speed = i;
      let duration = record.time - i;
      let distance = speed * duration;
      if (distance > record.distance) {
        beats++;
      }
    }
    outcomes.push(beats);
  });

  let total = 1;
  outcomes.map((x) => {total *= x })
  console.log(total);
};

const partTwo = () => {

  // let race = partTwoTest;
  let race = partTwoRace;

  let beats = 0;
  for (let i = 0; i < race.time; i++){
    let speed = i;
    let duration = race.time - i;
    let distance = speed * duration;
    if (distance > race.distance) {
      beats++;
    }
  }

  console.log(beats);
}

// partOne();
partTwo();

/**
 * For each whole millisecond you spend at the beginning of the race holding down the button, 
 * the boat's speed increases by one millimeter per millisecond
 * 
 * for each second held, time moving -1, speed +1
 * 
 *  Calculate how may different ways to win, track that for each race
 * 
 * 
 */
