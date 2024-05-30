export const KEY = process.env.REACT_APP_KEY;
const NATURAL_GAS = `https://www.alphavantage.co/query?function=NATURAL_GAS&interval=monthly&apikey=${KEY}`;
const WTI = `https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=${KEY}`;
const COPPER = `https://www.alphavantage.co/query?function=COPPER&interval=monthly&apikey=${KEY}`;
const ALUMINUM = `https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=${KEY}`;
const WHEAT = `https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=${KEY}`;
const SUGAR = `https://www.alphavantage.co/query?function=SUGAR&interval=monthly&apikey=${KEY}`;
const CORN = `https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey=${KEY}`;

 export const arr = [NATURAL_GAS,WTI,COPPER,ALUMINUM,WHEAT,SUGAR,CORN];
