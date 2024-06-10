
//All the songs array.
const songs = [
    {
        id:1,
        name: "Shape Of You",
        artist: "Ed Sheeran",
        img: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        genre: "pop",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample.mp3",
    },
    {
        id:2,
        name: "All of Me",
        artist: "Adele",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBJljziW2MiybEEB5JS39SXnI3RjY97Lkug&s",
        genre: "pop",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample2.mp3",
    },
    {
        id:3,
        name: "Someone Like you",
        artist: "Adele",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCfdu5jKrco9qP-kjAkB3IGP6soAHzBFSGw&s",
        genre: "pop",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample.mp3",
    },
    {
        id:4,
        name: "Wonderwall",
        artist:"Oasis",
        img: "https://i.ytimg.com/vi/4il4bDVrE-g/maxresdefault.jpg",
        genre:"rock",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample2.mp3",
    },
    {
        id:5,
        name: "Sugar",
        artist: "Maroon 5",
        img: "https://i.ytimg.com/vi/09R8_2nJtjg/maxresdefault.jpg",
        genre: "hip hop",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample.mp3",
    },
    {
        id:6,
        name: "Locked Away",
        artist: "R. City",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6CSsHM6tKRrUSP-ayYXqyL1MDpuqLUqVb2w&s",
        genre: "hip hop",
        source: "Audio-Sample-files-master/Audio-Sample-files-master/sample2.mp3",
    }
]
console.log(songs);

const genreOptions = [
    "all", "rock", "pop", "hip hop"
]

const playlist = {};

let currentSelectedPlaylist;

let  selectedSongToListen = 1;

//Heading
const heading = document.getElementById("heading");

//Toggle button for theme
const themeBtn = document.createElement("div");
themeBtn.setAttribute("id", "theme-btn");

const switchBtn = document.createElement("label");
switchBtn.setAttribute("class","switch");
themeBtn.appendChild(switchBtn);

const checkboxInput = document.createElement("input");
checkboxInput.type = "checkbox";
const sliderRoundSpan = document.createElement("span");
sliderRoundSpan.setAttribute("class","slider round");

switchBtn.appendChild(checkboxInput);
switchBtn.appendChild(sliderRoundSpan);


heading.appendChild(themeBtn);

const body = document.body;
const currentTheme = 'light-theme';
body.classList.add(currentTheme);

checkboxInput.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      body.classList.replace('light-theme', 'dark-theme');
    } else {
      body.classList.replace('dark-theme', 'light-theme');
    }
});

//Application Title.
const appTitle = document.createElement("h1");
appTitle.textContent = "Music Player";
appTitle.setAttribute("id", "app-title");
heading.appendChild(appTitle);

console.log(heading);


//Container
const container = document.getElementById("container");

// All Songs Div
const allSongDiv = document.createElement("div");
allSongDiv.setAttribute("id", "all-song-div");

//genre
const genreDiv = document.createElement("div");
genreDiv.textContent = "Filter By Genre:"
const genreDropdown = document.createElement("select");
genreOptions.forEach(option => {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = option;
    dropdownOption.textContent = option; 
    genreDropdown.appendChild(dropdownOption);
});
genreDiv.appendChild(genreDropdown);
allSongDiv.appendChild(genreDiv);

//title
const allSongDivTitle = document.createElement("h2")
allSongDivTitle.textContent = "All Songs";
allSongDiv.appendChild(allSongDivTitle);

//Song list
const songList = document.createElement("div");
function showSongs(genre) {
    songList.innerHTML = '';
    const filteredSongs = genre === 'all' ? songs : songs.filter(song => song.genre === genre);
    filteredSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.textContent = song.name;
        songElement.id = song.id;
        songList.appendChild(songElement);

        songElement.addEventListener("click", ()=>{
            selectedSongToListen = song.id;
            // console.log(selectedSongToListen);
            showSongCard(selectedSongToListen);
            setAudio(selectedSongToListen);
        })
    });
}

genreDropdown.addEventListener('change', (event) => {
    const selectedGenre = event.target.value;
    showSongs(selectedGenre);
});

showSongs('all');
allSongDiv.appendChild(songList);

//Current Song card Div 
const cardDiv = document.createElement("div");
cardDiv.setAttribute("id", "card-div");

const songCard = document.createElement("div");
const songCardImg = document.createElement("img");
const songCardTitle = document.createElement("h2");
const songCardArtist = document.createElement("span");

function showSongCard(selectedSongToListen){

    songCardImg.src = songs[selectedSongToListen-1].img;
    songCard.appendChild(songCardImg);

    songCardTitle.textContent = songs[selectedSongToListen-1].name;
    songCard.appendChild(songCardTitle);

    songCardArtist.textContent = songs[selectedSongToListen-1].artist;
    songCard.appendChild(songCardArtist);
}

showSongCard(selectedSongToListen)
cardDiv.appendChild(songCard);

//Audio controls
const controls = document.createElement("div");
controls.setAttribute("id", "audio-controller-div");
const audioControl = document.createElement("audio");
audioControl.controls = true;

const audioSource = document.createElement("source");

function setAudio(selectedSongToListen){
    audioSource.setAttribute("src", songs[selectedSongToListen-1].source);
    audioControl.load();
}

setAudio(selectedSongToListen);
audioControl.appendChild(audioSource);
controls.appendChild(audioControl);
cardDiv.appendChild(controls);

//Prev Next Song
const prevNextDiv = document.createElement("div");
prevNextDiv.setAttribute("id", "prev-next-div")
const prev = document.createElement("button");
const next = document.createElement("button");

prev.textContent = "<=";
prev.onclick = () => {
    selectedSongToListen--;
    // console.log(selectedSongToListen);
    showSongCard(selectedSongToListen);
    setAudio(selectedSongToListen);
}
next.textContent = "=>";
next.onclick = () => {
    selectedSongToListen++;
    // console.log(selectedSongToListen);
    showSongCard(selectedSongToListen);
    setAudio(selectedSongToListen);
}

prevNextDiv.appendChild(prev);
prevNextDiv.appendChild(next);
cardDiv.appendChild(prevNextDiv);

//Add to Playlist
const addtoPlaylistDiv = document.createElement("div");
addtoPlaylistDiv.setAttribute("id", "add-to-playlist-div");
const addtoPlaylist = document.createElement("button");

addtoPlaylist.textContent = "Add To Playlist"

addtoPlaylist.onclick = () => {
    // console.log(songs[selectedSongToListen-1].name);
    currentSelectedPlaylist.push(songs[selectedSongToListen-1].name);
    // console.log(currentSelectedPlaylist);
    currentPlaylistContentDiv.innerHTML = '';
    currentSelectedPlaylist.map((song) => {
        const currentPlaylistContent = document.createElement("p");
        currentPlaylistContent.textContent = song;
        currentPlaylistContentDiv.appendChild(currentPlaylistContent);
    })
}

addtoPlaylistDiv.appendChild(addtoPlaylist);
cardDiv.appendChild(addtoPlaylistDiv);

//Remove from playlist
const removetoPlaylistDiv = document.createElement("div");
removetoPlaylistDiv.setAttribute("id", "remove-to-playlist-div");
const removetoPlaylist = document.createElement("button");

removetoPlaylist.textContent = "Remove from Playlist"

removetoPlaylist.onclick = () => {
    currentSelectedPlaylist = currentSelectedPlaylist.filter(song => song != songs[selectedSongToListen-1].name);
    console.log(currentSelectedPlaylist)
    currentPlaylistContentDiv.innerHTML = '';
    currentSelectedPlaylist.map((song) => {
        const currentPlaylistContent = document.createElement("p");
        currentPlaylistContent.textContent = song;
        currentPlaylistContentDiv.appendChild(currentPlaylistContent);
    })
}

removetoPlaylistDiv.appendChild(removetoPlaylist);
cardDiv.appendChild(removetoPlaylistDiv);



//Playlist Div
const playlistDiv = document.createElement("div");
playlistDiv.setAttribute("id", "playlist-div");

const createBox = document.createElement("input");
createBox.type = "text";
createBox.placeholder = "Enter Playlist Name";

const createBtn = document.createElement("button");
createBtn.textContent = "Create Playlist"
createBtn.onclick = () => {
    // console.log(createBox.value);
    if(!playlist[createBox.value]){
        playlist[createBox.value] = [];
        console.log(playlist);
        var content = document.createElement("li");
        content.textContent = createBox.value;
    }else{
        alert('playlist already exist');
    }

    content.onclick = () => {
        currentSelectedPlaylist = playlist[content.textContent];
        console.log(content.textContent, "selected", currentSelectedPlaylist);

        if(currentSelectedPlaylist.length != 0){
            currentPlaylistContentDiv.innerHTML = '';
            currentSelectedPlaylist.map((song) => {
                const currentPlaylistContent = document.createElement("p");
                currentPlaylistContent.textContent = song;
                currentPlaylistContentDiv.appendChild(currentPlaylistContent);
            })
        }
    }

    allPlaylistContent.appendChild(content);
    createBox.value = '';
}

const currentPlaylist = document.createElement("h2");
currentPlaylist.textContent = "Current Playlist";
const currentPlaylistContentDiv = document.createElement("div");

const allPlaylist = document.createElement("h2");
allPlaylist.textContent = "All Playlist";
const allPlaylistContent = document.createElement("ul");

playlistDiv.appendChild(createBox);
playlistDiv.appendChild(createBtn);
playlistDiv.appendChild(currentPlaylist);
playlistDiv.appendChild(currentPlaylistContentDiv);
playlistDiv.appendChild(allPlaylist);
playlistDiv.appendChild(allPlaylistContent);

container.appendChild(allSongDiv);
container.appendChild(cardDiv);
container.appendChild(playlistDiv);

console.log(container);