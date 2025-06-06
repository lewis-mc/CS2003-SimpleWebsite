"use strict"

/**
 * Fetch used to get data from JSON file.
 * Promises used to control when functions are run.
 * Data retrieved from JSON file is placed in the HTML table for the list of songs.
 */

fetch("data/TheBeatlesCleaned.json")
.then(function(response) {
    return response.json();
})
.then(function(songs) {
    let placeholder = document.querySelector("#dataOutput");
    let out = "";
    for(let song of songs) {
        out += `
             <br>
	         <tr>
	            <td>${song.song}</td>
	            <td>${song.album}</td>
	            <td>${song.year}</td>
	            <td>${song.duration}</td>
                <td><button type="button" id ="addSong" onclick="addSong(${song.id})">ADD</button></td>
	         </tr>
	      `;
    }
    placeholder.innerHTML = out;
   
})