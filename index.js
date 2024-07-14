// 0->one 1->two 2->three 3->four

// wireTerminalCheck = [{'one': false,'five': false}, {'three': false,'five': false},
//                         {'six': false, 'four': false},{'two': false, 'six': false}]

wireTerminalCheck = [
  { two: false, six: false },
  { six: false, four: false },
  { five: false, three: false },
  { one: false, five: false },
];

terminalMap = {
  0: "one",
  1: "two",
  2: "three",
  3: "four",
  4: "five",
  5: "six",
};

var xValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

sequenceNum = 0;

var rowData = { sno: 0, time: 0, volts: 0 };
localStorage.setItem("rowData", JSON.stringify(rowData));
localStorage.setItem("fullScreen", false);
localStorage.setItem("transitionDis", false);
var btnPressed = [false, false, false];

setTimeout(() => {
  // enablingSequence(sequenceNum);
  startWorking();
}, 2000);

function enablingSequence(sequenceNum) {
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
      // console.log('here')
      console.log("ye call hua");
    } else {
      // console.log('here')
      replacement();
      console.log("ye repalcement call  hua ");
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
  // document.getElementById('black-board').classList.add('hidden')
  // document.getElementById('table-board').classList.add('replacement')

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
    document.getElementById("power").textContent = "01.00";
    document.getElementById("volt").textContent = "06.83";
    document.getElementById("power-btn").style.strokeWidth = "0%";
  } else if (btnNum == 1) {
    document.getElementById("temp").textContent = "27.00";
    document.getElementById("burner-btn").style.strokeWidth = "0%";
  }

  if (btnPressed[0] && btnPressed[1] && btnPressed[2]) {
    startWorking();
  }
}

let curarr = [
  6.83, 7.07, 7.31, 7.56, 7.82, 8.09, 8.36, 8.64, 8.92, 9.22, 9.52, 9.833, 10.1,
  10.47, 10.81, 11.15, 11.5, 11.86, 12.23, 12.61, 12.99, 13.39, 13.79, 14.21,
  14.63, 15.07, 15.51, 15.97, 16.44, 16.91, 17.4, 17.9, 18.41, 18.93, 19.46,
  20.0, 20.56, 21.13, 21.71,
];

let curno = 6.83;
let number = 27.0;

let flag = 1;


function startWorking() {
  let temptext = document.getElementById("temp");
  let curtext = document.getElementById("volt");
  let i=0;
  let intervalId = setInterval(() => {
    // number+=getRndInteger(0.00,1.00);
    number++;
    temptext.textContent = number.toFixed(2);
    if (flag == 0) {
      curno = curarr[i++] + getRndInteger(0.1, 0.3);
      flag = 1;
    } else {
      curno = curarr[i++] - getRndInteger(0.1, 0.3);
      flag = 0;
    }
    curtext.textContent = curno.toFixed(2);
    // Stop the interval after reaching a certain number
    if (number >= 65.0) {
      clearInterval(intervalId);
      startdroping();
    }
  }, 100); // Increase number every 100 milliseconds
}

function startdroping() {
  let temptext = document.getElementById("temp");
  let curtext = document.getElementById("volt");

  let i = curarr.length;
  let flag = 1;

  let intervalId = setInterval(() => {
    // number+=getRndInteger(0.00,1.00);
    number--;
    temptext.textContent = number.toFixed(2);
    if (flag == 0) {
      curno = curarr[i--] + getRndInteger(0.1, 0.3);
      flag = 1;
    } else {
      curno = curarr[i--] - getRndInteger(0.1, 0.3);
      flag = 0;
    }
    curtext.textContent = curno.toFixed(2);
    if(number%5==0){
      
    }
    // Stop the interval after reaching a certain number
    if (number <= 27.0) {
      clearInterval(intervalId);
    }
  }, 100); // Increase number every 100 milliseconds
}

// function startWorking(){

//     rowData =  {'sno':0, 'time': 0, 'volts': 0.36}
//     localStorage.setItem("rowData", JSON.stringify(rowData))
//     stopwatch = document.getElementById('stopwatch')
//     voltmeter = document.getElementById('volt')

//     if(conditionChar === 'charging'){
//         volt = 36
//         time = 0
//         min = 4
//         max = 6
//         srno = 1
//         yValuesdum = []
//         stopwatchTime = setInterval(() => {
//             if(time< 10)
//                 stopwatch.textContent = '00'+time+'.0'
//             else if(time<100)
//                 stopwatch.textContent = '0'+time+'.0'
//             else
//                 stopwatch.textContent = time+'.0'
//             time++
//             if(time == 211){
//                 clearInterval(stopwatchTime)
//                 clearInterval(voltReading)
//                 clearInterval(dataPass)
//                 localStorage.setItem("transitionDis", true)
//                 elem = document.getElementById('key2')
//                 elem.classList.add('key-up-down')
//                 elem.style.display = "block"
//                 elem.onclick = function(){
//                    keyOp()
//                 }
//                 document.getElementById('keyBase2').onclick = function(){
//                     keyOp()
//                 }
//             }
//         }, 330);
//         voltReading = setInterval(() => {
//             volt += getRndInteger(min, max)
//             if(volt<100)
//                 voltmeter.textContent = "00."+volt
//             else if(volt < 200){
//                 if(volt < 110)
//                     voltmeter.textContent = "01.0"+(volt-100)
//                 else
//                     voltmeter.textContent = "01."+(volt-100)
//             }
//         }, 1000);
//         dataPass = setInterval(() => {
//             if(min>0) min--
//             if(max>1) max--
//             yValue = parseFloat(voltmeter.textContent)
//             yValuesdum.push(yValue)
//             rowData.sno = srno
//             rowData.time = xValues[srno]
//             rowData.volts = yValue
//             localStorage.setItem('rowData', JSON.stringify(rowData))
//             srno++
//         }, 9901);
//     }else{
//         volt = parseFloat(voltmeter.textContent)*100
//         time = 210
//         min = 3
//         max = 6
//         srno = 8
//         yValuesdum = []
//         stopwatchTime = setInterval(() => {
//             stopwatch.textContent = time+'.0'
//             time++
//             if(time == 361){
//                 clearInterval(stopwatchTime)
//                 clearInterval(voltReading)
//                 clearInterval(dataPass)
//             }
//         }, 330);
//         voltReading = setInterval(() => {
//             volt -= getRndInteger(min, max)
//             if(volt<100)
//                 voltmeter.textContent = "00."+volt
//             else if(volt < 200){
//                 if(volt < 110)
//                     voltmeter.textContent = "01.0"+(volt-100)
//                 else
//                     voltmeter.textContent = "01."+(volt-100)
//             }
//         }, 1000);
//         dataPass = setInterval(() => {
//             if(min>0) min--
//             if(max>1) max--
//             yValue = parseFloat(voltmeter.textContent)
//             yValuesdum.push(yValue)
//             rowData.sno = srno
//             rowData.time = xValues[srno]
//             rowData.volts = yValue
//             localStorage.setItem('rowData', JSON.stringify(rowData))
//             srno++
//         }, 9901);

//     }
//     alert("Bhaiworking bai svg set hai")
// }
