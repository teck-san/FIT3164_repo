import Papa from 'papaparse';
/*
import csvToJson from 'csvtojson';

const csvFilePath = 'prediction.csv';

const json = await csvToJson().fromFile(csvFilePath);

const jsonString = JSON.stringify(json, null, 2)

console.log(jsonString);
const url="prediction.csv"
*/
const url="/prediction.csv"
fetch(url)
    .then(response => response.text())
    .then(csvString => {
        const results = Papa.parse(csvString, { header: true });
        const closeValue = results.data.map(row => row['NHits']);
        console.log(closeValue);
    });

