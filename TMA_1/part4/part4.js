//Below for part4.htm
    
    
    try{
        var appTabs = document.getElementsByClassName("tablinks");
        
        window.addEventListener("load", function(event) {
            console.log("Test1");
            appTabs[0].click();
            window.scrollTo(0, 0);
            //console.log("All resources finished loading!");
            document.getElementsByClassName("ytFileGenTut1")[0].style.display = "none";
            document.getElementsByClassName("ytFileGenTut2")[0].style.display = "none";
            document.getElementById("sampleYtFile").style.display = "none";
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
            var Part4Container = document.getElementsByClassName("Part4Container")[0];
            if(tabName == "Tab1"){
                Part4Container.style.height = "400px";
                Part4Container.style.width = "432px";
                Part4Container.style.marginBottom = "100px";
                document.getElementsByClassName("ytFileGenTut1")[0].style.display = "none";
                document.getElementsByClassName("ytFileGenTut2")[0].style.display = "none";
                document.getElementById("sampleYtFile").style.display = "none";
            }
            if(tabName == "Tab2"){
                //Increase Height of Div
                Part4Container.style.height = "650px";
                Part4Container.style.width = "432px";
                Part4Container.style.marginBottom = "100px";
                document.getElementsByClassName("ytFileGenTut1")[0].style.display = "none";
                document.getElementsByClassName("ytFileGenTut2")[0].style.display = "none";
                document.getElementById("sampleYtFile").style.display = "none";
            }
            if(tabName == "Tab3"){
                //Increase Width of Div
                Part4Container.style.height = "700px";
                Part4Container.style.width = "650px";
                Part4Container.style.marginBottom = "100px";
                document.getElementsByClassName("ytFileGenTut1")[0].style.display = "inline";
                document.getElementsByClassName("ytFileGenTut2")[0].style.display = "inline";
                document.getElementById("sampleYtFile").style.display = "inline";
            }
            tabcontent = document.getElementsByClassName("tabcontent");
            //console.log("tabcontent count is: ", tabcontent.length);
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";   //hide all contents
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                document.getElementsByClassName("tablinks")[i].style.backgroundColor = "black";
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
            var targetTabChange = evt.currentTarget.className.substr(9,9);
            console.log(targetTabChange);
            document.getElementsByClassName(String(targetTabChange))[0].style.backgroundColor = "red";
        }
    }catch(err){
        //console.log('Reference Error Occured on Undefined!');
    }
    
//Logic for Measurement Converter
    try{
    //Detect measurement type and adjust the selectable units
        var measurementType = document.getElementById("measurementType");   //Physical Quantity
        var measurementInput1 = document.getElementById("measurementInput1"); //Magnitude
        var measurementInput2 = document.getElementById("measurementInput2");
        var measurementSelect1 = document.getElementById("measurementSelect1"); //Units
        var measurementSelect2 = document.getElementById("measurementSelect2");
        var option;
/*         var weightConv = [m to cm, foot];
        var lengthConv = [];
        var areaConv = [];
        var volumeConv = []; */
        var unit1;
        var unit2;
        function loadWeight(){
            measurementSelect1.innerHTML = "";
            measurementSelect2.innerHTML = "";
            option = document.createElement("option");
            option.text = "Kilogram";
            option.value = 1;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Kilogram";
            option.value = 1;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Gram";
            option.value = 2;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Gram";
            option.value = 2;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Pound";
            option.value = 3;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Pound";
            option.value = 3;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Ounce";
            option.value = 4;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Ounce";
            option.value = 4;
            measurementSelect2.add(option);
            
            measurementSelect2.value = 2;
            measurementInput1.value = 1;
            measurementInput2.value = 1000;     
        }

        function loadLength(){
            measurementSelect1.innerHTML = "";
            measurementSelect2.innerHTML = "";
            option = document.createElement("option");
            option.text = "Metre";
            option.value = 1;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Metre";
            option.value = 1;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Centimetre";
            option.value = 2;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Centimetre";
            option.value = 2;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Foot";
            option.value = 3;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Foot";
            option.value = 3;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Inch";
            option.value = 4;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Inch";
            option.value = 4;
            measurementSelect2.add(option);
            
            measurementSelect2.value = 2;
            measurementInput1.value = 1;
            measurementInput2.value = 100;            
        }

        function loadArea(){
            measurementSelect1.innerHTML = "";
            measurementSelect2.innerHTML = "";        
            option = document.createElement("option");
            option.text = "Square Metre";
            option.value = 1;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Square Metre";
            option.value = 1;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Acre";
            option.value = 2;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Acre";
            option.value = 2;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Square Mile";
            option.value = 3;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Square Mile";
            option.value = 3;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Square Foot";
            option.value = 4;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Square Foot";
            option.value = 4;
            measurementSelect2.add(option);
            
            measurementSelect2.value = 2;
            measurementInput1.value = 1;
            measurementInput2.value = 0.000247105;
        }        
        
        function loadVolume(){
            measurementSelect1.innerHTML = "";
            measurementSelect2.innerHTML = "";
            option = document.createElement("option");
            option.text = "Litre";
            option.value = 1;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Litre";
            option.value = 1;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "Cubic Metre";
            option.value = 2;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "Cubic Metre";
            option.value = 2;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "US Liquid Gallon";
            option.value = 3;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "US Liquid Gallon";
            option.value = 3;
            measurementSelect2.add(option);
            option = document.createElement("option");
            option.text = "US Tablespoon";
            option.value = 4;
            measurementSelect1.add(option);
            option = document.createElement("option");
            option.text = "US Tablespoon";
            option.value = 4;
            measurementSelect2.add(option);
            
            measurementSelect2.value = 2;
            measurementInput1.value = 1;
            measurementInput2.value = 0.001;              
        }
        
        window.addEventListener("load", function(event) {
            loadWeight();
        });
        
        //Load new physical quantity depending on measurementType
        measurementType.addEventListener("change", function(event) {
            if(measurementType.value == "weight"){
                loadWeight();
            }else if(measurementType.value == "length"){
                loadLength();
            }else if(measurementType.value == "area"){
                loadArea();
            }else if(measurementType.value == "volume"){
                loadVolume();
            }
        });

        function validInput(evt){    //Prevent -ve sign from being entered, accept . for decimals
            console.log(evt.keyCode);
            if(!((evt.keyCode > 95 && evt.keyCode < 106)
              || (evt.keyCode > 47 && evt.keyCode < 58) 
              || evt.keyCode == 8
              || evt.keyCode == 190)) {
                return false;
            }
            //console.log("JAJAJA");
        }
/*         measurementInput1.addEventListener("keydown", validInput);
        measurementInput2.addEventListener("keydown", validInput); */ //Why this doesn't work lol
        measurementInput1.onkeydown = validInput;
        measurementInput2.onkeydown = validInput;

        measurementInput1.addEventListener("keyup", computeInput2); //keyup handles all cases, no "change" req'd
        measurementInput2.addEventListener("keyup", computeInput1);
        measurementInput1.addEventListener("change", computeInput2); //to handle the input number arrow events
        measurementInput2.addEventListener("change", computeInput1);
        measurementSelect1.addEventListener("change", computeInput2); //If the units are changed, update
        measurementSelect2.addEventListener("change", computeInput1);

        function computeInput2() {
            //Given Input1, compute for Input2 real-time
            unit1 = measurementSelect1.value;
            unit2 = measurementSelect2.value;
            //1 is Kilogram
            //2 is Gram
            //3 is Pound
            //4 is Ounce
            //Calculate the converted value on other input form
            if(measurementType.value == "weight"){
                //Determine Units for 1 and 2
                //Do the arithmetic to convert the value for input2
                //Set the value for input 2
                if(unit1 == unit2){
                    measurementInput2.value = measurementInput1.value;
                }else if(unit1 == 1){
                    if(unit2 == 2){
                        measurementInput2.value = 1000*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = 2.20462*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 35.274*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 2){
                    if(unit2 == 1){
                            measurementInput2.value = (1/1000)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/453.592)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = (1/28.35)*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 3){
                    if(unit2 == 1){
                            measurementInput2.value = (1/2.205)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = (453.592)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 16*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 4){
                    if(unit2 == 1){
                        measurementInput2.value = (1/35.274)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = 28.35*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/16)*parseFloat(measurementInput1.value);
                    }
                }

            }else if(measurementType.value == "length"){
                //1 is Metre
                //2 is Centimetre
                //3 is Foot
                //4 is Inch
                if(unit1 == unit2){
                    measurementInput2.value = measurementInput1.value;
                }else if(unit1 == 1){
                    if(unit2 == 2){
                        measurementInput2.value = 100*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = 3.281*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 39.37*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 2){
                    if(unit2 == 1){
                            measurementInput2.value = (1/100)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/30.48)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = (1/2.54)*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 3){
                    if(unit2 == 1){
                            measurementInput2.value = (1/3.281)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = 30.48*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 12*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 4){
                    if(unit2 == 1){
                        measurementInput2.value = (1/39.37)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = 2.54*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/12)*parseFloat(measurementInput1.value);
                    }
                }
            }else if(measurementType.value == "area"){
                //1 is Square Metre
                //2 is Acre
                //3 is Square Mile
                //4 is Square Foot
                var k
                if(unit1 == unit2){
                    measurementInput2.value = measurementInput1.value;
                }else if(unit1 == 1){
                    if(unit2 == 2){
                        measurementInput2.value = (1/4046.86)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        k = 1/2590000;
                        measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 10.764*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 2){
                    if(unit2 == 1){
                            measurementInput2.value = 4046.86*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/640)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 43560*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 3){
                    if(unit2 == 1){
                            k = 2590000;
                            measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = 640*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        var k = 27880000;
                        measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 4){
                    if(unit2 == 1){
                        measurementInput2.value = (1/10.764)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        measurementInput2.value = (1/43560)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        k = 1/27880000;
                        measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }
                }
            }else if(measurementType.value == "volume"){
                //1 is Litre
                //2 is Cubic Metre
                //3 is US Liquid Gallon
                //4 is US Tablespoon
                var k
                if(unit1 == unit2){
                    measurementInput2.value = measurementInput1.value;
                }else if(unit1 == 1){
                    if(unit2 == 2){
                        measurementInput2.value = (1/1000)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/3.785)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 67.628*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 2){
                    if(unit2 == 1){
                            measurementInput2.value = 1000*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = 264.172*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 67628*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 3){
                    if(unit2 == 1){
                        measurementInput2.value = 3.785*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        k = 1/264.172;
                        measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }else if(unit2 == 4){
                        measurementInput2.value = 256*parseFloat(measurementInput1.value);
                    }
                }else if(unit1 == 4){
                    if(unit2 == 1){
                        measurementInput2.value = (1/67.628)*parseFloat(measurementInput1.value);
                    }else if(unit2 == 2){
                        k = 1/67628.045
                        measurementInput2.value = k*parseFloat(measurementInput1.value);
                    }else if(unit2 == 3){
                        measurementInput2.value = (1/256)*parseFloat(measurementInput1.value);
                    }
                }
            }            
        }
        
        function computeInput1() {
            //Given Input1, compute for Input2 real-time
            unit1 = measurementSelect1.value;
            unit2 = measurementSelect2.value;

            //Calculate the converted value on other input form
            if(measurementType.value == "weight"){
                //Determine Units for 1 and 2
                //Do the arithmetic to convert the value for input2
                //Set the value for input 1
                //1 is Kilogram
                //2 is Gram
                //3 is Pound
                //4 is Ounce
                if(unit2 == unit1){
                    measurementInput1.value = measurementInput2.value;
                }else if(unit2 == 1){
                    if(unit1 == 2){
                        measurementInput1.value = 1000*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = 2.20462*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 35.274*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 2){
                    if(unit1 == 1){
                            measurementInput1.value = (1/1000)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/453.592)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = (1/28.35)*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 3){
                    if(unit1 == 1){
                            measurementInput1.value = (1/2.205)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = (1/453.592)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 16*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 4){
                    if(unit1 == 1){
                        measurementInput1.value = (1/35.274)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = 28.35*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/16)*parseFloat(measurementInput2.value);
                    }
                }

            }else if(measurementType.value == "length"){
                //1 is Metre
                //2 is Centimetre
                //3 is Foot
                //4 is Inch
                if(unit2 == unit1){
                    measurementInput1.value = measurementInput2.value;
                }else if(unit2 == 1){
                    if(unit1 == 2){
                        measurementInput1.value = 100*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = 3.281*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 39.37*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 2){
                    if(unit1 == 1){
                            measurementInput1.value = (1/100)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/30.48)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = (1/2.54)*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 3){
                    if(unit1 == 1){
                            measurementInput1.value = (1/3.281)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = 30.48*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 12*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 4){
                    if(unit1 == 1){
                        measurementInput1.value = (1/39.37)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = 2.54*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/12)*parseFloat(measurementInput2.value);
                    }
                }
            }else if(measurementType.value == "area"){
                //1 is Square Metre
                //2 is Acre
                //3 is Square Mile
                //4 is Square Foot
                var k
                if(unit2 == unit1){
                    measurementInput1.value = measurementInput2.value;
                }else if(unit2 == 1){
                    if(unit1 == 2){
                        measurementInput1.value = (1/4046.86)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        k = 1/2590000;
                        measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 10.764*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 2){
                    if(unit1 == 1){
                            measurementInput1.value = 4046.86*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/640)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 43560*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 3){
                    if(unit1 == 1){
                            k = 2590000;
                            measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = 640*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        var k = 27880000;
                        measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 4){
                    if(unit1 == 1){
                        measurementInput1.value = (1/10.764)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        measurementInput1.value = (1/43560)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        k = 1/27880000;
                        measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }
                }
            }else if(measurementType.value == "volume"){
                //1 is Litre
                //2 is Cubic Metre
                //3 is US Liquid Gallon
                //4 is US Tablespoon
                var k
                if(unit2 == unit1){
                    measurementInput1.value = measurementInput2.value;
                }else if(unit2 == 1){
                    if(unit1 == 2){
                        measurementInput1.value = (1/1000)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/3.785)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 67.628*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 2){
                    if(unit1 == 1){
                            measurementInput1.value = 1000*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = 264.172*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 67628*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 3){
                    if(unit1 == 1){
                        measurementInput1.value = 3.785*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        k = 1/264.172;
                        measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }else if(unit1 == 4){
                        measurementInput1.value = 256*parseFloat(measurementInput2.value);
                    }
                }else if(unit2 == 4){
                    if(unit1 == 1){
                        measurementInput1.value = (1/67.628)*parseFloat(measurementInput2.value);
                    }else if(unit1 == 2){
                        k = 1/67628.045
                        measurementInput1.value = k*parseFloat(measurementInput2.value);
                    }else if(unit1 == 3){
                        measurementInput1.value = (1/256)*parseFloat(measurementInput2.value);
                    }
                }
            }            
        }
          
    }catch(err){
    
    }
    
//Logic for Mortgage Calculator    
    try{    
        //Check if all the fields are filled then proceed
        var principalField = document.getElementById("principal");
        var interestRateField = document.getElementById("interest");
        var amortizationRateField = document.getElementById("duration");
        var paymentFrequency = document.getElementById("payFreq");
        principalField.onkeydown = validInput;
        interestRateField.onkeydown = validInput;
        amortizationRateField.onkeydown = validInput;
        principalField.onkeyup = displayMortgageValues;
        interestRateField.onkeyup = displayMortgageValues;
        amortizationRateField.onkeyup = displayMortgageValues;
        paymentFrequency.onchange = displayMortgageValues;
        
        function checkFilled(){
            var isAllFilled = false;
            var flagCounter = 0;
            principalField = document.getElementById("principal");
            interestRateField = document.getElementById("interest");
            amortizationRateField = document.getElementById("duration");
            paymentFrequency = document.getElementById("payFreq");
            console.log("principalField.value is ", principalField.value);
            console.log("interestRateField.value is ", interestRateField.value);
            console.log("amortizationRateField.value is ", amortizationRateField.value);
            console.log("paymentFrequency.value is ", paymentFrequency.value);
            if(principalField.value != ""){
                flagCounter++;
            }
            if(interestRateField.value != ""){
                flagCounter++;
            }
            if(amortizationRateField.value != ""){
                flagCounter++;
            }
            if(flagCounter==3){
                isAllFilled = true;
            }
            return isAllFilled;
        }
        
        function normalizedInterest(interestPercent, payFreq){
            //Adjust interest rate based on frequency of the pay
            var normInterest = 0;
            var freq = 0;
            normInterest = interestPercent/100;
            if(payFreq=="month"){
                freq = 12;
            }else if(payFreq=="biweek"){
                freq = (52/2)
            }else if(payFreq=="week"){
                freq = 52;
            }            
            normInterest = normInterest/freq; //normalize interest rate
            return normInterest;
        }
        
        function computeMortgageValues(principal, interest, amort, payFreq){
            var result = [];
            var P = principal;
            var i = normalizedInterest(interest, payFreq);   
            var n = 0;  //number of payments over the contract
            var onePlus_i = 0;
            var periodicPayment = 0; //Result 1
            var totalInterestFee = 0; //Result 2
            
            //Wow I just realize there is most than 4*12 weeks in a year
            //Technically on average 52.1429 weeks in a year
            //https://www.quora.com/Why-are-there-52-weeks-in-a-year-and-not-48-weeks-given-that-there-are-only-4-weeks-per-month-4-x-12-48
            if(payFreq=="month"){
                n = 12*amort;
            }else if(payFreq=="biweek"){
                n = (52/2)*amort;
            }else if(payFreq=="week"){
                n = 52*amort;
            }
            onePlus_i = Math.pow((1+i), n);
            periodicPayment = (P*i*onePlus_i)/(onePlus_i-1);
            totalInterestFee = n*periodicPayment - P;
            result = [periodicPayment, totalInterestFee]; 
            return result;
        }
        
        function displayMortgageValues(){
            //compute payment required every ______
            //and Total Interest required to pay at end of contract
            //through DOM
            if(checkFilled() == true){ //only update if everything is filled
                //alert("Works!");
                console.log("principalField.value is ", principalField.value);
                console.log("interestRateField.value is ", interestRateField.value);
                console.log("amortizationRateField.value is ", amortizationRateField.value);
                console.log("paymentFrequency.value is ", paymentFrequency.value);
                var mortgageResult = computeMortgageValues(principalField.value, interestRateField.value, amortizationRateField.value, paymentFrequency.value);
                document.getElementById("periodicPay").innerHTML = "Periodic Pay is: "+mortgageResult[0].toFixed(2);
                document.getElementById("totalInterest").innerHTML = "Total Contract Interest Fee: "+mortgageResult[1].toFixed(2);
            }
        }
    }catch(err){
        console.log("Something is wrong with the Mortgage Calculator");
    }
    
    try{
        var fileContents;
        var parsedFileContents;
        var newInputButton = document.getElementById("newInputButton");
        var createButton = document.getElementById("createButton");
        var JSON_tracklistArray = []; //contains the track
        var JSON_playlistObj = {}; //contains comprehensive playlist data
                                     //to be inserted into the JSON object file
        
        newInputButton.onclick = createNewVideoInputForm; //Add input form for user
        createButton.onclick = createNewJSONFile;
        
        var openFile = function(event) {
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function(){
                var text = reader.result;
                console.log(reader.result.substring(0, 100000));
                fileContents = reader.result.substring(0, 100000);
                parsedFileContents = JSON.parse(fileContents);
                //once reader reads, remove all input forms
                //parsedFileContents.userdata.playlists gives us the array containing
                //arrays of the playlist data; store the new playlist here
            };
            reader.readAsText(input.files[0]);
            console.log("New version2!");
        };
        function removeInputForms(){
            var playlistInput = document.getElementById("newPlaylistName");
            var linkInput = document.getElementsByClassName("videoId");
            var titleInput = document.getElementsByClassName("title");
            var inputPrompt = document.getElementsByClassName("Video Prompt");
            var tab3 = document.getElementById("Tab3_part1");
            
            playlistInput.value = "";
            while(inputPrompt.length > 0){
                inputPrompt[0].parentNode.removeChild(inputPrompt[0]);
            }
            while(linkInput.length > 0){
                linkInput[0].parentNode.removeChild(linkInput[0]);
            }
            while(titleInput.length > 0){
                titleInput[0].parentNode.removeChild(titleInput[0]);
            }               
        }
        
        function createNewJSONFile(){
            //Here output text form and display the new
            //Youtubeonrepeat JSON content for user to
            //paste back into the same file used to create the
            //new setup
            processUserInput();
        }
        function processUserInput(){
            //If contains https://www.youtube.com/watch?v= first
            //then valid input
            //Check if inputs are valid
            //Process the inputs so that we can create the new JSON file
            var i;
            var playlistInput = document.getElementById("newPlaylistName");
            var linkInput = document.getElementsByClassName("videoId");
            var titleInput = document.getElementsByClassName("title");
            var tempSubString;
            var compareSubString;
            var constant = "https://www.youtube.com/watch?v=";
            var arrayResult = []
            var tab3 = document.getElementById("Tab3_part2");
            var newJSON_display = document.getElementById("textarea_JSON");
            
            //for loop to check if the user inputted links are correct
            for(i = 0; i<linkInput.length; i++){
                tempSubString = linkInput[i].value;
                compareSubString = tempSubString.substring(0, constant.length);
                if(compareSubString != constant){
                    arrayResult.push(false);
                }else{
                    arrayResult.push(true); //instead of setting a flag, have array for future improvement if we want to know exact location error
                }
            }
            if(arrayResult.includes(false)){
                alert("Please make sure to correctly enter links!");
            }else{
                if(parsedFileContents==null){
                    alert("Please upload a .youtubeonrepeat file first!");
                }else if(playlistInput.value==""){
                    alert("Please enter a playlist name!");
                }else if(linkInput.length == 0){
                    alert("Please insert at least one video for new playlist!");
                }else{
                    //if the user inputted links are correct, then proceed to process the file
                    //and append the new playlist to the file
                    //then output the file back to user to copy and paste
                    for(i = 0; i<linkInput.length; i++){
                        tempSubString = linkInput[i].value;
                        console.log(playlistInput.value);
                        console.log(titleInput[i].value);
                        console.log(tempSubString);
                        console.log(youtubeIdParser(tempSubString));
                        compareSubString = tempSubString.substring(0, constant.length);
                        if(compareSubString != constant && compareSubString.length > 0){

                            arrayResult.push(false);
                        }else if(compareSubString.length > 0){
                            console.log(tempSubString);
                            console.log(youtubeIdParser(tempSubString));
                            var temp = {id:String(youtubeIdParser(tempSubString)),
                                title:String(titleInput[i].value)};                        
                            JSON_tracklistArray.push(temp);
                            console.log(JSON_tracklistArray);                  
                        }
                    }
                }
            }
            //push a javascript object in the following format:
            //{id: 1533761540980, title: "Default Playlist", tracks: Array(15)}
            //id is 13 digits
            var JSON_id = Math.floor((Math.random() * 9999999999999)); //generate a random max 13 digit number
            var JSON_playlistTitle = playlistInput.value;
            //JSON_tracklistArray;
            JSON_playlistObj = {id:JSON_id, title:JSON_playlistTitle, tracks: JSON_tracklistArray};
            parsedFileContents.userdata.playlists.push(JSON_playlistObj); //store the new playlist in the file
            console.log("parsedFileContents.userdata.playlists is: ", parsedFileContents.userdata.playlists);
            console.log("New fileContents is: ", parsedFileContents);
            //Display the new file contents in parsedFileContents in a text box
            //for user to copy and paste into their file
            newJSON_display.value = ""; //clear before displaying new JSON
            newJSON_display.value = JSON.stringify(parsedFileContents);
            //parsedFileContents = null; //set it back to null
            JSON_tracklistArray = [];
            removeInputForms();
        }
        
        function youtubeIdParser(link){
            var linkId;
            var constant = "https://www.youtube.com/watch?v=";
            //given correct youtube link
            //truncate https://www.youtube.com/watch?v= out and store the remaining
            //chars into linkId as string
            linkId = link.substring(constant.length, link.length);
            return linkId;
        }
        
        function createNewVideoInputForm(){
            //create two input form side-by-side to accept
            //input from user after the 
            var tab3 = document.getElementById("Tab3_part1");
            var createButton = document.getElementById("createButton");
            var classCount = document.getElementsByClassName("title").length;
            var inputPrompt = document.createElement("p");
            inputPrompt.className = "Video Prompt";
            inputPrompt.innerHTML = "Video #"+classCount;
            var newInputTitle = document.createElement("input");
            newInputTitle.className = "title";
            newInputTitle.placeholder = "Video Title";
            var newInputLink = document.createElement("input");
            newInputLink.className = "videoId";
            newInputLink.placeholder = "Video Link";
            inputPrompt.appendChild(newInputTitle);
            inputPrompt.appendChild(newInputLink);
            tab3.appendChild(inputPrompt);
            //tab3.insertBefore(inputPrompt, createButton);
            console.log("New version 2!");
/*             tab3.appendChild(inputPrompt);
            tab3.removeChild(createButton); */
        }
        
    }catch(err){
    
    }
    
    
    
    
    