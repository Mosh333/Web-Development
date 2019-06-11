
//Turn on or off console.log()
//console.log = function() {}

var appContainer = document.getElementsByClassName("educordContainer")[0];
var login = document.getElementsByClassName("loginButton")[0];
var signup = document.getElementsByClassName("signupButton")[0];
var global_SelectedCourse;

try{
    window.onload = function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200){
                //alert("Hello World!");
                var phpResult = JSON.parse(request.response);
                // var phpResult = request.response;                                      
                //educord_mainGUI.appendChild(document.createElement('br'));                                         
                console.log(phpResult);
                var selectMenu = document.getElementsByClassName("courseListing")[0];
                for(j=0; j<phpResult[0].length; j++){
                    var newOption = document.createElement("option");
                    newOption.text = phpResult[0][j]+" - "+phpResult[1][j]+" - "+phpResult[2][j];
                    selectMenu.add(newOption);
                }
                selectMenu.onchange = function(){
                    if(typeof buttonContainer!=="undefined"){
                        buttonContainer.innerHTML = "";
                    }
                    var selectMenuValue = selectMenu.value;
                    var coursecode = selectMenuValue.split(' - ')[0];
                    var coursename = selectMenuValue.split(' - ')[1];
                    var instructor = selectMenuValue.split(' - ')[2];
                    alert("Loading "+coursecode+"-"+coursename+"-"+instructor);
                    var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                    var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                    var viewLectureRequest = new XMLHttpRequest();
                    viewLectureRequest.onreadystatechange = function() { 
                        if (viewLectureRequest.readyState == 4 && viewLectureRequest.status == 200){
                            //alert("Hello World!");
                            var phpResult = JSON.parse(viewLectureRequest.response);
                            // var phpResult = viewLectureRequest.response;
                            var educordLessons = document.getElementsByClassName("educordLessons")[0];
                            var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                            var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                            
                            if(typeof buttonContainer!=="undefined"){
                                buttonContainer.innerHTML = "";
                            }                            
                            if(typeof lectureContainer!=="undefined"){
                                lectureContainer.innerHTML = "";
                            }
                            //educord_mainGUI.appendChild(document.createElement('br'));                                         
                            console.log(phpResult);
                            //Use closures
                            var myModuleEventArray = [];

                            function createDispModuleEvent(i){
                                //Generate a button for each module
                                //assign event to retrieve only the viewLectureRequest module
                                //when button is clicked on
                                //Remove any existing moduleContainer if any
                                var myModule = document.createElement("a");
                                var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                                var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                                //myModule.appendChild(document.createTextNode(phpResult[2][i]+"-"+phpResult[1][i]));
                                myModule.appendChild(document.createTextNode(phpResult[2][i]+"-"+phpResult[1][i]));
                                myModule.className = "selectModuleButton";
                                //educordLessons.appendChild(myModule);
                                buttonContainer.appendChild(myModule);
                                myModule.onclick = function(){
                                    var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                                    if(typeof lectureContainer!=="undefined"){
                                        lectureContainer.innerHTML = "";
                                    }
                                    //alert("My unique index is: "+i);
                                    //Service user viewLectureRequest to view the module they want
                                    //use template and phpResult[0][i]

                                    //console.log("lectureContainer value is:"+lectureContainer);
                                    var template = document.createElement('template');
                                    template.innerHTML = phpResult[0][i];
                                    lectureContainer.style.fontSize = "0.5em";
                                    lectureContainer.appendChild(template.content.firstChild); //div container already made server side
                                }
                                console.log("My value: " + i);
                                return function(){};
                            }
                            for(i=0; i<phpResult[0].length; i++){
                                myModuleEventArray[i] = createDispModuleEvent(i);
                            }
                            for (var j = 0; j < phpResult[0].length; j++) {
                                myModuleEventArray[j]();                        //Actually run the events
                            }
                        }                               
                    }
                    var selectMenuValue = selectMenu.value;
                    var coursecode = selectMenuValue.split(' - ')[0];
                    var instructor = selectMenuValue.split(' - ')[2];
                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                    var getLectures = "?lectures=instructor&instructor="+instructor+"&coursecode="+coursecode;
                    viewLectureRequest.open('GET', baseLink+getLectures, true);
                    viewLectureRequest.send();                 
                }
            }                                
        }
        var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
        var getCourseList = "?courselist=student";
        request.open('GET', baseLink+getCourseList, true);
        request.send();  
    };
    
    // console.log("Hello World!");
    function clearContainer(){
        appContainer.innerHTML = "";
    }
    function populateContainer(actionType){
        appContainer.style.height = "500px";
        appContainer.style.width = "500px";
        //Handle either login or signup request
        //Make sure to have drop down menu for either student or instructor
        var inputForm = document.createElement("form");
        //inputForm.method = "post"; //set to POST transaction
        if(actionType=="login"){
            inputForm.className = "loginForm";
            //inputForm.action = "php_files/login.php";
        }else if(actionType=="signup"){
            inputForm.className = "signupForm";
            //inputForm.action = "php_files/signup.php";
        }
        
        //Insert Educord Logo with ClassName
        var educordLogo = document.createElement("img");
        educordLogo.src = "../shared/educord.png";
        educordLogo.id = "educordLogo";
        appContainer.appendChild(educordLogo);
        //Insert Prompt
        var promptElem = document.createElement("p");
        promptElem.className = "inputPrompt";
        var prompt = "";
        if(actionType=="login"){
            prompt = "Please Input Login Credentials:";
        }else if(actionType=="signup"){
            prompt = "Please Input New Account Credentials:";
        }
        promptElem.appendChild(document.createTextNode(prompt));
        promptElem.style.fontWeight = "900";
        //Insert Drop Down Menu for account type
        var accountType = document.createElement("select");
        //Insert Two Input Forms (User and Password) with ClassName
        var usernameInput = document.createElement("input");
        usernameInput.name = "usernamePOST"; //the name used for PHP post method
        usernameInput.className = "usernameInput";
        usernameInput.placeholder = "Username";
        var passwordInput = document.createElement("input");
        passwordInput.name = "passwordPOST"; //the name used for PHP post method
        passwordInput.setAttribute("type", "password");
        passwordInput.className = "passwordInput";
        passwordInput.placeholder = "Password";
        //Insert Login and Signup Button with ClassName
        var homepage = document.createElement("button");
        var signUpButton = document.createElement("button");
        var loginButton = document.createElement("button");
        signUpButton.setAttribute("type", "button");
        loginButton.setAttribute("type", "button");
        
        homepage.innerHTML = "Home1";
        loginButton.innerHTML = "Login";
        signUpButton.innerHTML = "Sign-up";
        
        homepage.className = "myButton Home";
        loginButton.className = "myButton Login";
        signUpButton.className = "myButton Sign-up";
        
        homepage.style.marginLeft = "-140px";
        homepage.style.marginTop = "160px";
        inputForm.style.marginLeft = "-40px";
        
        appContainer.appendChild(homepage);
        var selectType = document.createElement("select");
        selectType.className = "accountTypeInput";
        var option1 = document.createElement("option");
        option1.text = "Select Account Type";
        var option2 = document.createElement("option");
        option2.text = "student";
        var option3 = document.createElement("option");
        option3.text = "instructor";
        
        selectType.add(option1);
        selectType.add(option2);
        selectType.add(option3);
        selectType[0].disabled = true;            
        
        inputForm.appendChild(promptElem);
        inputForm.appendChild(selectType);
        inputForm.appendChild(usernameInput);
        inputForm.appendChild(passwordInput);
        if(actionType == "login"){  
            inputForm.appendChild(loginButton);        
        }else if(actionType == "signup"){
            inputForm.appendChild(signUpButton);        
        }
        appContainer.appendChild(inputForm);

        //DOM done, now handle the service
        function tryLoginUser(){
            if(checkIfFormFilled()){
                //Create XMLHTTP object and send the post data to PHP
                var accountTypeInput = document.getElementsByClassName("accountTypeInput")[0].value;
                var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
                var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
                var xhttp = new XMLHttpRequest();
                //Delimited with & sign, similar sending pattern as GET but encrypted
                var dataToSend = "userTypePOST="+accountTypeInput+"&usernamePOST="+usernameInput+"&passwordPOST="+passwordInput;
                console.log("dataToSend is: ", dataToSend);
                xhttp.open("POST", "php_files/login.php", true);
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhttp.send(dataToSend);
                console.log("Sent data!");
                xhttp.onreadystatechange = display_data;
                function display_data(){
                    if(xhttp.readyState==4 && xhttp.status==200){
/*                         console.log("Login here?");
                        console.log(xhttp.responseText);
                        console.log(xhttp.responseText.length);
                        console.log("Credential Invalid".length); */
                        //Not sure why for signup.php, it pad 4 spaces?
                        console.log(xhttp.responseText);
                        var serverResp = String(xhttp.responseText).substring(0,"Credential Invalid".length);
                        if(serverResp!="Credential Invalid"){
                            console.log("Login Success!");
                            logged_in(xhttp.responseText);
                        }else{
                            alert("Wrong Credentials!");
                        }
                    }else if(xhttp.readyState!=4){
                        //console.log("There was a problem with the request.");
                    }
                    function logged_in(serverResponse){
                        console.log("Please change dom if the user was able to log in");
                        var educordOptions = document.getElementsByClassName("educordOptions")[0];
                        var educordLessons = document.getElementsByClassName("educordLessons")[0];
                        var accountData = serverResponse.split(',');
                        //accountData[0] is username
                        //accountData[1] is password
                        var accountType = "instructor";
                        console.log("b4 process accountData is: ", accountData);
                        //remove the /n's from last entry
                        if(accountData[2].substring(0,7)=="student"){
                            accountData[2] = accountData[2].substring(0,7);
                            accountType="student"
                        }else if(accountData[2].substring(0,10)=="instructor"){
                            accountData[2] = accountData[2].substring(0,10);
                            accountType="instructor";
                        }
                        insertLogoDOM();
                        //Insert Welcome Educord Banner
                        var welcomeBanner = document.createElement("h2");
                        welcomeBanner.className = "welcomeEducord";
                        welcomeBanner.appendChild(document.createTextNode("Educord: World Class Learning Platform!"));
                        welcomeBanner.style.marginTop = "-20px";
                        appContainer.appendChild(welcomeBanner);

                        //Add buttons for Login and Sign-up
                        //Put in this order for CSS to work        
                        var logoutButton = document.createElement("button");
                        logoutButton.className = "myButton logoutButton";
                        logoutButton.style.marginLeft = "10px";
                        logoutButton.style.marginTop = "0px";
                        logoutButton.appendChild(document.createTextNode("Logout"));
                        appContainer.appendChild(logoutButton);        
                        //Have a basics welcome banner to user
                        var welcomeGreetings = document.createElement("p");
                        welcomeGreetings.appendChild(document.createTextNode("Welcome "+accountData[2]+": "+accountData[0]));
                        welcomeGreetings.className = "greeting";
                        appContainer.appendChild(welcomeGreetings);    
                        logoutButton.onclick = function(){
                            restoreHomepage();
                        }
                        
                        //Add a generic educordGUI_container
                        //if instructor, load appropriate window
                        if(accountData[2]=="instructor"){
                            //Main App GUI Container
                            var educordLessons = document.createElement("div");
                            educordLessons.className = "educordGUI";
                            
                            //Header to display current course selected
                            var selectedCourseHeader = document.createElement("h2");
                            selectedCourseHeader.className = "selectedCourseHeader";
                            selectedCourseHeader.appendChild(document.createTextNode("No Courses Selected"));
                            educordLessons.appendChild(selectedCourseHeader);
                            
                            //Navigation Bar Container for all the links for each
                            //functionality of the app
                            var navbar = document.createElement("div");
                            var announcementTab = document.createElement("a");
                            var uploadEMLtab= document.createElement("a");
                            var classlistTab = document.createElement("a");
                            var submissionTab = document.createElement("a");
                            var quizTab = document.createElement("a");
                            var selectCourse = document.createElement("a");
                            
                            //Create a separate Div tag for the 3rd and main level App GUI Container
                            var educord_mainGUI = document.createElement("div");
                            var homepageText = document.createElement("p");
                            
                            //Assign Class
                            navbar.className = "navbar navbarInstructor";
                            announcementTab.className = "announcementTab educordTabStyleInstructor";
                            uploadEMLtab.className = "uploadEMLtab educordTabStyleInstructor";
                            classlistTab.className = "classlistTab educordTabStyleInstructor";
                            submissionTab.className = "submissionTab educordTabStyleInstructor";
                            quizTab.className = "quizTab educordTabStyleInstructor";
                            selectCourse.className = "selectCourse educordTabStyleInstructor";
                            educord_mainGUI.className = "educord_mainGUI";
                            homepageText.className = "homepageText";
                            
                            //Insert texts to each <a> tags
                            announcementTab.appendChild(document.createTextNode("Announcements"));
                            uploadEMLtab.appendChild(document.createTextNode("Upload EML"));
                            classlistTab.appendChild(document.createTextNode("Classlist"));
                            submissionTab.appendChild(document.createTextNode("Submissions"));
                            quizTab.appendChild(document.createTextNode("Quizzes"));
                            selectCourse.appendChild(document.createTextNode("Select Course"));
                            homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                            a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                            
                            //Insert the links into the educord GUI
                            navbar.appendChild(announcementTab);
                            navbar.appendChild(uploadEMLtab);
                            navbar.appendChild(classlistTab);
                            navbar.appendChild(submissionTab);
                            navbar.appendChild(quizTab);
                            navbar.appendChild(selectCourse);
                            educord_mainGUI.appendChild(homepageText);
                            educordLessons.appendChild(navbar);
                            educordLessons.appendChild(educord_mainGUI);
                            appContainer.appendChild(educordLessons);
                            
                            announcementTab.onclick  = function(){
                            
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";

                                
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");                                
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                    a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }else{
                                    //Make an Ajax request to call educordParser.php for results
                                    //for announcement content
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, below is a preview of what \
                                    the students see for their announcement tab of Educord."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);
                                    var request = new XMLHttpRequest();
                                    request.onreadystatechange = function() { 
                                        if (request.readyState == 4 && request.status == 200){
                                            //alert("Hello World!");
                                            var phpResult = JSON.parse(request.response);
                                            console.log(phpResult[0]);
                                            console.log(phpResult[0][0]);
                                            console.log(phpResult[0][1]);
                                            console.log("Array length is:"+phpResult.length);
                                            //For Each Entry Use 
                                            for(i=0; i<phpResult.length; i++){ 
                                                var template = document.createElement('template');
                                                var template2 = document.createElement('template');
                                                var announcementBox = document.createElement('div');
                                                announcementBox.className = "announcementBox";
                                                template.innerHTML = phpResult[i][0];
                                                template2.innerHTML = phpResult[i][1];
                                                announcementBox.appendChild(template.content.firstChild);
                                                announcementBox.appendChild(template2.content.firstChild);
                                                educord_mainGUI.appendChild(announcementBox);
                                            }
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                        }                                
                                    }
                                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                    var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' ')[0];
                                    var getAnnouncements = "?announcements=instructor&instructor="+accountData[0]+"&coursecode="+coursecode;
                                    request.open('GET', baseLink+getAnnouncements, true);
                                    request.send();
                                }
                            }
                            
                            uploadEMLtab.onclick  = function(){
                                //Give Abilitiy for User to upload their EML package
                                //locally, and that package would get uploaded to 
                                //http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/
                                //Send AJAX POST request to upload to server
                                
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";
                                
                                //Insert FORM of type POST
                                //Insert a File Upload Button into the FORM
                                var fileUploadForm = document.createElement("form");
                                fileUploadForm.className = "fileUploadForm";
                                fileUploadForm.method = "POST";
                                fileUploadForm.enctype = "multipart/form-data";
                                var fileUploadButton = document.createElement("input");
                                fileUploadButton.className = "fileUploadButton";
                                fileUploadButton.setAttribute("type", "file");
                                //Based on php.ini, can only upload 20 files at a time
                                //so ask user for .zip file only
                                //fileUploadButton.multiple = true;
                                //fileUploadButton.webkitdirectory = true;
                                
                                var sendToServerButton = document.createElement("a");
                                sendToServerButton.className = "sendToServerButton myButton";
                                /* sendToServerButton.setAttribute("type", "button"); */
                                sendToServerButton.innerHTML = "Save EML";
                                
                                var deleteEMLButton = document.createElement("a");
                                deleteEMLButton.className = "deleteEMLButton myButton";
                                deleteEMLButton.innerHTML = "Delete All EML";
                                
                                var uploadInstructionHeader = document.createElement("h3");
                                uploadInstructionHeader.className = "uploadInstructionHeader";
                                uploadInstructionHeader.appendChild(document.createTextNode("How to Upload Your EML Folder"));
                                
                                var uploadInstructionText = document.createElement("p");
                                var imageBold = document.createElement("b");
                                var assignmentsBold = document.createElement("b");
                                var referencesBold = document.createElement("b");
                                var courseName_yourIdBold = document.createElement("b");
                                var zipDisclaimerBold = document.createElement("b");
                                uploadInstructionText.className = "uploadInstructionText";
                                uploadInstructionText.appendChild(document.createTextNode("To upload an EML folder to the server,\
                                please make sure to follow the folder structure shown below. It is important that\
                                there are 3 folders. "));

                                assignmentsBold.appendChild(document.createTextNode("'assignments'"));
                                uploadInstructionText.appendChild(assignmentsBold);
                                uploadInstructionText.appendChild(document.createTextNode(" folder should contain all the files like pdf files\
                                which contains instructions to the assignments for the course. "));   
                                
                                imageBold.appendChild(document.createTextNode("'images'"));
                                uploadInstructionText.appendChild(imageBold);
                                uploadInstructionText.appendChild(document.createTextNode(" folder should contain all the images the XML EML markup file\
                                uses to deliver the course. "));
                                
                                referencesBold.appendChild(document.createTextNode("'modules&references'"));
                                uploadInstructionText.appendChild(referencesBold);
                                uploadInstructionText.appendChild(document.createTextNode(" folder should\
                                contain any pdf, doc or other document files which are required to be stored in the server\
                                to deliver the course. It is not necessary to store URL links for the references since\
                                they are stored in the EML file. Finally, please make sure to name your EML file and the folder in the\
                                following format: "));                                
                                courseName_yourIdBold.appendChild(document.createTextNode("'courseName_yourId'"));
                                uploadInstructionText.appendChild(courseName_yourIdBold);

                                uploadInstructionText.appendChild(document.createTextNode(". This helps manage cases when multiple instructors teach the\
                                same course.\n"));
                                uploadInstructionText.appendChild(document.createElement("br"));
                                zipDisclaimerBold.appendChild(document.createTextNode("Finally, Please Ensure to Upload it as ZIP file (.zip)."));
                                uploadInstructionText.appendChild(zipDisclaimerBold);
                                
                                var uploadInstructionImage = document.createElement("img");
                                uploadInstructionImage.className = "uploadInstructionImage";
                                uploadInstructionImage.src = "assets/howToUploadEML.PNG"
                                
                                var uploadPrompt = document.createElement("h4");
                                uploadPrompt.className = "uploadPrompt";
                                uploadPrompt.appendChild(document.createTextNode("Upload EML Zip Folder Below:"));
                                
                                var clearAllEMLPrompt = document.createElement("h4");
                                clearAllEMLPrompt.className = "clearAllEMLPrompt";
                                clearAllEMLPrompt.appendChild(document.createTextNode("Delete All EML Folders from Server (doesn't affect database contents):"));
                                
                                if(document.getElementsByClassName("fileUploadButton").length==0){ //prevent multiples if user spam clicks
                                    educord_mainGUI.appendChild(uploadInstructionHeader);
                                    educord_mainGUI.appendChild(uploadInstructionText);
                                    educord_mainGUI.appendChild(uploadInstructionImage);
                                    educord_mainGUI.appendChild(uploadPrompt);
                                    fileUploadForm.appendChild(fileUploadButton);
                                    educord_mainGUI.appendChild(fileUploadForm);
                                    var temp = document.createElement("br");
                                    educord_mainGUI.appendChild(temp);
                                    educord_mainGUI.appendChild(sendToServerButton);
                                    educord_mainGUI.appendChild(clearAllEMLPrompt);
                                    educord_mainGUI.appendChild(deleteEMLButton);
                                    
                                    
                                    sendToServerButton.onclick = function(){
                                        //Do an AJAX POST request to upload file
                                        //to server's "course_files" directory
                                        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
                                        //https://www.taniarascia.com/how-to-upload-files-to-a-server-with-plain-javascript-and-php/
                                        //Non-standard but I don't want users to click 20 different files                                        
                                        //Another option is make them upload a ZIP file
                                        
                                        
                                        //Do through the webkitdirectory technique
                                        //Get name of the file to upload
                                        var PHP_url = "php_files/uploadEML.php";
                                        var myFiles = document.querySelector('[type=file]').files;
                                        var formData = new FormData();

                                        
                                        if(fileUploadButton.value==""){
                                            alert("Please Select a Folder to Upload!");
                                        }else{
                                            for(let i = 0; i<myFiles.length; i++){
                                                let myFile = myFiles[i];
                                                formData.append('myFiles[]', myFile);
                                            }
                                            console.log("form data is:", formData);
                                            //figure out how to post the directories for each of the files as well
                                            //answer: ask for .zip, then unzip in that directory
                                            fetch(PHP_url, {
                                                method: 'POST',
                                                body: formData
                                            }).then(response => {
                                                console.log(response.text);
                                                if(response.ok){
                                                    alert("The EML Zip Uploaded!");
                                                }                                                
                                            });
                                        }    
                                        //console.log("myFiles is:", myFiles);
/*                                         var xhttp = new XMLHttpRequest();
                                        //Delimited with & sign, similar sending pattern as GET but encrypted
                                        var dataToSend = "userTypePOST="+accountTypeInput+"&usernamePOST="+usernameInput+"&passwordPOST="+passwordInput;
                                        console.log("dataToSend is: ", dataToSend);
                                        xhttp.open("POST", "php_files/signup.php", true);
                                        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                        xhttp.send(dataToSend);
                                        console.log("Sent data!");       */                                  
                                    }
                                
                                    deleteEMLButton.onclick = function(){
                                        var confirmDel = confirm("Do you really want to delete all Educord Courses?");
                                        if(confirmDel){
                                            var request = new XMLHttpRequest();
                                            request.open('GET', 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/deleteAllEML.php', false);
                                            request.send();

                                            if(request.status === 200) {
                                                document.getElementsByClassName("selectedCourseHeader")[0].innerText="No Courses Selected";
                                                alert(request.responseText);
                                            }                                        

                                        }
                                    }
                                
                                }
                                

                                
                            }
                            classlistTab.onclick  = function(){
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";

                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");                                
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                    a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Make Ajax Request to get list of appropriate classlist
                                    //Make an Ajax request to call educordParser.php for results
                                    //for announcement content
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, below is a list \
                                    of students enrolled in your class."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);
                                    var request = new XMLHttpRequest();
                                    request.onreadystatechange = function() { 
                                        if (request.readyState == 4 && request.status == 200){
                                            //alert("Hello World!");
                                            var phpResult = JSON.parse(request.response);
                                            console.log(phpResult);
                                            //For Each Entry Use 
                                            var myTable = document.createElement('table');
                                            myTable.className = "educordModuleTable";
                                            var header = document.createElement("tr");
                                            var headerStudentname = document.createElement("th");
                                            headerStudentname.appendChild(document.createTextNode("Student Name"));
                                            header.appendChild(headerStudentname);
                                            myTable.appendChild(header);
                                            for(i=0; i<phpResult.length; i++){ 
                                                var insertRow = document.createElement("tr");
                                                var studentName = document.createElement("td");
                                                studentName.appendChild(document.createTextNode(phpResult[i]));
                                                insertRow.appendChild(studentName);
                                                myTable.appendChild(insertRow);
                                            }
                                            educord_mainGUI.appendChild(myTable);
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                        }                                
                                    }
                                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                    var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' ')[0];
                                    var getClasslist = "?classlist=instructor&instructor="+accountData[0]+"&coursecode="+coursecode;
                                    request.open('GET', baseLink+getClasslist, true);
                                    request.send();                                
                            }
                            submissionTab.onclick  = function(){
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";
                                console.log(document.getElementsByClassName("selectedCourseHeader").innerText);
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                    a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Make Ajax Request to get list of appropriate classlist
                                    //Make an Ajax request to call educordParser.php for results
                                    //for announcement content
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, below is a list \
                                    of student submissions for the assignments."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);
                                    var request = new XMLHttpRequest();
                                    request.onreadystatechange = function() { 
                                        if (request.readyState == 4 && request.status == 200){
                                            //alert("Hello World!");
                                            var phpResult = JSON.parse(request.response);
                                            //console.log(phpResult);
                                            //For Each Entry Use 
                                            var myTable = document.createElement('table');
                                            myTable.style.width = "90%";
                                            myTable.className = "educordModuleTable";
                                            var header = document.createElement("tr");
                                            var headerStudentname = document.createElement("th");
                                            var headerAssignment = document.createElement("th");
                                            headerStudentname.appendChild(document.createTextNode("Student Name"));
                                            headerAssignment.appendChild(document.createTextNode("Submission Link"));
                                            header.appendChild(headerStudentname);
                                            header.appendChild(headerAssignment);
                                            myTable.appendChild(header);
                                            for(i=0; i<phpResult.length; i++){ 
                                                var insertRow = document.createElement("tr");
                                                var studentName = document.createElement("td");
                                                var assignmentLink = document.createElement("td");
                                                var assignmentLinkNode = document.createElement("a");
                                                assignmentLinkNode.appendChild(document.createTextNode(phpResult[2][i]));
                                                assignmentLinkNode.href = phpResult[1][i];
                                                assignmentLinkNode.target = "_blank";
                                                studentName.appendChild(document.createTextNode(phpResult[0][i]));
                                                assignmentLink.appendChild(assignmentLinkNode);
                                                insertRow.appendChild(studentName);
                                                insertRow.appendChild(assignmentLink);
                                                myTable.appendChild(insertRow);
                                            }
                                            educord_mainGUI.appendChild(myTable);
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                        }                                
                                    }
                                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                    var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' ')[0];
                                    var getSubmissionList = "?viewSubmissions=instructor&instructor="+accountData[0]+"&coursecode="+coursecode;
                                    request.open('GET', baseLink+getSubmissionList, true);
                                    request.send();                                
                            }
                            quizTab.onclick  = function(){
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";
                                console.log(document.getElementsByClassName("selectedCourseHeader").innerText);
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                    a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Make Ajax Request to get list of appropriate classlist
                                //Make an Ajax request to call educordParser.php for results
                                //for announcement content
                                var homepageText = document.createElement("p");
                                homepageText.appendChild(document.createTextNode("Hello Instructor, below is a list \
                                of student's quiz scores."));
                                homepageText.className = "homepageText";
                                educord_mainGUI.appendChild(homepageText);
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function() { 
                                    if (request.readyState == 4 && request.status == 200){
                                        //alert("Hello World!");
                                        var phpResult = JSON.parse(request.response);
                                        console.log(phpResult);
                                        //For Each Entry Use 
                                        var myTable = document.createElement('table');
                                        myTable.style.width = "90%";
                                        myTable.className = "educordModuleTable";
                                        var header = document.createElement("tr");
                                        var headerStudentname = document.createElement("th");
                                        var headerQuiz = document.createElement("th");
                                        var headerGrade = document.createElement("th");
                                        var headerTime = document.createElement("th");
                                        headerStudentname.appendChild(document.createTextNode("Student Name"));
                                        headerQuiz.appendChild(document.createTextNode("Quiz Name"));
                                        headerGrade.appendChild(document.createTextNode("Score"));
                                        headerTime.appendChild(document.createTextNode("Submission Time"));
                                        header.appendChild(headerStudentname);
                                        header.appendChild(headerQuiz);
                                        header.appendChild(headerGrade);
                                        header.appendChild(headerTime);
                                        myTable.appendChild(header);
                                        for(i=0; i<phpResult.length; i++){ 
                                            var insertRow = document.createElement("tr");
                                            var studentName = document.createElement("td");
                                            var quizName = document.createElement("td");
                                            var gradeText = document.createElement("td");
                                            var submitTime = document.createElement("td");
                                            studentName.appendChild(document.createTextNode(phpResult[0][i]));
                                            quizName.appendChild(document.createTextNode(phpResult[1][i]));
                                            gradeText.appendChild(document.createTextNode(phpResult[2][i]));
                                            submitTime.appendChild(document.createTextNode(phpResult[3][i]));
                                            insertRow.appendChild(studentName);
                                            insertRow.appendChild(quizName);
                                            insertRow.appendChild(gradeText);
                                            insertRow.appendChild(submitTime);                          
                                            myTable.appendChild(insertRow);
                                        }
                                        educord_mainGUI.appendChild(myTable);
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                    }                                
                                }
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' ')[0];
                                var getQuizMarks = "?quizMarks=instructor&instructor="+accountData[0]+"&coursecode="+coursecode;
                                request.open('GET', baseLink+getQuizMarks, true);
                                request.send();                                
                            }
                            selectCourse.onclick  = function(){
                                //Clear the educord_mainGUI container
                                educord_mainGUI.innerHTML = "";
                                console.log(document.getElementsByClassName("selectedCourseHeader")[0].innerText);
                                var homepageText = document.createElement("p");
                                homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                homepageText.className = "homepageText";
                                educord_mainGUI.appendChild(homepageText);
                                
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function() { 
                                    if (request.readyState == 4 && request.status == 200){
                                        
                                        //https://stackoverflow.com/questions/8823925/how-to-return-an-array-from-an-ajax-call
                                        var phpResult = JSON.parse(request.response);
                                        var coursecode = phpResult[0];
                                        var coursetype = phpResult[1];
                                        var coursename = phpResult[2];
                                        if(coursename.length==0){
                                            educord_mainGUI.innerHTML = "";
                                            var homepageText = document.createElement("p");
                                            homepageText.appendChild(document.createTextNode("Hello Instructor, please begin by either inserting \
                                            a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                                            homepageText.className = "homepageText";
                                            educord_mainGUI.appendChild(homepageText);                                        
                                        }else{
                                            educord_mainGUI.innerHTML = "";
                                            var homepageText2 = document.createElement("p");
                                            homepageText2.appendChild(document.createTextNode("Hello Instructor, select the\
                                            course you wish to view and work with below."));
                                            homepageText2.className = "homepageText2";
                                            educord_mainGUI.appendChild(homepageText2); 
                                            //Create a dropdown menu
                                            var courseListDiv = document.createElement("div");
                                            var courseListDivArrow = document.createElement("div");
                                            courseListDiv.className = "courseList";
                                            courseListDivArrow.className = "courseListArrow";
                                            var courseList = document.createElement("select");
                                            for(i=0; i<coursename.length; i++){
                                                var course = document.createElement("option");
                                                course.text = coursecode[i]+" - "+coursename[i];
                                                courseList.add(course);
                                            }
                                            //Create a submit style button
                                            var changeButton = document.createElement("button");
                                            changeButton.innerHTML = "Select Course";
                                            changeButton.className = "myButton";
                                            changeButton.style.marginTop = "20px";
                                            changeButton.style.marginLeft = "325px";
                                            //Insert Everything Now
                                            courseListDiv.appendChild(courseList);
                                            courseListDiv.appendChild(courseListDivArrow);
                                            educord_mainGUI.appendChild(courseListDiv);
                                            educord_mainGUI.appendChild(changeButton);
                                            
                                            //Add Event for Change Button
                                            changeButton.onclick = function(){
                                                document.getElementsByClassName("selectedCourseHeader")[0].innerText=courseList.value;
                                                alert("Changed to course: "+courseList.value+"!");
                                            }
                                        }
                                    }
                                }
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/selectCourse.php';
                                var getCourseListing = "?selectCourse=instructor&user="+accountData[0];
                                request.open('GET', baseLink+getCourseListing, true);
                                request.send();
                                                        
                            }
                            
                            //end of instructor perspective logic
                        }else if(accountData[2]=="student"){            //else if student, load appropriate window
                            
                            //Main App GUI Container
                            var educordLessons = document.createElement("div");
                            educordLessons.className = "educordGUI";
                            
                            //Header to display current course selected
                            var selectedCourseHeader = document.createElement("h2");
                            selectedCourseHeader.className = "selectedCourseHeader";
                            selectedCourseHeader.appendChild(document.createTextNode("No Courses Selected"));
                            educordLessons.appendChild(selectedCourseHeader);
                            
                            //Navigation Bar Container for all the links for each
                            //functionality of the app
                            var navbar = document.createElement("div");
                            var announcementTab = document.createElement("a");
                            var lectureTab = document.createElement("a");
                            var referenceTab = document.createElement("a");
                            var assignmentTab = document.createElement("a");
                            var quizTab = document.createElement("a");
                            var selectCourse = document.createElement("a");
                            
                            //Create a separate Div tag for the 3rd and main level App GUI Container
                            var educord_mainGUI = document.createElement("div");
                            var homepageText = document.createElement("p");
                            
                            //Assign Class
                            navbar.className = "navbar navbarStudent";
                            announcementTab.className = "announcementTab educordTabStyleStudent";
                            lectureTab.className = "lectureTab educordTabStyleStudent";
                            referenceTab.className = "referenceTab educordTabStyleStudent";
                            assignmentTab.className = "assignmentTab educordTabStyleStudent";
                            quizTab.className = "quizTab educordTabStyleStudent";
                            selectCourse.className = "selectCourse educordTabStyleStudent";
                            educord_mainGUI.className = "educord_mainGUI";
                            homepageText.className = "homepageText";
                            
                            //Insert texts to each <a> tags
                            announcementTab.appendChild(document.createTextNode("Announcements"));
                            lectureTab.appendChild(document.createTextNode("Lecture"));
                            referenceTab.appendChild(document.createTextNode("References"));
                            assignmentTab.appendChild(document.createTextNode("Assignments"));
                            quizTab.appendChild(document.createTextNode("Quizzes"));
                            selectCourse.appendChild(document.createTextNode("Select Course"));
                            homepageText.appendChild(document.createTextNode("Hello Student, please begin by either inserting \
                            a new course by uploading a properly formatted EML zip folder, or selecting an existing course above."));
                            
                            //Insert the links into the educord GUI
                            navbar.appendChild(announcementTab);
                            navbar.appendChild(lectureTab);
                            navbar.appendChild(referenceTab);
                            navbar.appendChild(assignmentTab);
                            navbar.appendChild(quizTab);
                            navbar.appendChild(selectCourse);
                            educord_mainGUI.appendChild(homepageText);
                            educordLessons.appendChild(navbar);
                            educordLessons.appendChild(educord_mainGUI);
                            appContainer.appendChild(educordLessons);

                            announcementTab.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Request educordParser.php to return HTML string code to be rendered here
                                    var request = new XMLHttpRequest();
                                    request.onreadystatechange = function() { 
                                        if (request.readyState == 4 && request.status == 200){
                                            //alert("Hello World!");
                                            var phpResult = JSON.parse(request.response);
                                            console.log(phpResult[0]);
                                            console.log(phpResult[0][0]);
                                            console.log(phpResult[0][1]);
                                            console.log("Array length is:"+phpResult.length);
                                            var heading = document.createElement("h2");
                                            heading.innerHTML = "Announcements"
                                            heading.className = "announcementsHeading";
                                            educord_mainGUI.appendChild(heading);                                            
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            //For Each Entry Use 
                                            for(i=0; i<phpResult.length; i++){ 
                                                var template = document.createElement('template');
                                                var template2 = document.createElement('template');
                                                var announcementBox = document.createElement('div');
                                                announcementBox.className = "announcementBox";
                                                template.innerHTML = phpResult[i][0];
                                                template2.innerHTML = phpResult[i][1];
                                                announcementBox.appendChild(template.content.firstChild);
                                                announcementBox.appendChild(template2.content.firstChild);
                                                educord_mainGUI.appendChild(announcementBox);
                                            }
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                        }                                
                                    }
                                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                    var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                    var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                    var getAnnouncements = "?announcements=student&instructor="+instructor+"&coursecode="+coursecode;
                                    request.open('GET', baseLink+getAnnouncements, true);
                                    request.send();
                            }
                            lectureTab.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function() { 
                                    if (request.readyState == 4 && request.status == 200){
                                        //alert("Hello World!");
                                        var phpResult = JSON.parse(request.response);
                                        // var phpResult = request.response;
                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                            var heading = document.createElement("h2");
                                            heading.innerHTML = "Select Module:";
                                            heading.className = "moduleGUIHeading";
                                        }
                                        educord_mainGUI.appendChild(heading);                                            
                                        //educord_mainGUI.appendChild(document.createElement('br'));                                         
                                        console.log(phpResult);
                                        //Use closures
                                        var myModuleEventArray = [];

                                        function createDispModuleEvent(i){
                                            //Generate a button for each module
                                            //assign event to retrieve only the request module
                                            //when button is clicked on
                                            //Remove any existing moduleContainer if any
                                            var myModule = document.createElement("a");
                                            myModule.appendChild(document.createTextNode(phpResult[2][i]+"-"+phpResult[1][i]));
                                            myModule.className = "selectModuleButton";
                                            educord_mainGUI.appendChild(myModule);
                                            myModule.onclick = function(){
                                                //alert("My unique index is: "+i);
                                                //Service user request to view the module they want
                                                //use template and phpResult[0][i]
                                                var moduleContainer = document.getElementsByClassName("moduleContainer")[0];
                                                if(typeof moduleContainer!=="undefined"){
                                                    moduleContainer.parentNode.removeChild(moduleContainer);
                                                }
                                                //console.log("moduleContainer value is:"+moduleContainer);
                                                var template = document.createElement('template');
                                                template.innerHTML = phpResult[0][i];
                                                educord_mainGUI.appendChild(template.content.firstChild); //div container already made server side
                                            }
                                            console.log("My value: " + i);
                                            return function(){};
                                        }
                                        for(i=0; i<phpResult[0].length; i++){
                                            myModuleEventArray[i] =createDispModuleEvent(i);
                                        }
                                        for (var j = 0; j < phpResult[0].length; j++) {
                                            myModuleEventArray[j]();                        //Actually run the events
                                        }
                                    }                                
                                }
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                var getLectures = "?lectures=student&instructor="+instructor+"&coursecode="+coursecode;
                                request.open('GET', baseLink+getLectures, true);
                                request.send();     
                            }
                            referenceTab.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }    
                                var referenceRequest = new XMLHttpRequest();
                                referenceRequest.onreadystatechange = function() {
                                    if (referenceRequest.readyState == 4 && referenceRequest.status == 200){
                                        var phpResult = JSON.parse(referenceRequest.response);
                                        // var phpResult = referenceRequest.response;
                                        console.log(phpResult);
                                        //For Each Entry Use 
                                        var heading = document.createElement("h2");
                                        heading.innerHTML = "References"
                                        heading.className = "referenceHeading";
                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                            educord_mainGUI.appendChild(heading);
                                        }
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                        educord_mainGUI.appendChild(document.createElement('br'));                                            
                                        for(i=0; i<phpResult.length; i++){ 
                                            var titleTemplate = document.createElement('template');
                                            var weeksTemplate = document.createElement('template');
                                            var referenceTextTemplate = document.createElement('template');
                                            var referenceBox = document.createElement('div');
                                            referenceBox.className = "referenceBox";
                                            titleTemplate.innerHTML = phpResult[i][0];
                                            weeksTemplate.innerHTML = phpResult[i][1];
                                            referenceTextTemplate.innerHTML = phpResult[i][2];
                                            referenceBox.appendChild(titleTemplate.content.firstChild);
                                            referenceBox.appendChild(weeksTemplate.content.firstChild);
                                            referenceBox.appendChild(referenceTextTemplate.content.firstChild);
                                            educord_mainGUI.appendChild(referenceBox);
                                        }
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                    }
                                }
                                //Request to get enroll student into the course
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                var getReferences = "?references=student&instructor="+instructor+"&coursecode="+coursecode;
                                referenceRequest.open('GET', baseLink+getReferences, true);
                                referenceRequest.send();                          
                            }
                            
                            assignmentTab.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Make Ajax request to find out number of assignments,
                                //use closure to generate appropriate buttons, each
                                //with their own event function (even though will be same).
                                //The event will upload the student's assignment submission.
                                //Also stores appropriate data to
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function() { 
                                    if (request.readyState == 4 && request.status == 200){
                                        //alert("Hello World!");
                                        // var phpResult = JSON.parse(request.response);
                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                            var homepageText = document.createElement("p");
                                            homepageText.appendChild(document.createTextNode("Hello Student, upload your file based \
                                            on the following convention: yourId_listedAssignmentName_instructorId.pdf, where yourId is your educord id\
                                            , instructorId is your instructor's id, and listedAssignmentName.pdf is the specified file name from the instructor below:"));
                                            homepageText.className = "homepageText";
                                            educord_mainGUI.appendChild(homepageText);                
                                        }
                                        var phpResult = JSON.parse(request.response);
                                        console.log(phpResult);
                                        //Use DOM and display the phpResult, as well as add
                                        //upload button with onclick event to upload to "submissions" folder
                                        for(i=0; i<phpResult[0].length; i++){
                                            var myTitle = document.createElement("h3");
                                            myTitle.appendChild(document.createTextNode(phpResult[0][i]+" - Due on "+phpResult[2][i]));
                                            educord_mainGUI.appendChild(myTitle);
                                            var myWeek = document.createElement("h4");
                                            myWeek.appendChild(document.createTextNode("Relevant Weeks Covered: "+phpResult[3][i]));
                                            educord_mainGUI.appendChild(myWeek);
                                            var myFileFormat = document.createElement("p");
                                            myFileFormat.className = "myFileFormat";
                                            myFileFormat.appendChild(document.createTextNode("Use the following file\
                                            name when creating your submission 'listedAssignmentName': "+phpResult[1][i]+" .\
                                            For example, if the course was Comp 268 by instructor 'test', the submission should be yourId_Assignment#_Comp268_test.pdf"));
                                            educord_mainGUI.appendChild(myFileFormat);
                                            var assignmentDocLink = document.createElement("a");
                                            assignmentDocLink.className = "assignmentDocLink myButton";
                                            assignmentDocLink.appendChild(document.createTextNode("View "+phpResult[1][i]));
                                            assignmentDocLink.href = phpResult[4][i];
                                            assignmentDocLink.target = "_blank";
                                            educord_mainGUI.appendChild(assignmentDocLink);
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            //******************************************************************
                                            educord_mainGUI.appendChild(document.createElement('hr'));
                                        }
                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                            var myTitle = document.createElement("h3");
                                            myTitle.appendChild(document.createTextNode("Upload Your Files Below:"));
                                            educord_mainGUI.appendChild(myTitle);                                        
                                            //Insert FORM of type POST
                                            //Insert a File Upload Button into the FORM
                                            var fileUploadForm = document.createElement("form");
                                            fileUploadForm.className = "fileUploadForm";
                                            fileUploadForm.method = "POST";
                                            fileUploadForm.enctype = "multipart/form-data";
                                            var fileUploadButton = document.createElement("input");
                                            fileUploadButton.className = "fileUploadButton fileUploadButton2";
                                            fileUploadButton.setAttribute("type", "file");
                                            fileUploadButton.style.marginBottom = "10px";
                                            fileUploadButton.style.marginLeft = "115px !important";                                       
                                            var sendToServerButton = document.createElement("a");
                                            sendToServerButton.className = "sendToServerButton myButton";
                                            /* sendToServerButton.setAttribute("type", "button"); */
                                            fileUploadForm.appendChild(fileUploadButton);
                                            educord_mainGUI.appendChild(fileUploadForm);                                            
                                            sendToServerButton.innerHTML = "Upload Assignment";
                                            educord_mainGUI.appendChild(sendToServerButton);
                                            educord_mainGUI.appendChild(document.createElement('br'));
                                            var deleteEMLButton = document.createElement("a");
                                            deleteEMLButton.className = "deleteEMLButton2 myButton";
                                            deleteEMLButton.innerHTML = "Delete All Assignment Submissions (purge DB as well)";
                                            educord_mainGUI.appendChild(deleteEMLButton);
                                        }
                                        
                                        sendToServerButton.onclick = function(){
                                            var PHP_url = "php_files/educordParser.php";
                                            var myFiles = document.querySelector('[type=file]').files;
                                            var formData = new FormData();
                                            if(fileUploadButton.value==""){
                                                alert("Please select a file!");
                                            }else{
                                                // event to check appropriate input forms
                                                console.log(fileUploadButton.value);
                                                for(let j = 0; j<myFiles.length; j++){
                                                    let myFile = myFiles[j];
                                                    formData.append('myFiles[]', myFile);
                                                }
                                                console.log("form data is:", formData);
                                                fetch(PHP_url, {
                                                    method: 'POST',
                                                    body: formData
                                                }).then(response => {
                                                    console.log(response.text);
                                                    if(response.ok){
                                                        alert("Submitted "+myFiles[0].name+"!");
                                                    }                                                
                                                });
                                            }
                                        }
                                        deleteEMLButton.onclick = function(){
                                            var confirmDel = confirm("Do you really want to delete all Educord Assignment Submissions?");
                                            if(confirmDel){
                                                var request = new XMLHttpRequest();
                                                request.open('GET', 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/deleteAllAssignments.php', false);
                                                request.send();

                                                if(request.status === 200) {
                                                    alert(request.responseText);
                                                }                                        

                                            }
                                        }

                                        educord_mainGUI.appendChild(document.createElement('br'));
                                        educord_mainGUI.appendChild(document.createElement('br'));
                                        }
                                    }                                
                                
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                var getAssignments = "?assignments=student&instructor="+instructor+"&coursecode="+coursecode;
                                request.open('GET', baseLink+getAssignments, true);
                                request.send();
                            }
                            quizTab.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);                
                                }
                                //Make Ajax request and get the data from the table "educordQuizQuestions"
                                //Create the quiz app, and once submit is hit, send the result to DB to store in
                                //"educordQuizQuestions"
                                
                                var getQuizRequest = new XMLHttpRequest();
                                getQuizRequest.onreadystatechange = function() { 
                                    if (getQuizRequest.readyState == 4 && getQuizRequest.status == 200){
                                        //alert("Hello World!");
                                        var phpResult = JSON.parse(getQuizRequest.response);
                                        console.log(phpResult);
                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                            var homepageText = document.createElement("p");
                                            homepageText.appendChild(document.createTextNode("Hello Student, select the quiz you wish to \
                                            attempt below:"));
                                            homepageText.className = "homepageText";
                                            educord_mainGUI.appendChild(homepageText);                
                                        }
                                        console.log(phpResult[0]);
                                        function countUnique(iterable) {
                                          return new Set(iterable).size;
                                        }
                                        function onlyUnique(value, index, self) { 
                                            return self.indexOf(value) === index;
                                        }
                                        console.log("Number of unique elements is: "+countUnique(phpResult[0]));
                                        console.log("Unique array is: "+phpResult[0].filter(onlyUnique));
                                        //Generate Right number of buttons via closure, and
                                        //assign events to generate appropriate random 7 questions
                                        //Use closures
                                        var myQuizEventArray = [];

                                        function createDispQuizEvent(i){
                                            //Generate a button for each module
                                            //assign event to retrieve only the request module
                                            //when button is clicked on
                                            //Remove any existing moduleContainer if any
                                            var myQuiz = document.createElement("a");
                                            myQuiz.appendChild(document.createTextNode(phpResult[0].filter(onlyUnique)[i]));
                                            myQuiz.className = "selectQuizButton";
                                            myQuiz.title = "Relevant Lecture Module Sections: "+phpResult[1].filter(onlyUnique)[i];
                                            educord_mainGUI.appendChild(myQuiz);
                                            myQuiz.onclick = function(){
                                                var quizName = phpResult[0].filter(onlyUnique)[i];
                                                var quizIndex = new Array();
                                                var inputRange = phpResult[0].length;
                                                alert(phpResult[0].filter(onlyUnique)[i]);
                                                while(quizIndex.length<7){
                                                    //check if the position at r in phpResult gives valid
                                                    //quizName
                                                    var randIndex = Math.floor(Math.random()*inputRange) + 1;
                                                    if(phpResult[0][randIndex]==quizName && quizIndex.indexOf(randIndex) === -1){
                                                        quizIndex.push(randIndex);
                                                    }
                                                }
                                                console.log("quizIndex is: "+quizIndex);
                                                //Given the appropriate index, create the quiz
                                                var quizContainer = document.getElementsByClassName("quizContainer");
                                                var quizTitle = document.getElementsByClassName("quizTitle");
                                                if(quizContainer.length >0){
                                                    educord_mainGUI.removeChild(quizContainer[0]);
                                                }
                                                if(quizTitle.length >0){
                                                    educord_mainGUI.removeChild(quizTitle[0]);
                                                }
                                                var quizContainer = document.createElement("div");
                                                quizContainer.className = "quizContainer";
                                                var quizTitle = document.createElement("h2");
                                                quizTitle.className = "quizTitle";
                                                quizTitle.appendChild(document.createTextNode(phpResult[0].filter(onlyUnique)[i])); //Insert selected quiz name   
                                                quizContainer.appendChild(quizTitle);
                                                for(j=0;j<quizIndex.length;j++){
                                                    var questionContainer = document.createElement("div");
                                                    questionContainer.className = "questionContainer";
                                                    var questionText = document.createElement("h4");
                                                    questionText.appendChild(document.createTextNode("Q"+(j+1)+". "+phpResult[2][quizIndex[j]]));
                                                    questionText.className = "questionText";
                                                    var choiceA = document.createElement("p");
                                                    var choiceA_Input = document.createElement("input");
                                                    choiceA.className = "choice";
                                                    choiceA_Input.className = "choiceA choice_Input";
                                                    choiceA_Input.setAttribute('type', 'radio');
                                                    choiceA_Input.setAttribute('name', 'question'+[j]);
                                                    choiceA_Input.setAttribute('value', 'choiceA');
                                                    choiceA.appendChild(document.createTextNode("a) "+phpResult[3][quizIndex[j]]));
                                                    var choiceB = document.createElement("p");
                                                    var choiceB_Input = document.createElement("input");
                                                    choiceB.className = "choice";
                                                    choiceB_Input.className = "choiceB choice_Input";
                                                    choiceB_Input.setAttribute('name', 'question'+[j]);
                                                    choiceB_Input.setAttribute('type', 'radio');                                                    
                                                    choiceB.appendChild(document.createTextNode("b) "+phpResult[4][quizIndex[j]]));
                                                    var choiceC = document.createElement("p");
                                                    var choiceC_Input = document.createElement("input");
                                                    choiceC.className = "choice";
                                                    choiceC_Input.className = "choiceC choice_Input";
                                                    choiceC_Input.setAttribute('name', 'question'+[j]);
                                                    choiceC_Input.setAttribute('type', 'radio');
                                                    choiceC.appendChild(document.createTextNode("c) "+phpResult[5][quizIndex[j]]));
                                                    var choiceD = document.createElement("p");
                                                    var choiceD_Input = document.createElement("input");
                                                    choiceD.className = "choice";
                                                    choiceD_Input.className = "choiceD choice_Input";
                                                    choiceD_Input.setAttribute('name', 'question'+[j]);
                                                    choiceD_Input.setAttribute('type', 'radio');
                                                    choiceD.appendChild(document.createTextNode("d) "+phpResult[6][quizIndex[j]]));
                                                    
                                                    questionContainer.appendChild(questionText);

                                                    questionContainer.appendChild(choiceA_Input);
                                                    questionContainer.appendChild(choiceA);                                                    
                                                    questionContainer.appendChild(choiceB_Input);
                                                    questionContainer.appendChild(choiceB);
                                                    questionContainer.appendChild(choiceC_Input);                                                    
                                                    questionContainer.appendChild(choiceC);
                                                    questionContainer.appendChild(choiceD_Input);
                                                    questionContainer.appendChild(choiceD);

                                                    quizContainer.appendChild(questionContainer);
                                                }
                                                
                                                var submitQuiz = document.createElement("a");
                                                submitQuiz.className = "submitQuiz myButton";
                                                submitQuiz.appendChild(document.createTextNode("Submit Quiz"));
                                                quizContainer.appendChild(submitQuiz);
                                                educord_mainGUI.appendChild(quizContainer);
                                                
                                                submitQuiz.onclick = function(){
                                                    //Make sure number of selected radio buttons is 7,
                                                    //if so, update dom and show result to user,
                                                    var canSendAjax = false;
                                                    var inputCounter = 0;
                                                    var myRadioInputs = document.getElementsByClassName("choice_Input");
                                                    var userInputArray = new Array();
                                                    for(j=0; j<myRadioInputs.length; j++){
                                                        if(myRadioInputs[j].checked==true){
                                                            inputCounter++
                                                            var selection = myRadioInputs[j].className;
                                                            selection = selection.split(" ")[0];
                                                            userInputArray.push(selection);
                                                        }
                                                    }
                                                    console.log("userInputArray is: "+userInputArray);
                                                    if(inputCounter==7){
                                                        educord_mainGUI.innerHTML = "";
                                                        if(document.getElementsByClassName("selectedCourseHeader")[0].innerText!="No Courses Selected"){
                                                            var homepageText = document.createElement("p");
                                                            homepageText.appendChild(document.createTextNode("Hello Student, select the quiz you wish to \
                                                            attempt below:"));
                                                            homepageText.className = "homepageText";
                                                            educord_mainGUI.appendChild(homepageText);                
                                                        }
                                                        correctAnswerCounter = 0;
                                                        for(j=0;j<quizIndex.length;j++){
                                                            console.log(phpResult[7][quizIndex[j]]);
                                                            if(userInputArray[j]==phpResult[7][quizIndex[j]]){
                                                                correctAnswerCounter++;
                                                            }
                                                        }
                                                        var quizContainer = document.createElement("div");
                                                        quizContainer.className = "quizContainer";
                                                        var scoreObtained = document.createElement("h3");
                                                        var quizTitle = document.createElement("h4");
                                                        quizTitle.className = "quizTitle";
                                                        var scoreString = (100*correctAnswerCounter/inputCounter).toFixed(2);
                                                        scoreObtained.appendChild(document.createTextNode("Score Obtained: "+scoreString+"%"));
                                                        quizTitle.appendChild(document.createTextNode(phpResult[0].filter(onlyUnique)[i])); //Insert selected quiz name   
                                                        quizContainer.appendChild(scoreObtained);
                                                        quizContainer.appendChild(quizTitle);
                                                        for(j=0;j<quizIndex.length;j++){
                                                            var questionContainer = document.createElement("div");
                                                            questionContainer.className = "questionContainer";
                                                            var questionText = document.createElement("h3");
                                                            questionText.appendChild(document.createTextNode("Q"+(j+1)+". "+phpResult[2][quizIndex[j]]));
                                                            var correctChoice = document.createElement("p");
                                                            var userChoice = document.createElement("p");
                                                            var answerString = "";
                                                            var userString = "";
                                                            if(phpResult[7][quizIndex[j]]=="choiceA"){answerString=phpResult[3][quizIndex[j]]}
                                                            if(phpResult[7][quizIndex[j]]=="choiceB"){answerString=phpResult[4][quizIndex[j]]}
                                                            if(phpResult[7][quizIndex[j]]=="choiceC"){answerString=phpResult[5][quizIndex[j]]}
                                                            if(phpResult[7][quizIndex[j]]=="choiceD"){answerString=phpResult[6][quizIndex[j]]}
                                                            if(userInputArray[j]=="choiceA"){userString=phpResult[3][quizIndex[j]]}
                                                            if(userInputArray[j]=="choiceB"){userString=phpResult[4][quizIndex[j]]}
                                                            if(userInputArray[j]=="choiceC"){userString=phpResult[5][quizIndex[j]]}
                                                            if(userInputArray[j]=="choiceD"){userString=phpResult[6][quizIndex[j]]}
                                                            var correctChoiceString = "Correct Answer was: "+phpResult[7][quizIndex[j]]+", "+answerString;
                                                            var userChoiceString = "Your Answer was: "+userInputArray[j]+", "+userString;
                                                            
                                                            correctChoice.appendChild(document.createTextNode(correctChoiceString));
                                                            userChoice.appendChild(document.createTextNode(userChoiceString));
                                                            questionContainer.appendChild(questionText);
                                                            questionContainer.appendChild(correctChoice);
                                                            questionContainer.appendChild(userChoice);   
                                                            quizContainer.appendChild(questionContainer);
                                                        }
                                                        var goNextButton = document.createElement("a");
                                                        goNextButton.className = "goNextButton myButton";
                                                        goNextButton.appendChild(document.createTextNode("Next"));
                                                        quizContainer.appendChild(goNextButton);                                                        
                                                        educord_mainGUI.appendChild(quizContainer);
                                                        document.getElementsByClassName("selectedCourseHeader")[0].scrollIntoView();
                                                        //Make Ajax Request and send the data over to server for storage
                                                        var request = new XMLHttpRequest();
                                                        request.onreadystatechange = function() { 
                                                            if (request.readyState == 4 && request.status == 200){
                                                                // var phpResult = JSON.parse(request.response);
                                                                var phpResult = request.response;
                                                                console.log(phpResult);
                                                            }
                                                            
                                                        }
                                                        
                                                        var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                                        var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                                        var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                                        var student = document.getElementsByClassName("greeting")[0].innerText.split(' ')[2];
                                                        var quizName = phpResult[0].filter(onlyUnique)[i];
                                                        var grade = (100*correctAnswerCounter/inputCounter).toFixed(2);
                                                        var uploadQuizMark = "uploadQuizMark=student&instructor="+instructor+"&coursecode="+coursecode+"&grade="+grade+"&student="+student+"&quizName="+quizName;
                                                        request.open('POST', baseLink, true);
                                                        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                                        request.send(uploadQuizMark);
                                                        
                                                        goNextButton.onclick = function(){
                                                            document.getElementsByClassName("selectedCourseHeader")[0].scrollIntoView();                                                          
                                                            var selectQuizButton = document.getElementsByClassName("quizTab")[0];
                                                            selectQuizButton.click();
                                                        }
                                                        
                                                    }else{
                                                        alert("Please Attempt All the Questions.");
                                                    }
                                                }
                                            }
                                            console.log("My value: " + i);
                                            return function(){};
                                        }
                                        for(i=0; i<phpResult[0].filter(onlyUnique).length; i++){
                                            myQuizEventArray[i] =createDispQuizEvent(i);
                                        }
                                        for (var j = 0; j < phpResult[0].filter(onlyUnique).length; j++) {
                                            myQuizEventArray[j]();                        //Actually run the events
                                        }
                                        //Generate random 7 questions
/*                                         var arr = [];
                                        var inputRange = 100;
                                        while(arr.length < 7){
                                            var r = Math.floor(Math.random()*inputRange) + 1;
                                            if(arr.indexOf(r) === -1) arr.push(r);
                                        } */
                                    }
                                }
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                                var coursecode = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[0];
                                var instructor = document.getElementsByClassName("selectedCourseHeader")[0].innerText.split(' - ')[2];
                                var getQuiz = "?quizzes=student&instructor="+instructor+"&coursecode="+coursecode;
                                getQuizRequest.open('GET', baseLink+getQuiz, true);
                                getQuizRequest.send();
                            }
                            selectCourse.onclick  = function(){
                                educord_mainGUI.innerHTML = "";
                                if(document.getElementsByClassName("selectedCourseHeader")[0].innerText=="No Courses Selected"){
                                    //Have two sections, one for enrolling or disenrolling
                                    var homepageText = document.createElement("p");
                                    homepageText.appendChild(document.createTextNode("Hello Student, please begin by selecting \
                                    a course to work with below."));
                                    homepageText.className = "homepageText";
                                    educord_mainGUI.appendChild(homepageText);  
                                }
                                //Handle request to get course listing
                                var listCourseRequest = new XMLHttpRequest();
                                listCourseRequest.onreadystatechange = function() {
                                    if (listCourseRequest.readyState == 4 && listCourseRequest.status == 200){
                                        
                                        //https://stackoverflow.com/questions/8823925/how-to-return-an-array-from-an-ajax-call
                                        var phpResult = JSON.parse(listCourseRequest.response);
                                        console.log(phpResult);
                                        var coursecode = phpResult[0];
                                        var coursename = phpResult[1];
                                        var instructorname = phpResult[2];
                                        // console.log(listCourseRequest.response);
                                        console.log("*****************************");
                                        //Insert header for description
                                        var header = document.createElement("h2");
                                        header.className = "selectCourseHeader";
                                        header.appendChild(document.createTextNode("Educord Course Listing"));
                                        //Create a dropdown menu
                                        var courseListDiv = document.createElement("div");
                                        var courseListDivArrow = document.createElement("div");
                                        courseListDiv.className = "courseList";
                                        courseListDivArrow.className = "courseListArrow courseListArrowStudent";
                                        var courseList = document.createElement("select");
                                        courseList.className = "educordCourseList";
                                        for(i=0; i<coursename.length; i++){ //coursename.length
                                            var course = document.createElement("option");
                                            course.text = coursecode[i]+" - "+coursename[i]+" - "+instructorname[i];
                                            courseList.add(course);
                                        }
                                        //Create a submit style button
                                        var enrollButton = document.createElement("button");
                                        enrollButton.innerHTML = "Enroll In Course";
                                        enrollButton.className = "myButton";
                                        enrollButton.style.marginTop = "20px";
                                        enrollButton.style.marginLeft = "325px";
                                        //Insert Everything Now
                                        courseListDiv.appendChild(header);
                                        courseListDiv.appendChild(courseList);
                                        courseListDiv.appendChild(courseListDivArrow);
                                        educord_mainGUI.appendChild(courseListDiv);
                                        educord_mainGUI.appendChild(enrollButton);
                                        
                                        enrollButton.onclick = function(){
                                            var enrollRequest = new XMLHttpRequest();
                                            enrollRequest.onreadystatechange = function() {
                                                if (enrollRequest.readyState == 4 && enrollRequest.status == 200){
                                                    var phpResult = JSON.parse(enrollRequest.response);
                                                    //var phpResult = enrollRequest.response;
                                                    if(phpResult=="cannot enroll"){
                                                        alert("Cannot Enroll in same course!");
                                                    }else{
                                                        alert("You enrolled into: "+phpResult[0]+"!");
                                                        //Two options, update thru JS DOM, or click "Select Course" Again
                                                        // Option 1
                                                        // var addOption = document.createElement("option");
                                                        // addOption.text = phpResult[0]+" - "+phpResult[1]+" - "+phpResult[2];
                                                        // document.getElementsByClassName("enrolledCourseList")[0].add(addOption);
                                                        // Option 2
                                                        document.getElementsByClassName("selectCourse")[0].click();
                                                    }
                                                }
                                            }
                                            //Request to get enroll student into the course
                                            var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/selectCourse.php';
                                            var dataToSplit = document.getElementsByClassName("educordCourseList")[0].value;//"Comp466";
                                            dataToSplit = dataToSplit.split(" - ");
                                            coursecode = dataToSplit[0];
                                            coursename = dataToSplit[1];
                                            instructorname = dataToSplit[2]                                            
                                            var enrollStudent = "?selectCourse=student&user="+accountData[0]+"&coursecode="+coursecode+"&coursename="+coursename+"&instructorname="+instructorname+"&request=enrollStudent";
                                            enrollRequest.open('GET', baseLink+enrollStudent, true);
                                            enrollRequest.send();                                            
                                        }
                                        
                                        
                                    }
                                }
                                //Request to get student course enrolment
                                var listEnrolmentRequest = new XMLHttpRequest();
                                listEnrolmentRequest.onreadystatechange = function() {
                                    if (listEnrolmentRequest.readyState == 4 && listEnrolmentRequest.status == 200){
                                        
                                        //https://stackoverflow.com/questions/8823925/how-to-return-an-array-from-an-ajax-call
                                        var phpResult = JSON.parse(listEnrolmentRequest.response);
                                        //var phpResult = listEnrolmentRequest.response;
                                        var coursecode = phpResult[0];
                                        var coursename = phpResult[1];
                                        var instructor = phpResult[2];
                                        //console.log(phpResult);
                                        console.log("*****************************");
                                        //Insert header for description
                                        var header = document.createElement("h2");
                                        header.className = "selectCourseHeader";
                                        header.appendChild(document.createTextNode("Your Enrolled Courses"));
                                        //Create a dropdown menu
                                        var courseListDiv = document.createElement("div");
                                        var courseListDivArrow = document.createElement("div");
                                        courseListDiv.className = "courseList";
                                        courseListDivArrow.className = "courseListArrow courseListArrowStudent";
                                        var courseList = document.createElement("select");
                                        courseList.className = "enrolledCourseList";
                                        for(i=0; i<coursename.length; i++){ //coursename.length
                                            var course = document.createElement("option");
                                            course.text = coursecode[i]+" - "+coursename[i]+" - "+instructor[i];//"Chubby!";
                                            courseList.add(course);
                                        }
                                        //Create a submit style button
                                        var selectButton = document.createElement("button");
                                        selectButton.innerHTML = "Select Course";
                                        selectButton.className = "myButton";
                                        selectButton.style.marginTop = "20px";
                                        selectButton.style.marginLeft = "325px";
                                        var withdrawButton = document.createElement("button");
                                        withdrawButton.innerHTML = "Withdraw Course";
                                        withdrawButton.className = "myButton";
                                        withdrawButton.style.marginTop = "20px";
                                        withdrawButton.style.marginLeft = "325px";
                                        //Insert Everything Now
                                        courseListDiv.appendChild(header);
                                        courseListDiv.appendChild(courseList);
                                        courseListDiv.appendChild(courseListDivArrow);
                                        educord_mainGUI.appendChild(courseListDiv);
                                        educord_mainGUI.appendChild(selectButton);
                                        educord_mainGUI.appendChild(withdrawButton);
                                        
                                        selectButton.onclick = function(){                         
                                            
                                            var courseListValue = document.getElementsByClassName("enrolledCourseList")[0].value;
                                            document.getElementsByClassName("selectedCourseHeader")[0].innerText=courseListValue;
                                            alert("Course changed to: "+courseListValue);
                                        }
                                        
                                        withdrawButton.onclick = function(){
                                            var withdrawRequest = new XMLHttpRequest();
                                            withdrawRequest.onreadystatechange = function() {
                                                if (withdrawRequest.readyState == 4 && withdrawRequest.status == 200){
                                                    var phpResult = JSON.parse(withdrawRequest.response);
                                                    document.getElementsByClassName("selectCourse")[0].click(); //Click Select Button To Refresh
                                                        if(document.getElementsByClassName("enrolledCourseList").length ==0){
                                                            document.getElementsByClassName("selectedCourseHeader")[0].innerText="No Courses Selected";
                                                        }                                                    
                                                    alert(phpResult);
                                                }
                                            }
                                            //Request to get enroll student into the course
                                            var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/selectCourse.php';
                                            var coursecode = document.getElementsByClassName("enrolledCourseList")[0].value;
                                            coursecode = coursecode.split(" - ");
                                            coursecode = coursecode[0];
                                            var enrollStudent = "?selectCourse=student&user="+accountData[0]+"&coursecode="+coursecode+"&request=withdrawStudent";
                                            withdrawRequest.open('GET', baseLink+enrollStudent, true);
                                            withdrawRequest.send();                                        
                                        }
                                    }
                                }
                                
                                //Request to get course listing
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/selectCourse.php';
                                var getCourseListing = "?selectCourse=student&user="+accountData[0]+"&request=listCourse";
                                listCourseRequest.open('GET', baseLink+getCourseListing, false); //set this to false to enforce consisten ordering
                                listCourseRequest.send();

                                
                                //Request to get student course enrolment
                                var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/selectCourse.php';
                                var getEnrolmentListing = "?selectCourse=student&user="+accountData[0]+"&request=listEnrolment";
                                listEnrolmentRequest.open('GET', baseLink+getEnrolmentListing, false);   //because synchronous request is blocking
                                listEnrolmentRequest.send();

                                //Add "Enroll", "Select", and "Denroll" buttons
                            }     

                            //end of student perspective logic
                        }//end of educord App logic
                        
                        
                    }
                    
                    function restoreEducordGUI(){
                        console.log("Restore GUI here");
                    }
                }
            }else if(checkIfFormFilled() == false){
                alert("Please fill out all inputs!");                
            }        
        }

        function trySignupUser(){
            if(checkIfFormFilled()){
                //Create XMLHTTP object and send the post data to PHP
                var accountTypeInput = document.getElementsByClassName("accountTypeInput")[0].value;
                var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
                var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
                var xhttp = new XMLHttpRequest();
                //Delimited with & sign, similar sending pattern as GET but encrypted
                var dataToSend = "userTypePOST="+accountTypeInput+"&usernamePOST="+usernameInput+"&passwordPOST="+passwordInput;
                console.log("dataToSend is: ", dataToSend);
                xhttp.open("POST", "php_files/signup.php", true);
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhttp.send(dataToSend);
                console.log("Sent data!");
                xhttp.onreadystatechange = display_data;
                function display_data(){
                    if(xhttp.readyState==4 && xhttp.status==200){
/*                         console.log("Signup here?");
                        console.log(xhttp.responseText);
                        console.log(xhttp.responseText.length);
                        console.log("Credential Invalid".length); */
                        //Not sure why for signup.php, it pad 4 spaces?
                        console.log(xhttp.responseText);
                        var serverResp = String(xhttp.responseText).substring(0,"Credential Invalid".length);
                        if(serverResp!="Credential Invalid"){
                            console.log("Signup Success!");
                            alert("Signup Success!");
                            restoreHomepage();
                        }else{
                            alert("User Already Exists in System!");
                        }
                    }else if(xhttp.readyState!=4){
                        //console.log("There was a problem with the request.");
                    }
                }
            }else if(checkIfFormFilled() == false){
                alert("Please fill out all inputs!");                
            }        
        }
        
        usernameInput.onkeypress = function(event){
            if(event.keyCode==13){ //detect enter
                if(document.body.contains(document.getElementsByClassName("Login")[0])){
                    //login service
                    tryLoginUser();
                }else if(document.body.contains(document.getElementsByClassName("Sign-up")[0])){
                    //signup service
                    trySignupUser();
                }
            }
        }
        
        passwordInput.onkeypress = function(event){
            if(event.keyCode==13){ //detect enter
                if(document.body.contains(document.getElementsByClassName("Login")[0])){
                    //login service
                    tryLoginUser();
                }else if(document.body.contains(document.getElementsByClassName("Sign-up")[0])){
                    //signup service
                    trySignupUser();
                }
            }
        }
                
        loginButton.onclick = function(){
/*             alert("Hello"); */
            tryLoginUser();
        };
        signUpButton.onclick = function(){
/*             alert("Time to send POST request");
            console.log(selectType.value);
            console.log(usernameInput.value);
            console.log(passwordInput.value);
            console.log(checkIfFormFilled()); */
            trySignupUser();
        };
        
        homepage.onclick = function(){
            restoreHomepage();
        };
    }
    

    function insertLogoDOM(){
        clearContainer();
        //make appContainer smaller
        appContainer.style.height = "800px";
        appContainer.style.width = "900px";
        //Insert EducordLogo Logo with ClassName
        var educordLogo = document.createElement("img");
        educordLogo.src = "../shared/educord.png";
        educordLogo.id = "educordLogo";
        appContainer.appendChild(educordLogo);    
    }

    function restoreHomepage(){
        //alert("Hello World!");
        insertLogoDOM();
        
        //Insert Welcome Educord Banner
        var welcomeBanner = document.createElement("h2");
        welcomeBanner.className = "welcomeEducord";
        welcomeBanner.appendChild(document.createTextNode("Educord: World Class Learning Platform!"));
        appContainer.appendChild(welcomeBanner);
        
        //Create Div Container "educordOptions"
        var educordOptions = document.createElement("div");
        educordOptions.className = "educordOptions";
        educordOptions.style.marginTop = "21px";
        
        var optionDivider = document.createElement("div");
        optionDivider.className = document.createElement("hr");
        educordOptions.appendChild(optionDivider);

        //Add buttons for Login and Sign-up
        //Put in this order for CSS to work        
        var loginButton = document.createElement("button");
        loginButton.className = "myButton loginButton";
        loginButton.appendChild(document.createTextNode("Login"));
        educordOptions.appendChild(loginButton);        

        var signUpButton = document.createElement("button");
        signUpButton.className = "myButton signupButton";
        signUpButton.appendChild(document.createTextNode("Sign-up"));
        educordOptions.appendChild(signUpButton);
        
        //Add hr line break
        var hrLineBreak = document.createElement("hr");
        hrLineBreak.className = "optionDivider";
        educordOptions.appendChild(hrLineBreak);
        
        //Add instructions text block
        var instructionBlock = document.createElement("div");
        instructionBlock.className = "educordOptionsText";
        instructionBlock.style.font = "0.5em Open Sans, sans-serif";
        var instructionHeading = document.createElement("strong");
        instructionHeading.appendChild(document.createTextNode("Instructions"));
        instructionHeading.style.color = "#990033";
        instructionHeading.style.fontWeight = "bold";
        instructionHeading.style.fontSize = "large";
        var newBreak = document.createElement("br");
        instructionBlock.appendChild(newBreak);
        var instructionText = document.createElement("div");
        instructionText.style.fontSize = "2em";
        instructionText.appendChild(document.createTextNode('Select the course you wish learn about on the right hand side. If you are a student with access to more resources, please login as "student" using '));
        var italics1 = document.createElement("i");
        italics1.innerHTML = '"yourId"';
        instructionText.appendChild(italics1);
        instructionText.appendChild(document.createTextNode('". Also if you are an instructor wishing to update your course, login as "instructor" using '));
        var italics2 = document.createElement("i");
        italics2.innerHTML = '"yourId"';
        instructionText.appendChild(italics2);
        instructionText.appendChild(document.createTextNode('".'));
        
        instructionBlock.appendChild(instructionHeading);
        instructionBlock.appendChild(instructionText);
        educordOptions.appendChild(instructionBlock);
        
        //Add hr line break
        var hrLineBreak = document.createElement("hr");
        hrLineBreak.className = "optionDivider";
        educordOptions.appendChild(hrLineBreak);

        //Add instructions text block
        var instructionBlock = document.createElement("div");
        instructionBlock.className = "educordOptionsText";
        instructionBlock.style.font = "0.5em Open Sans, sans-serif";
        var instructionHeading = document.createElement("strong");
        instructionHeading.appendChild(document.createTextNode("Announcements"));
        instructionHeading.style.color = "#990033";
        instructionHeading.style.fontWeight = "bold";
        instructionHeading.style.fontSize = "large";
        var newBreak = document.createElement("br");
        instructionBlock.appendChild(newBreak);
        var instructionText = document.createElement("div");
        instructionText.style.fontSize = "2em";
        instructionText.appendChild(document.createTextNode("Educord Online Learning System Launched!"));        

        instructionBlock.appendChild(instructionHeading);
        instructionBlock.appendChild(instructionText);
        educordOptions.appendChild(instructionBlock);
        
        //Add hr line break
        var hrLineBreak = document.createElement("hr");
        hrLineBreak.className = "optionDivider";
        educordOptions.appendChild(hrLineBreak);


        //Add instructions text block
        var instructionBlock = document.createElement("div");
        instructionBlock.className = "educordOptionsText";
        instructionBlock.style.font = "0.5em Open Sans, sans-serif";
        instructionBlock.style.marginBottom = "10px";
        var instructionHeading = document.createElement("strong");
        instructionHeading.appendChild(document.createTextNode("Maintenance"));
        instructionHeading.style.color = "#990033";
        instructionHeading.style.fontWeight = "bold";
        instructionHeading.style.fontSize = "large";
        var newBreak = document.createElement("br");
        instructionBlock.appendChild(newBreak);
        var instructionText = document.createElement("div");
        instructionText.style.fontSize = "2em";
        instructionText.appendChild(document.createTextNode("No More Downtime for Maintenance"));        

        instructionBlock.appendChild(instructionHeading);
        instructionBlock.appendChild(instructionText);
        educordOptions.appendChild(instructionBlock);
        
        //Now Create Div Container "educordLessons"
        var educordLessons = document.createElement("div");
        educordLessons.className = "educordLessons";
        educordLessons.style.marginTop = "-483px";

        //add courseListing dropdown menu
        var courseListing = document.createElement("select");
        courseListing.className = "courseListing";
        courseListing.style.marginTop = "15px";
        courseListing.style.marginBottom = "10px";
        courseListing.style.marginLeft = "30px";
        var option = document.createElement("option");
        option.text = "Select your course";
        courseListing.add(option, 0);
        courseListing.options[0].disabled = "true";
        educordLessons.appendChild(courseListing);
        
        //Add the two other needed original containers
        var buttonContainer = document.createElement("buttonContainer");
        buttonContainer.className = "buttonContainer";
        educordLessons.appendChild(courseListing);
        var lectureContainer = document.createElement("lectureContainer");
        lectureContainer.className = "lectureContainer";
        educordLessons.appendChild(buttonContainer);
        educordLessons.appendChild(lectureContainer);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200){
                //alert("Hello World!");
                var phpResult = JSON.parse(request.response);
                // var phpResult = request.response;                                      
                //educord_mainGUI.appendChild(document.createElement('br'));                                         
                console.log(phpResult);
                var selectMenu = document.getElementsByClassName("courseListing")[0];
                for(j=0; j<phpResult[0].length; j++){
                    var newOption = document.createElement("option");
                    newOption.text = phpResult[0][j]+" - "+phpResult[1][j]+" - "+phpResult[2][j];
                    selectMenu.add(newOption);
                }
                selectMenu.onchange = function(){
                    if(typeof buttonContainer!=="undefined"){
                        buttonContainer.innerHTML = "";
                    }
                    var selectMenuValue = selectMenu.value;
                    var coursecode = selectMenuValue.split(' - ')[0];
                    var coursename = selectMenuValue.split(' - ')[1];
                    var instructor = selectMenuValue.split(' - ')[2];
                    alert("Loading "+coursecode+"-"+coursename+"-"+instructor);
                    var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                    var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                    var viewLectureRequest = new XMLHttpRequest();
                    viewLectureRequest.onreadystatechange = function() { 
                        if (viewLectureRequest.readyState == 4 && viewLectureRequest.status == 200){
                            //alert("Hello World!");
                            var phpResult = JSON.parse(viewLectureRequest.response);
                            // var phpResult = viewLectureRequest.response;
                            var educordLessons = document.getElementsByClassName("educordLessons")[0];
                            var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                            var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                            
                            if(typeof buttonContainer!=="undefined"){
                                buttonContainer.innerHTML = "";
                            }                            
                            if(typeof lectureContainer!=="undefined"){
                                lectureContainer.innerHTML = "";
                            }
                            //educord_mainGUI.appendChild(document.createElement('br'));                                         
                            console.log(phpResult);
                            //Use closures
                            var myModuleEventArray = [];

                            function createDispModuleEvent(i){
                                //Generate a button for each module
                                //assign event to retrieve only the viewLectureRequest module
                                //when button is clicked on
                                //Remove any existing moduleContainer if any
                                var myModule = document.createElement("a");
                                var buttonContainer = document.getElementsByClassName("buttonContainer")[0];
                                var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                                //myModule.appendChild(document.createTextNode(phpResult[2][i]+"-"+phpResult[1][i]));
                                myModule.appendChild(document.createTextNode(phpResult[2][i]+"-"+phpResult[1][i]));
                                myModule.className = "selectModuleButton";
                                myModule.style.marginTop = "10px";
                                //educordLessons.appendChild(myModule);
                                buttonContainer.appendChild(myModule);
                                myModule.onclick = function(){
                                    var lectureContainer = document.getElementsByClassName("lectureContainer")[0];
                                    if(typeof lectureContainer!=="undefined"){
                                        lectureContainer.innerHTML = "";
                                    }
                                    //alert("My unique index is: "+i);
                                    //Service user viewLectureRequest to view the module they want
                                    //use template and phpResult[0][i]

                                    //console.log("lectureContainer value is:"+lectureContainer);
                                    var template = document.createElement('template');
                                    template.innerHTML = phpResult[0][i];
                                    //lectureContainer.style.fontSize = "0.5em";
                                    lectureContainer.appendChild(template.content.firstChild); //div container already made server side
                                }
                                console.log("My value: " + i);
                                return function(){};
                            }
                            for(i=0; i<phpResult[0].length; i++){
                                myModuleEventArray[i] = createDispModuleEvent(i);
                            }
                            for (var j = 0; j < phpResult[0].length; j++) {
                                myModuleEventArray[j]();                        //Actually run the events
                            }
                        }                               
                    }
                    var selectMenuValue = selectMenu.value;
                    var coursecode = selectMenuValue.split(' - ')[0];
                    var instructor = selectMenuValue.split(' - ')[2];
                    var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
                    var getLectures = "?lectures=instructor&instructor="+instructor+"&coursecode="+coursecode;
                    viewLectureRequest.open('GET', baseLink+getLectures, true);
                    viewLectureRequest.send();                 
                }
            }                                
        }
        var baseLink = 'http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/php_files/educordParser.php';
        var getCourseList = "?courselist=student";
        request.open('GET', baseLink+getCourseList, true);
        request.send();  















        
       
        
        //Insert all major elements into app
        appContainer.appendChild(educordOptions);
        appContainer.appendChild(educordLessons);

        loginButton.onclick = function(){
            var actionType = "login";
            clearContainer();
            populateContainer(actionType);
            
        };
        
        signUpButton.onclick = function(){
            var actionType = "signup";
            clearContainer();
            populateContainer(actionType);
        };
        /*
        var mostPopularDescription = document.createElement("h3");
        mostPopularDescription.className = "top10Popular";
        mostPopularDescription.appendChild(document.createTextNode("Below are the most popular bookmarks: "));
        appContainer.appendChild(mostPopularDescription);        
         //Use Ajax and retrieve back the most popular data!
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "php_files/loadTop10Link_DOM.php", true);
        xhttp.send();
        xhttp.onreadystatechange = loadTop10;
        function loadTop10(){
            if(xhttp.readyState==4 && xhttp.status==200){
                console.log(xhttp.responseText);
                //LOL This does not work document.write(xhttp.responseText);
                //Parse the response and use DOM to recreate the Homepage
                var linkList = xhttp.responseText.split('_');
                console.log(linkList);
                for(i=0; i < linkList.length; i++){
                    var indexNode = document.createElement("p");
                    var linkNode = document.createElement("a");
                    var linkBreak = document.createElement("br");
                    linkBreak.className = "breakElem";
                    var dispI = i+1;
                    indexNode.appendChild(document.createTextNode(dispI+"."));
                    linkNode.appendChild(document.createTextNode(linkList[i].substring(0,30)));
                    indexNode.className = "linkNum";
                    linkNode.className = "linkClass "+linkList[i];
                    //Assign target blank
                    linkNode.target = "_blank";
                    linkNode.href = linkList[i];
                    //PHP inherits H2 styling so do the same for a and p tag here
                    indexNode.style.fontSize = "1.5em";
                    linkNode.style.fontSize = "1.5em";
                    indexNode.style.fontWeight = "bold";
                    linkNode.style.fontWeight = "bold";
                    appContainer.appendChild(indexNode);
                    appContainer.appendChild(linkNode);
                    appContainer.appendChild(linkBreak);
                    if(i==linkList.length-1){
                        var linkBreak = document.createElement("br");
                        linkBreak.className = "breakElem";
                        appContainer.appendChild(linkBreak);
                    }
                }
            }else if(xhttp.readyState!=4){
                //console.log("There was a problem with the request.");
            }
        }
         */
    }

    function checkIfFormFilled(){
        var accountTypeInput = document.getElementsByClassName("accountTypeInput")[0].value;
        var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
        var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
        if(accountTypeInput!="Select Account Type" && usernameInput!="" && passwordInput!=""){
            return true;  //returning true allows submit to go through
        }else{
            return false;
        }
    }
    
    login.onclick = function(){
        var actionType = "login";
        clearContainer();
        populateContainer(actionType);
        
    };
    
    signup.onclick = function(){
        var actionType = "signup";
        clearContainer();
        populateContainer(actionType);
    };
    

}catch(err){
    console.log(err);
}