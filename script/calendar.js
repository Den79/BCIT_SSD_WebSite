// READER from .txt file to array (calendarArrData)
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
    var calendarArrData = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            calendarArrData.push(tarr);
        }
    }

    // Insert the data from array (array calendarArrData) to code of the html page 
    // 
    var htmlCode = "";
    var dayArr = ['Mon','Tues', 'Wed', 'Thur', 'Fri'];
    var dayIndex = 0;
    for (let i = 0; i < calendarArrData.length; i++) {
        // If - filter to exclude empty cells
        if (calendarArrData[i][0].includes("Week") ||
            (calendarArrData[i][0].includes("Break"))) {

        } else {
            htmlCode = htmlCode
                + '<div class="day"><div class="dayOfWeek">'
                + dayArr[dayIndex]
                + '</div><div class="date">'
                + calendarArrData[i][0]
                + '</div><div class="course">'
                + calendarArrData[i][1]
                + '</div><div class="instructor">'
                + calendarArrData[i][2]
                + '</div></div>';
            dayIndex ++;
        }
     if (dayIndex > 4) dayIndex = 0;

    }
    document.getElementById('day').innerHTML = htmlCode;
    var d = new Date();
    alert(d.get());

}