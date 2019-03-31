
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
