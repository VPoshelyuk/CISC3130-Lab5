// module to handle input
const fs = require('fs');

class SongPlayList {
    constructor() {
      this.root = null
    }
    
    // Insert a value as a node in the BST
    insert(song) {
      
      // If root empty, set new node as the root
      if (!this.root) {
        this.root = song
      } else {
        this.insertNode(this.root, song)
      }
    }
    
    // helper function
    insertNode(root, newNode) {
      if (newNode.songTitle.localeCompare(root.songTitle) < 0) {
        // If no left child, then just insesrt to the left
        if (!root.left) {
          root.left = newNode
        } else {
          this.insertNode(root.left, newNode)
        }
      } else {
        // If no right child, then just insesrt to the right
        if (!root.right) {
          root.right = newNode
        } else {
          this.insertNode(root.right, newNode)
        }
      }
    }
    
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

    consoleLogData = (track) => {
        console.log(`${track.artistName} - ${track.songTitle} | Artist Average: `
        + `${track.artistAverage} | Streams Average: ${track.streamsAverageCount}`);
    }
    
    /*
        write artist names and their appearances numbers into a file
        * @param {Object{}} artists
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