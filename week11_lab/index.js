function init() {
    const dismissBtn = document.querySelector("#dismiss-notice");
    dismissBtn.onclick = (e) => {
      // Dismiss button was clicked
      // Find the parent of the clicked element and add a new class to it to hide it
      const notice = e.currentTarget.parentElement;
      notice.classList.add("dismissed");
    };
    loadPlotly();
  }
  
function loadPlotly() {
    Plotly.d3.csv(
    "https://raw.githubusercontent.com/jcambre/PUI2020/master/nyt-college-covid.csv",
    function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
        return row[key];
        });
    }

    var college = unpack(rows, "college"),
        cases = unpack(rows, "cases"),
        lat = unpack(rows, "LAT"),
        lon = unpack(rows, "LON"),
        covidSize = [],
        hoverText = [],
        scale = 50;

    for (var i = 0; i < college.length; i++) {
        var collegeCovidSize = cases[i] / scale;
        var currentText = college[i] + "\nCases: " + cases[i];
        covidSize.push(collegeCovidSize);
        hoverText.push(currentText);
    }

    var data = [
        {
        type: "scattergeo",
        locationmode: "USA-states",
        lat: lat,
        lon: lon,
        hoverinfo: "text",
        text: hoverText, /* TODO: Add hover labels to indicate which college corresponds to which marker on the map */
        marker: {
            size: covidSize,
            line: {
            color: "black",
            width: 2
            }
        }
        }
    ];

    var layout = {
        title: "COVID cases at US Universities",
        showlegend: false,
        width: 1000,
        height: 700,
        autosize: false,
        margin: {
        l: 0,
        r: 0,
        b: 50,
        t: 50,
        pad: 4
        },
        geo: {
        scope: "usa",
        projection: {
            type: "albers usa"
        },
        showland: true,
        landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
        }
    };

    Plotly.newPlot("covid-map", data, layout, {
        showLink: false,
        responsive: true
    });
    }
);
}

window.onload = function () {
    init();
};