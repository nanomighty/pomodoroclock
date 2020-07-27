import React from 'react';
import logo from './logo.svg';
import './App.css';

function Timer(props) {
  return (
    <div id="timer-label">
      <h3>
        <b id="name"></b>
      </h3>
      <h1 id="time-left"></h1>
    </div>
  );
}

function Features1(props) {
  return (
    <div id="something1">
      <div id="break-label">
        <div className="row">
          <div className="column" onClick={props.handleClick1}>
            <i id="break-decrement"
              className="fa fa-chevron-circle-down fa-2x"
              aria-hidden="true">
                
            </i>
          </div>
          <div id ="break-length" className="column">
            <h3>
              <b> {props.breakLength/60}</b>
            </h3>
          </div>
          <div className="column" onClick={props.handleClick2}>
            <i
              id="break-increment"
              className="fa fa-chevron-circle-up fa-2x"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <h4>
          <b>Break Length</b>
        </h4>
      </div>

      <div id="session-label">
        <div className="row">
          <div className="column" onClick={props.handleClick3}>
            {" "}
            <i
              id="session-decrement"
              className="fa fa-chevron-circle-down fa-2x"
              aria-hidden="true"
            ></i>{" "}
          </div>
          <div id ="session-length" className="column">
            <h3>
              <b> {props.sessionLength/60} </b>
            </h3>
          </div>
          <div className="column" onClick={props.handleClick4}>
            {" "}
            <i
              id="session-increment"
              className="fa fa-chevron-circle-up fa-2x"
              aria-hidden="true"
            ></i>{" "}
          </div>
        </div>
        <h4>
          <b>Session Length</b>
        </h4>
      </div>
    </div>
  );
}

function Features2(props) {
  return (
    <div className="row" id="something2">
      <div id = "start_stop" onClick={props.handlePlayPause} className="columnLeft">
        <span>
          <i className="fas fa-play fa-2x"></i>
          <i className="fas fa-pause fa-2x"></i>
        </span>
      </div>
      <div id = "reset" className="columnRight" onClick={props.handleReset}>
        <i className="fas fa-redo fa-2x"></i>
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();

    this.pomoTimerFunc = (x) => {
      if (this.state.curState != "NOP") {
        this.updateTime();
      }
      this.displayTime();
    };
    var breakLength = 5;
    var sessionLength = 25;

    this.state = {
      lastState: "Session",
      curState: "NOP",

      states: {
        Session: { name: "Session", duration: 25*60, curTime: 60*sessionLength },
        Break: { name: "Break", duration: 5*60, curTime: 60*breakLength },
        NOP: { name: "Pause", duration: 0, curTime: 60*sessionLength }
      }
    };

    this.hiddenCaller = setInterval(this.pomoTimerFunc, 1000);

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
  }

  handleClick1() {
    var curObject1 = {};
    curObject1.Break = this.state.states.Break;

    if (curObject1.Break.duration > 60) {
      curObject1.Break.duration = curObject1.Break.duration - 60;
      curObject1.Break.curTime = curObject1.Break.duration;
      this.setState(curObject1);
    }
  }

  handleClick2() {
    var curObject2 = {};
    curObject2.Break = this.state.states.Break;
    if (curObject2.Break.duration < 3600) {
      curObject2.Break.duration = curObject2.Break.duration + 60;
      curObject2.Break.curTime = curObject2.Break.duration;
      this.setState(curObject2);
    }
  }

  handleClick3() {
    var curObject3 = {};
    curObject3.Session = this.state.states.Session;

    if (curObject3.Session.duration > 60) {
      curObject3.Session.duration = curObject3.Session.duration - 60;
      curObject3.Session.curTime = curObject3.Session.duration;
      this.setState(curObject3);
    }
  }

  handleClick4() {
    var curObject4 = {};
    curObject4.Session = this.state.states.Session;

    if (curObject4.Session.duration < 3600) {
      curObject4.Session.duration = curObject4.Session.duration + 60;
      curObject4.Session.curTime = curObject4.Session.duration;
      this.setState(curObject4);
    }
  }

  handleReset() {
     // Put things back the way they were.
    var display = document.getElementById("time-left");
      display.innerHTML = '25' + ":" + '00';
    
    this.setState({ curState: "NOP", lastState: "Session" });
    
    const displayName = document.getElementById("name");
    displayName.innerHTML = "Session";
         
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
    
    var curObject5 = {};
    curObject5.Session = this.state.states.Session;
    curObject5.Session.curTime = 1500;
    //25*60
    this.setState(curObject5);

    var curObject6 = {};
    curObject6.Session = this.state.states.Session;
    curObject6.Session.duration = 1500;
    //25*60
    this.setState(curObject6);

    var otherObject7 = {};
    otherObject7.Break = this.state.states.Break;
    otherObject7.Break.curTime = 300;
    //60*5
    this.setState(otherObject7);

    var otherObject8 = {};
    otherObject8.Break = this.state.states.Break;
    otherObject8.Break.duration = 300;
    //60*5
    this.setState(otherObject8);
     
   }

  // Andre wuz here
  
    handlePlayPause() {  
     switch (this.state.curState) {
      case "NOP":
        console.log("Setting New State to Session");
        // Only when we first start
        this.state.states.NOP.name = this.state.states[
          this.state.lastState
        ].name;
        this.setState({ curState: this.state.lastState });
        break;
      case "Session":
        console.log("Setting New State to NOP");
        this.state.states.NOP.name = this.state.states[
          this.state.curState
        ].name;
        this.setState({ curState: "NOP", lastState: "Session" });
        break;
      case "Break":
        this.state.states.NOP.name = this.state.states[
          this.state.curState
        ].name;
        this.setState({ curState: "NOP", lastState: "Break" });
        break;
    }
  }
  
  updateTime() {
    var curObject = {};
    curObject[this.state.curState] = this.state.states[this.state.curState];

    let timeRemaining = curObject[this.state.curState].curTime;
      curObject[this.state.curState].curTime =
        curObject[this.state.curState].curTime - 1;
      this.setState(curObject);

  
     if (timeRemaining == 1) {
      const audio = document.getElementById("beep");
      audio.currentTime = 0;
      audio.play();
       // Play our beep to signal the state change.
     }
      
    if (timeRemaining < 1) {
      console.log(timeRemaining)
      switch (this.state.curState) {
        case "Session":
          this.setState({
            curState: "Break",
           // lastState: "Session"
          });

          var curObject = {};
          curObject[this.state.curState] = this.state.states[
            this.state.curState
          ];
          curObject[this.state.curState].curTime =
            curObject[this.state.curState].duration;
          this.setState(curObject);
          // var curObjectTwo = {};
          // curObjectTwo[this.state.lastState] = this.state.states[
          //   this.state.lastState
          // ];
          // curObjectTwo[this.state.lastState].curTime =
          //   curObjectTwo[this.state.lastState].duration;
          // this.setState(curObject);
          break;
          
        case "Break":
          this.setState({
            curState: "Session",
            // lastState: "Break"
          });
          var curObject = {};
          curObject.Session = this.state.states.Session;
          curObject.Session.curTime = curObject.Session.duration;
          this.setState(curObject);
          
//           var curObjectTwo = {};
//           curObjectTwo.Break = this.state.states.Break;
//           curObjectTwo.Break.curTime = curObjectTwo.Break.duration;
//           this.setState(curObjectTwo);
          break;
      }
    }    
  }
  
  displayTime() {
    let showTime = (name, time) => {
      const displayName = document.getElementById("name");
      displayName.innerHTML = name;

      var minutes = parseInt(time / 60, 10);
      var seconds = parseInt(time % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var display = document.getElementById("time-left");
      display.innerHTML = minutes + ":" + seconds;
      
    };

    let timeRemaining;
             
    if (this.state.curState == "NOP") {
      timeRemaining = this.state.states[this.state.lastState].curTime;
      showTime(this.state.states[this.state.lastState].name, timeRemaining);
    } else {
      timeRemaining = this.state.states[this.state.curState].curTime;
      showTime(this.state.states[this.state.curState].name, timeRemaining);
    }
  }

  render() {
    return (
      <div>
        <Features2
          handlePlayPause={this.handlePlayPause}
          handleReset={this.handleReset}
        />
        <Timer />
        <Features1
          breakLength={this.state.states.Break.duration}
          sessionLength={this.state.states.Session.duration}
          handleClick1={this.handleClick1}
          handleClick2={this.handleClick2}
          handleClick3={this.handleClick3}
          handleClick4={this.handleClick4}
        />
        <audio id="beep" src="https://bigsoundbank.com/UPLOAD/ogg/0758.ogg"> </audio>
      </div>
    );
  }
}

export default App;
