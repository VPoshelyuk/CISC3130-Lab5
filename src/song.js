/*
    Song class
    @param {string} artistName
    @param {string} songTitle
    @param {Song} streamsAverageCount
 */
class Song {
    //class constructor
    constructor(artistName, songTitle, streamsAverageCount, artistAverage) {
        this.artistName = artistName;
        this.songTitle = songTitle;
        this.streamsAverageCount = streamsAverageCount;
        this.artistAverage = artistAverage;
        this.left = null;
        this.right = null;
    }
}

//export Song class
module.exports = Song;