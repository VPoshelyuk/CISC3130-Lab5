//import all the class modules
const Playlist = require('./song_playlist.js');
// modules to handle input
const fs = require('fs');
const path = require('path');
const Song = require('./song.js');

/*
    main method that starts the program and handles the input
    * @return {Queue[]}
*/
const porcessData = () => {
    //array that will hold processed data
    const songs = [];
    //data directory
    const dir = '../data/';
    //read each file from data directory
    fs.readdirSync(dir).forEach((filename, week) => {
        //create a complete path using path module
        const filepath = path.resolve(dir, filename);
        const fileData = fs.readFileSync(filepath, 'utf8').split('\n')
        fileData.forEach((line) => { // read every line of input file
            // we only need to process lines that start with a number,
            // since these are the ones that holding the data we need
            if("123456789".includes(line[0])){ 
                // split the line by a "special CSV regex"
                const csvCols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                let songTitle = csvCols[1];
                let artistName = csvCols[2];
                let streamsCount = parseInt(csvCols[3], 10);
                // remove quotation marks from the names consisting of 2 or more words
                if(artistName.startsWith("\"")) {
                    artistName = artistName.substring(1, artistName.length - 1);
                }
                songTitle = songTitle.split("\"").join("");
                let songAlreadyExists = false;
                songs.forEach((s) => {
                    if (s.artistName === artistName) {
                        s.artistStreamsCount.week.push(streamsCount);
                        if (s.songTitle === songTitle) {
                            s.streamsCount.push(streamsCount);
                            songAlreadyExists = true;
                        }
                    }
                })
                if(!songAlreadyExists) {
                    songs.push({
                        artistName,
                        songTitle,
                        streamsCount: [streamsCount],
                        artistStreamsCount: { week: [streamsCount] }
                    })
                }
            }
        });
    });
    //return array of song objects
    return songs;
}

/*
    create a Playlist from array of Queues
    * @return {Playlist}
*/
const convertToPlaylistBST = (data) => {
    let playlist = new Playlist;
    data.forEach((record) => {
        const streamsAverageCount = (record.streamsCount.reduce(
            ( acc, currentVal ) => acc + currentVal, 0
        ) / record.streamsCount.length).toFixed(2);
        let artistAverage = 0;
        Object.keys(record.artistStreamsCount).forEach((key) => 
        artistAverage += record.artistStreamsCount[key].reduce(
            ( accum, weeklyVals ) => accum + weeklyVals, 0
        ) / record.artistStreamsCount[key].length);

        const song = new Song(
            record.artistName,
            record.songTitle,
            streamsAverageCount,
            (artistAverage/Object.keys(record.artistStreamsCount).length).toFixed(2)
        );
        playlist.insert(song);
    })
    return playlist;
}

//call the porcessData method and handle the input data
const data = porcessData();
const playlist = convertToPlaylistBST(data);

playlist.subSet('1', 'a');
console.log('🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶'
+ '🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶🎶');
playlist.subSet('0', 'z');