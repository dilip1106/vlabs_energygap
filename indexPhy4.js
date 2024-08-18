// let type="silicon";
let type;

wireTerminalCheck = [{ two: false, six: false },{ six: false, four: false },
                  { five: false, three: false },{ one: false, five: false },];

terminalMap = { 0: "one",1: "two",2: "three",3: "four",4: "five",5: "six",};

var xValues = [65,60,55,50,45,40,35,30];

sequenceNum = 0;

var rowData = { sno: 0, time: 0, volts: 0 };
localStorage.setItem("rowData", JSON.stringify(rowData));
localStorage.setItem("fullScreen", false);
localStorage.setItem("transitionDis", false);
var btnPressed = [false, false, false];

setTimeout(() => {
  enablingSequence(sequenceNum);
  // startWorking();
}, 2000);

function enablingSequence(sequenceNum) {

  if(document.getElementById('tspanSe')){
    type="silicon"
  }
  else{
    type="germanium"
  }
  
  if (sequenceNum <= wireTerminalCheck.length) {
    for (var key in wireTerminalCheck[sequenceNum]) {
      elem = document.getElementsByClassName(key)[0];
      elem.style.stroke = "#FFFF00";
      elem.style.animationName = "pulse";
      elem.style.opacity = "1";
    }
  }
}

function trial(componentSom) {
  componentSomMap = terminalMap[componentSom];
  for (var key in wireTerminalCheck[sequenceNum])
    if (key == componentSomMap) wireTerminalCheck[sequenceNum][key] = true;

  elem = document.getElementsByClassName(componentSomMap)[0];
  // console.log(elem)
  elem.style.animationName = "none";
  elem.style.stroke = "none";
  // console.log(checkPair())
  dum = checkPair(sequenceNum);
  // console.log(dum)
  if (dum) {
    wireName = "wire" + (sequenceNum + 1);
    document.getElementById(wireName).style.transition = "display 10s";
    document.getElementById(wireName).style.display = "block";
    ++sequenceNum;
    if (sequenceNum < wireTerminalCheck.length) {
      enablingSequence(sequenceNum);
    } else {
      replacement();
    }
  }
}

function checkPair(sequenceNum) {
  count = 0;
  for (var key in wireTerminalCheck[sequenceNum])
    if (wireTerminalCheck[sequenceNum][key] == true) count++;
  // console.log(count, 'count')
  if (count == 2) return true;
  return false;
}

function keyPut() {
  document.getElementById("key1").style.animation = "none";
  document.getElementById("key1").onclick = function () {};
  document.getElementById("keyBase1").onclick = function () {};
}

function replacement() {

  document.getElementById("burner-btn").style.stroke = "red";
  document.getElementById("burner-btn").style.strokeWidth = "1%";
  document.getElementById("burner-btn").onclick = function () {
    document.getElementById("hotburner").style.display = "block";
    checkbtnPressed(1);
  };

  document.getElementById("power-btn").style.stroke = "yellow";
  document.getElementById("power-btn").style.strokeWidth = "1%";
  document.getElementById("power-btn").onclick = function () {
    checkbtnPressed(0);
  };

  document.getElementById("key1").style.display = "block";
  document.getElementById("key1").classList.add("key-up-down");
  document.getElementById("key1").onclick = function () {
    checkbtnPressed(2);
    keyPut();
  };
  document.getElementById("keyBase1").onclick = function () {
    checkbtnPressed(2);
    keyPut();
  };

  localStorage.setItem("fullScreen", true);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkbtnPressed(btnNum) {
  btnPressed[btnNum] = true;
  if (btnNum == 0) {
    document.getElementById("power").textContent = "02.00";
    document.getElementById("volt").textContent = "06.83";
    document.getElementById("power-btn").style.strokeWidth = "0%";
  } else if (btnNum == 1) {
    document.getElementById("temp").textContent = "27.00";
    document.getElementById("tempcopy").textContent = "27.00";
    document.getElementById("burner-btn").style.strokeWidth = "0%";
  }

  if (btnPressed[0] && btnPressed[1] && btnPressed[2]) {
    if(type==="silicon"){
      startWorking();
    }
    else{
      startWorkingGer();
    }
  }
}

// let curarr = [
//   6.83, 7.07, 7.31, 7.56, 7.82, 8.09, 8.36, 8.64, 8.92, 9.22, 9.52, 9.833, 10.1,
//   10.47, 10.81, 11.15, 11.5, 11.86, 12.23, 12.61, 12.99, 13.39, 13.79, 14.21,
//   14.63, 15.07, 15.51, 15.97, 16.44, 16.91, 17.4, 17.9, 18.41, 18.93, 19.46,
//   20.0, 20.56, 21.13, 21.71,22.10,22.51,23.01,23.60
// ];

let curarr = [
  7.83, 8.46, 9.01, 10.3, 11.8, 13.8, 15.2, 17.8, 19.5, 22.4, 24.6, 27.2,28.9, 32.4, 
  36.5, 40.8, 44.3, 48.1, 52.2, 56.1, 60.9, 64.2, 68.13, 72.4, 77.9, 85.3, 91.4, 
  99.5,102.4,109.5,116.7,123.5,126.6,138.7,145.4,153.6,158.7,165.4,171.3,175.8,175.8];

let curarrger = [
  0.00,1.2
];
// let curarr = [];

let curno = 6.83;
let temprature = 27.0;

let flag = 1;


function startWorking() {
  let temptext = document.getElementById("temp");
  let temptextcopy = document.getElementById("tempcopy");
  let curtext = document.getElementById("volt");
  let i=0;
  var srno=0;
  let intervalId = setInterval(() => {
    temprature++;
    temptext.textContent = temprature.toFixed(2);
    temptextcopy.textContent = temprature.toFixed(2);
    if (flag == 0) {
      curno = curarr[i++] + getRndInteger(0.5, 1.5);
      flag = 1;
    } else {
      curno = curarr[i++] - getRndInteger(0.5, 1.5);
      flag = 0;
    }
    if(temprature%5===0.00){
      filldata(srno,temprature,curno)
      srno++
      console.log("fill data callede");
      console.log(curarr)
    }
    curtext.textContent = curno.toFixed(2);
    // Stop the interval after reaching a certain temprature
    if (temprature >= 68.0) {
      clearInterval(intervalId);
      document.getElementById("hotburner").style.display = "none";
      // startdroping();
    }
  }, 1000); // Increase temprature every 100 milliseconds
}

function startdroping() {
  let temptext = document.getElementById("temp");
  let curtext = document.getElementById("volt");
  let i = curarr.length-1;
  let flag = 1;
  var srno=0;
  let intervalId = setInterval(() => {
    temptext.textContent = temprature.toFixed(2);
    if (flag == 0) {
      curno = curarr[i--] + getRndInteger(0.1, 0.3);
      flag = 1;
    } else {
      curno = curarr[i--] - getRndInteger(0.1, 0.3);
      flag = 0;
    }
    if(temprature%5===0.00){
      filldata(srno,temprature,curno)
      srno++
      console.log("fill data callede");
    }
    curtext.textContent = curno.toFixed(2);
    temprature--;

    // Stop the interval after reaching a certain temprature
    if (temprature <= 27.0) {
      clearInterval(intervalId);
    }
  }, 100); // Increase temprature every 100 milliseconds
}

function filldata(srno,temprature,curno){
  rowData =  {'sno':0, 'tempc': 65, 'curr': 0}
  localStorage.setItem("rowData", JSON.stringify(rowData))
      rowData.tempc=temprature
      rowData.sno = srno
      rowData.curr=curno
      console.log(srno);
      localStorage.setItem('rowData', JSON.stringify(rowData)) 
}

function startWorkingGer(){
  // let temptext = document.getElementById("temp");
  // let temptextcopy = document.getElementById("tempcopy");
  // let curtext = document.getElementById("volt");
  // let i=0;
  // var srno=0;
  // let intervalId = setInterval(() => {
  //   temprature++;
  //   temptext.textContent = temprature.toFixed(2);
  //   temptextcopy.textContent = temprature.toFixed(2);
  //   if (flag == 0) {
  //     curno = currarrger[i++] + getRndInteger(0.5, 1.5);
  //     flag = 1;
  //   } else {
  //     curno = currarrger[i++] - getRndInteger(0.5, 1.5);
  //     flag = 0;
  //   }
  //   if(temprature%5===0.00){
  //     filldata(srno,temprature,curno)
  //     srno++
  //     console.log("fill data callede");
  //     console.log(currarrger)
  //   }
  //   curtext.textContent = curno.toFixed(2);
  //   // Stop the interval after reaching a certain temprature
  //   if (temprature >= 68.0) {
  //     clearInterval(intervalId);
  //     document.getElementById("hotburner").style.display = "none";
  //     hi();
  //     // startdroping();
  //   }
  // }, 1000);
  alert("Germanium readings")
}
