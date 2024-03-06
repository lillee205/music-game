import "./App.css";
import { useGlobalAudioPlayer } from "react-use-audio-player";

function App() {
  const { load } = useGlobalAudioPlayer();
  const songs = ["Still into you", "Ex's and Oh's", "I'm Good (Blue)", "Everytime We Touch"]
  let countdownEnded = false;
  var timer;
  /**
   * Starts music and shows multiple choice options
   */
  const startGame = () => {
    document.querySelector("#result").style.display = "none";

    let musicUrl = "/music/still_into_you.mp3";
    load(musicUrl, {
      autoplay: true,
    });
    startTimer()
    document.querySelector("#startBtn").style.display = "none";
    document.querySelector("#multipleChoice").style.display = "grid";
  }

  /**
   * Start countdown timer of 10 seconds
   */
  const startTimer = () => {
    document.querySelector("#countdown").style.display = "block";
    let timeleft = 10;
    timer = setInterval(function () {
      if (timeleft <= 0) {
        countdownEnded = true; 
        document.querySelector("#result").style.display = "block"
        document.querySelector("#result").innerHTML = "Ran out of time"
        clearInterval(timer);
        reset()
        return 
      }
      document.querySelector("#countdown").innerHTML = timeleft;
      timeleft -= 1;
    }, 1000);
  }
  
  /**
   * Checks if you selected the right song or not
   * @param {*} song 
   */
  const clickSong = (song) => {
    if (!countdownEnded) {
      if (song === "Still into you") {
        document.querySelector("#result").innerHTML = "CORRECT!"
      } else {
        document.querySelector("#result").innerHTML = "INCORRECT!"
      }
      reset();
    }

  }

  const reset = () => {
    console.log("Reset")
    clearInterval(timer)

    document.querySelector("#countdown").style.display = "block";
    let startBtn = document.querySelector("#startBtn")
    startBtn.style.display = "block";
    startBtn.innerHTML = "Restart game"
    countdownEnded = false;

  }
  return (
    <div className="App">
      <h1 id="text">Guess the song!</h1>
      <h1 id="countdown"></h1>
      <h1 id="result"></h1>
      <button id="startBtn" onClick={startGame}>
        Start game
      </button>
      <div id="multipleChoice" style={{display:"none"}}>
        {
          songs.map((song, i) => (
            <div className="choice" style={{backgroundColor:stringToColour(song)}} onClick={()=>clickSong(song)} key={i}>{song}</div>
          ))
        }
      </div>
    </div>
  );
}

const stringToColour = (str) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}
export default App;
