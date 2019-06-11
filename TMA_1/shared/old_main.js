
/* Main Javascript External Code To Make Website Dynamic */

//Below for tma1.htm

    //control Instruction Accordion List
    var accObj = document.getElementsByClassName("accordion");
    var accPanel = document.getElementsByClassName("panel");
    var i;
    //console.log(accObj)
    //Handle Open and Close of Individual List
    for(i=0; i<accObj.length; i++) {
        accObj[i].addEventListener("click", function(){
            //Toggle 'Active' property to highlight
            //selected panel
            //console.log(this.classList.style);
            this.classList.toggle('active');
            //console.log(this.classList.style);
            //Expand the panel to be shown, and
            //detract panel to be hidden
            var panel = this.nextElementSibling;
            if(panel.style.display === 'block'){
                panel.style.display = 'none'
            }else if(panel.style.display != 'block'){
                panel.style.display = 'block'            
            } 
        });        
    }
    
    //Handle Close Tabs Button Functionality
    try{
        closeAccordion.addEventListener("click", function(){
            var hasActiveStyle = document.querySelectorAll(".active");
            for(i=0; i<accPanel.length; i++) {
                if(accPanel[i].style.display === 'block'){
                    accPanel[i].style.display = 'none'
                }
                try{
                    if(accObj[i].classList.contains('active')){
                        //Checks if accObj[i] has the active styling
                        //if so turn off
                        accObj[i].classList.toggle('active');
                    }
                }catch(err){
                    //console.log('Type Error Occured on Undefined!');
                }
            }

        });      

    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }

    
//Below for part2.htm    
    //Start up logic (for opening the accordion and the AvenueToQuiz System)
    try{
        var part2Instr = document.getElementsByClassName("accordionPart2");
        var part2Panel = document.getElementsByClassName("panelPart2");
        var part2PanelText = document.getElementsByClassName("brand");
        var unit1TextToHighlight = document.getElementsByClassName("hightlight1");
        var quizTabs = document.getElementsByClassName("tablinks");
        
        window.addEventListener("load", function(event) {
            part2Instr[0].click();
            part2Panel[0].style.backgroundColor = "#ff3333"; //"red"; 
            part2PanelText[0].style.backgroundColor = "#ff3333";
            for(i=0; i<unit1TextToHighlight.length;i++){
                unit1TextToHighlight[i].style.backgroundColor = "#ff3333";
            }
            quizTabs[0].click();
            window.scrollTo(0, 0);
            //console.log("All resources finished loading!");
        });
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    try{
        var unit1TextToHighlight = document.getElementsByClassName("highlight1");
        part2Panel[0].addEventListener("mouseover", function(event) {
            part2Panel[0].style.backgroundColor = "#ffccff";
            part2PanelText[0].style.backgroundColor = "#ffccff";
            for(i=0; i<unit1TextToHighlight.length;i++){
                unit1TextToHighlight[i].style.backgroundColor = "#ffccff";
            }
            //console.log("Changed Color!");
            //console.log(unit1TextToHighlight.length);
        });
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
    //Close Accordion if "Got It!" button is pressed
    try{    
        var gotItButton = document.getElementsByClassName("gotIt");
        gotItButton[0].addEventListener("click", function(event) {
            //console.log("Pressed gotItButton!");
            var accObj = document.getElementsByClassName("accordion");
            
            //Close using below code
            accObj[0].nextElementSibling.style.display = 'none'
            accObj[0].classList.toggle('active');
        });
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }    
    
    //Logic for tab menu log
    try{    
    
        function openTab(evt) {
            this.click();
        }
        function openAppTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            //console.log("tabcontent count is: ", tabcontent.length);
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                document.getElementsByClassName("tablinks")[i].style.backgroundColor = "black";
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
            //document.getElementsByClassName("tablinks1")[0].style.backgroundColor = "blue";
            //console.log("Classname is: ",evt.currentTarget.className.substr(9,9));
            var targetTabChange = evt.currentTarget.className.substr(9,9)
            document.getElementsByClassName(String(targetTabChange))[0].style.backgroundColor = "red";
        }
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }        
    
    //Go to "Try Quiz" tab from end of tutorial
    try{
        var renavigate = document.getElementsByClassName("quizLink");
        var quizTab = document.getElementsByClassName("tablinks4");
        var editTab = document.getElementsByClassName("tablinks5");
        var logo = document.getElementById("AvenueToQuizLogo");
        for(i=0; i<renavigate.length; i++){
            renavigate[i].addEventListener("click", function(event) {
                //console.log("Renavigating!");
                quizTab[0].click();
                logo.scrollIntoView();
                //console.log("Try Quiz Section Here!");
            });        
        }
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
    //Request XML data in quizDatabase.xml and store it (ajax request)
    //This happens once, and the same XMLFile object will be
    //used/reused to implement the functionalities 3 to 5 in assignment.
    try{
        var loadQuizFlag = false;
        var xmlFile; //to contain the XML data and object to be reused in the webpage lifecycle
        var xhttp, xml; //xml will contain the quizDatabase.xml data
        var readyToAccessXML = false;
        //var quizTab is the "Try Quiz" tab
        quizTab[0].addEventListener("click", function(event){
            //If first time, request quizDatabase.xml data from server
            //and store in var xmlFile
            if(loadQuizFlag==false){
                var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.style.visibility = "hidden";
                loadQuizFlag = ~loadQuizFlag;
                xhttp = new XMLHttpRequest(); //create an XMLHttpRequest object
                xhttp.open("GET", "quizDatabase.xml", true); //Use POST instead of GET
                xhttp.send(); //since we want to send data back to the server, not true for our current design    
                xhttp.onreadystatechange = function(){
                    //in this context, "this" is xhttp (XMLHttpRequest object)
                    if(this.readyState == 4 && this.status == 200){ //once state and status is ready and ok
                        console.log(this.statusText); //"Ok"
                        console.log("xml is: ", xml);
                        readyToAccessXML = true;
                    }
                };
             
            }
        });
        editTab[0].addEventListener("click", function(event){
            //If first time, request quizDatabase.xml data from server
            //and store in var xmlFile
                if(loadQuizFlag==false){
                    loadQuizFlag = ~loadQuizFlag;
                    xhttp = new XMLHttpRequest(); //create an XMLHttpRequest object
                    xhttp.open("GET", "quizDatabase.xml", true); //Use POST instead of GET
                    xhttp.send(); //since we want to send data back to the server, not true for our current design    
                    xhttp.onreadystatechange = function(){
                        //in this context, "this" is xhttp (XMLHttpRequest object)
                        if(this.readyState == 4 && this.status == 200){ //once state and status is ready and ok
                            console.log(this.statusText); //"Ok"
                            console.log("xml is: ", xml);
                            readyToAccessXML = true;
                        }
                    };
                }
        });

    }catch(err){
        console.log('Something went wrong while trying to get XML after clicking "Try Quiz"');
    }
    
    //Zoom-In and Zoom-Out Functionality
    //For reading the tiny PDF reader
    try{
        var zoom_in = document.getElementById("zoom-in");
        var zoom_out = document.getElementById("zoom-out");
        var zoom_in2 = document.getElementById("zoom-in2");
        var zoom_out2 = document.getElementById("zoom-out2");
        var anchor = document.getElementsByClassName("XMLboiler");
        var avenueHeader = document.getElementsByClassName("tablinks");
        var logo = document.getElementById("AvenueToQuizLogo");
        var topNavBar = document.getElementsByClassName("topnav")[0];
        var temp_flag = true;
        
        zoom_in.addEventListener("click", function(event) {
            document.body.style.zoom="175%";
            zoom_in.scrollIntoView();
        });
        zoom_in.addEventListener("mouseover", function(event) {
            zoom_in.style.cursor = "pointer";
            //if you use document.body.... instead,
            //it will permanently change to the pointer cursor
        });        
        zoom_out.addEventListener("click", function(event) {
            document.body.style.zoom="100%";
            zoom_out.scrollIntoView();
        });
        zoom_out.addEventListener("mouseover", function(event) {
            zoom_out.style.cursor = "pointer";
        });
        zoom_in2.addEventListener("click", function(event) {
            document.body.style.zoom="175%";
            zoom_in2.scrollIntoView();
        });
        zoom_in2.addEventListener("mouseover", function(event) {
            zoom_in2.style.cursor = "pointer";
            //if you use document.body.... instead,
            //it will permanently change to the pointer cursor
        });        
        zoom_out2.addEventListener("click", function(event) {
            document.body.style.zoom="100%";
            zoom_out2.scrollIntoView();
        });
        zoom_out2.addEventListener("mouseover", function(event) {
            zoom_out2.style.cursor = "pointer";
        });        
        for(i=0; i<avenueHeader.length; i++){ 
            //restore zoom level when changing tabs
            avenueHeader[i].addEventListener("click", function(event) {
                document.body.style.zoom="100%";
                /* console.log("value click is for i: ", i); */
                if(i>0){
                    logo.scrollIntoView();
                    //console.log("i value is: ", i);
                }
                if(i==5){ //big finesse, terrible thing to do though lol
                    //Makes sure that when the page loads, it scrolls
                    //to the top. Uses a temp_flag to do so.
                    //https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript
                    //Must clear cookies/cache for this code to always work
                    //otherwise must use above solutions with either API or cookie cleaning
                    if(temp_flag==true){
                        window.scrollTo(0, 0);
                        temp_flag=~temp_flag;
                    }
                }
            });        
        }
        topNavBar.addEventListener("click", function(event) {
            //If user forget to zoom back out,
            //zoom back out when top nav bar is pressed
            document.body.style.zoom="100%";
        });
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
    //Flags to communicate to server and other Quizzes that this quiz being performed
    var pressedQuiz1Flag = false;
    var pressedQuiz2Flag = false;
    var pressedQuiz3Flag = false;
    var questionArray = new Array();    //contains all questions, including custom-user made ones too
    var tempQuestionArray = new Array(); //contains the temporary question array for the specific unit user is working on
    var choiceAArray = new Array();
    var choiceBArray = new Array();
    var choiceCArray = new Array();
    var choiceDArray = new Array();
    var answerArray = new Array(); //will store test solution (the 13 solutions)
    var sampleQuestionArray = new Array(); //will store user's attempted questions (the 7 questions)
    var resultArray = new Array(); //will store user's solution (the 7 solutions)
    var sampleAnswerArray = new Array(); ////will store user's attempted questions' solution (the 7 questions)
    var randomQuestionArray = new Array(); //for randomizing the array
    //How to dynamically add events to dynamically generated QuizMenu buttons
    //for part 5
    //https://stackoverflow.com/questions/22604401/how-to-add-onclick-to-a-html-element-dynamically-using-javascript
    //Quiz Logic
    try{
        var quizMenuContainer = document.getElementsByClassName("quizMenuContainer")[0]; //insert new quizes here
        var quiz1Button = document.getElementsByClassName("quizMenu")[0]; //later generated buttons
        var quiz2Button = document.getElementsByClassName("quizMenu")[1]; //will have higher index
        var quiz3Button = document.getElementsByClassName("quizMenu")[2]; //values
        var domQuizButton_i = new Array();  //insert document.getElementsByClassName("quizMenu")[2+i];
        var editButton1 = document.getElementsByClassName("editMenu")[0];
        var editButton2 = document.getElementsByClassName("editMenu")[1];
        var editButton3 = document.getElementsByClassName("editMenu")[2];
        
        //var xmlFile; defined above
        //var pressedQuiz1Flag = true; //Global since defined outside of function?
        
        quiz1Button.addEventListener("click", function(event) {
        //When Quiz1 Button is pressed, load the Quiz 1 questions.
            //Create an XMLHttpRequest object to allow use of XML.
            //in this context, "this" is xhttp
            console.log("pressedQuiz1Flag value is: ", pressedQuiz1Flag)
            if(pressedQuiz1Flag==false & readyToAccessXML==true){
                pressedQuiz1Flag = true;
                var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.style.visibility = "visible";
                var updateQuizMenuButtons = document.getElementsByClassName("quizMenu");
                for(i=0; i<updateQuizMenuButtons.length; i++){
                    if(i!=0){
                        updateQuizMenuButtons[i].style.visibility = "hidden";
                    }
                }
/*                 quiz2Button.style.visibility = "hidden";
                quiz3Button.style.visibility = "hidden"; */
                xml = xhttp.responseXML; //contains quizDatabase.xml data
                loadQuiz1(xml); //xhttp defined when tab was clicked contains the quizDatabase.xml data!
            }
        });  
        
        quiz2Button.addEventListener("click", function(event) {
        //When Quiz1 Button is pressed, load the Quiz 1 questions.
            //Create an XMLHttpRequest object to allow use of XML.
            //in this context, "this" is xhttp
            console.log("pressedQuiz2Flag value is: ", pressedQuiz2Flag)
            if(pressedQuiz2Flag==false & readyToAccessXML==true){
                pressedQuiz2Flag = true;
                var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.style.visibility = "visible";
                var updateQuizMenuButtons = document.getElementsByClassName("quizMenu");
                for(i=0; i<updateQuizMenuButtons.length; i++){
                    if(i!=1){
                        updateQuizMenuButtons[i].style.visibility = "hidden";
                    }
                }
                // quiz1Button.style.visibility = "hidden";
                // quiz3Button.style.visibility = "hidden";
                xml = xhttp.responseXML; //contains quizDatabase.xml data
                loadQuiz2(xml); //xhttp defined when tab was clicked contains the quizDatabase.xml data!
            }
        });

        quiz3Button.addEventListener("click", function(event) {
        //When Quiz1 Button is pressed, load the Quiz 1 questions.
            //Create an XMLHttpRequest object to allow use of XML.
            //in this context, "this" is xhttp
            console.log("pressedQuiz3Flag value is: ", pressedQuiz3Flag)
            if(pressedQuiz3Flag==false & readyToAccessXML==true){
                pressedQuiz3Flag = true;
                var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.style.visibility = "visible";
                var updateQuizMenuButtons = document.getElementsByClassName("quizMenu");
                for(i=0; i<updateQuizMenuButtons.length; i++){
                    if(i!=2){
                        updateQuizMenuButtons[i].style.visibility = "hidden";
                    }
                }
                // quiz1Button.style.visibility = "hidden";
                // quiz2Button.style.visibility = "hidden";
                console.log(xhttp.responseXML);
                xml = xhttp.responseXML; //contains quizDatabase.xml data
                loadQuiz3(xml); //xhttp defined when tab was clicked contains the quizDatabase.xml data!
            }
        });
        function loadQuiz1(xmlFile){
            var i;
            var xmlIterator = xmlFile.getElementsByTagName("unit");
            console.log("Refreshed quiz#1");
            
/*             Add new data
            newElement = xmlFile.createElement("edition");
            newText = xmlFile.createTextNode("Mah Edition");
            newElement.appendChild(newText);
            xmlFile.getElementsByTagName("unit")[0].appendChild(newElement); */
            console.log("length of xmlIterator is: ", xmlIterator.length); //we are not going to deal with making quiz random nor saving the changes

            for(i = 0; i<xmlIterator.length; i++) {
                /* console.log(xmlIterator[i].getAttribute('quizName'));
                console.log(x[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                console.log(x[i].getElementsByTagName("edition")[i].childNodes[i].nodeValue); */
                if(xmlIterator[i].getAttribute('quizName') == 'unit1'){
                    tempQuestionArray.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    choiceAArray.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    choiceBArray.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    choiceCArray.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    choiceDArray.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    answerArray.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                }
            }
            while(randomQuestionArray.length < 7){ //7 random questions
                var randomNumber = Math.floor(Math.random() * (13)); //a number from 0 to x.length-1 (x.length elements)
                if((randomQuestionArray.includes(randomNumber))==false){
                    randomQuestionArray.push(randomNumber);
                }
            }
            console.log(randomQuestionArray);
            //Insert Quiz Title
            var quizTitle = document.createElement("h2");
            var quizTitleTextNode = document.createTextNode("Quiz #1");
            quizTitle.appendChild(quizTitleTextNode);
            quizTitle.className = "quizTitle";
            var quizContainer = document.getElementsByClassName("QuizContainer")[0];
            quizContainer.appendChild(quizTitle);
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var radioA = document.createElement("input");
                var choiceA = document.createElement("p");
                var radioB = document.createElement("input");
                var choiceB = document.createElement("p");
                var radioC = document.createElement("input");
                var choiceC = document.createElement("p");
                var radioD = document.createElement("input");
                var choiceD = document.createElement("p");
                radioA.setAttribute("type", "radio");
                radioB.setAttribute("type", "radio");
                radioC.setAttribute("type", "radio");
                radioD.setAttribute("type", "radio");
                //so that the radio input for the class is grouped
                radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1);
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
/*                 radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1); */
                //Initialize the elements with appropriate texts
                sampleQuestionArray.push(String(tempQuestionArray[randomQuestionArray[i]]));
                sampleAnswerArray.push(String(answerArray[randomQuestionArray[i]]));
                var questionTextNode = document.createTextNode(String(i+1)+". "+tempQuestionArray[randomQuestionArray[i]]);
                var choiceATextNode = document.createTextNode(choiceAArray[randomQuestionArray[i]]);
                var choiceBTextNode = document.createTextNode(choiceBArray[randomQuestionArray[i]]);
                var choiceCTextNode = document.createTextNode(choiceCArray[randomQuestionArray[i]]);
                var choiceDTextNode = document.createTextNode(choiceDArray[randomQuestionArray[i]]);
                //Insert the text node children into its respective containers
                quizTitle.appendChild(quizTitleTextNode);
                question.appendChild(questionTextNode);
                choiceA.appendChild(choiceATextNode);
                choiceB.appendChild(choiceBTextNode);
                choiceC.appendChild(choiceCTextNode);
                choiceD.appendChild(choiceDTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                choiceA.className = "choiceA";
                choiceB.className = "choiceB";
                choiceC.className = "choiceC";
                choiceD.className = "choiceD";
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(radioA);
                questionContainer.appendChild(choiceA);
                questionContainer.appendChild(radioB);
                questionContainer.appendChild(choiceB);
                questionContainer.appendChild(radioC);
                questionContainer.appendChild(choiceC);
                questionContainer.appendChild(radioD);
                questionContainer.appendChild(choiceD);
                
                //Final Step, insert the question container to the quiz container
                //var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.appendChild(questionContainer);
                
            }
            //Insert the Submit button!
            var submitQuizButton = document.createElement("p");
            var submitQuizButtonTextNode = document.createTextNode("Submit Quiz #1");
            submitQuizButton.appendChild(submitQuizButtonTextNode);
            submitQuizButton.className = "submitQuiz"; //every time we clear this div container, this element will disappear
                                                    //hence we will always refer submitQuizButton[0]
            quizContainer.appendChild(submitQuizButton);

            //Submit Button Exists so add event listener
            submitQuizButton.addEventListener("click", function(event) {
                //Verify whether all questions were attempted or not
                var radios = document.getElementsByTagName('input');
                var value = 0;
                var chosenAnswer;
                console.log("radio.length was: ", radios.length);
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].type === 'radio' && radios[i].checked) {
                        // get value, set checked flag or do whatever you need to
                        //value = radios[i].value;
                        console.log("Value of this radio was: ", radios[i].value);
                        if((i%4)==0){ //sample from quizDatabase.xml: <answer>choiceD</answer>
                            chosenAnswer = "choiceA"
                        }else if((i%4)==1){
                            chosenAnswer = "choiceB"
                        }else if((i%4)==2){
                            chosenAnswer = "choiceC"
                        }else if((i%4)==3){
                            chosenAnswer = "choiceD"
                        }
                        resultArray.push(chosenAnswer);
                        value+=1;
                    }
                }
                if(value==7){
                    quizContainer.innerHTML = ""; //clear content
                    console.log("answerArray is: ", answerArray);
                    console.log("resultArray is: ", resultArray);
                    console.log("tempQuestionArray is: ", tempQuestionArray);
                    console.log("sampleQuestionArray is: ", sampleQuestionArray);
                    console.log("sampleAnswerArray is: ", sampleAnswerArray);
                    var numCorrect = 0;
                    for(i=0; i<sampleAnswerArray.length; i++){
                        if(resultArray[i] == sampleAnswerArray[i]){
                            numCorrect++;
                        }                    
                    }
                    //quizContainer.visibility = "hidden";
                    displayQuiz1Result(numCorrect, sampleAnswerArray.length);
                }else{
                    alert("Please make sure that you attempted all the question!");
                }
            });
/*          var newQuiz = document.createElement("a");
            var textNode = document.createTextNode("Quiz A");
            newQuiz.appendChild(textNode);
            newQuiz.className = "quizMenu quizMenu4";
            var quizMenuContainer = document.getElementsByClassName("quizMenuContainer")[0];
            quizMenuContainer.appendChild(newQuiz); */
            
            /* xml.send(xmlFile); //Send it back to update */
            //Two things to verify.
            //1) Can I edit the XML file? No, need Server-Side Scripting to handle the POST request 
            //   (containing the edited XML data to be saved and overwritten into the existing XML file).
            //2) Am I able to add new elements into part2.html's "Quiz Container"? Yes, easily with DOM.
            
        }
        
        function loadQuiz2(xmlFile){
            var i;
            var xmlIterator = xmlFile.getElementsByTagName("unit");
            console.log("Refreshed quiz#2");
            
/*             Add new data
            newElement = xmlFile.createElement("edition");
            newText = xmlFile.createTextNode("Mah Edition");
            newElement.appendChild(newText);
            xmlFile.getElementsByTagName("unit")[0].appendChild(newElement); */
            console.log("length of xmlIterator is: ", xmlIterator.length); //we are not going to deal with making quiz random nor saving the changes

            for(i = 0; i<xmlIterator.length; i++) {
                if(xmlIterator[i].getAttribute('quizName') == 'unit2'){
                    tempQuestionArray.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    choiceAArray.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    choiceBArray.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    choiceCArray.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    choiceDArray.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    answerArray.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                }
            }
            while(randomQuestionArray.length < 7){ //7 random questions
                var randomNumber = Math.floor(Math.random() * (13)); //a number from 0 to x.length-1 (x.length elements)
                if((randomQuestionArray.includes(randomNumber))==false){
                    randomQuestionArray.push(randomNumber);
                }
            }
            console.log(randomQuestionArray);
            //Insert Quiz Title
            var quizTitle = document.createElement("h2");
            var quizTitleTextNode = document.createTextNode("Quiz #2");
            quizTitle.appendChild(quizTitleTextNode);
            quizTitle.className = "quizTitle";
            var quizContainer = document.getElementsByClassName("QuizContainer")[0];
            quizContainer.appendChild(quizTitle);
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var radioA = document.createElement("input");
                var choiceA = document.createElement("p");
                var radioB = document.createElement("input");
                var choiceB = document.createElement("p");
                var radioC = document.createElement("input");
                var choiceC = document.createElement("p");
                var radioD = document.createElement("input");
                var choiceD = document.createElement("p");
                radioA.setAttribute("type", "radio");
                radioB.setAttribute("type", "radio");
                radioC.setAttribute("type", "radio");
                radioD.setAttribute("type", "radio");
                //so that the radio input for the class is grouped
                radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1);
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
/*                 radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1); */
                //Initialize the elements with appropriate texts
                sampleQuestionArray.push(String(tempQuestionArray[randomQuestionArray[i]]));
                sampleAnswerArray.push(String(answerArray[randomQuestionArray[i]]));
                var questionTextNode = document.createTextNode(String(i+1)+". "+tempQuestionArray[randomQuestionArray[i]]);
                var choiceATextNode = document.createTextNode(choiceAArray[randomQuestionArray[i]]);
                var choiceBTextNode = document.createTextNode(choiceBArray[randomQuestionArray[i]]);
                var choiceCTextNode = document.createTextNode(choiceCArray[randomQuestionArray[i]]);
                var choiceDTextNode = document.createTextNode(choiceDArray[randomQuestionArray[i]]);
                //Insert the text node children into its respective containers
                quizTitle.appendChild(quizTitleTextNode);
                question.appendChild(questionTextNode);
                choiceA.appendChild(choiceATextNode);
                choiceB.appendChild(choiceBTextNode);
                choiceC.appendChild(choiceCTextNode);
                choiceD.appendChild(choiceDTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                choiceA.className = "choiceA";
                choiceB.className = "choiceB";
                choiceC.className = "choiceC";
                choiceD.className = "choiceD";
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(radioA);
                questionContainer.appendChild(choiceA);
                questionContainer.appendChild(radioB);
                questionContainer.appendChild(choiceB);
                questionContainer.appendChild(radioC);
                questionContainer.appendChild(choiceC);
                questionContainer.appendChild(radioD);
                questionContainer.appendChild(choiceD);
                
                //Final Step, insert the question container to the quiz container
                //var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.appendChild(questionContainer);
                
            }
            //Insert the Submit button!
            var submitQuizButton = document.createElement("p");
            var submitQuizButtonTextNode = document.createTextNode("Submit Quiz #2");
            submitQuizButton.appendChild(submitQuizButtonTextNode);
            submitQuizButton.className = "submitQuiz"; //every time we clear this div container, this element will disappear
                                                    //hence we will always refer submitQuizButton[0]
            quizContainer.appendChild(submitQuizButton);
            console.log(tempQuestionArray);
            //Submit Button Exists so add event listener
            submitQuizButton.addEventListener("click", function(event) {
                //Verify whether all questions were attempted or not
                var radios = document.getElementsByTagName('input');
                var value = 0;
                var chosenAnswer;
                console.log("radio.length was: ", radios.length);
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].type === 'radio' && radios[i].checked) {
                        // get value, set checked flag or do whatever you need to
                        //value = radios[i].value;
                        console.log("Value of this radio was: ", radios[i].value);
                        if((i%4)==0){ //sample from quizDatabase.xml: <answer>choiceD</answer>
                            chosenAnswer = "choiceA"
                        }else if((i%4)==1){
                            chosenAnswer = "choiceB"
                        }else if((i%4)==2){
                            chosenAnswer = "choiceC"
                        }else if((i%4)==3){
                            chosenAnswer = "choiceD"
                        }
                        resultArray.push(chosenAnswer);
                        value+=1;
                    }
                }
                if(value==7){
                    quizContainer.innerHTML = ""; //clear content
                    console.log("answerArray is: ", answerArray);
                    console.log("resultArray is: ", resultArray);
                    console.log("tempQuestionArray is: ", tempQuestionArray);
                    console.log("sampleQuestionArray is: ", sampleQuestionArray);
                    console.log("sampleAnswerArray is: ", sampleAnswerArray);
                    var numCorrect = 0;
                    for(i=0; i<sampleAnswerArray.length; i++){
                        if(resultArray[i] == sampleAnswerArray[i]){
                            numCorrect++;
                        }                    
                    }
                    //quizContainer.visibility = "hidden";
                    displayQuiz2Result(numCorrect, sampleAnswerArray.length);
                }else{
                    alert("Please make sure that you attempted all the question!");
                }
            });
  
        }

        function loadQuiz3(xmlFile){
            var i;
            var xmlIterator = xmlFile.getElementsByTagName("unit");
            console.log("Refreshed quiz#3");
            
/*             Add new data
            newElement = xmlFile.createElement("edition");
            newText = xmlFile.createTextNode("Mah Edition");
            newElement.appendChild(newText);
            xmlFile.getElementsByTagName("unit")[0].appendChild(newElement); */
            console.log("length of xmlIterator is: ", xmlIterator.length); //we are not going to deal with making quiz random nor saving the changes

            for(i = 0; i<xmlIterator.length; i++) {
                if(xmlIterator[i].getAttribute('quizName') == 'unit3'){
                    tempQuestionArray.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    choiceAArray.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    choiceBArray.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    choiceCArray.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    choiceDArray.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    answerArray.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                }
            }
            while(randomQuestionArray.length < 7){ //7 random questions
                var randomNumber = Math.floor(Math.random() * (13)); //a number from 0 to x.length-1 (x.length elements)
                if((randomQuestionArray.includes(randomNumber))==false){
                    randomQuestionArray.push(randomNumber);
                }
            }
            console.log(randomQuestionArray);
            //Insert Quiz Title
            var quizTitle = document.createElement("h2");
            var quizTitleTextNode = document.createTextNode("Quiz #3");
            quizTitle.appendChild(quizTitleTextNode);
            quizTitle.className = "quizTitle";
            var quizContainer = document.getElementsByClassName("QuizContainer")[0];
            quizContainer.appendChild(quizTitle);
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var radioA = document.createElement("input");
                var choiceA = document.createElement("p");
                var radioB = document.createElement("input");
                var choiceB = document.createElement("p");
                var radioC = document.createElement("input");
                var choiceC = document.createElement("p");
                var radioD = document.createElement("input");
                var choiceD = document.createElement("p");
                radioA.setAttribute("type", "radio");
                radioB.setAttribute("type", "radio");
                radioC.setAttribute("type", "radio");
                radioD.setAttribute("type", "radio");
                //so that the radio input for the class is grouped
                radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1);
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
/*                 radioA.name = "Unit1_QuesChoice"+String(i+1);
                radioB.name = "Unit1_QuesChoice"+String(i+1);
                radioC.name = "Unit1_QuesChoice"+String(i+1);
                radioD.name = "Unit1_QuesChoice"+String(i+1); */
                //Initialize the elements with appropriate texts
                sampleQuestionArray.push(String(tempQuestionArray[randomQuestionArray[i]]));
                sampleAnswerArray.push(String(answerArray[randomQuestionArray[i]]));
                var questionTextNode = document.createTextNode(String(i+1)+". "+tempQuestionArray[randomQuestionArray[i]]);
                var choiceATextNode = document.createTextNode(choiceAArray[randomQuestionArray[i]]);
                var choiceBTextNode = document.createTextNode(choiceBArray[randomQuestionArray[i]]);
                var choiceCTextNode = document.createTextNode(choiceCArray[randomQuestionArray[i]]);
                var choiceDTextNode = document.createTextNode(choiceDArray[randomQuestionArray[i]]);
                //Insert the text node children into its respective containers
                quizTitle.appendChild(quizTitleTextNode);
                question.appendChild(questionTextNode);
                choiceA.appendChild(choiceATextNode);
                choiceB.appendChild(choiceBTextNode);
                choiceC.appendChild(choiceCTextNode);
                choiceD.appendChild(choiceDTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                choiceA.className = "choiceA";
                choiceB.className = "choiceB";
                choiceC.className = "choiceC";
                choiceD.className = "choiceD";
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(radioA);
                questionContainer.appendChild(choiceA);
                questionContainer.appendChild(radioB);
                questionContainer.appendChild(choiceB);
                questionContainer.appendChild(radioC);
                questionContainer.appendChild(choiceC);
                questionContainer.appendChild(radioD);
                questionContainer.appendChild(choiceD);
                
                //Final Step, insert the question container to the quiz container
                //var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                quizContainer.appendChild(questionContainer);
                
            }
            //Insert the Submit button!
            var submitQuizButton = document.createElement("p");
            var submitQuizButtonTextNode = document.createTextNode("Submit Quiz #3");
            submitQuizButton.appendChild(submitQuizButtonTextNode);
            submitQuizButton.className = "submitQuiz"; //every time we clear this div container, this element will disappear
                                                    //hence we will always refer submitQuizButton[0]
            quizContainer.appendChild(submitQuizButton);

            //Submit Button Exists so add event listener
            submitQuizButton.addEventListener("click", function(event) {
                //Verify whether all questions were attempted or not
                var radios = document.getElementsByTagName('input');
                var value = 0;
                var chosenAnswer;
                console.log("radio.length was: ", radios.length);
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].type === 'radio' && radios[i].checked) {
                        // get value, set checked flag or do whatever you need to
                        //value = radios[i].value;
                        console.log("Value of this radio was: ", radios[i].value);
                        if((i%4)==0){ //sample from quizDatabase.xml: <answer>choiceD</answer>
                            chosenAnswer = "choiceA"
                        }else if((i%4)==1){
                            chosenAnswer = "choiceB"
                        }else if((i%4)==2){
                            chosenAnswer = "choiceC"
                        }else if((i%4)==3){
                            chosenAnswer = "choiceD"
                        }
                        resultArray.push(chosenAnswer);
                        value+=1;
                    }
                }
                if(value==7){
                    quizContainer.innerHTML = ""; //clear content
                    console.log("answerArray is: ", answerArray);
                    console.log("resultArray is: ", resultArray);
                    console.log("tempQuestionArray is: ", tempQuestionArray);
                    console.log("sampleQuestionArray is: ", sampleQuestionArray);
                    console.log("sampleAnswerArray is: ", sampleAnswerArray);
                    var numCorrect = 0;
                    for(i=0; i<sampleAnswerArray.length; i++){
                        if(resultArray[i] == sampleAnswerArray[i]){
                            numCorrect++;
                        }                    
                    }
                    //quizContainer.visibility = "hidden";
                    displayQuiz3Result(numCorrect, sampleAnswerArray.length);
                }else{
                    alert("Please make sure that you attempted all the question!");
                }
            });
  
        }

        
        function displayQuiz1Result(numCorrect, numQues){
            /* console.log("Time to code up the quiz result!"); */
            var percentCorrect = Math.round((numCorrect/numQues)*(100));
            var percentWrong = 100-percentCorrect;
            var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
            var quiz1ResultTitle = document.createElement("h2");
            var quizResultExplanation = document.createElement("p")
            var lineBreak = document.createElement("br");
            if(percentCorrect==100){
                quizResultExplanationTextNode = document.createTextNode("Congrats, you scored 100%!"
                +"\nReview the attempted quiz, if you want!");
            }else{
                quizResultExplanationTextNode = document.createTextNode("You scored "+String(numCorrect)+"/"+String(numQues)+" or "+String(percentCorrect)+"%."
                +"\nPlease review the attempted quiz, with solutions, and the answers you chose.");
            }
            quiz1ResultTitle.appendChild(document.createTextNode("Quiz#1 Result"));
            quizResultExplanation.appendChild(quizResultExplanationTextNode);
            var chartContainer = document.createElement("div");
            chartContainer.className = "chartContainer";
            quiz1ResultContainer.appendChild(quiz1ResultTitle);
            quiz1ResultContainer.appendChild(quizResultExplanation);
            quiz1ResultContainer.appendChild(lineBreak);
            quiz1ResultContainer.appendChild(chartContainer);
            //Below uses CSS tricks to display a progress bar
            chartContainer.style.borderLeft = String((percentCorrect*400)/100)+"px solid green";
            chartContainer.style.width = String(400-((percentCorrect*400)/100))+"px";
/*             console.log("percent correct is: ", percentCorrect);
            console.log("percent wrong is: ", percentWrong); */
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //display sampleQuestionArray, sampleAnswerArray, and
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var comment = document.createElement("p");
                var chosenAnswer = document.createElement("p");
                var actualAnswer = document.createElement("p");
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
                //Initialize the elements with appropriate texts
                var questionTextNode = document.createTextNode("Q"+String(i+1)+". "+sampleQuestionArray[i]);
                if(sampleAnswerArray[i] == resultArray[i]){
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" correctly!");
                }else{
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" incorrectly.");
                }
                if(sampleAnswerArray[i] == "choiceA"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceAArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceB"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceBArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceC"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceCArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceD"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceDArray[i]+".");
                }
                if(resultArray[i] == "choiceA"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceAArray[i]+".");
                }else if(resultArray[i] == "choiceB"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceBArray[i]+".");
                }else if(resultArray[i] == "choiceC"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceCArray[i]+".");
                }else if(resultArray[i] == "choiceD"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceDArray[i]+".");
                }                

                //Insert the text node children into its respective containers
                question.appendChild(questionTextNode);
                comment.appendChild(commentTextNode);
                chosenAnswer.appendChild(chosenAnswerTextNode);
                actualAnswer.appendChild(actualAnswerTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(comment);
                questionContainer.appendChild(chosenAnswer);
                questionContainer.appendChild(actualAnswer);
                
                //Final Step, insert the question container to the quiz container
                //var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
                quiz1ResultContainer.appendChild(questionContainer);
                
                //Scroll Back to Quiz Top
                var logo = document.getElementById("AvenueToQuizLogo");
                logo.scrollIntoView();
            }
            var nextButton = document.createElement("p");
            var nextButtonTextNode = document.createTextNode("Go Next");
            nextButton.appendChild(nextButtonTextNode);
            nextButton.className = "submitQuiz"; //copy styling from submit quiz
            quiz1ResultContainer.appendChild(nextButton);
            nextButton.addEventListener("click", function(event) {
                restartAvenueToQuizMenu(quiz1ResultContainer);
            });
        }
        function displayQuiz2Result(numCorrect, numQues){
            /* console.log("Time to code up the quiz result!"); */
            var percentCorrect = Math.round((numCorrect/numQues)*(100));
            var percentWrong = 100-percentCorrect;
            var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
            var quiz1ResultTitle = document.createElement("h2");
            var quizResultExplanation = document.createElement("p")
            var lineBreak = document.createElement("br");
            if(percentCorrect==100){
                quizResultExplanationTextNode = document.createTextNode("Congrats, you scored 100%!"
                +"\nReview the attempted quiz, if you want!");
            }else{
                quizResultExplanationTextNode = document.createTextNode("You scored "+String(numCorrect)+"/"+String(numQues)+" or "+String(percentCorrect)+"%."
                +"\nPlease review the attempted quiz, with solutions, and the answers you chose.");
            }
            quiz1ResultTitle.appendChild(document.createTextNode("Quiz#2 Result"));
            quizResultExplanation.appendChild(quizResultExplanationTextNode);
            var chartContainer = document.createElement("div");
            chartContainer.className = "chartContainer";
            quiz1ResultContainer.appendChild(quiz1ResultTitle);
            quiz1ResultContainer.appendChild(quizResultExplanation);
            quiz1ResultContainer.appendChild(lineBreak);
            quiz1ResultContainer.appendChild(chartContainer);
            //Below uses CSS tricks to display a progress bar
            chartContainer.style.borderLeft = String((percentCorrect*400)/100)+"px solid green";
            chartContainer.style.width = String(400-((percentCorrect*400)/100))+"px";
/*             console.log("percent correct is: ", percentCorrect);
            console.log("percent wrong is: ", percentWrong); */
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //display sampleQuestionArray, sampleAnswerArray, and
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var comment = document.createElement("p");
                var chosenAnswer = document.createElement("p");
                var actualAnswer = document.createElement("p");
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
                //Initialize the elements with appropriate texts
                var questionTextNode = document.createTextNode("Q"+String(i+1)+". "+sampleQuestionArray[i]);
                if(sampleAnswerArray[i] == resultArray[i]){
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" correctly!");
                }else{
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" incorrectly.");
                }
                if(sampleAnswerArray[i] == "choiceA"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceAArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceB"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceBArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceC"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceCArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceD"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceDArray[i]+".");
                }
                if(resultArray[i] == "choiceA"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceAArray[i]+".");
                }else if(resultArray[i] == "choiceB"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceBArray[i]+".");
                }else if(resultArray[i] == "choiceC"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceCArray[i]+".");
                }else if(resultArray[i] == "choiceD"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceDArray[i]+".");
                }                

                //Insert the text node children into its respective containers
                question.appendChild(questionTextNode);
                comment.appendChild(commentTextNode);
                chosenAnswer.appendChild(chosenAnswerTextNode);
                actualAnswer.appendChild(actualAnswerTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(comment);
                questionContainer.appendChild(chosenAnswer);
                questionContainer.appendChild(actualAnswer);
                
                //Final Step, insert the question container to the quiz container
                //var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
                quiz1ResultContainer.appendChild(questionContainer);
                
                //Scroll Back to Quiz Top
                var logo = document.getElementById("AvenueToQuizLogo");
                logo.scrollIntoView();
            }
            var nextButton = document.createElement("p");
            var nextButtonTextNode = document.createTextNode("Go Next");
            nextButton.appendChild(nextButtonTextNode);
            nextButton.className = "submitQuiz"; //copy styling from submit quiz
            quiz1ResultContainer.appendChild(nextButton);
            nextButton.addEventListener("click", function(event) {
                restartAvenueToQuizMenu(quiz1ResultContainer);
            });
        }
        
        function displayQuiz3Result(numCorrect, numQues){
            /* console.log("Time to code up the quiz result!"); */
            var percentCorrect = Math.round((numCorrect/numQues)*(100));
            var percentWrong = 100-percentCorrect;
            var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
            var quiz1ResultTitle = document.createElement("h2");
            var quizResultExplanation = document.createElement("p")
            var lineBreak = document.createElement("br");
            if(percentCorrect==100){
                quizResultExplanationTextNode = document.createTextNode("Congrats, you scored 100%!"
                +"\nReview the attempted quiz, if you want!");
            }else{
                quizResultExplanationTextNode = document.createTextNode("You scored "+String(numCorrect)+"/"+String(numQues)+" or "+String(percentCorrect)+"%."
                +"\nPlease review the attempted quiz, with solutions, and the answers you chose.");
            }
            quiz1ResultTitle.appendChild(document.createTextNode("Quiz#2 Result"));
            quizResultExplanation.appendChild(quizResultExplanationTextNode);
            var chartContainer = document.createElement("div");
            chartContainer.className = "chartContainer";
            quiz1ResultContainer.appendChild(quiz1ResultTitle);
            quiz1ResultContainer.appendChild(quizResultExplanation);
            quiz1ResultContainer.appendChild(lineBreak);
            quiz1ResultContainer.appendChild(chartContainer);
            //Below uses CSS tricks to display a progress bar
            chartContainer.style.borderLeft = String((percentCorrect*400)/100)+"px solid green";
            chartContainer.style.width = String(400-((percentCorrect*400)/100))+"px";
/*             console.log("percent correct is: ", percentCorrect);
            console.log("percent wrong is: ", percentWrong); */
            for (i = 0; i <7; i++) { //let's just do 7 random questions
                //display sampleQuestionArray, sampleAnswerArray, and
                //Create the HTML elements needed for the quiz
                var questionContainer = document.createElement("div"); //div tag to store the question
                var question = document.createElement("p");
                var comment = document.createElement("p");
                var chosenAnswer = document.createElement("p");
                var actualAnswer = document.createElement("p");
                //Assign values so that extracting value selected in
                //radio button is easy with Javascript
                //Initialize the elements with appropriate texts
                var questionTextNode = document.createTextNode("Q"+String(i+1)+". "+sampleQuestionArray[i]);
                if(sampleAnswerArray[i] == resultArray[i]){
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" correctly!");
                }else{
                    var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" incorrectly.");
                }
                if(sampleAnswerArray[i] == "choiceA"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceAArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceB"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceBArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceC"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceCArray[i]+".");
                }else if(sampleAnswerArray[i] == "choiceD"){
                    var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+choiceDArray[i]+".");
                }
                if(resultArray[i] == "choiceA"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceAArray[i]+".");
                }else if(resultArray[i] == "choiceB"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceBArray[i]+".");
                }else if(resultArray[i] == "choiceC"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceCArray[i]+".");
                }else if(resultArray[i] == "choiceD"){
                    var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+choiceDArray[i]+".");
                }                

                //Insert the text node children into its respective containers
                question.appendChild(questionTextNode);
                comment.appendChild(commentTextNode);
                chosenAnswer.appendChild(chosenAnswerTextNode);
                actualAnswer.appendChild(actualAnswerTextNode);
                //Give Classnames so styling is actually easy
                questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                //Insert the question, radio buttons, and choices into the questionContainer
                questionContainer.appendChild(question);
                questionContainer.appendChild(comment);
                questionContainer.appendChild(chosenAnswer);
                questionContainer.appendChild(actualAnswer);
                
                //Final Step, insert the question container to the quiz container
                //var quiz1ResultContainer = document.getElementsByClassName("QuizContainer")[0];
                quiz1ResultContainer.appendChild(questionContainer);
                
                //Scroll Back to Quiz Top
                var logo = document.getElementById("AvenueToQuizLogo");
                logo.scrollIntoView();
            }
            var nextButton = document.createElement("p");
            var nextButtonTextNode = document.createTextNode("Go Next");
            nextButton.appendChild(nextButtonTextNode);
            nextButton.className = "submitQuiz"; //copy styling from submit quiz
            quiz1ResultContainer.appendChild(nextButton);
            nextButton.addEventListener("click", function(event) {
                restartAvenueToQuizMenu(quiz1ResultContainer);
            });
        }
        function restartAvenueToQuizMenu(quizContainer){
            //After "Next" is acked in displayQuiz1Result(), reset back to home page
            //of AvenueToQuiz
            quizContainer.innerHTML = ""; //clear content
            quizContainer.style.visibility = "hidden";
            //Later do:
            //for (button.Length)
            //document.getElementsByClassName("quizMenu")[i].style.visibility = "visible";
            var updateQuizMenuButtons = document.getElementsByClassName("quizMenu");
            for(i=0; i<updateQuizMenuButtons.length; i++){
                updateQuizMenuButtons[i].style.visibility = "visible";
            }
            // quiz1Button.style.visibility = "visible";
            // quiz2Button.style.visibility = "visible";
            // quiz3Button.style.visibility = "visible";
            pressedQuiz1Flag = false;
            pressedQuiz2Flag = false;
            pressedQuiz3Flag = false;
            tempQuestionArray = [];
            choiceAArray = [];
            choiceBArray = [];
            choiceCArray = [];
            choiceDArray = [];
            answerArray = [];
            sampleQuestionArray = [];
            resultArray = [];
            sampleAnswerArray = [];
            randomQuestionArray = [];
        }
/*         var menuButtons = document.getElementsByClassName("quizMenu");
        for (i = 0; i <menuButtons.length; i++) {
            menuButtons[i].addEventListener("mouseover", function(event) {
                menuButtons[i].style.cursor = "pointer";
            });
        } */
             
        quiz1Button.addEventListener("mouseover", function(event) {
            quiz1Button.style.cursor = "pointer";
        });        
        quiz2Button.addEventListener("mouseover", function(event) {
            quiz2Button.style.cursor = "pointer";
        });        
        quiz3Button.addEventListener("mouseover", function(event) {
            quiz3Button.style.cursor = "pointer";
        });                
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
    //Editing Quiz Logic
    try{
        //Add event listeners for each of the three functionality buttons
        //use dom to adjust accordingly the editMenu
        var editButton1 = document.getElementsByClassName("editMenu")[0];
        var editButton2 = document.getElementsByClassName("editMenu")[1];
        var editButton3 = document.getElementsByClassName("editMenu")[2];
        var editQuizButtonContainer = document.getElementsByClassName("editQuizButtonContainer")[0];
        var editQuizQuestionContainer = document.getElementsByClassName("editQuizQuestionContainer")[0];
        editQuizButtonContainer.innerHTML = "";
        var loadIntoQuestionArray = false;
        var quizList = new Array();
        var editingFlag = false;
        var addChangeButtonFlag = true;
        
        editButton1.addEventListener("click", function(event) {
            //When clicked on, we want to use dom to list
            //the quiz list using the questionArray
            editQuizButtonContainer.innerHTML = "";
            editQuizQuestionContainer.innerHTML = "";
            document.getElementsByClassName("editQuizHeader")[0].innerHTML = "Edit Quiz";
            var xmlIterator = xhttp.responseXML.getElementsByTagName("unit");
            
            if(loadIntoQuestionArray == false){
                loadIntoQuestionArray = ~loadIntoQuestionArray;
                questionArray = [];
                for(i = 0; i<xmlIterator.length; i++) {
                    var temp = new Array();
                    temp.push(xmlIterator[i].getAttribute('quizName')+" Quiz");
                    temp.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                    questionArray.push(temp);
                }
            }
            for(i = 0; i<questionArray.length; i++) {
                quizList.push(questionArray[i][0]);
                if(i==(questionArray.length-1)){ quizList = Array.from(new Set(quizList));} //find only unique entries of quiz names
            }
            
/*          console.log("questionArray is: ", questionArray); */
            console.log("quizList is: ", quizList);
            //var quizNames = document.createElement("p");
            for(i=0;i<quizList.length; i++){
                var quizNames = document.createElement("p");
                console.log("quizList is: ", quizList[i]);
                var quizText = document.createTextNode(quizList[i]);
                console.log("quizNames and quizText is: ", quizNames, quizText);
                quizNames.appendChild(quizText);
                editQuizButtonContainer.appendChild(quizNames);
                quizNames.className = "quizList"; //String(quizList[i]);
            }
            var lineBreak = document.createElement("hr");
            editQuizButtonContainer.appendChild(lineBreak);
            var quizName = document.createElement("h3"); //other quizName instance being used locally
            quizName.className = "quizContextTitle";
            editQuizButtonContainer.appendChild(quizName);
            //add events to these quizNames so that the quiz's data shows up
            //Use closures https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
            //"What you want to do is bind the variable within each 
            //function to a separate, unchanging value outside of the function:"
            //Here add the event listeners using closures so that the appropriate variable
            //values get associated with the correct elements (not i = n for every element)
            var closureArray = [];
            var quizNamesElem = document.getElementsByClassName("quizList");
            
            function createEventFunc(i) {
                //Appropriate i context given, bind the addEvent
                //Creates one question editor at the moment
                //How the quiz editor works:
                //if true filter out tempArray using deleteArray
                //if not, then reject the request and alert the user invalid request
                //Find all entries of quizContextName in questionArray and delete it,
                //then add tempArray
                //After addEventListener for this quizContextName in the "Try Quiz" tab,
                //this eventListener would replicate the automatic grading process for 
                //the previous quizzes implemented before
                console.log("quizNamesElem[i] is: ", quizNamesElem[i]);
                quizNamesElem[i].addEventListener("click", function(event) {
                    //Load the Quiz Questions and display them
                    if(editingFlag==false){
                    var removeOldQuestions = document.getElementsByClassName("questionContainer");
     
                    var quizContextName = quizNamesElem[i].innerHTML;
                    if(quizContextName == "unit1 Quiz" || quizContextName == "unit2 Quiz" || quizContextName == "unit3 Quiz"){
                        return;
                    }
                    // var formInitialized = false;
                    console.log("My i value is: ", i);
                    console.log("Currently Editing Quiz: ", quizContextName);
                    var quizQuesArray = new Array();
                    var quizName = document.getElementsByClassName("quizContextTitle")[0];
                    quizName.innerHTML = "Editing Quiz: "+quizContextName;
                    for(i=0; i<questionArray.length; i++){ //store all relevant quiz questions here
                        if(questionArray[i][0] == quizContextName){ //quizNamesElem[i] quizContextName "unit1 Quiz"
                            quizQuesArray.push(questionArray[i]);
                        }
                    }
                    }
                    if(editingFlag==true){
                        alert("Please finish editing the current quiz!");
                    }else if(quizQuesArray.length == 0){ //aka just created quiz
                        editingFlag=true;
                        //If empty, force user to create 7 questions
                        alert("Quiz is empty add questions!");
                        if(removeOldQuestions!=null){
                            for(i=0; i<removeOldQuestions.length; i++){
                                editQuizQuestionContainer.removeChild(removeOldQuestions[i])
                            }
                        }                        
                        for(i = 0; i<7; i++) {
                            var quizQuestionDiv = document.createElement("div");
                            var quizName = document.createElement("h3"); //other quizName instance being used locally
                            var quesText = document.createElement("p");
                            var choiceAText = document.createElement("p");
                            var choiceBText = document.createElement("p");
                            var choiceCText = document.createElement("p");
                            var choiceDText = document.createElement("p");
                            var answerText = document.createElement("p");
                            
                            var quizQuestion = document.createElement("input");
                            var confirmDel = document.createElement("p");
                            var deleteOption = document.createElement("input");
                            var choiceA = document.createElement("input");
                            var choiceB = document.createElement("input");
                            var choiceC = document.createElement("input");
                            var choiceD = document.createElement("input");
                            var answer = document.createElement("select");
                            deleteOption.setAttribute("type", "checkbox");
                            choiceA.setAttribute("type", "text");
                            choiceB.setAttribute("type", "text");
                            choiceC.setAttribute("type", "text");
                            choiceD.setAttribute("type", "text");
                            //answer.setAttribute("type", "select");
                            var a = document.createElement("option");
                            a.text = "choiceA";
                            var b = document.createElement("option");
                            b.text = "choiceB";
                            var c = document.createElement("option");
                            c.text = "choiceC";
                            var d = document.createElement("option");
                            d.text = "choiceD";
                            answer.add(a);
                            answer.add(b);
                            answer.add(c);
                            answer.add(d);
                            choiceA.placeholder = "Insert choiceA answer here";//"choiceA placeholder";
                            choiceB.placeholder = "Insert choiceB answer here";//"choiceB placeholder";
                            choiceC.placeholder = "Insert choiceC answer here";//"choiceC placeholder";
                            choiceD.placeholder = "Insert choiceD answer here";//"choiceD placeholder";
                            answer.placeholder = "Insert question answer here";//"answer placeholder";
                            quizQuestion.placeholder = "Insert question here";
                            quizQuestionDiv.className = "questionContainer"
                            
                            confirmDel.className = "confirmDelete";
                            deleteOption.className = "deleteQuizOption";
                            quizQuestion.className = "editQuizQuestion quesValue";
                            choiceA.className = "editQuizChoices choiceAValue";
                            choiceB.className = "editQuizChoices choiceBValue";
                            choiceC.className = "editQuizChoices choiceCValue";
                            choiceD.className = "editQuizChoices choiceDValue";
                            answer.className = "editQuizChoices ansValue";
                            
                            quesText.className = "editQuizTexts";
                            choiceAText.className = "editQuizTexts";
                            choiceBText.className = "editQuizTexts";
                            choiceCText.className = "editQuizTexts";
                            choiceDText.className = "editQuizTexts";
                            answerText.className = "editQuizTexts";                       
                            
                            
                            confirmDel.appendChild(document.createTextNode("Delete this question?"));
                            quesText.appendChild(document.createTextNode("Question "+String(i+1)+". "));
                            choiceAText.appendChild(document.createTextNode("a) "));
                            choiceBText.appendChild(document.createTextNode("b) "));
                            choiceCText.appendChild(document.createTextNode("c) "));
                            choiceDText.appendChild(document.createTextNode("d) "));
                            answerText.appendChild(document.createTextNode("Select Answer: "));
                            
                            quizQuestionDiv.appendChild(quizName);
                            quizQuestionDiv.appendChild(quesText);
                            quizQuestionDiv.appendChild(quizQuestion);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(confirmDel);
                            quizQuestionDiv.appendChild(deleteOption);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceAText);
                            quizQuestionDiv.appendChild(choiceA);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceBText);
                            quizQuestionDiv.appendChild(choiceB);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceCText);
                            quizQuestionDiv.appendChild(choiceC);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceDText);
                            quizQuestionDiv.appendChild(choiceD);
                            quizQuestionDiv.appendChild(answerText);
                            quizQuestionDiv.appendChild(answer);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            var quesButtonText = document.createTextNode("Add a new question.");
                            var addQuesButton = document.createElement("p");
                            addQuesButton.appendChild(quesButtonText);
                            quizQuestionDiv.appendChild(addQuesButton);
                            addQuesButton.className = "addQuestion";
                            editQuizButtonContainer.appendChild(quizQuestionDiv);
                        }
                    }else{ //if the quiz was already created (if(quizQuestion.length>6))
                        // formInitialized = true;
                        editingFlag=true;
                        console.log("quizQuesArray is: ", quizQuesArray);
                        for(i = 0; i<quizQuesArray.length; i++) {
                            var quizQuestionDiv = document.createElement("div");
                            var quizName = document.createElement("h3"); //other quizName instance being used locally
                            var quesText = document.createElement("p");
                            var choiceAText = document.createElement("p");
                            var choiceBText = document.createElement("p");
                            var choiceCText = document.createElement("p");
                            var choiceDText = document.createElement("p");
                            var answerText = document.createElement("p");
                            
                            var quizQuestion = document.createElement("input");
                            var confirmDel = document.createElement("p");
                            var deleteOption = document.createElement("input");
                            var choiceA = document.createElement("input");
                            var choiceB = document.createElement("input");
                            var choiceC = document.createElement("input");
                            var choiceD = document.createElement("input");
                            var answer = document.createElement("select");
                            deleteOption.setAttribute("type", "checkbox");
                            choiceA.setAttribute("type", "text");
                            choiceB.setAttribute("type", "text");
                            choiceC.setAttribute("type", "text");
                            choiceD.setAttribute("type", "text");
                            // answer.setAttribute("type", "select");
                            var a = document.createElement("option");
                            a.text = "choiceA";
                            var b = document.createElement("option");
                            b.text = "choiceB";
                            var c = document.createElement("option");
                            c.text = "choiceC";
                            var d = document.createElement("option");
                            d.text = "choiceD";
                            answer.add(a);
                            answer.add(b);
                            answer.add(c);
                            answer.add(d);
                            choiceA.placeholder = quizQuesArray[i][2];//"choiceA placeholder";
                            choiceB.placeholder = quizQuesArray[i][3];//"choiceB placeholder";
                            choiceC.placeholder = quizQuesArray[i][4];//"choiceC placeholder";
                            choiceD.placeholder = quizQuesArray[i][5];//"choiceD placeholder";
                            answer.value = quizQuesArray[i][6];//"answer placeholder";
                            quizQuestion.placeholder = quizQuesArray[i][1];
                            choiceA.value = quizQuesArray[i][2];//"choiceA placeholder";
                            choiceB.value = quizQuesArray[i][3];//"choiceB placeholder";
                            choiceC.value = quizQuesArray[i][4];//"choiceC placeholder";
                            choiceD.value = quizQuesArray[i][5];//"choiceD placeholder";
                            answer.value = quizQuesArray[i][6];//"answer placeholder";
                            quizQuestion.value = quizQuesArray[i][1];
                            quizQuestionDiv.className = "questionContainer"
                            confirmDel.className = "confirmDelete";
                            deleteOption.className = "deleteQuizOption";
                            quizQuestion.className = "editQuizQuestion quesValue";
                            choiceA.className = "editQuizChoices choiceAValue";
                            choiceB.className = "editQuizChoices choiceBValue";
                            choiceC.className = "editQuizChoices choiceCValue";
                            choiceD.className = "editQuizChoices choiceDValue";
                            answer.className = "editQuizChoices ansValue";
                            quesText.className = "editQuizTexts";
                            choiceAText.className = "editQuizTexts";
                            choiceBText.className = "editQuizTexts";
                            choiceCText.className = "editQuizTexts";
                            choiceDText.className = "editQuizTexts";
                            answerText.className = "editQuizTexts";                       
                            
                            
                            confirmDel.appendChild(document.createTextNode("Delete this question?"));
                            quesText.appendChild(document.createTextNode("Question "+String(i+1)+". "));
                            choiceAText.appendChild(document.createTextNode("a) "));
                            choiceBText.appendChild(document.createTextNode("b) "));
                            choiceCText.appendChild(document.createTextNode("c) "));
                            choiceDText.appendChild(document.createTextNode("d) "));
                            answerText.appendChild(document.createTextNode("Select Answer: "));
                            
                            quizQuestionDiv.appendChild(quizName);
                            quizQuestionDiv.appendChild(quesText);
                            quizQuestionDiv.appendChild(quizQuestion);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(confirmDel);
                            quizQuestionDiv.appendChild(deleteOption);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceAText);
                            quizQuestionDiv.appendChild(choiceA);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceBText);
                            quizQuestionDiv.appendChild(choiceB);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceCText);
                            quizQuestionDiv.appendChild(choiceC);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            quizQuestionDiv.appendChild(choiceDText);
                            quizQuestionDiv.appendChild(choiceD);
                            quizQuestionDiv.appendChild(answerText);
                            quizQuestionDiv.appendChild(answer);
                            quizQuestionDiv.appendChild(document.createElement("br"));
                            var quesButtonText = document.createTextNode("Add a new question.");
                            var addQuesButton = document.createElement("p");
                            addQuesButton.appendChild(quesButtonText);
                            quizQuestionDiv.appendChild(addQuesButton);
                            addQuesButton.className = "addQuestion";
                            editQuizButtonContainer.appendChild(quizQuestionDiv);
                        }
                    }
                    //Add event for "Add Question" buttons"
                    var addQuestionEvent = document.getElementsByClassName("addQuestion");
                    var addQuestionEventFunc = function(){
                        //find length of the quiz, and append to quiz.length+1 location
                        //through appendChild nextSibling etc
                        //update quiz.Length++
                        var attribute = this.getAttribute("data-myattribute");
                        var classNommy = this.className;
                        var quizQuesContainers = document.getElementsByClassName("questionContainer");
                        alert("Added new question form below!");//quizQuesContainers.length);
                        var quizQuestionDiv = document.createElement("div");
                        var quizName = document.createElement("h3"); //other quizName instance being used locally
                        var quesText = document.createElement("p");
                        var choiceAText = document.createElement("p");
                        var choiceBText = document.createElement("p");
                        var choiceCText = document.createElement("p");
                        var choiceDText = document.createElement("p");
                        var answerText = document.createElement("p");
                        
                        var quizQuestion = document.createElement("input");
                        var confirmDel = document.createElement("p");
                        var deleteOption = document.createElement("input");
                        var choiceA = document.createElement("input");
                        var choiceB = document.createElement("input");
                        var choiceC = document.createElement("input");
                        var choiceD = document.createElement("input");
                        var answer = document.createElement("select");
                        deleteOption.setAttribute("type", "checkbox");
                        choiceA.setAttribute("type", "text");
                        choiceB.setAttribute("type", "text");
                        choiceC.setAttribute("type", "text");
                        choiceD.setAttribute("type", "text");
                        //answer.setAttribute("type", "select");
                        var a = document.createElement("option");
                        a.text = "choiceA";
                        var b = document.createElement("option");
                        b.text = "choiceB";
                        var c = document.createElement("option");
                        c.text = "choiceC";
                        var d = document.createElement("option");
                        d.text = "choiceD";
                        answer.add(a);
                        answer.add(b);
                        answer.add(c);
                        answer.add(d);
                        choiceA.placeholder = "Insert choiceA answer here";//"choiceA placeholder";
                        choiceB.placeholder = "Insert choiceB answer here";//"choiceB placeholder";
                        choiceC.placeholder = "Insert choiceC answer here";//"choiceC placeholder";
                        choiceD.placeholder = "Insert choiceD answer here";//"choiceD placeholder";
                        answer.placeholder = "Insert question answer here";//"answer placeholder";
                        quizQuestion.placeholder = "Insert question here";
                        quizQuestionDiv.className = "questionContainer"
                        
                        confirmDel.className = "confirmDelete";
                        deleteOption.className = "deleteQuizOption";
                        quizQuestion.className = "editQuizQuestion quesValue";
                        choiceA.className = "editQuizChoices choiceAValue";
                        choiceB.className = "editQuizChoices choiceBValue";
                        choiceC.className = "editQuizChoices choiceCValue";
                        choiceD.className = "editQuizChoices choiceDValue";
                        answer.className = "editQuizChoices ansValue";
                        
                        quesText.className = "editQuizTexts";
                        choiceAText.className = "editQuizTexts";
                        choiceBText.className = "editQuizTexts";
                        choiceCText.className = "editQuizTexts";
                        choiceDText.className = "editQuizTexts";
                        answerText.className = "editQuizTexts";                       
                        
                        
                        confirmDel.appendChild(document.createTextNode("Delete this question?"));
                        quesText.appendChild(document.createTextNode("Question "+String(quizQuesContainers.length+1)+". "));
                        choiceAText.appendChild(document.createTextNode("a) "));
                        choiceBText.appendChild(document.createTextNode("b) "));
                        choiceCText.appendChild(document.createTextNode("c) "));
                        choiceDText.appendChild(document.createTextNode("d) "));
                        answerText.appendChild(document.createTextNode("Select Answer: "));
                        
                        quizQuestionDiv.appendChild(quizName);
                        quizQuestionDiv.appendChild(quesText);
                        quizQuestionDiv.appendChild(quizQuestion);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        quizQuestionDiv.appendChild(confirmDel);
                        quizQuestionDiv.appendChild(deleteOption);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        quizQuestionDiv.appendChild(choiceAText);
                        quizQuestionDiv.appendChild(choiceA);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        quizQuestionDiv.appendChild(choiceBText);
                        quizQuestionDiv.appendChild(choiceB);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        quizQuestionDiv.appendChild(choiceCText);
                        quizQuestionDiv.appendChild(choiceC);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        quizQuestionDiv.appendChild(choiceDText);
                        quizQuestionDiv.appendChild(choiceD);
                        quizQuestionDiv.appendChild(answerText);
                        quizQuestionDiv.appendChild(answer);
                        quizQuestionDiv.appendChild(document.createElement("br"));
                        var quesButtonText = document.createTextNode("Add a new question.");
                        var addQuesButton = document.createElement("p");
                        addQuesButton.appendChild(quesButtonText);
                        quizQuestionDiv.appendChild(addQuesButton);
                        addQuesButton.className = "addQuestion";
                        //editQuizButtonContainer.appendChild(quizQuestionDiv);
                        //Add after last questionDiv container, not at end of editQuizButtonContainer
                        var lastQuesNode = quizQuesContainers[quizQuesContainers.length-1];
                        lastQuesNode.parentNode.insertBefore(quizQuestionDiv, lastQuesNode.nextSibling);
                        for(var k = 0; k<addQuestionEvent.length; k++){
                            addQuestionEvent[k].addEventListener("click", addQuestionEventFunc, false);
                        }
                    }
                    if(editingFlag=true){
                        for(var k = 0; k<addQuestionEvent.length; k++){
                            addQuestionEvent[k].addEventListener("click", addQuestionEventFunc, false);
                        }
                    
                    if(addChangeButtonFlag==true){
                    addChangeButtonFlag=false;
                    var changeButton = document.createElement("p");
                    changeButton.appendChild(document.createTextNode("Change Quiz"));
                    changeButton.className = "editStyles";

                    changeButton.addEventListener("click",function(event) {
                        //alert("You clicked changeButton!!!");
                        //Store all the results into the global questionArray
                        var contextQuesCount = 0;
                        var tempArray = new Array();  // contains all question for the given quizContextName
                        var deleteArray = new Array(); //check if any question needs to be deleted
                        var numToDelete = 0;
                        var deleteQuizOption = document.getElementsByClassName("deleteQuizOption");
                        var quesValue = document.getElementsByClassName("quesValue");
                        var ansValue = document.getElementsByClassName("ansValue");
                        var choiceAValue = document.getElementsByClassName("choiceAValue");
                        var choiceBValue = document.getElementsByClassName("choiceBValue");
                        var choiceCValue = document.getElementsByClassName("choiceCValue");
                        var choiceDValue = document.getElementsByClassName("choiceDValue");
                        var ansValue = document.getElementsByClassName("ansValue");
                        console.log("Displaying data - Form Data");
                        console.log("quizContextName is: ", quizContextName);
                        console.log(quesValue[0].value); //quesValue[0].innerHTML does not work
                        console.log(ansValue[0].value);
                        console.log(choiceAValue[0].value);
                        console.log(choiceBValue[0].value);
                        console.log(choiceCValue[0].value);
                        console.log(choiceDValue[0].value);
                        console.log(ansValue[0].value);
                        //Determine if total ques # - deleteArray.length (containing true) > 6,
                        contextQuesCount = quesValue.length;
                        // for(i=0; i<questionArray.length; i++){
                            // if(questionArray[i][0]==quizContextName){
                                // contextQuesCount++;
                            // }
                        // }
                        // if(contextQuesCount==0){
                            // contextQuesCount = quesValue.length;
                        // }
                        for(i=0; i<deleteQuizOption.length; i++){
                            deleteArray.push(deleteQuizOption[i].checked);
                            if(deleteQuizOption[i].checked){
                                numToDelete++;
                            }
                        }
                        console.log("quesValue.length is: ", quesValue.length);
                        for(i=0; i<contextQuesCount; i++){
                            tempArray.push(quesValue[i].value);
                            tempArray.push(choiceAValue[i].value);
                            tempArray.push(choiceBValue[i].value);
                            tempArray.push(choiceCValue[i].value);
                            tempArray.push(choiceDValue[i].value);
                            tempArray.push(ansValue[i].value);                        
                        }
                        var formFilled = false;
                        if(tempArray.includes("")==false){
                            formFilled = true;
                        }
                        console.log("deleteArray is: ", deleteArray);
                        console.log("tempArray is: ", tempArray);
                        tempArray = [];
                        if(((contextQuesCount-numToDelete)>6)&&formFilled){ //Enough filled questions provided
                            //alert("Enough filled questions!");
                            //Filter out the requested questions to be deleted
                            //console.log("questionArray.length :", questionArray.length);
                            console.log("****************Changing quiz now******************");
                            console.log("questionArray.length :", questionArray.length);
                            console.log("questionArray :", questionArray);
                            //Why reverse order fixes it https://stackoverflow.com/questions/42450017/why-does-the-last-element-of-my-array-return-undefined-rather-than-splicing-it
                            for(i=questionArray.length-1; i>-1; i--){ //for(i=questionArray.length-1; i>-1; i--)for(i=0; i<questionArray.length; i++)
                                if(questionArray[i][0]==quizContextName){
                                    questionArray.splice(i,7); //remove the array from questionArray, will put back later
                                }
                            }
                            console.log("spliced questionArray.length :", questionArray.length);
                            console.log("spliced questionArray :", questionArray);
                            console.log("contextQuesCount :", contextQuesCount);
                            //Save the user input data into questionArray appropriately
                            for(i=0; i<contextQuesCount; i++){
                                if(deleteArray[i]==false){ //if it is not to be deleted, insert it
                                    tempArray.push(quizContextName);
                                    tempArray.push(quesValue[i].value);
                                    tempArray.push(choiceAValue[i].value);
                                    tempArray.push(choiceBValue[i].value);
                                    tempArray.push(choiceCValue[i].value);
                                    tempArray.push(choiceDValue[i].value);
                                    tempArray.push(ansValue[i].value);
                                    questionArray.push(tempArray);
                                    tempArray = [];
                                }
                            }
                            console.log("questionArray.length :", questionArray.length);
                            console.log("questionArray :", questionArray);
                            console.log("questionArray :", questionArray);
                            editQuizButtonContainer.innerHTML = "";
                            editQuizQuestionContainer.innerHTML = "";
                            console.log("****************Changed quiz now******************");
                            editingFlag=false; //done editing
                            addChangeButtonFlag=true;
                            
                            //Here we want to apply the changes above to the quizMenu button
                            //in the "Try Quiz" section. Basically implement system to 
                            //autograde the newly made quizzes.
                            
                            //Search for the appropriate quizMenu button
                            var implementQuizSys = document.getElementsByClassName("quizMenu");
                            var quizContextIndex = 0;
                            for(i=0; i<implementQuizSys.length; i++){
                                if(implementQuizSys[i].innerHTML == quizContextName){
                                    quizContextIndex = i;
                                }
                            }
                            console.log("quizContextIndex is: ", quizContextIndex);
                            implementQuizSys[quizContextIndex].addEventListener("click", function(event) {
                                    //alert("You found me yay!");
                                    var updateQuizMenuButtons = document.getElementsByClassName("quizMenu");
                                    for(i=0; i<updateQuizMenuButtons.length; i++){
                                        if(updateQuizMenuButtons[i].innerHTML!=quizContextName){
                                            updateQuizMenuButtons[i].style.visibility = "hidden";
                                        }
                                    }
                                    console.log("randomQuestionArray :", randomQuestionArray);
                                    var contextQuizList = new Array();
                                    for(i=questionArray.length-1; i>-1; i--){ //for(i=questionArray.length-1; i>-1; i--)for(i=0; i<questionArray.length; i++)
                                        if(questionArray[i][0]==quizContextName){
                                            contextQuizList.push(questionArray[i]); //initialize contextQuizList
                                        }
                                    }                   
                                    console.log("contextQuizList :", contextQuizList);                                
                                    while(randomQuestionArray.length < 7){ //7 random questions
                                        var randomNumber = Math.floor(Math.random() * (contextQuizList.length)); //a number from 0 to x.length-1 (x.length elements)
                                        if((randomQuestionArray.includes(randomNumber))==false){
                                            randomQuestionArray.push(randomNumber);
                                        }
                                    }
                                    console.log("randomQuestionArray :", randomQuestionArray);
                                    //Insert Quiz Title
                                    var quizTitle = document.createElement("h2");
                                    var quizTitleTextNode = document.createTextNode(String(quizContextName)); //quizContextName
                                    quizTitle.appendChild(quizTitleTextNode);
                                    quizTitle.className = "quizTitle";
                                    var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                                    quizContainer.style.visibility = "visible";
                                    quizContainer.appendChild(quizTitle);
                                    for (i = 0; i <7; i++) { //let's just do 7 random questions
                                        //Create the HTML elements needed for the quiz
                                        var questionContainer = document.createElement("div"); //div tag to store the question
                                        var question = document.createElement("p");
                                        var radioA = document.createElement("input");
                                        var choiceA = document.createElement("p");
                                        var radioB = document.createElement("input");
                                        var choiceB = document.createElement("p");
                                        var radioC = document.createElement("input");
                                        var choiceC = document.createElement("p");
                                        var radioD = document.createElement("input");
                                        var choiceD = document.createElement("p");
                                        radioA.setAttribute("type", "radio");
                                        radioB.setAttribute("type", "radio");
                                        radioC.setAttribute("type", "radio");
                                        radioD.setAttribute("type", "radio");
                                        //so that the radio input for the class is grouped
                                        radioA.name = quizContextName+"_QuesChoice"+String(i+1);
                                        radioB.name = quizContextName+"_QuesChoice"+String(i+1);
                                        radioC.name = quizContextName+"_QuesChoice"+String(i+1);
                                        radioD.name = quizContextName+"_QuesChoice"+String(i+1);
                                        sampleQuestionArray.push(String(contextQuizList[randomQuestionArray[i]][1])); //will store user's attempted questions (the 7 questions)
                                        sampleAnswerArray.push(String(contextQuizList[randomQuestionArray[i]][6])); //will store user's solution (the 7 solutions)
                                        var questionTextNode = document.createTextNode(String(i+1)+". "+contextQuizList[randomQuestionArray[i]][1]);
                                        var choiceATextNode = document.createTextNode(contextQuizList[randomQuestionArray[i]][2]);
                                        var choiceBTextNode = document.createTextNode(contextQuizList[randomQuestionArray[i]][3]);
                                        var choiceCTextNode = document.createTextNode(contextQuizList[randomQuestionArray[i]][4]);
                                        var choiceDTextNode = document.createTextNode(contextQuizList[randomQuestionArray[i]][5]); //[6] is the choiceA etc answer
                                        //Insert the text node children into its respective containers
                                        quizTitle.appendChild(quizTitleTextNode);
                                        question.appendChild(questionTextNode);
                                        choiceA.appendChild(choiceATextNode);
                                        choiceB.appendChild(choiceBTextNode);
                                        choiceC.appendChild(choiceCTextNode);
                                        choiceD.appendChild(choiceDTextNode);
                                        //Give Classnames so styling is actually easy
                                        questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                                        choiceA.className = "choiceA";
                                        choiceB.className = "choiceB";
                                        choiceC.className = "choiceC";
                                        choiceD.className = "choiceD";
                                        //Insert the question, radio buttons, and choices into the questionContainer
                                        questionContainer.appendChild(question);
                                        questionContainer.appendChild(radioA);
                                        questionContainer.appendChild(choiceA);
                                        questionContainer.appendChild(radioB);
                                        questionContainer.appendChild(choiceB);
                                        questionContainer.appendChild(radioC);
                                        questionContainer.appendChild(choiceC);
                                        questionContainer.appendChild(radioD);
                                        questionContainer.appendChild(choiceD);
                                        
                                        //Final Step, insert the question container to the quiz container
                                        //var quizContainer = document.getElementsByClassName("QuizContainer")[0];
                                        quizContainer.appendChild(questionContainer);
                                        
                                    }
                                    //Insert the Submit button!
                                    var submitQuizButton = document.createElement("p");
                                    var submitQuizButtonTextNode = document.createTextNode("Submit Quiz "+quizContextName);
                                    submitQuizButton.appendChild(submitQuizButtonTextNode);
                                    submitQuizButton.className = "submitQuiz"; //every time we clear this div container, this element will disappear
                                                                            //hence we will always refer submitQuizButton[0]
                                    quizContainer.appendChild(submitQuizButton);

                                    //Submit Button Exists so add event listener
                                    submitQuizButton.addEventListener("click", function(event) {
                                        //Verify whether all questions were attempted or not
                                        var radios = document.getElementsByTagName('input');
                                        var value = 0;
                                        var chosenAnswer;
                                        console.log("radio.length was: ", radios.length);
                                        for (var i = 0; i < radios.length; i++) {
                                            if (radios[i].type === 'radio' && radios[i].checked) {
                                                // get value, set checked flag or do whatever you need to
                                                //value = radios[i].value;
                                                console.log("Value of this radio was: ", radios[i].value);
                                                if((i%4)==0){ //sample from quizDatabase.xml: <answer>choiceD</answer>
                                                    chosenAnswer = "choiceA"
                                                }else if((i%4)==1){
                                                    chosenAnswer = "choiceB"
                                                }else if((i%4)==2){
                                                    chosenAnswer = "choiceC"
                                                }else if((i%4)==3){
                                                    chosenAnswer = "choiceD"
                                                }
                                                resultArray.push(chosenAnswer);
                                                value+=1;
                                            }
                                        }
                                        if(value==7){
                                            quizContainer.innerHTML = ""; //clear content
                                            console.log("answerArray is: ", answerArray);
                                            console.log("resultArray is: ", resultArray);
                                            console.log("tempQuestionArray is: ", tempQuestionArray);
                                            console.log("sampleQuestionArray is: ", sampleQuestionArray);
                                            console.log("sampleAnswerArray is: ", sampleAnswerArray);
                                            var numCorrect = 0;
                                            for(i=0; i<sampleAnswerArray.length; i++){
                                                if(resultArray[i] == sampleAnswerArray[i]){
                                                    numCorrect++;
                                                }                    
                                            }
                                            //quizContainer.visibility = "hidden";
                                            displayQuizResult(numCorrect, sampleAnswerArray.length);
                                        }else{
                                            alert("Please make sure that you attempted all the question!");
                                        }
                                });
                                function displayQuizResult(numCorrect, numQues){
                                    /* console.log("Time to code up the quiz result!"); */
                                    var percentCorrect = Math.round((numCorrect/numQues)*(100));
                                    var percentWrong = 100-percentCorrect;
                                    var quizResultContainer = document.getElementsByClassName("QuizContainer")[0];
                                    var quiz1ResultTitle = document.createElement("h2");
                                    var quizResultExplanation = document.createElement("p")
                                    var lineBreak = document.createElement("br");
                                    if(percentCorrect==100){
                                        quizResultExplanationTextNode = document.createTextNode("Congrats, you scored 100%!"
                                        +"\nReview the attempted quiz, if you want!");
                                    }else{
                                        quizResultExplanationTextNode = document.createTextNode("You scored "+String(numCorrect)+"/"+String(numQues)+" or "+String(percentCorrect)+"%."
                                        +"\nPlease review the attempted quiz, with solutions, and the answers you chose.");
                                    }
                                    quiz1ResultTitle.appendChild(document.createTextNode('Quiz "'+quizContextName+'" Result'));
                                    quizResultExplanation.appendChild(quizResultExplanationTextNode);
                                    var chartContainer = document.createElement("div");
                                    chartContainer.className = "chartContainer";
                                    quizResultContainer.appendChild(quiz1ResultTitle);
                                    quizResultContainer.appendChild(quizResultExplanation);
                                    quizResultContainer.appendChild(lineBreak);
                                    quizResultContainer.appendChild(chartContainer);
                                    //Below uses CSS tricks to display a progress bar
                                    chartContainer.style.borderLeft = String((percentCorrect*400)/100)+"px solid green";
                                    chartContainer.style.width = String(400-((percentCorrect*400)/100))+"px";
                        /*             console.log("percent correct is: ", percentCorrect);
                                    console.log("percent wrong is: ", percentWrong); */
                                    for (i = 0; i <7; i++) { //let's just do 7 random questions
                                        //display sampleQuestionArray, sampleAnswerArray, and
                                        //Create the HTML elements needed for the quiz
                                        var questionContainer = document.createElement("div"); //div tag to store the question
                                        var question = document.createElement("p");
                                        var comment = document.createElement("p");
                                        var chosenAnswer = document.createElement("p");
                                        var actualAnswer = document.createElement("p");
                                        //Assign values so that extracting value selected in
                                        //radio button is easy with Javascript
                                        //Initialize the elements with appropriate texts
                                        var questionTextNode = document.createTextNode("Q"+String(i+1)+". "+sampleQuestionArray[i]);
                                        if(sampleAnswerArray[i] == resultArray[i]){
                                            var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" correctly!");
                                        }else{
                                            var commentTextNode = document.createTextNode("You answered question "+String(i+1)+" incorrectly.");
                                        }
                                        if(sampleAnswerArray[i] == "choiceA"){
                                            var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+contextQuizList[randomQuestionArray[i]][2]+".");
                                        }else if(sampleAnswerArray[i] == "choiceB"){
                                            var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+contextQuizList[randomQuestionArray[i]][3]+".");
                                        }else if(sampleAnswerArray[i] == "choiceC"){
                                            var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+contextQuizList[randomQuestionArray[i]][4]+".");
                                        }else if(sampleAnswerArray[i] == "choiceD"){
                                            var chosenAnswerTextNode = document.createTextNode("Your answer: "+sampleAnswerArray[i]+" - "+contextQuizList[randomQuestionArray[i]][5]+".");
                                        }
                                        if(resultArray[i] == "choiceA"){
                                            var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+contextQuizList[randomQuestionArray[i]][2]+".");
                                        }else if(resultArray[i] == "choiceB"){
                                            var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+contextQuizList[randomQuestionArray[i]][3]+".");
                                        }else if(resultArray[i] == "choiceC"){
                                            var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+contextQuizList[randomQuestionArray[i]][4]+".");
                                        }else if(resultArray[i] == "choiceD"){
                                            var actualAnswerTextNode = document.createTextNode("Quiz Solution is: "+resultArray[i]+" - "+contextQuizList[randomQuestionArray[i]][5]+".");
                                        }                

                                        //Insert the text node children into its respective containers
                                        question.appendChild(questionTextNode);
                                        comment.appendChild(commentTextNode);
                                        chosenAnswer.appendChild(chosenAnswerTextNode);
                                        actualAnswer.appendChild(actualAnswerTextNode);
                                        //Give Classnames so styling is actually easy
                                        questionContainer.className = "questionContainer";//+quizQuestions+str(i); //give two class name
                                        //Insert the question, radio buttons, and choices into the questionContainer
                                        questionContainer.appendChild(question);
                                        questionContainer.appendChild(comment);
                                        questionContainer.appendChild(chosenAnswer);
                                        questionContainer.appendChild(actualAnswer);
                                        
                                        //Final Step, insert the question container to the quiz container
                                        //var quizResultContainer = document.getElementsByClassName("QuizContainer")[0];
                                        quizResultContainer.appendChild(questionContainer);
                                        
                                        //Scroll Back to Quiz Top
                                        var logo = document.getElementById("AvenueToQuizLogo");
                                        logo.scrollIntoView();
                                    }
                                    var nextButton = document.createElement("p");
                                    var nextButtonTextNode = document.createTextNode("Go Next");
                                    nextButton.appendChild(nextButtonTextNode);
                                    nextButton.className = "submitQuiz"; //copy styling from submit quiz
                                    quizResultContainer.appendChild(nextButton);
                                    nextButton.addEventListener("click", function(event) {
                                        restartAvenueToQuizMenu(quizResultContainer);
                                    });
                                }                                
                                 
                            });
                        }else{ //Not enough filled questions provided
                            alert("Please make sure all inputs are filled and you complete 7 questions!");
                        }

                    });
                    /* changeButton.style.marginLeft = "300px"; */
                    editQuizButtonContainer.appendChild(changeButton);
                    }
                    }
                });                
                return function() { console.log("My value: " + i); };
                //console.log("quizNamesElem[i] is: ", quizNamesElem[i]);
            }
            
            for (var i = 0; i < quizList.length; i++) {
                closureArray[i] = createEventFunc(i);
            }

            for (var j = 0; j < quizList.length; j++) {
                closureArray[j]();                        // and now let's run each one to see
            }            
            //To do:
            //Collect all quiz names, display all quiz names, make the names a link which opens
            //an editor for that selected quiz name, once displayed make sure has
            //+ and - buttons to add or remove questions or go next
            //randomText.appendChild(document.createTextNode("Quiz#1"));   
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        });
        editButton2.addEventListener("click", function(event) {
            //When clicked on, we want to use dom to list
            //the quiz list using the questionArray
            editingFlag = false;
            addChangeButtonFlag = true;
            editQuizButtonContainer.innerHTML = "";
            editQuizQuestionContainer.innerHTML = "";
            document.getElementsByClassName("editQuizHeader")[0].innerHTML = "Create Quiz";
            var xmlIterator = xhttp.responseXML.getElementsByTagName("unit");
            
            if(loadIntoQuestionArray == false){
                loadIntoQuestionArray = ~loadIntoQuestionArray;
                questionArray = [];
                for(i = 0; i<xmlIterator.length; i++) {
                    var temp = new Array();
                    temp.push(xmlIterator[i].getAttribute('quizName')+" Quiz");
                    temp.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                    questionArray.push(temp);
                }
            }
            for(i = 0; i<questionArray.length; i++) {
                quizList.push(questionArray[i][0]);
                if(i==(questionArray.length-1)){ quizList = Array.from(new Set(quizList));} //find only unique entries of quiz names
            }
            
/*          console.log("questionArray is: ", questionArray); */
            console.log("quizList is: ", quizList);

            editQuizButtonContainer.innerHTML = "";
            editQuizQuestionContainer.innerHTML = "";
            var createNewQuizDiv = document.createElement("div");
            var createNewQuizPrompt = document.createElement("p");
            var quizName = document.createElement("input");
            var submitButton = document.createElement("p");
            submitButton.appendChild(document.createTextNode("Create Quiz"));
            submitButton.className = "submitNewQuiz";
            quizName.className = "quizValue";
            createNewQuizDiv.className = "questionContainer";
            quizName.setAttribute("type", "text");
            quizName.placeholder = "Please enter your new Quiz Name here.";
            quizName.style.width = "250px";
            createNewQuizDiv.style.marginTop = "10px";
            createNewQuizPrompt.appendChild(document.createTextNode("Please enter your new quiz name: "));
            createNewQuizDiv.appendChild(createNewQuizPrompt);
            createNewQuizDiv.appendChild(quizName);
            createNewQuizDiv.appendChild(submitButton);
            editQuizQuestionContainer.appendChild(createNewQuizDiv);
            submitButton = document.getElementsByClassName("submitNewQuiz")[0];
            quizName = document.getElementsByClassName("quizValue")[0];
            var newQuizPromptValue = document.getElementsByClassName("quizValue")[0];
            submitButton.addEventListener("click", function(event){
                newQuizPromptValue = document.getElementsByClassName("quizValue")[0];
                newQuizPromptValue = newQuizPromptValue.value;
                console.log("newQuizPromptValue value is: ",newQuizPromptValue);
                if(newQuizPromptValue==""){
                    alert("Please have a value filled in the form!");
                }else{
                    if(quizList.includes(newQuizPromptValue)==false){
                        alert('Empty quiz "'+newQuizPromptValue+'" created!');
                        quizList.push(newQuizPromptValue);
                        quizName.value = "";
                        //Below for updating the "Try Quiz" Menu
                        var buttonText = document.createTextNode(newQuizPromptValue);
                        var buttonNode = document.createElement("p");
                        buttonNode.appendChild(buttonText);
                        buttonNode.className = "quizMenu";
                        quizMenuContainer.appendChild(buttonNode);
                        console.log("Appended to quizMenuContainer!!!");
                    }else{
                        alert("There already exits a quiz with name "+newQuizPromptValue+"!");
                    }
                }
            });
            newQuizPromptValue.addEventListener("keyup", function(event){
                newQuizPromptValue = document.getElementsByClassName("quizValue")[0];
                newQuizPromptValue = newQuizPromptValue.value;
                if(event.key =="Enter" && newQuizPromptValue==""){
                    alert("Please have a value filled in the form!");
                }else if(event.key =="Enter" && newQuizPromptValue!=""){
                    if(quizList.includes(newQuizPromptValue)==false){
                        alert('Empty quiz "'+newQuizPromptValue+'" created!');
                        quizList.push(newQuizPromptValue);
                        quizName.value = "";
                        //Below for updating the "Try Quiz" Menu
                        var buttonText = document.createTextNode(newQuizPromptValue);
                        var buttonNode = document.createElement("p");
                        buttonNode.appendChild(buttonText);
                        buttonNode.className = "quizMenu";
                        quizMenuContainer.appendChild(buttonNode);
                        console.log("Appended to quizMenuContainer!!!");
                    }else{
                        alert("There already exits a quiz with name "+newQuizPromptValue+"!");
                    }
                }
            });
        });       
        editButton3.addEventListener("click", function(event) {
            //When clicked on, we want to use dom to list
            //the quiz list using the questionArray
            editingFlag = false;
            addChangeButtonFlag = true;
            editQuizButtonContainer.innerHTML = "";
            editQuizQuestionContainer.innerHTML = "";
            document.getElementsByClassName("editQuizHeader")[0].innerHTML = "Delete Quiz";
            var xmlIterator = xhttp.responseXML.getElementsByTagName("unit");
            
            if(loadIntoQuestionArray == false){
                loadIntoQuestionArray = ~loadIntoQuestionArray;
                questionArray = [];
                for(i = 0; i<xmlIterator.length; i++) {
                    var temp = new Array();
                    temp.push(xmlIterator[i].getAttribute('quizName')+" Quiz");
                    temp.push(xmlIterator[i].getElementsByTagName("question")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceA")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceB")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceC")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("choiceD")[0].childNodes[0].nodeValue);
                    temp.push(xmlIterator[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
                    questionArray.push(temp);
                }
            }
            for(i = 0; i<questionArray.length; i++) {
                quizList.push(questionArray[i][0]);
                if(i==(questionArray.length-1)){ quizList = Array.from(new Set(quizList));} //find only unique entries of quiz names
            }
            console.log("quizList is: ", quizList);
            for(i=0;i<quizList.length; i++){
                var quizNames = document.createElement("p");
                console.log("quizList is: ", quizList[i]);
                var quizText = document.createTextNode(quizList[i]);
                console.log("quizNames and quizText is: ", quizNames, quizText);
                quizNames.appendChild(quizText);
                editQuizButtonContainer.appendChild(quizNames);
                quizNames.className = "quizList_delete"; //String(quizList[i]);
            }
            var lineBreak = document.createElement("hr");
            editQuizButtonContainer.appendChild(lineBreak);

            
            var closureArray = [];
            var quizNamesElem_delete = document.getElementsByClassName("quizList_delete");
            
            function createDeleteQuizEventFunc(i) {
                //Appropriate i context given, bind the addEvent
                //Creates one question editor at the moment
                console.log("quizNamesElem_delete[i] is: ", quizNamesElem_delete[i]);
                quizNamesElem_delete[i].addEventListener("click", function(event) {
                    //Turn off the other buttons
                    var response = false;
                    var invalidRemoval = ["unit1 Quiz", "unit2 Quiz", "unit3 Quiz"];
                    if(invalidRemoval.includes(quizNamesElem_delete[i].innerHTML) == false){
                        response = confirm("Do you wish to delete "+quizNamesElem_delete[i].innerHTML+"?");
                    }
                    
                    if(response==true){
                        console.log("Deleted quiz");
                        console.log("quizNamesElem_delete[i] is ", quizNamesElem_delete[i]);
                        var quizMenuIndex;
                        var removeQuizNode = document.getElementsByClassName("quizMenu");
                        for(var j=0; j<removeQuizNode.length; j++){
                            console.log("removeQuizNode[j] is ", removeQuizNode[j]);
                            console.log("quizNamesElem_delete[i] is ", quizNamesElem_delete[i]);
                            if(removeQuizNode[j].innerHTML == quizNamesElem_delete[i].innerHTML){
                                quizMenuIndex = j;
                            }
                        }
                        console.log("quizList is now: ", quizList);
                        quizList = quizList.filter(e => e !== quizNamesElem_delete[i].innerHTML);
                        for(j=0; j<questionArray.length; j++){
                            if(questionArray[j][0] == quizNamesElem_delete[i].innerHTML){
                                questionArray.splice(j);
                            }
                        }
                        editQuizButtonContainer.removeChild(quizNamesElem_delete[i]);
                        console.log("quizList is now: ", quizList);
                        //document.getElementsByClassName("editMenu3")[0].click(); //This is not a reliable way, especially when alerts mess up timings
                        var removeQuizNode = document.getElementsByClassName("quizMenu")[quizMenuIndex];
                        quizMenuContainer.removeChild(removeQuizNode);
                        //Also clean up questionArray entries of these questions
                        console.log("New version in effect!");
                    }else{
                        console.log("Cancelled");
                    }

                });                
                return function() { console.log("My value: " + i); };
                //console.log("quizNamesElem[i] is: ", quizNamesElem[i]);
            }

            for (var i = 0; i < quizList.length; i++) {
                console.log("******************Iteration "+i+" ****************");
                console.log("Problem is here?");
                closureArray[i] = createDeleteQuizEventFunc(i);
            }

            for (var j = 0; j < quizList.length; j++) {
                closureArray[j]();                        // and now let's run each one to see
            }
        });
        editButton1.addEventListener("mouseover", function(event) {
            editButton1.style.cursor = "pointer";
        });
        editButton2.addEventListener("mouseover", function(event) {
            editButton2.style.cursor = "pointer";
        });
        editButton3.addEventListener("mouseover", function(event) {
            editButton3.style.cursor = "pointer";
        });
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
//Below for part3.htm
var c = document.getElementById("part3Canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();    