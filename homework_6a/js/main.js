// store selected appointment type in session
function displaySelectedType() {
    var userType = [];
    // document.getElementById("result").innerHTML = "";
    var ele = document.getElementsByTagName('input');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].type="radio") {
            if(ele[i].checked) {
                // document.getElementById("result").innerHTML
                //         += ele[i].name + ": " + ele[i].value + "<br>";
            userType = ele[i].value;
            sessionStorage.setItem("selected_type", userType);
            console.log(userType);
            }
        }
    }
}


// store selected date
function GetSelectedDate(){
    var userDate = []; 
    var e = document.getElementById("date_dropdown");
    var result = e.options[e.selectedIndex].text;
    userDate = result;
    console.log(userDate);
    sessionStorage.setItem("selected_date", userDate);
}


// store selected time
function GetSelectedTime(){
    var userTime = []; 
    var e = document.getElementById("time_dropdown");
    var result = e.options[e.selectedIndex].text;
    userTime = result;
    console.log(userTime);
    sessionStorage.setItem("selected_time", userTime);
}


// call both functions on click in schedule_appt.html
function GetSelectedText(){
    GetSelectedDate()
    GetSelectedTime()
}


// display all selected data (type, date, time) on confirmation page
function onLoad() {
    var userType = sessionStorage.getItem("selected_type");
    var userDate = sessionStorage.getItem("selected_date");
    var userTime = sessionStorage.getItem("selected_time");
    console.log(userType);
    console.log(userDate);
    console.log(userTime);
    document.getElementById("type_display").innerHTML = userType;
    document.getElementById("date_display").innerHTML = userDate;
    document.getElementById("time_display").innerHTML = userTime;
}


// raise an alert when appointment is confirmed
function ConfirmAlert() {
    alert("Appointment Confirmed!");
}

// raise an alert when appointment is confirmed
function CancelAlert() {
    alert("Appointment Canceled.");
}
