import "./App.css";
import { e, et, as, s } from "./constant";
import { useState, useEffect } from "react";

function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [stylePadId, setStylePadId] = useState(null);
  const [style, setStyle] = useState(true);
  const [display, setDisplay] = useState(String.fromCharCode(160));
  const [currentPadBank, setCurrentPadBank] = useState(e);



  const handleKeyPress = (event) => {
    
    if (power) {
      
      setStylePadId(event.key.toUpperCase());
      setStyle(as); // Set the style immediately to the active style
      const audioElement = document.getElementById(event.key.toUpperCase());
      console.log("object ", event.key.toUpperCase());
    // Reset and play the audio
    if (audioElement) {
      console.log("object is now")
      audioElement.currentTime = 0;
      audioElement.play();
      var result = currentPadBank.filter(obj => {
        return obj.keyTrigger === event.key.toUpperCase()
      })
      console.log(result)
      setDisplay(result[0].id);
    }
      setTimeout(() => {
        setStyle(null);
        setStylePadId(null); // Clear the stylePadId after the timeout
      }, 200);
    }
    // Add your logic here based on the key press
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, );





  const powerData = () => {
    setPower(!power);
    setDisplay(String.fromCharCode(160));
  };

  const volumeData = (event) => {
    if (power) {
      setVolume(event.target.value);
      setDisplay("Volume: " + Math.round(100 * event.target.value));
    }
  };

  const displayData = (value, padId) => {
    if (power) {
      setDisplay(value);
      setStylePadId(padId);
      setStyle(as); // Set the style immediately to the active style
      const audioElement = document.getElementById(padId);
      console.log("object ", padId);
    // Reset and play the audio
    if (audioElement) {
      console.log("object is now")
      audioElement.currentTime = 0;
      audioElement.play();
    }
      setTimeout(() => {
        setStyle(null);
        setStylePadId(null); // Clear the stylePadId after the timeout
      }, 200);
    }
  };
  

  const bankData = () => {
    if (power) {
      setCurrentPadBank(currentPadBank === e ? et : e);
      setDisplay(
        currentPadBank === e ? "Smooth Piano Kit" : "Heater Kit"
      );
    }
  };

  const t = power
    ? {
        float: "right",
      }
    : {
        float: "left",
      };

  const a =
    currentPadBank === e
      ? {
          float: "left",
        }
      : {
          float: "right",
        };

  const getPadStyle = () => {
    return style ? as : s; // Use s or as based on the style state
  };

  return (
    <div id="root" className="App">
      <div className="inner-container" id="drum-machine">
        <div className="pad-bank">
          {currentPadBank.map((padBank) => (
            <div
              className="drum-pad"
              key={padBank.id}
              style={
                padBank.keyTrigger === stylePadId ? getPadStyle() : s
              }
              onClick={() => displayData(padBank.id, padBank.keyTrigger)}
            >
              <audio
                style={as}
                id={padBank.keyTrigger}
                src={padBank.url}
              ></audio>
              {padBank.keyTrigger}
            </div>
          ))}
        </div>
        <div className="controls-container">
          <div className="control">
            <p>Power</p>
            <div className="select">
              <div
                className="inner"
                onClick={powerData}
                style={t}
              ></div>
            </div>
          </div>
          <p id="display">{display}</p>
          <div className="volume-slider">
            <input
              max="1"
              min="0"
              step="0.01"
              type="range"
              value={volume}
              onChange={volumeData}
            />
          </div>
          <div className="control">
            <p>Bank</p>
            <div className="select">
              <div className="inner" onClick={bankData} style={a}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;