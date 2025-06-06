"use strict"

/**
 * Initliases the number of songs value and the array which will be used to store the song objects.
 */
var numSongsInPlaylist = 0;
const songsInPlaylist = [];

function addSong(id) {
    /**
     * Gets and returns the data from the JSON file.
     * @param response the response from the fetch method.
     */
    fetch("data/TheBeatlesCleaned.json")
    .then(function(response) {
        return response.json();
    })
    /**
     * The current HTML code of the ID playListData section is retrieved.
     * Checks the song to be added isn't already in the playlist. If so an alert is shown.
     * @param songs all songs retrieved from JSON file
     */
    .then(function(songs) {
        let out = document.getElementById("playListData").innerHTML.toString();
        let placeholder = document.querySelector("#playListData");
        for(let song of songs) {
            for (let index = 0; index < songsInPlaylist.length; index++) {
                if (id == songsInPlaylist[index].id) {
                    alert("song already added to playlist.");
                    return;
                }
            }
            /**
             * If the song isn't already in the playlist.
             * Song is added to the html table.
             * Song is added to the array of songs in playlist.
             * Duration and number of songs are updated.
             */
            if (song.id == id) {
                out += `
                <br>
	            <tr>
	                <td>${song.song}</td>
	                <td>${song.album}</td>
	                <td>${song.year}</td>
	                <td>${song.duration}</td>
                    <td><button type="button" id ="removeSong" onclick="removeSong(${song.id})">REMOVE</button></td>
	            </tr>
	            `;
                placeholder.innerHTML = out;
                songsInPlaylist[numSongsInPlaylist] = song;
                numSongsInPlaylist++;
                updateDuration();
                return;
            }
        }
        
    })
}

/**
 * If there is only one song in playlist it is removed straight away.
 * Traverses array of songs and finds the one to be removed and uses .splice() to remove song from playlist.
 * After song is removed the html table data is wrote back to the playlist section.
 * The duration and number of songs is updated.
 * @param id the id of the song to be removed.
 */
function removeSong(id) {

    var removed = false;
    var index = 0;
    let out = "";
    let placeholder = document.querySelector("#playListData");

    if(numSongsInPlaylist==1) {
        placeholder.innerHTML = out;
        numSongsInPlaylist--;
        updateDuration();
        return;
    }

    while(index < songsInPlaylist.length && removed == false) {
        if (songsInPlaylist[index].id == id) {
            songsInPlaylist.splice(index, 1);
            removed = true;
            numSongsInPlaylist--;
        }
        index++;
    }


    index = 0;
    for (index = 0; index < songsInPlaylist.length; index++) {
        out += `
                <br>
	            <tr>
	                <td>${songsInPlaylist[index].song}</td>
	                <td>${songsInPlaylist[index].album}</td>
	                <td>${songsInPlaylist[index].year}</td>
	                <td>${songsInPlaylist[index].duration}</td>
                    <td><button type="button" id ="removeSong" onclick="removeSong(${songsInPlaylist[index].id})">REMOVE</button></td>
	            </tr>
	            `;
    }
    placeholder.innerHTML = out;
    updateDuration();
    
    
}

/**
 * Method to update duration and number of songs in playlist.
 * If there are no songs in playlist duration and number of songs in playlist isn't shown.
 * The minutes and seconds are gathered and totalled.
 * The amount of extra seconds is converted into minutes and seconds. 
 * If minutes or seconds are less than 0 they are padded with a zero.
 * The duration and number of songs are added to the footer section of the playlist table.
 * @returns 
 */
function updateDuration() {
    var mins = 0;
    var seconds = 0;
    let out = "";
    let placeholder = document.querySelector("#playListTime");

    if (numSongsInPlaylist == 0) {
        mins = 0;
        seconds = 0;
        placeholder.innerHTML = out;
        return;
    }

    for (let index = 0; index < songsInPlaylist.length; index++) {
        var duration = songsInPlaylist[index].duration;
        mins += parseInt(duration.substring(0,2));
        seconds += parseInt(duration.substring(3));
    }

    var extraMins = Math.floor(seconds / 60);
    mins += extraMins;
    seconds -= (extraMins * 60);

    mins = mins < 10 ? "0" + mins : mins;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    out = `
        <br>
        <tr>
            <td>Duration: </td>
            <td>${mins}:${seconds}</td>
            <td>Songs: </td>
            <td>${numSongsInPlaylist}</td>

        </tr>
    `;
    placeholder.innerHTML = out;
}