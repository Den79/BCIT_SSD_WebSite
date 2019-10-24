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
    var monthArrFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthArrShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthIndex = 8; // first month of the calendar - Sep
    var dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var dayIndex = 0;
    var htmlWeek = "";
    var htmlMonth = "";
    var finalHtmlCode = "";
    var previousDayIndex = 0;

    for (let i = 0; i < calendarArrData.length; i++) {

        // If - filter to exclude the cells without data
        if (calendarArrData[i][0].includes("Week") ||
            calendarArrData[i][0].includes("Break") ||
            calendarArrData[i][0].includes("Industry Projects")) {

        } else {

             // end of the week detector
             if (dayIndex > 4) {
                dayIndex = 0;
                htmlMonth = htmlMonth 
                        + '<div class="week">' 
                        + htmlWeek 
                        + '</div>';
                htmlWeek = "";
                //previousDayIndex = 0;
            }

            //end of the month detector
            if (!(calendarArrData[i][0].includes(monthArrShortName[monthIndex]))) {
                finalHtmlCode = finalHtmlCode
                    + '<div class="month">'
                    + '<p>' 
                    + monthArrFullName[monthIndex] // use full name of month instead of short version
                    + '</p>'
                    + htmlMonth
                    + '<div class="week">'
                    + htmlWeek
                    + emptyDays(dayArr.length - dayIndex, dayArr.length) // add empty day-divs to fill  month-div in the end of month
                    + '</div></div>';
                previousDayIndex = dayIndex; // save data for next month (how many empty days add in the beginning)
                htmlWeek = "";
                htmlMonth = "";
                monthIndex++;
                if (monthIndex > 11) monthIndex = 0;
            }

            // days
            htmlWeek = htmlWeek
                + emptyDays(previousDayIndex, dayArr.length) // add empty day-divs to fill  month-div in the beginning of month (first week)
                + '<div '
                + currentDay(calendarArrData[i][0])  // add id='currentDay' if the date is today 
                + ' class="day"><div class="dayOfWeek text-primary">'
                + dayArr[dayIndex]
                + '</div><div class="date bg-primary">'
                + calendarArrData[i][0]
                + '</div><div class="course"><a href="courses.html#' // with link to the courses page
                + calendarArrData[i][1]
                + '">'
                + calendarArrData[i][1]
                + '</div><div class="instructor"> <a href="staff.html#' // with link to the staff page instructor part
                + calendarArrData[i][2]
                + '">'
                + calendarArrData[i][2]
                + '</a></div></div>';
            dayIndex++;
            previousDayIndex = 0; // how many empty days should we add
        }
    }
    // add the last "week" and "month" - div
    finalHtmlCode = finalHtmlCode
                        + '<div class="month bg-gradient-primary">'
                        + '<p>' 
                        + monthArrFullName[monthIndex] // use full name of month instead of short version
                        + '</p>'
                        + htmlMonth
                        + '<div class="week">'
                        + htmlWeek
                        + '</div></div>';

    document.getElementById('calendarBody').innerHTML = finalHtmlCode;

    // function get String format <Month Day> and return string<'id="current"'> if it is today.
    function currentDay(monthDayString ){
        var result ="";
        var todayDay = new Date().getDate();
        var todayMonth = new Date().getMonth();
        //var todayDay = 8; // Check with user day
        //var todayMonth = 4; // Check with user month
        var currentDateString = monthArrShortName[todayMonth]  + " " + todayDay;
        if (currentDateString === monthDayString) {
            result = result + 'id="currentDay"';
        }
        return result;
    }
}  //END of function processData

// function get: numb: number of days (how many empty days we need) and howManyDaysInWeek: how many days in our calendar's week.  
// return: empty .day-divs to fill the calendar
function emptyDays(numb, howManyDaysInWeek) {
    if (numb == howManyDaysInWeek) return "";  // check if the week is full of empty day-divs
    var empty = "";
    for (let i=0; i < numb; i++) {
        empty = empty + '<div id="empty" class="day"></div>'
    }
    return empty;
};