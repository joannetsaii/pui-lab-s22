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


// display all selected data (type, date, time) on confirmation page
function load_new_appt() {
    // get values from storage
    var userType = sessionStorage.getItem("selected_type");
    var userDate = sessionStorage.getItem("selected_date");
    var userTime = sessionStorage.getItem("selected_time");
    console.log(userType);
    console.log(userDate);
    console.log(userTime);

    // display values on the corresponding fields
    document.getElementById("type_display").innerHTML = userType;
    document.getElementById("date_display").innerHTML = userDate;
    document.getElementById("time_display").innerHTML = userTime;
}


// raise an alert when appointment is confirmed or invalid
function ConfirmAlert() {
    appt_data = JSON.parse(sessionStorage.getItem("appt_data"));
    if (appt_data != null && appt_data.length <= 3) {
        alert("Appointment Confirmed!");
    }
    else {
        alert("You can only make up to three appointments at a time.");
    }
}

// raise an alert when appointment is confirmed
function CancelAlert() {
    alert("Appointment Canceled.");
}


// add to upcoming appointments when user presses "confirm"
function add_to_cart() {
    // load data of new appointment
    var type = sessionStorage.getItem("selected_type");
    var date = sessionStorage.getItem("selected_date");
    var time = sessionStorage.getItem("selected_time");
    var location = 'TCS Hall (Tartan Consultancy Service)';
    console.log(type);
    console.log(date);
    console.log(time);

    // check if any appointment data exists
    if (typeof JSON.parse(sessionStorage.getItem("appt_data")) == 'undefined') {
        var appt_data = []; // first appointment, initialize 
    }  
    else { 
        appt_data = JSON.parse(sessionStorage.getItem("appt_data")); 
        if (appt_data == null) { 
            appt_data = [];
            // store new appointment
            console.log("before adding", appt_data);
            appt_data.push({type: type, date: date, time: time, location: location}); // push new appointment into appt_array
            sessionStorage.setItem("appt_data", JSON.stringify(appt_data)); // store the new appointment
            console.log("after adding", appt_data);
            document.getElementById("cart_length").innerHTML = appt_data.length;
        }
        else if (appt_data.length >= 3) {
            // DO NOT store appointment if there are 3 upcoming appointments already
            alert("You can only make up to three appointments at a time.");
            return;
        }
        else {
            // store new appointment
            console.log("before adding", appt_data);
            appt_data.push({type: type, date: date, time: time, location: location}); // push new appointment into appt_array
            sessionStorage.setItem("appt_data", JSON.stringify(appt_data)); // store the new appointment
            console.log("after adding", appt_data);
            document.getElementById("cart_length").innerHTML = appt_data.length;
        }
    }
    
}


// load the data of upcoming appointments and format them into a table
function load_upcoming_appts() {
    appt_data = JSON.parse(sessionStorage.getItem("appt_data"));
    if (appt_data != null) {
        var index = 1;
        appt_data.forEach(appt_data => {
            for (let key in appt_data) {
                var value = `${appt_data[key]}`;
                console.log("value=", `upcoming_${key}_${index}`);
                document.getElementById(`upcoming_${key}_${index}`).innerHTML = value;
                if (value == null || value == "") {
                    document.getElementById(`upcoming_${key}_${index}`).innerHTML = "a";
                };
                console.log(`${key}: ${appt_data[key]}`);
            }
            index += 1;
            if (index > 4) {
                alert("You can only make up to three appointments at a time.");
                return false; // loop stops iterating when reaching the third appointment
            }
            });
    }
    console.log(appt_data);
}



// cancel an appointment (remove from array)
function cancel_appt(btn_id) {
    appt_data = JSON.parse(sessionStorage.getItem("appt_data"));
    if (appt_data.length > 0 && btn_id <= appt_data.length) {
        // remove from display
        for (let key in appt_data[btn_id-1]) {
            var value = `${appt_data[btn_id-1][key]}`;
            document.getElementById(`upcoming_${key}_${btn_id}`).innerHTML = "";
        }

        // remove from data
        appt_data.splice(btn_id-1, 1); // zero-based index
        console.log(appt_data);
        sessionStorage.setItem("appt_data", JSON.stringify(appt_data)); // update appointments   
        document.getElementById("cart_length").innerHTML = appt_data.length;     
    }
}


// display number of appointments on the navigation bar
function general_load() {
    appt_data = JSON.parse(sessionStorage.getItem("appt_data"));
    if (appt_data == null || appt_data.length == 0) {
        document.getElementById("cart_length").innerHTML = 0;   
    }
    else {
        document.getElementById("cart_length").innerHTML = appt_data.length;    
    }
}


// show or hide <cancel appointment> button
function toggle_btn() {
    // get the three buttons
    var btn1 = document.getElementById("cancel_btn_1");
    var btn2 = document.getElementById("cancel_btn_2");
    var btn3 = document.getElementById("cancel_btn_3");

    var btn4 = document.getElementById("add_appt_btn_1");
    var btn5 = document.getElementById("add_appt_btn_2");
    var btn6 = document.getElementById("add_appt_btn_3");

    // get current appointments data
    appt_data = JSON.parse(sessionStorage.getItem("appt_data"));

    // if no appointments, hide all the cancel buttons
    if (appt_data == null || appt_data.length == 0) {
        btn1.style.display = 'none';
        btn2.style.display = 'none';
        btn3.style.display = 'none';
        btn4.style.display = 'block';
        btn5.style.display = 'block';
        btn6.style.display = 'block';

        var index = 3;
        appt_data = [{}, {}, {}];
        appt_data.forEach(appt_data => {
            for (let key in appt_data) {
                // console.log(`upcoming_${key}_${index}`);
                document.getElementById(`upcoming_${key}_${index}`).style.display = 'none';
            };
            index -= 1;
        });
    }

    // else if (appt_data.length == 1) {
    //     appt_data.forEach(appt_data => {
    //         for (let key in appt_data) {
    //             document.getElementById(`upcoming_${key}_3`).style.display = 'none';
    //             document.getElementById(`upcoming_${key}_2`).style.display = 'none';
    //         };
    //     });
    // }

    // else if (appt_data.length == 2) {
    //     appt_data.forEach(appt_data => {
    //         for (let key in appt_data) {
    //             document.getElementById("upcoming_${key}_3").innerHTML = " ";  
    //             // document.getElementById(`upcoming_${key}_3`).style.display = 'none';
    //         };
    //     });
    // }

    else {
        var index = 1;
        appt_data.forEach(appt_data => {
            console.log(`cancel_btn_${index}`);
            // switch displayed button
            if (index <= 3) {
                document.getElementById(`cancel_btn_${index}`).style.display = 'block';  // where appointment is present
                document.getElementById(`add_appt_btn_${index}`).style.display = 'none'; // where appointment is absent
                index += 1;
            }
        });
        // the array length won't exceed 3 (checked before)
    }
}