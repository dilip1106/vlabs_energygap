<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Energy Band Gap</title>
    <link rel="stylesheet" href="./stylePhy4.css" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <?php
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
          $slope = floatval($_POST['slope']);
          $boltzmann_constant = 8.62e-5;
          $energy_band_gap = 2.303 * $boltzmann_constant * $slope;
      }
    ?>
    <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-lg-5">
            <div>
              <div class="tablehead obs spc" id="tablehead">
                <h4>OBSERVATION TABLE</h4>
              </div>
              <div class="table mt-3">
                <table id="table1">
                  <tr>
                    <th class="px-3">Sr no.</th>
                    <th class="px-3">T(<sup>O</sup>C)</th>
                    <th class="px-3">T(<sup>O</sup>K)</th>
                    <th class="px-3">I<sub>s</sub>(µA)</th>
                    <th class="px-3">
                      T<sup>2</sup>(<sup>O</sup>K)<sup>2</sup>
                    </th>
                    <th class="px-3">
                      <sup>10<sup>3</sup></sup
                      >&frasl;<sub>T</sub>(<sup>O</sup>K)<sup>-1</sup>
                    </th>
                    <th class="px-3">
                      log<sup>I<sub>s</sub></sup
                      >&frasl;<sub>T<sup>2</sup></sub>
                    </th>
                  </tr>
                  <!-- Rows remain the same as in the HTML, assuming they will be filled by JavaScript -->
                </table>
                <div class="flex mt-2 py-3 w-100">
                  <div class="tablehead obs spc" id="tablehead">
                    <h4>CALCULATION</h4>
                  </div>
                </div>
                <div class="formula">
                  <select class="form-select" id="inlineFormSelectPref">
                    <option selected>Choose...</option>
                    <option value="./assets/bandgap3.svg">Silicon</option>
                    <option value="./assets/bandgap2.svg">Germanium</option>
                  </select>
                  <h5>E<sub>g</sub> = 2.303 * 8.62 * k * slope</h5>
                  <h6 class="formula-desc">
                    where,<br />
                    k is Boltzman’s constant ( 8.62 x 10<sup>-5</sup> eV)
                  </h6>
                  <div class="ebg py-4">
                    <h5>Energy band gap:</h5>
                    <h5>
                      2.303 x 8.62 x 10<sup>-5</sup> x
                      <input
                        class="slopeinp"
                        name="slope"
                        type="text"
                        placeholder="Enter slope"
                      />
                    </h5>

                    <div class="py-3 calcbtn">
                      <button
                        type="button"
                        class="btn btn-outline-primary mr-4"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Graph
                      </button>
                      <button class="btn btn-outline-primary ebgbtn" type="submit">
                        Calculate
                      </button>
                    </div>
                    <?php
                      if ($_SERVER["REQUEST_METHOD"] == "POST") {
                          echo "<div class='ebgres'><h5>E<sub>g</sub>: <span class='ebgvalue'>" . $energy_band_gap . "</span> eV</h5></div>";
                      }
                    ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-7 bt">
            <div class="center-height">
              <div class="simulation-container">
                <object
                  type="image/svg+xml"
                  class="ml-4"
                  id="main-svg"
                  data="./assets/bandgap3.svg"
                ></object>
                <div id="snackbar" class="instruct1"></div>
                <input
                  class="btn btn-primary btn-sbt"
                  onclick="myFunction()"
                  value="Submit Observation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Graph</h1>
            <button
              type="button"
              class="close"
              aria-label="Close"
              data-bs-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="graph p-4" id="graph" style="margin-top: 10px">
              <div class="tablehead obs" id="graphhead">
                <h5>log(Is / T^2) vs 1/T</h5>
              </div>
              <canvas id="myChart"></canvas>
            </div>
            <div class="slope-div">
              <div class="slope">
                <button type="button" class="btn btn-primary calcslope">
                  Calculate The Slope
                </button>
                <div>
                  <h5 class="svalue">Slope is <span class="slopev"></span></h5>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" id="download">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"
    ></script>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="./tablegraphPhy4.js"></script>
    <!-- <script src="index.js"></script> -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
