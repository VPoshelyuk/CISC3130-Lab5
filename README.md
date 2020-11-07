# CISC3130-Lab5
##  A local Radio DJ wants to create a sorted playlist based on the song title name. He is in a coding class learning about data structures and tries to create the playlist using a binary search tree.

---
### About
---
This CLI tool allows you to parse last 6 weekly CSV reports from [SpotifyCharts](https://spotifycharts.com/regional) and search for tracks using Playlist's subSet function, which takes two arguments: start and end strings and searches for every song name that is alphabetically situated in-between those.
Currently, this piece of software is shipped with 2 sample inputs but you can add as many as you like, sample output is also provided🙂.

---
### Dependencies
---
- Terminal for command line access  

The main piece of software that this repo holds is a Node app, for that to run you will need:
- Node.js v10.22.0 or newer (You can check your Node version by running ```node -v``` in your Terminal) 

---
### Setup and Usage
---
1. While you are in the home directory of this repo, press on the green "Code" button in the top right corner.
2. You will be prompted to copy an SSH or HTTPS URL to clone this repo to your local machine.
3. After you got that URL, go to the Terminal on your local machine(I will assume you are on Mac or Linux) and run the following command: 
```zsh
git clone *PASTE THE LINK HERE*
```
4. After all the files are copied to your local machine navigate to the newly created directory using the following command 
```zsh 
cd CISC3130-Lab5/src
```  
5. When you are inside the `src` directory, run the following command and you will be presented with the output of the two predefined "subSets" right in your command line: 
```zsh
node index.js
```  