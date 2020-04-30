import fs from 'fs';

function getPrice(miles, waittime) {
  let price = 6 + waittime * 0.25;
  if (miles > 2 && miles <= 8) price += (miles - 2) * 0.8;
  if (miles > 8) price += (miles - 2) * 0.8 + (miles - 8) * 0.5;
  return Math.round(price);
}

function processData(data) {
  let pricestr = '';
  for (let i = 0; i < data.length; i += 2) {
    const price = getPrice(Number(data[i]), Number(data[i + 1]));
    pricestr += `收费${price}元\n`;
  }
  return pricestr;
}

function getData(testDataFile) {
  const file = fs.readFileSync(`./src/fixtures/${testDataFile}`);
  let data = file.toString().replace(/[^0-9]/gi, ' ');
  data = data.replace(/\s+/g, ' ').trim();
  const result = processData(data.split(' '));
  return result;
}

export default function main(testDataFile = 'testData.txt') {
  const receipt = getData(testDataFile);
  return receipt;
}
