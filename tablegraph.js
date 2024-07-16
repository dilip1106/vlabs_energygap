var tableDat1 = document.getElementById("table1")
var tableDat2 = document.getElementById("table2")

// yValuesdum = []
currtrigger = 10
var xValues = [0,2.9500,3.0000,3.050,3.100,3.1500,3.2000,3.2500,3.3000];
// var xValues = [0,1,2,3,4,5,6,7,8];
// yValuesdum = [3.2000,3.100,2.963,2.834,2.605,2.542,2.371,2.232,1.905]; 

var tinvValues = [];
var logValues =  [];
var count =0
const myset = new Set();
let ebg=0

setTimeout(() => {
    fillTable()  
//    fillTableDischarge(tableDat2)  
}, 3700);

function fillTable(){
    filltableintrval = setInterval(() => {
        if(localStorage.getItem("fullScreen") == 'true'){
            snackbarFunction("Put the key and press on the Power Supply button and Heater button to begin.")
            localStorage.setItem("fullScreen", false)
            setTimeout(() => {
                snackbarFunction("Readings are automatically recorded in the Table and Graph will be plotted.")
            }, 13000);
        }

        var rowData = JSON.parse(localStorage.getItem('rowData'))
        if( rowData.tempc && rowData.sno < 8 ){
            srno = document.getElementsByClassName("srno")[rowData.sno]
            tempc = document.getElementsByClassName("tempc")[rowData.sno]
            tempk = document.getElementsByClassName("tempk")[rowData.sno]
            curr = document.getElementsByClassName("current")[rowData.sno]
            tsqr = document.getElementsByClassName("tempsqr")[rowData.sno]
            tinv = document.getElementsByClassName("tempinv")[rowData.sno]
            log = document.getElementsByClassName("log")[rowData.sno]
            
            let temp;
            srno.value = rowData.sno + 1
            tempc.value=rowData.tempc
            tempk.value=rowData.tempc+273
            curr.value = (rowData.curr)
            tsqr.value= Math.pow((rowData.tempc+273),2)

            temp=(Math.pow((rowData.tempc+273),-1)*1000)
            tinv.value=temp.toFixed(4)

            temp=Math.log(rowData.curr)
            log.value =temp.toFixed(3)
            // xValues.push(tinv.value);

            // myset.add(log.value);
            // console.log(myset);
            tinvValues.push(tinv.value);
            
            if(currtrigger > Math.log(rowData.curr)){
                currtrigger = Math.log(rowData.curr)
                logValues.push(currtrigger)
                console.log(logValues)
                drawGraph()
                count++;
            }
            if(count == 8){
                document.querySelector('.slope-div').style.display="block"
            }
            
        }
        if(rowData.sno == 8){
            clearInterval(filltableintrval)
        }
    }, 500);
}



function drawGraph() {
    // const myArray = [...myset];                              
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',  
        data: {
            labels: xValues,
            datasets: [{
                label: 'log(Is / T^2) vs 1/T',
                data:logValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: '1/T (1/K)',
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'log(Is / T^2)',
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}



document.querySelector('.calcslope').addEventListener('click', calslope);
function calslope(){
    let x1,x2,y1,y2
    let slopevalue = document.querySelector('.slopev')
    document.querySelector('.svalue').style.display="block"
    x1=xValues[1];
    x2=xValues[4];

    y1=logValues[1];
    y2=logValues[4];

    const slope=(y2-y1)/(x2-x1);
    ebg=2.303 * 8.62 * 10-5 * slope;
    slopevalue.innerHTML=slope.toFixed(4);
    document.querySelector('.ebg').style.display="block"
}
document.querySelector('.ebgbtn').addEventListener('click', ebgcal);
function ebgcal(){
    let slopeinp =document.querySelector('.slopeinp')
    let res= document.querySelector('.ebgvalue')
    if(slopeinp.value==""){
        alert("Enter slope")
    }else{
         document.querySelector('.ebgres').style.display="block"
        res.innerHTML=ebg.toFixed(3)
    }
}
document.querySelector('.gen').addEventListener('click', drawGraph);

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


