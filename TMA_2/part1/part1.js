

var appContainer = document.getElementsByClassName("bookmarkerContainer")[0];
var login = document.getElementsByClassName("loginButton")[0];
var signup = document.getElementsByClassName("signupButton")[0];
try{
    
    function clearContainer(){
        appContainer.innerHTML = "";
    }
    function populateContainer(actionType){
        //Insert Form with login.php
        var inputForm = document.createElement("form");
        //inputForm.method = "post"; //set to POST transaction
        if(actionType=="login"){
            inputForm.className = "loginForm";
            inputForm.action = "php_files/login.php";
        }else if(actionType=="signup"){
            inputForm.className = "signupForm";
            inputForm.action = "php_files/signup.php";
        }
        //Insert BookIt Logo with ClassName
        var bookItLogo = document.createElement("img");
        bookItLogo.src = "../shared/bookIt.png";
        bookItLogo.id = "bookItLogo";
        appContainer.appendChild(bookItLogo);
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
        //We will manually handle the submission using ajax
        //https://stackoverflow.com/questions/45634088/how-to-prevent-page-from-reloading-after-form-submit-jquery/45634140
        //set type to button to prevent default form behaviour
        signUpButton.setAttribute("type", "button");
        loginButton.setAttribute("type", "button");
        //https://stackoverflow.com/questions/15953988/preventing-form-from-submitting-when-input-field-is-empty
        //signUpButton.setAttribute("onClick", "return checkIfFormFilled()");
        //loginButton.setAttribute("onClick", "return checkIfFormFilled()");
        
        homepage.innerHTML = "Home";
        loginButton.innerHTML = "Login";
        signUpButton.innerHTML = "Sign-up";
        
        homepage.className = "myButton Home";
        loginButton.className = "myButton Login";
        signUpButton.className = "myButton Sign-up";
        
        appContainer.appendChild(homepage);
        inputForm.appendChild(promptElem);
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
                var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
                var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
                var xhttp = new XMLHttpRequest();
                //Delimited with & sign, similar sending pattern as GET but encrypted
                var dataToSend = "usernamePOST="+usernameInput+"&passwordPOST="+passwordInput;
                xhttp.open("POST", "php_files/login.php", true);
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhttp.send(dataToSend);
                console.log("Sent data!");
                xhttp.onreadystatechange = display_data;
                function display_data(){
                    if(xhttp.readyState==4 && xhttp.status==200){
                        console.log(xhttp.responseText);
                        //console.log(xhttp.responseText.length);
                        if(xhttp.responseText!="Credential Invalid"){
                            logged_in(xhttp.responseText);
                        }else{
                            alert("Incorrect Credentials!");
                        }
                    }else if(xhttp.readyState!=4){
                        //console.log("There was a problem with the request.");
                    }
                }
                
                function logged_in(serverResponse){
                    console.log("Please change dom if the user was able to log in");
                    var bookmarkList = serverResponse.split('_'); //Contains user's link bookmarks
                    var usernameInput = bookmarkList[0];          //Contains username
                    bookmarkList.splice(0,1);
                    console.log(bookmarkList);
                    console.log(usernameInput);
                    //Use DOM and give access to the application
                    clearContainer();
                    //Insert BookIt Logo with ClassName
                    var bookItLogo = document.createElement("img");
                    bookItLogo.src = "../shared/bookIt.png";
                    bookItLogo.id = "bookItLogo";
                    appContainer.appendChild(bookItLogo);
                    //Add buttons for Login and Sign-up
                    //Put in this order for CSS to work
                    var logoutButton = document.createElement("button");
                    logoutButton.className = "myButton logoutButton";
                    logoutButton.appendChild(document.createTextNode("Logout"));
                    appContainer.appendChild(logoutButton);

                    logoutButton.onclick = function(){
                        restoreHomepage();
                        //alert("Logging Out!");
                    }
                    
                    var welcomeBanner = document.createElement("h2");
                    welcomeBanner.className = "welcomeBookIt";
                    welcomeBanner.appendChild(document.createTextNode("Welcome "+usernameInput+"!"));
                    appContainer.appendChild(welcomeBanner);

                    var mostPopularDescription = document.createElement("h3");
                    mostPopularDescription.className = "top10Popular";
                    mostPopularDescription.appendChild(document.createTextNode("Below are your bookmarks: "));
                    appContainer.appendChild(mostPopularDescription);                           

                    var addButton = document.createElement("button");
                    var newLine = document.createElement("br");
                    var newLine2 = document.createElement("br");
                    newLine.className = "breakElem";
                    newLine2.className = "breakElem";
                    addButton.appendChild(document.createTextNode("Add Link"));
                    addButton.className = "myButton addButton";
                    addButton.style.marginTop = "-10px";
                    addButton.style.marginRight = "280px";
                    appContainer.appendChild(addButton);  
                    appContainer.appendChild(newLine);  
                    appContainer.appendChild(newLine2);  

                    addButton.onclick = function(){ //$POST addLink
                        var targetElement = event.target || event.srcElement;
                        var linkToAdd = window.prompt("Please Enter URL to Bookmark:"); //so without window. , it does not work
                        var isURLCorrect = isURL(linkToAdd);
                        var isUniqueURL = checkUniqueURL(linkToAdd, bookmarkList);                            
                        addIfAccessible(linkToAdd, isURLCorrect, isUniqueURL); //check if correct, accessible, and unique
                    };                    
                    
                    for(i=0; i<bookmarkList.length; i++){
                        var linkNode = document.createElement("a");
                        var editButton = document.createElement("button");
                        var deleteButton = document.createElement("button");
                        var addButton = document.createElement("button");
                        var lineBreak = document.createElement("br");
                        var lineBreak2 = document.createElement("br");
                        lineBreak.className = "breakElem";
                        lineBreak2.className = "breakElem";
                        linkNode.appendChild(document.createTextNode(bookmarkList[i].substring(0,30)));
                        editButton.appendChild(document.createTextNode("Edit Link"));
                        deleteButton.appendChild(document.createTextNode("Delete Link"));
                        addButton.appendChild(document.createTextNode("Add Link"));
                        linkNode.target = "_blank";
                        linkNode.href = bookmarkList[i];
                        linkNode.style.fontSize = "1.5em";
                        linkNode.style.fontWeight = "bold";
                        linkNode.className = "linkClass "+bookmarkList[i];
                        editButton.className = "editButton "+bookmarkList[i];
                        deleteButton.className = "deleteButton "+bookmarkList[i];
                        addButton.className = "addButton "+bookmarkList[i];             
                        appContainer.appendChild(linkNode);
                        appContainer.appendChild(addButton);                        
                        appContainer.appendChild(deleteButton);
                        appContainer.appendChild(editButton);
                        
                        appContainer.appendChild(lineBreak);
                        appContainer.appendChild(lineBreak2);
                        //Add extra DOM to give features like Delete, add, and edit (use prompt())

                        editButton.onclick = function(event){ //$POST editLink
                            var targetElement = event.target || event.srcElement;
                            var oldURL = targetElement.className.split(' ')[1];
                            var linkToEdit = window.prompt("Please Enter URL to Overwrite "+oldURL+" with:");
                            var isURLCorrect = isURL(linkToEdit);
                            var isUniqueURL = checkUniqueURL(linkToEdit, bookmarkList);       
                            var editXhttp = new XMLHttpRequest;
                            var editLink = "editLink="+linkToEdit+"&oldLink="+oldURL+"&username="+usernameInput;
                            editXhttp.open("POST", "php_files/addDeleteEditCheck_Links.php", true);
                            editXhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            editXhttp.send(editLink);
                            editXhttp.onreadystatechange = function(){
                                if(editXhttp.readyState==4 && editXhttp.status==200){
                                    for(i=0;i<bookmarkList.length;i++){
                                        if(bookmarkList[i]==oldURL){
                                            bookmarkList[i]=linkToEdit;
                                        }
                                    }
                                    console.log(editXhttp.responseText);
                                    //Edit through DOM
                                    console.log("linkToEdit is: ", linkToEdit);
                                    var editNodes = document.getElementsByClassName(oldURL);
                                    console.log(editNodes);
                                    for(i = editNodes.length-1; i>=0; i--){ //i==editNodes.length-1; i==0; i--
                                        if(editNodes[i].tagName == "A"){
                                            editNodes[i].href = linkToEdit;
                                            editNodes[i].innerHTML = linkToEdit;
                                            editNodes[i].className = "linkClass "+linkToEdit;                                            
                                        }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Edit Link"){
                                            editNodes[i].className = "editButton "+linkToEdit;
                                        }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Delete Link"){
                                            editNodes[i].className = "deleteButton "+linkToEdit;
                                        }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Add Link"){
                                            editNodes[i].className = "addButton "+linkToEdit;
                                        }
                                    }
                                }
                            }                            
                        };
                        deleteButton.onclick = function(event){ //$POST deleteLink
                            var targetElement = event.target || event.srcElement;
                            var url = targetElement.className.split(' ')[1];
                            var linkToDelete = window.confirm("Delete bookmark for " + url +"?");
                            if(linkToDelete==true){
                                        var removeXhttp = new XMLHttpRequest;
                                        console.log("url is: ", url);
                                        console.log("usernameInput is: ", usernameInput.length+usernameInput);
                                        var removeLink = "deleteLink="+url+"&username="+usernameInput;
                                        removeXhttp.open("POST", "php_files/addDeleteEditCheck_Links.php", true);
                                        removeXhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                        removeXhttp.send(removeLink);
                                        removeXhttp.onreadystatechange = function(){
                                            if(removeXhttp.readyState==4 && removeXhttp.status==200){
                                                var linkIndex = 0;
                                                for(i=0;i<bookmarkList.length;i++){
                                                    if(bookmarkList[i]==url){
                                                        linkIndex = i;
                                                        bookmarkList.splice(i, 1);
                                                    }
                                                }
                                                console.log(removeXhttp.responseText);
                                                //Remove through DOM
                                                var removeNodes = document.getElementsByClassName(url);
                                                while(removeNodes.length > 0){
                                                    removeNodes[0].parentNode.removeChild(removeNodes[0]);
                                                }
                                                //Given link N, remove <br> 2n and 2n+1
                                                var N = linkIndex;
                                                var myBreaks = document.getElementsByClassName("breakElem"); //.className = "breakElem";
                                                myBreaks[2*N+1].parentNode.removeChild(myBreaks[2*N+1]);
                                                myBreaks[2*N].parentNode.removeChild(myBreaks[2*N]);
                                            }
                                        }
                            }
                        };
                        addButton.onclick = function(){ //$POST addLink
                            var targetElement = event.target || event.srcElement;
                            //get target data: targetElement.innerHTML); 
                            // alert("Adding editing!");
                            var linkToAdd = window.prompt("Please Enter URL to Bookmark:"); //so without window. , it does not work
                            var isURLCorrect = isURL(linkToAdd);
                            var isUniqueURL = checkUniqueURL(linkToAdd, bookmarkList);                            
                            addIfAccessible(linkToAdd, isURLCorrect, isUniqueURL); //check if correct, accessible, and unique
                            //assigning the result of a ajax request function cannot work as intended,
                            //since the timing of the asynchronous request will not match the sequential program execution pattern
                            //of var x = async_func()
                        };
                        
                        
                        

                    }
                                            
                    function checkUniqueURL(url, bookmarkList){
                        //Check if the input url is unique from bookmark list
                        //console.log(bookmarkList.includes(url), url);
                        if(bookmarkList.includes(url)==true){
                            return false;   //not unique
                        }else{
                            return true; //it is unique
                        }
                    }
                    
                    function isURL(str) {
                      //https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
                      //check if the input string is correct url string
                      //this regex does not work!!!!!!! ie en.wikipedia.org
                      //return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
                
                      //if contains http:// or https:// or www.
                      //technically the only practical way to check if string is
                      //a url is to test using socket for the status==200 code
                      //to check, otherwise too many regex cases to handle
                        console.log("isURL input is: ", str);
                        var wwwUrlSubstring = str.substring(0,4);
                        var httpUrlSubstring = str.substring(0,7);
                        var httpsUrlSubstring = str.substring(0,8);
                        var isValid = false;
                        if(httpUrlSubstring == "http://" || httpsUrlSubstring == "https://" || wwwUrlSubstring == "www."){
                            isValid = true;
                        }
                      return isValid;
                    }
                    function addIfAccessible(url, isURLCorrect, isUniqueURL){ //$POST checkLink
                        //Use ajax and check for the 3 digits status code
                        //for result whether it's accessible
                        //so because of Cross-Origin Resource Sharing (CORS), not possible to check from client-sidebar
                        //call on the might of server-side PHP to guide the way
                        //in PHP script use similar logic to check if that link is accessible
                        var xhttp = new XMLHttpRequest;
                        var checkLink = "php_files/addDeleteEditCheck_Links.php?checkLink="+url;
                        xhttp.open("GET", checkLink, true); 
                        //var isURLCorrect = isURL(url);
                        //var isUniqueURL = checkUniqueURL(url, bookmarkList);
                        //false is deprecated
                        //false is synchronous, true is asynchronous

                        xhttp.send();
                        xhttp.onreadystatechange = function(){
                            if(xhttp.readyState==4 && xhttp.status==200){
                                //console.log(xhttp.responseText);
                                //console.log(isURLCorrect);
                                //console.log(isUniqueURL);
                                
                                if(xhttp.responseText=="200"){
                                    console.log("Link was accessible");
                                    if(isURLCorrect && isUniqueURL){ //don't really need isURLCorrect && 
                                        console.log("Time for DOM!");
                                        var addXhttp = new XMLHttpRequest;
                                        console.log("url is: ", url);
                                        console.log("usernameInput is: ", usernameInput);
                                        var addLink = "addLink="+url+"&username="+usernameInput;
                                        addXhttp.open("POST", "php_files/addDeleteEditCheck_Links.php", true);
                                        addXhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                        addXhttp.send(addLink);
                                        addXhttp.onreadystatechange = function(){
                                            if(addXhttp.readyState==4 && addXhttp.status==200){
                                                console.log(addXhttp.responseText);
                                                bookmarkList.push(url);
                                                console.log(bookmarkList);
                                                //Add the required elements via DOM
                                                var linkNode = document.createElement("a");
                                                var editButton = document.createElement("button");
                                                var deleteButton = document.createElement("button");
                                                var addButton = document.createElement("button");
                                                var lineBreak = document.createElement("br");
                                                var lineBreak2 = document.createElement("br");
                                                lineBreak.className = "breakElem";
                                                lineBreak2.className = "breakElem";
                                                linkNode.style.fontSize = "1.5em";
                                                linkNode.style.fontWeight = "bold";
                                                linkNode.appendChild(document.createTextNode(url.substring(0,30)));
                                                editButton.appendChild(document.createTextNode("Edit Link"));
                                                deleteButton.appendChild(document.createTextNode("Delete Link"));
                                                addButton.appendChild(document.createTextNode("Add Link"));
                                                linkNode.target = "_blank";
                                                linkNode.href = url;
                                                linkNode.style.fontSize = "1.5em";
                                                linkNode.style.fontWeight = "bold";
                                                linkNode.className = "linkClass "+url;
                                                editButton.className = "editButton "+url;
                                                deleteButton.className = "deleteButton "+url;
                                                addButton.className = "addButton "+url;             
                                                appContainer.appendChild(linkNode);
                                                appContainer.appendChild(addButton);                        
                                                appContainer.appendChild(deleteButton);
                                                appContainer.appendChild(editButton);                                                    
                                                appContainer.appendChild(lineBreak);                                                    
                                                appContainer.appendChild(lineBreak2);
                                                editButton.onclick = function(event){ //$POST editLink
                                                    var targetElement = event.target || event.srcElement;
                                                    var oldURL = targetElement.className.split(' ')[1];
                                                    var linkToEdit = window.prompt("Please Enter URL to Overwrite "+oldURL+" with:");
                                                    var isURLCorrect = isURL(linkToEdit);
                                                    var isUniqueURL = checkUniqueURL(linkToEdit, bookmarkList);       
                                                    var editXhttp = new XMLHttpRequest;
                                                    var editLink = "editLink="+linkToEdit+"&oldLink="+oldURL+"&username="+usernameInput;
                                                    editXhttp.open("POST", "php_files/addDeleteEditCheck_Links.php", true);
                                                    editXhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                                    editXhttp.send(editLink);
                                                    editXhttp.onreadystatechange = function(){
                                                        if(editXhttp.readyState==4 && editXhttp.status==200){
                                                            console.log(editXhttp.responseText);
                                                            //Edit through DOM
                                                            console.log("linkToEdit is: ", linkToEdit);
                                                            var editNodes = document.getElementsByClassName(oldURL);
                                                            console.log(editNodes);
                                                            for(i = editNodes.length-1; i>=0; i--){ //i==editNodes.length-1; i==0; i--
                                                                if(editNodes[i].tagName == "A"){
                                                                    editNodes[i].href = linkToEdit;
                                                                    editNodes[i].innerHTML = linkToEdit;
                                                                    editNodes[i].className = "linkClass "+linkToEdit;                                            
                                                                }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Edit Link"){
                                                                    editNodes[i].className = "editButton "+linkToEdit;
                                                                }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Delete Link"){
                                                                    editNodes[i].className = "deleteButton "+linkToEdit;
                                                                }else if(editNodes[i].tagName == "BUTTON" && editNodes[i].innerHTML == "Add Link"){
                                                                    editNodes[i].className = "addButton "+linkToEdit;
                                                                }
                                                            }
                                                        }
                                                    }                            
                                                };
                                                deleteButton.onclick = function(event){ //$POST deleteLink
                                                    var targetElement = event.target || event.srcElement;
                                                    var url = targetElement.className.split(' ')[1];
                                                    var linkToDelete = window.confirm("Delete bookmark for " + url +"?");
                                                    if(linkToDelete==true){
                                                                var removeXhttp = new XMLHttpRequest;
                                                                console.log("url is: ", url);
                                                                console.log("usernameInput is: ", usernameInput.length+usernameInput);
                                                                var removeLink = "deleteLink="+url+"&username="+usernameInput;
                                                                removeXhttp.open("POST", "php_files/addDeleteEditCheck_Links.php", true);
                                                                removeXhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                                                removeXhttp.send(removeLink);
                                                                removeXhttp.onreadystatechange = function(){
                                                                    if(removeXhttp.readyState==4 && removeXhttp.status==200){
                                                                        var linkIndex = 0;
                                                                        for(i=0;i<bookmarkList.length;i++){
                                                                            if(bookmarkList[i]==url){
                                                                                linkIndex = i;
                                                                                bookmarkList.splice(i, 1);
                                                                            }
                                                                        }
                                                                        console.log(removeXhttp.responseText);
                                                                        //Remove through DOM
                                                                        var removeNodes = document.getElementsByClassName(url);
                                                                        while(removeNodes.length > 0){
                                                                            removeNodes[0].parentNode.removeChild(removeNodes[0]);
                                                                        }
                                                                        //Given link N, remove <br> 2n and 2n+1
                                                                        var N = linkIndex;
                                                                        var myBreaks = document.getElementsByClassName("breakElem"); //.className = "breakElem";
                                                                        myBreaks[2*N+1].parentNode.removeChild(myBreaks[2*N+1]);
                                                                        myBreaks[2*N].parentNode.removeChild(myBreaks[2*N]);
                                                                    }
                                                                }
                                                    }
                                                };
                                                addButton.onclick = function(){ //$POST addLink
                                                    var targetElement = event.target || event.srcElement;
                                                    //get target data: targetElement.innerHTML); 
                                                    // alert("Adding editing!");
                                                    var linkToAdd = window.prompt("Please Enter URL to Bookmark:"); //so without window. , it does not work
                                                    var isURLCorrect = isURL(linkToAdd);
                                                    var isUniqueURL = checkUniqueURL(linkToAdd, bookmarkList); //recursion vibes                            
                                                    addIfAccessible(linkToAdd, isURLCorrect, isUniqueURL); //check if correct, accessible, and unique
                                                };                                                    
                                            }
                                        }
                                        // console.log(xhttp.responseText);
                                    }else{
                                        console.log("Either the link is incorrect or not unique");
                                    }
                                }else if(xhttp.responseText!="200"){
                                    if(isURLCorrect==false || isUniqueURL==false){
                                        alert("Please input a correct, unique URL")
                                    }else{
                                        alert("Link is not accessible");
                                    }                                        
                                }
                            }
                        }
                 
                    }
                    
                    
                }                
            }else if(checkIfFormFilled() == false){
                alert("Please fill out both inputs!");                
            }                
        }
        
        function trySignupUser(){
            if(checkIfFormFilled()){
                //Create XMLHTTP object and send the post data to PHP
                var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
                var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
                var xhttp = new XMLHttpRequest();
                //Delimited with & sign, similar sending pattern as GET but encrypted
                var dataToSend = "usernamePOST="+usernameInput+"&passwordPOST="+passwordInput;
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
                            restoreHomepage();
                        }else{
                            alert("User Already Exists in System!");
                        }
                    }else if(xhttp.readyState!=4){
                        //console.log("There was a problem with the request.");
                    }
                }
            }else if(checkIfFormFilled() == false){
                alert("Please fill out both inputs!");                
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
            tryLoginUser();
        }
        signUpButton.onclick = function(){
            trySignupUser();
        }
        
        homepage.onclick = function(){
            restoreHomepage();
        };
    }
    
    function restoreHomepage(){
        //alert("Hello World!");
        clearContainer();
        //Insert BookIt Logo with ClassName
        var bookItLogo = document.createElement("img");
        bookItLogo.src = "../shared/bookIt.png";
        bookItLogo.id = "bookItLogo";
        appContainer.appendChild(bookItLogo);
        
        //Add buttons for Login and Sign-up
        //Put in this order for CSS to work
        var signUpButton = document.createElement("button");
        signUpButton.className = "myButton signupButton";
        signUpButton.appendChild(document.createTextNode("Sign-up"));
        appContainer.appendChild(signUpButton);
        
        var loginButton = document.createElement("button");
        loginButton.className = "myButton loginButton";
        loginButton.appendChild(document.createTextNode("Login"));
        appContainer.appendChild(loginButton);

        var welcomeBanner = document.createElement("h2");
        welcomeBanner.className = "welcomeBookIt";
        welcomeBanner.appendChild(document.createTextNode("Welcome to BookIt: time for you to bookmark!"));
        appContainer.appendChild(welcomeBanner);

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
        
        function logged_in(serverResponse,usernameInput){
            console.log("Please change dom if the user was able to log in");
            var bookmarkList = serverResponse.split('_'); //Contains user's link bookmarks
            var usernameInput = bookmarkList[0];          //Contains username
            bookmarkList.splice(0,1);
            console.log(bookmarkList);
            console.log(usernameInput);
            //Use DOM and give access to the application
            
        }        
        loginButton.onclick = function(){
            var actionType = "login";
            clearContainer();
            populateContainer(actionType);
        }
        signUpButton.onclick = function(){
            var actionType = "signup";
            clearContainer();
            populateContainer(actionType);
        }        
    }
    
    function checkIfFormFilled(){
        var usernameInput = document.getElementsByClassName("usernameInput")[0].value;
        var passwordInput = document.getElementsByClassName("passwordInput")[0].value;
        if(usernameInput=="" || passwordInput==""){
            return false; //returning falses cancels submit
        }else if(usernameInput!="" && passwordInput!=""){
            return true;  //returning true allows submit to go through
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