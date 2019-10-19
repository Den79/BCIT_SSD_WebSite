// READER from .txt file
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "data/schedule-data.txt",
        dataType: "text",
        success: function (data) { processData(data); }
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
    //console.log(lines);
    //alert(lines[0][2]);

    // Insert the data from .txt (array lines) to code of the html page 
    var day = '<div class="day"><div class="date">'
        + lines[0][0]
        + '</div><div class="course">'
        + lines[0][1]
        + '</div><div class="instructor">'
        + lines[0][2]
        + '</div></div>';

    for (i = 1; i < lines.length; i++) {
        if (lines[i][0].includes("Week") ||
            (lines[i][0].includes("Break"))) {

        } else {
            day = day
                + '<div class="day"><div class="date">'
                + lines[i][0]
                + '</div><div class="course">'
                + lines[i][1]
                + '</div><div class="instructor">'
                + lines[i][2]
                + '</div></div>';
        }

    }
    document.getElementById('day').innerHTML = day;
    var d = new Date();
    //alert(d);

}