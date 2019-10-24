// *.TXT READER file --> array (studentArrData)
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "data/students.txt",
        dataType: "text",
        success: function (data) { processData(data); }
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var studentArrData = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            studentArrData.push(tarr);
        }
    }
    var finalHtmlCode='<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th>'
        + '<th scope="col">My BCIT Email</th><th class ="social-links-students" scope="col">Links</th></tr></thead><tbody>';
    
    var socialButtonTableHtmlCode = '<td class ="social-links-students"><div class="social-buttons-students">'
        + '<a href="http://www.github.com" class="fa fa-github"></a><a href="http://www.linkedin.com" class="fa fa-linkedin"></a>'
        + '<a href="http://www.slack.com" class="fa fa-slack"></a><a href="http://www.facebook.com" class="fa fa-facebook"></a></div></td>';

    for (let i = 0; i < studentArrData.length; i++) {
        finalHtmlCode = finalHtmlCode
                    + '<tr><th scope="row">'
                    + (i+1)
                    + '</th><td>'
                    + studentArrData[i][0] // First name
                    + '</th><td>'
                    + studentArrData[i][1] // Last Name
                    + '</th><td><a href="mailto:students@bcit.ca">'
                    + studentArrData[i][2] // e-mail
                    + '</a></td>'
                    + socialButtonTableHtmlCode
                    + '</tr>';
    }
    document.getElementById('studentListTable').innerHTML = finalHtmlCode;
}  //END of function processData
