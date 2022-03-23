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


// store selected date in session
function GetSelectedDate(){
    var userDate = []; 
    var e = document.getElementById("date_dropdown");
    var result = e.options[e.selectedIndex].text;
    userDate = result;
    console.log(userDate);
    sessionStorage.setItem("selected_date", userDate);
}


// store selected time in session
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


// function Appointment(type, date, time) {
//     this.type = type;
//     this.date = date;
//     this.time = time;
// }

// var userTime = sessionStorage.getItem("selected_time");

// display all selected data (type, date, time) on confirmation page
function onLoad() {
    // var appt_list = [];
    // sessionStorage.setItem("appt_list", appt_list);
    var appt_list = sessionStorage.getItem("selected_time");

    var userType = sessionStorage.getItem("selected_type");
    var userDate = sessionStorage.getItem("selected_date");
    var userTime = sessionStorage.getItem("selected_time");
    console.log(userType);
    console.log(userDate);
    console.log(userTime);
    // var data = [userType, userDate, userTime];s
    // console.log(data);
    // appt_list.push(data);
    // sessionStorage.setItem("appt_data", data);
    // let appt = new Appointment(userType, userDate, userTime);
    document.getElementById("type_display").innerHTML = userType;
    document.getElementById("date_display").innerHTML = userDate;
    document.getElementById("time_display").innerHTML = userTime;
}

// function displayPastAppts() {
//     var appt_list = [];
// }


// raise an alert when appointment is confirmed
function ConfirmAlert() {
    alert("Appointment Confirmed!");
}

// raise an alert when appointment is confirmed
function CancelAlert() {
    alert("Appointment Canceled.");
}
