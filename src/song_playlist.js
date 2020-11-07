// module to handle input
const fs = require('fs');

/*
    SongPlayList class
    -> insert
    -> subSet
    -> consoleLogData
    -> writeToFile
 */
class SongPlayList {
    constructor() {
      this.root = null
    }
    
    /*
        insert a value as a node in the BST
        @param {Song} song
    */
    insert(song) {
      
      if (!this.root) { //if root is empty, set new node as the root
        this.root = song
      } else {
        this.insertNode(this.root, song)
      }
    }
    
    /*
        helper function for insertion
        @param {Song} root
        @param {Song} newNode
    */
    insertNode(root, newNode) {
      if (newNode.songTitle.localeCompare(root.songTitle) < 0) {//if no left child, then insert to the left
        if (!root.left) {
          root.left = newNode
        } else {
          this.insertNode(root.left, newNode)
        }
      } else {//if no right child, then insert to the right
        if (!root.right) {
          root.right = newNode
        } else {
          this.insertNode(root.right, newNode)
        }
      }
    }
    
    /*
        get a subset of songs from a given min value 
        up to max value
        @param {string} start
        @param {string} end
        @param {Song} node
    */
    subSet(start, end, node=this.root) {
        if(node === null) {
            return;
        }

        if (start.localeCompare(node.songTitle) < 0) {
            this.subSet(start, end, node.left);
        }
        if (
          start.localeCompare(node.songTitle) <= 0 &&
          end.localeCompare(node.songTitle) >= 0
        ) {
            this.consoleLogData(node);
            this.writeToFile(node, `${start}-${end}`);
        }
        if (end.localeCompare(node.songTitle) > 0) {
            this.subSet(start, end, node.right);
        }
    }

    /*
        print obtained information to the console
        @param {Song} track
    */
    consoleLogData = (track) => {
        console.log(`${track.artistName} - ${track.songTitle} | Artist Average: `
        + `${track.artistAverage} | Streams Average: ${track.streamsAverageCount}`);
    }
    
    /*
        write all the information into the file
        * @param {Song} track
        * @param {string} filePostfix
     */
    writeToFile = (track, filePostfix) => {
        // full file name including file path
        const fileName = `../output/report-${filePostfix}.txt`;
        // open stream
        const writeStream = fs.createWriteStream(fileName, {flags: 'a'});
        writeStream.write(`${track.artistName} - ${track.songTitle} | Artist Average: `
        + `${track.artistAverage} | Streams Average: ${track.streamsAverageCount}\n`);
        // close the stream
        writeStream.end();
    }
}

//export class
module.exports = SongPlayList;