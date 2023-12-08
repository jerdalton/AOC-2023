#!/usr/bin/env ts-node

import * as fs from 'fs';

const seedsRe = /(?<=seeds:)([\s\S]*?)(?=seed-to-soil)/gm;
const seedToSoilRe = /(?<=map:)([\s\S]*?)(?=soil-to-fertilizer)/gm;
const soilToFertRe = /(?<=soil-to-fertilizer map:)([\s\S]*?)(?=fertilizer-to-water)/gm;
const fertToWaterRe = /(?<=fertilizer-to-water map:)([\s\S]*?)(?=water-to-light)/gm;
const waterToLightRe = /(?<=water-to-light map:)([\s\S]*?)(?=light-to-temperature)/gm;
const lightToTempRe = /(?<=light-to-temperature map:)([\s\S]*?)(?=temperature-to-humidity)/gm;
const tempToHumidRe = /(?<=temperature-to-humidity map:)([\s\S]*?)(?=humidity-to-location)/gm;
const humidToLocRe = /(?<=humidity-to-location map:)([\s\S]*)/gm;


const buildFullMapOld = (mapData) => {
  let fullMap = [];
  console.log('mapping things')
  mapData.forEach(row => {
    let rowData = row.split(' ');
    let range = rowData[2];
    let sourceStart = rowData[1];
    let destinationStart = rowData[0];
    for(let i = 0; i < Number(range); i++) {
      fullMap.push({
        destination: Number(destinationStart) + i,
        source: Number(sourceStart) + i
      })
    }
  })
  return fullMap;
}

const buildFullMap = (mapData) => {
  let mapObject = [];
  mapData.forEach(row => {
    let columns = row.split(' ');
    mapObject.push({
      destination: Number(columns[0]),
      source: Number(columns[1]),
      range: Number(columns[2])
    });
  });
  return mapObject;
};

const getDestOld = (seed, mapData) => {
  let match = seed;
  mapData.forEach(obj => {
    if (seed == obj.source) {
      match = obj.destination;
    }
  });
  return match;
};

const getDest = (seed, mapData) => {
  let match = seed;
  mapData.forEach(obj => {
    let diff = obj.destination - obj.source;
    if (seed >= obj.source && seed < (obj.source + obj.range)) {
      match = seed + diff;
    }
  });
  return match;
};

const partOne = async () => {

  let file = fs.readFileSync('input.txt').toString();

  let seeds = (seedsRe.exec(file)[0]).trim().split(' ');
  let seedToSoilMap = seedToSoilRe.exec(file);
  let soilToFertilizerMap = soilToFertRe.exec(file);
  let fertilizerToWaterMap = fertToWaterRe.exec(file);
  let waterToLightMap = waterToLightRe.exec(file);
  let lightToTempMap = lightToTempRe.exec(file);
  let tempToHumidityMap = tempToHumidRe.exec(file);
  let humidityToLocationMap = humidToLocRe.exec(file);

  let seed2soilMap = buildFullMap(seedToSoilMap[0].trim().split(/\n/));
  let soil2fertMap = buildFullMap(soilToFertilizerMap[0].trim().split(/\n/));
  let fert2waterMap = buildFullMap(fertilizerToWaterMap[0].trim().split(/\n/));
  let water2lightMap = buildFullMap(waterToLightMap[0].trim().split(/\n/));
  let light2tempMap = buildFullMap(lightToTempMap[0].trim().split(/\n/));
  let temp2humidMap = buildFullMap(tempToHumidityMap[0].trim().split(/\n/));
  let humid2locationMap = buildFullMap(humidityToLocationMap[0].trim().split(/\n/));
 

  let seed2LocationMap = [];


  seeds.forEach(seed => {
    let seed2soilDest = getDest(Number(seed), seed2soilMap);
    let soil2fertDest = getDest(seed2soilDest, soil2fertMap);
    let fert2waterDest = getDest(soil2fertDest, fert2waterMap);
    let water2lightDest = getDest(fert2waterDest, water2lightMap);
    let light2tempDest = getDest(water2lightDest, light2tempMap);
    let temp2humDest = getDest(light2tempDest, temp2humidMap);
    let hum2location = getDest(temp2humDest, humid2locationMap);
    seed2LocationMap.push({
      seed: seed,
      location: hum2location
    })
  });

  let locationList = [];
  seed2LocationMap.forEach(obj => {
    locationList.push(obj.location);
  });
  
  console.log(`Minimum: ${Math.min(...locationList)}`)
};

const partTwo = async () => {

  let file = fs.readFileSync('input.txt').toString();

  let seeds = (seedsRe.exec(file)[0]).trim().split(' ');
  let seedToSoilMap = seedToSoilRe.exec(file);
  let soilToFertilizerMap = soilToFertRe.exec(file);
  let fertilizerToWaterMap = fertToWaterRe.exec(file);
  let waterToLightMap = waterToLightRe.exec(file);
  let lightToTempMap = lightToTempRe.exec(file);
  let tempToHumidityMap = tempToHumidRe.exec(file);
  let humidityToLocationMap = humidToLocRe.exec(file);

  let seed2soilMap = buildFullMap(seedToSoilMap[0].trim().split(/\n/));
  let soil2fertMap = buildFullMap(soilToFertilizerMap[0].trim().split(/\n/));
  let fert2waterMap = buildFullMap(fertilizerToWaterMap[0].trim().split(/\n/));
  let water2lightMap = buildFullMap(waterToLightMap[0].trim().split(/\n/));
  let light2tempMap = buildFullMap(lightToTempMap[0].trim().split(/\n/));
  let temp2humidMap = buildFullMap(tempToHumidityMap[0].trim().split(/\n/));
  let humid2locationMap = buildFullMap(humidityToLocationMap[0].trim().split(/\n/));
 
  console.log(seeds);
  let seedMap = [];

  seeds.forEach((seed, index) => {
    if (index % 2 == 0) {
      seedMap.push({
        start: Number(seed),
        range: Number(seeds[index + 1])
      })
    }
  }); 

  let lowestLocation = 10000000000000000000;
  let totalSeeds = 0;
  seedMap.forEach(seeds => {
    console.log('new seed map... ');
    console.log(`total seeds: ${totalSeeds}`)
    
    for (let seed = seeds.start; seed < seeds.start + seeds.range; seed++ ) {
      totalSeeds++;

      let seed2soilDest = getDest(Number(seed), seed2soilMap);
      let soil2fertDest = getDest(seed2soilDest, soil2fertMap);
      let fert2waterDest = getDest(soil2fertDest, fert2waterMap);
      let water2lightDest = getDest(fert2waterDest, water2lightMap);
      let light2tempDest = getDest(water2lightDest, light2tempMap);
      let temp2humDest = getDest(light2tempDest, temp2humidMap);
      let hum2location = getDest(temp2humDest, humid2locationMap);

      if (hum2location < lowestLocation) {
        console.log(`lower: ${hum2location}`);
        lowestLocation = hum2location;
      }
    }
  });

  console.log(`Minimum: ${lowestLocation}`)
};


// partOne();
partTwo();
