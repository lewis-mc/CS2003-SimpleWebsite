"use strict"

/**
 * Sets the constant values used in the program.
 */
const ID = "id";
const YEAR = "year";
const ALBUM = "album";
const SONG = "song";
const DURATION = "duration";
const  QUOTES = "\"";
const COMMA = "\,";
const COLON = "\:";
const SEMI_COLON = "\;";
const OPEN_BRACKET_CURLY = "\{";
const CLOSE_BRACKET_CURLY = "\}"
const OPEN_BRACKET_SQUARE = "\[";
const CLOSE_BRACKET_SQUARE = "\]";
const NEWLINE = "\n";
const READ_FILE_PATH = 'data/TheBeatlesCleaned.csv';
const WRITE_FILE_PATH = 'data/TheBeatlesCleaned.json';

/**
 * Sets up the reading of the data from the .csv file.
 * The data is read and split by line.
 */
const fs = require('fs');

const data = fs.readFileSync(READ_FILE_PATH, {encoding:'utf-8', flag:'r'});

var lines = data.split(/\n/);

let output = "";

/**
 * Adds the intial part of the JSON file to fit with JSON file format.
 */
var initialLine = OPEN_BRACKET_SQUARE + NEWLINE;
output += initialLine;


/**
 * Iterates through each line of the data from the csv file.
 * For each line, the data is converted into a JSON file format.
 * The ending part of each line is added and once the last line has been encountered the end part is added without the comma.
 */
for (let i = 1; i < lines.length -1; i++) {

    var values = lines[i].split(/\;/);
    var outputLine = OPEN_BRACKET_CURLY;
    outputLine += QUOTES + ID + QUOTES + COLON + QUOTES + values[0] + QUOTES + COMMA 
            + QUOTES + YEAR + QUOTES + COLON + QUOTES + values[1] + QUOTES + COMMA
            + QUOTES + ALBUM + QUOTES + COLON + QUOTES + values[2] + QUOTES + COMMA
            + QUOTES + SONG + QUOTES + COLON + QUOTES + values[3] + QUOTES + COMMA
            + QUOTES + DURATION + QUOTES + COLON + QUOTES + convertTime(values[10]) + QUOTES;
    if (i === lines.length-2) {
        outputLine += CLOSE_BRACKET_CURLY + NEWLINE;
    } else {
        outputLine += CLOSE_BRACKET_CURLY + COMMA + NEWLINE;
    }

    output += outputLine;

}

/**
 * Adds the final part of the JSON file.
 */
var finalLine = CLOSE_BRACKET_SQUARE;

output += finalLine;
/**
 * Writes all the data to the JSON file.
 */
fs.writeFileSync(WRITE_FILE_PATH, output);


   
/**
 * Adds a zero to the start of the string with the time value.
 * @param num the number to be padded with a zero.
 * @returns the number string padded with a zero.
 */
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Gets the minutes amount of minutes by converting the milliseconds to minutes.
 * Gets the seconds by getting the remainder after converting the milliseconds to minutes the converts to seconds.
 * The minutes and seconds are padded with a leading zero if below 10.
 * @param ms the time of song in milliseconds
 * @returns 
 */
function convertTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.round((ms % 60000) / 1000);

    return seconds === 60
    ? `${padTo2Digits(minutes + 1)}:00`
    : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}