
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
var dropbtn = document.getElementsByClassName("dropbtn")[0];

dropbtn.onclick = function() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.selectable')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

var feedbackSubmitBtn = document.getElementById('submitButton'); //'<%= button.submitButton %>'
//feedbackSubmitBtn.disabled = true;

//Enable when all fields are filled, then click programatically
//feedbackSubmitBtn.onclick = function () {
//    console.log("Did it detect event?");
//    validateForm();
//}

//function validateForm() {
//    var feedbackSubmitBtn = document.getElementById('submitButton');
//    var firstName = document.getElementsByClassName("feedbackTextBox1").value;
//    var lastName = document.getElementsByClassName("feedbackTextBox2").value;
//    var email = document.getElementsByClassName("feedbackTextBox3").value;
//    var feedbackInput = document.getElementsByClassName("feedbackTextBox4").value;

//    if (firstName !== "" && lastName !== "" && email !== "" && feedbackInput !== "") {
//        console.log("The forms are filled!");
//        document.location.reload();
//    } else {
//        console.log("Forms are not filled!");
//    }
//}