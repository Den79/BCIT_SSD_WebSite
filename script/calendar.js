// *.TXT READER file --> array (calendarArrData)
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

    var monthArrShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthIndex = 8; // first month of the calendar - Sep
    var dayArr = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri'];
    var dayIndex = 0;
    var htmlWeek = "";
    var htmlMonth = "";
    var finalHtmlCode = "";

    for (let i = 0; i < calendarArrData.length; i++) {

        // If - filter to exclude the cells without data
        if (calendarArrData[i][0].includes("Week") ||
            calendarArrData[i][0].includes("Break") ||
            calendarArrData[i][0].includes("Industry Projects")) {

        } else {

             // end of the week detector
             if (dayIndex > 4) {
                dayIndex = 0;
                htmlMonth = htmlMonth + '<div class="week">' + htmlWeek + '</div>';
                htmlWeek = "";
            }

            //end of the month detector
            if (!(calendarArrData[i][0].includes(monthArrShortName[monthIndex]))) {
                finalHtmlCode = finalHtmlCode
                      + '<div class="month">'
                    + monthArrShortName[monthIndex]
                    + htmlMonth
                    + '<div class="week">'
                    + htmlWeek
                    + '</div></div>';
                htmlWeek = "";
                htmlMonth = "";
                monthIndex++;
                if (monthIndex > 11) monthIndex = 0;
            }


            // days
            htmlWeek = htmlWeek
                + '<div class="day"><div class="dayOfWeek">'
                + dayArr[dayIndex]
                + '</div><div class="date">'
                + calendarArrData[i][0]
                + '</div><div class="course">'
                + calendarArrData[i][1]
                + '</div><div class="instructor">'
                + calendarArrData[i][2]
                + '</div></div>';
            dayIndex++;
  
        }

    }
    // add the last "week" and "month" - div
    finalHtmlCode = finalHtmlCode
                        + '<div class="month">'
                        + monthArrShortName[monthIndex]
                        + htmlMonth
                        + '<div class="week">'
                        + htmlWeek
                        + '</div></div>';

    document.getElementById('calendarBody').innerHTML = finalHtmlCode;
    //var d = new Date();
    //alert(d);

}