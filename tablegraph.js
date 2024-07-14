var tableDat1 = document.getElementById("table1")
var tableDat2 = document.getElementById("table2")

yValuesdum = []
voltTriggger = 0
var xValues = [0,30,60,90,120,150,180,210,240,270,300,330,360];

setTimeout(() => {
   fillTable(tableDat1)  
//    fillTableDischarge(tableDat2)  
}, 3000);

function fillTable(tabledata){
    filltableintrval = setInterval(() => {
        if(localStorage.getItem("fullScreen") == 'true'){
            snackbarFunction("Put the key and press on the Power Supply button and Heater button to begin.")
            localStorage.setItem("fullScreen", false)
            setTimeout(() => {
                snackbarFunction("Readings are automatically recorded in the Table and Graph will be plotted.")
            }, 13000);
        }
        // if(localStorage.getItem("transitionDis") == 'true'){
        //     snackbarFunction("Since the Supercapcitor is Fully Charged, put the Discharge key to discharge the Supercapacitor")
        //     localStorage.setItem("transitionDis", false)
        // }

        var rowData = JSON.parse(localStorage.getItem('rowData'))
        if(rowData.volts && rowData.sno < 8){
            // if(voltTriggger < rowData.volts){
            //     voltTriggger = rowData.volts
            //     chartRenderData(voltTriggger)
            // }
            srno = document.getElementsByClassName("srno")[rowData.sno]
            time = document.getElementsByClassName("tempc")[rowData.sno]
            voltage = document.getElementsByClassName("curr")[rowData.sno]
            srno.value = rowData.sno + 1
            time.value = rowData.time
            voltage.value = rowData.volts
            // x = tabledata.rows[rowData.sno + 2].cells
            // x[0].textContent = rowData.sno + 1
            // x[1].textContent = rowData.time
            // x[2].textContent = rowData.volts
        }
        if(rowData.sno == 12){
            clearInterval(filltableintrval)
        }
    }, 500);
}

// function fillTableDischarge(tabledata){
//     filltabledischargeinterval = setInterval(() => {
//         var rowData = JSON.parse(localStorage.getItem('rowData'))
//         if(rowData.volts && rowData.sno >= 8){
//             if(voltTriggger > rowData.volts){
//                 voltTriggger = rowData.volts
//                 chartRenderData(voltTriggger)
//             }
//             srno = document.getElementsByClassName("srno")[rowData.sno]
//             time = document.getElementsByClassName("time")[rowData.sno]
//             voltage = document.getElementsByClassName("voltage")[rowData.sno]
//             srno.value = rowData.sno + 1 - 8
//             time.value = rowData.time
//             voltage.value = rowData.volts
//             if(rowData.sno == 12){
//                 clearInterval(filltabledischargeinterval)
//                 snackbarFunction("The Experiment is Successfully completed!")
//                 setTimeout(() => {
//                     document.getElementById("snackbar").style.display = "none"
//                     document.getElementsByClassName("btn-sbt")[0].style.display = "block"
//                 }, 7000);
//             }
//         }
//     }, 500);
// }

function chartRenderData(yValue){
    yValuesdum.push(yValue)
    chart.config.data.datasets[0].data = yValuesdum
    chart.update()
}

var chart = new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "#39FF14",
            borderColor: "#000",
            data: []
        }]
    },
    options: {
        // title:{
        //     display: true,
        //     text: 'Plot of Charging and Discharging Characteristic',
        //     fontSize: 18,
        //     // padding: 25,
        //     fontColor: 'black',
        //     // backgroundColor: '#007bff'
        // },
        legend: {display: false},
        scales: {
            yAxes: [ {
                ticks: {min:0, max:2, maxTicksLimit:5, fontColor:"black"},
                scaleLabel: {
                    display: true,
                    labelString:'Voltage (V)',
                    fontSize: 14,
                    fontColor: "#000"
                }
            }],
            xAxes: [ {
                ticks: {maxTicksLimit:5, fontColor:"black"},
                scaleLabel: {
                    display: true,
                    labelString:'Time (s)',
                    fontSize: 14,
                    fontColor: "#000",
                }
            }],
        },
        animation:{
            duration:1
        }
    }
});

snackbarFunction("Follow the Indicators and Click on the Terminals to make the connection.")

function snackbarFunction(instruction) {
    var x = document.getElementById("snackbar");
    x.textContent = instruction
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 7000);
}

var elem = document.getElementsByTagName('body')[0]
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
