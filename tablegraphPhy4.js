currtrigger = -10;
// var xValues = [0, 2.95, 3.0, 3.05, 3.1, 3.15, 3.2, 3.25, 3.3];
var xValues = [3.3,3.25,3.2,3.15,3.1,3.05,3.0,2.95,0];
var logValues = [];
var count = 0;
let ebg = 0;
let slope = 0;
const set=new Set();
let trigger =0
setTimeout(() => {
  fillTable();
}, 3700);

function fillTable() {
  filltableintrval = setInterval(() => {
    if (localStorage.getItem("fullScreen") == "true") {
      snackbarFunction(
        "Put the key and press on the Power Supply button and Heater button to begin."
      );
      localStorage.setItem("fullScreen", false);
      setTimeout(() => {
        snackbarFunction(
          "Readings are automatically recorded in the Table and Graph will be plotted."
        );
      }, 13000);
    }

    var rowData = JSON.parse(localStorage.getItem("rowData"));
    if (rowData.tempc && rowData.sno < 8) {
      srno = document.getElementsByClassName("srno")[rowData.sno];
      tempc = document.getElementsByClassName("tempc")[rowData.sno];
      tempk = document.getElementsByClassName("tempk")[rowData.sno];
      curr = document.getElementsByClassName("current")[rowData.sno];
      tsqr = document.getElementsByClassName("tempsqr")[rowData.sno];
      tinv = document.getElementsByClassName("tempinv")[rowData.sno];
      log = document.getElementsByClassName("log")[rowData.sno];

      let temp;
      srno.value = rowData.sno + 1;
      tempc.value = rowData.tempc;
      tempk.value = rowData.tempc + 273;

      temp = rowData.curr;
      curr.value = temp.toFixed(2);

      temp = Math.pow(rowData.tempc + 273, 2);
      tsqr.value = temp.toFixed(0);

      temp = Math.pow(rowData.tempc + 273, -1) * 1000;
      tinv.value = temp.toFixed(4);

      temp = Math.log10(rowData.curr/Math.pow(rowData.tempc + 273, 2));
      log.value = temp.toFixed(3);

      if (currtrigger < rowData.tempc) {
        currtrigger = rowData.tempc;
        logValues.push(temp.toFixed(3));
        console.log(logValues);
        // drawGraph()
        myChart.update();
        count++;
      }


      // logValues=[...set];
      // set.add(temp.toFixed(3));
      // if(set.size > trigger){
      //   trigger = set.size;
        
      //   console.log(logValues);
      //   myChart.update();
      //   count++;
      // }


      let f=0;
      if (count == 8) {
        if(f==0){
          f=1;
          snackbarFunction(
            "For Calculation Take the Value of Slope from graph "
          );
        }
        document.querySelector(".slope-div").style.display = "block";
        document.querySelector("#download").style.display = "block";
      }
    }
    if (rowData.sno == 8) {
      clearInterval(filltableintrval);
    }
  }, 500);
}

// let ctx = document.getElementById("myChart").getContext("2d");
// let myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [
//       {
//         label: "log(Is / T^2) vs 1/T",
//         data: logValues,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: false,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       xAxes: [
//         {
//             scaleLabel: {
//             display: true,
//             labelString: "1/T (1/K)",
//           },
//         },
//       ],
//       yAxes: [
//         {
//             ticks: {
//                 beginAtZero: true, // Start y-axis from 0
//               },
//             scaleLabel: {
//             display: true,
//             labelString: "log(Is / T^2)",
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     animation:{
//         duration:1
//     }
//   },
// });
let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "log(Is / T^2) vs 1/T",
        data: logValues.reverse(),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "1/T (1/K)",
          },
          position: 'top', // Position x-axis at the top
          ticks: {
            reverse: true, // Reverse the x-axis
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Start y-axis from 0
            reverse: false, // Reverse the y-axis
          },
          scaleLabel: {
            display: true,
            labelString: "log(Is / T^2)",
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1,
    },
  },
});

document.querySelector(".calcslope").addEventListener("click", calslope);
function calslope() {
  let x1, x2, y1, y2;
  let slopevalue = document.querySelector(".slopev");
  document.querySelector(".svalue").style.display = "block";
  x1 = xValues[1];
  x2 = xValues[4];

  y1 = logValues[1];
  y2 = logValues[4];

  slope = (y2 - y1) / (x2 - x1);
  ebg = 2.303 * 8.62 * Math.pow(10, -5) * slope * 1000;
  slopevalue.innerHTML = slope.toFixed(4);
  // document.querySelector(".ebg").style.display = "block";
}


document.querySelector(".ebgbtn").addEventListener("click", function(event) {
  event.preventDefault();  // Prevent the default form submission behavior
  ebgcal();
});

function ebgcal() {
  let slopeinp = document.querySelector(".slopeinp");
  let res = document.querySelector(".ebgvalue");
  if (slopeinp.value !== slope.toFixed(4)) {
    alert("Enter correct slope");
  } else {
    document.querySelector(".ebgres").style.display = "block";
    res.innerHTML = ebg.toFixed(4);
  }
}

snackbarFunction(
  "Follow the Indicators and Click on the Terminals to make the connection."
);

function snackbarFunction(instruction) {
  var x = document.getElementById("snackbar");
  x.textContent = instruction;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 10000);
}

var elem = document.getElementsByTagName("body")[0];
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}


async function downloadGraphAndObservations() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 5, 190, 10, 'F');
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Observations Table", 75, 12); // Add text at x=10, y=10

    //Add the table head
    // const tableHead = await html2canvas(document.querySelector("#tablehead"), {
    //     scale: 2,
    // });
    // const tableheadData = tableHead.toDataURL("image/png");
    // doc.addImage(tableheadData, "PNG", 10,5 , 190, 20);
    // Add the observation table
    const tableCanvas = await html2canvas(document.querySelector("#table1"), {
        scale: 2,
    });
    const tableImgData = tableCanvas.toDataURL("image/png");
    doc.addImage(tableImgData, "PNG", 15, 17, 180, 120);

    // Add the graph
    const chartImage = myChart.toBase64Image();
    // doc.addPage();

    // //Add the graph head
    // Set background color
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 140, 190, 10, 'F');
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Graph", 95, 147); // Add text at x=10, y=10

    doc.addImage(chartImage, "PNG", 25, 150, 150, 120);

    
    doc.addPage();
    //calculation page
    //Add the labels
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 5, 190, 10, 'F');
    // Add a header with black text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to black
    doc.setFontSize(20); // Set font size for the header
    doc.text("Calculation", 75, 12);

    // doc.setTextColor(0,0,0);
    // doc.setFontSize(18);
    // doc.text("Energy Band Gap Calculation : ", 10, 25);

    // doc.setFontSize(15);
    // doc.text("Slope of the Graph is ",10,33)

    // doc.setTextColor(255, 0, 0);
    // doc.text(`${slope.toFixed(4)}`,65,33)

    // doc.setTextColor(0, 0, 0);
    // doc.text(`Bang Gap = 2.303 * 8.62 * 10   * ${slope.toFixed(4)} eV`,10,41)
    // doc.text(`Bang Gap = ${ebg} eV`,10,49)
    // doc.setFontSize(12)
    // doc.text("-5",80,38)
    const calc = await html2canvas(document.querySelector(".formula"), {
      scale: 2,
  });
  const calcimg = calc.toDataURL("image/png");
  doc.addImage(calcimg, "PNG", 15, 17, 180, 120);


    // Save the PDF
    doc.save("observations_and_graph.pdf");
}

// Add event listener to the download button
document.getElementById("download").addEventListener("click", downloadGraphAndObservations);
