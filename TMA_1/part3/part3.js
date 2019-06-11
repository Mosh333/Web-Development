
//Store necessary data into vars
var canvas = document.getElementById('part3Canvas');
var context = canvas.getContext('2d');
var index = 0; //index number of the image in var images
var shuffledArray = new Array();
var timing = 2500;
var revealTimer; //for fade in effect
var alpha = 0.1; //for fade in effect
var slideInBars = 10; //for slide in effect
var old_index = 0;
                        
var images = {
            "img": ["images/car1.jpg", "images/car2.jpg", "images/cat1.jpg", "images/cat2.jpg",
            "images/cat3.jpg", "images/cat4.jpg", "images/city1.jpg", "images/desert1.jpg",
            "images/desert2.jpg", "images/grass1.jpg", "images/mountain1.jpg", "images/mountain2.jpg",
            "images/mountain3.jpg", "images/ocean1.jpg", "images/ocean2.jpg", "images/ocean3.jpg",
            "images/road1.jpg", "images/rocks1.jpg", "images/scenery1.jpg", "images/sky1.jpg"],
            
            "caption": ["Mt. Fuji", "Ancient Japan", '"Meow!"', '"Contemplating Life"', '"Sneaky Sneaky"',
            '"Oh noes!"', "A beautiful city!", "An Arabian Night!", "An Arabian Day!", "Grassland!",
            "Beautiful Swiss Mountain!", "Sunset on Mountain View.", "Beautiful Swiss Climate!",
            "Emirati Ocean!", "Beautiful Seaside View", "Sunset at the Beach", "Life is a journey.",
            "Rocks can be artistic too!", "Time for Autumn!", "Reach the Skies!"]
            };

//Two flags to control behaviour of the slideshow
var shuffle_on = false; //toggle between "random/shuffle" or "sequential"
var paused = false;
var transition_value = "transition0"; //value assigned for the transition/transformation droplist            
            
            
    try{
        init_Canvas();
    }catch(err){
        console.log("Oops, something went wrong!");
    }
    
    function init_Canvas(){
        slide_image = new Image();
        slide_image.src = images.img[index];
        slide_image.onload = function(){
            context.drawImage(slide_image, 0, 0, 640, 480);
            //https://stackoverflow.com/questions/18900117/write-text-on-canvas-with-background
            //https://stackoverflow.com/questions/13771310/center-proportional-font-text-in-an-html5-canvas
             context.font = "25pt Calibri";
             context.fillStyle = "white";
             var textWidth = context.measureText(images.caption[index]).width; //measure after font changes
             context.fillStyle = "black";
             context.fillRect((canvas.width-(textWidth+10))/2,435,textWidth+10,45); //height of text approx 42px
             //center is 245,190,150,100
             context.fillStyle = "white";
             context.fillText(images.caption[index], (canvas.width/2) - (textWidth / 2), 470);
            start_slideshow();
        }   
    }

    function start_slideshow(){
        //Run the slideshow in a default fashion
        console.log("Version1: Insert slideshow logic here");
        window.setInterval(mySlideshowCallback, timing);
        // context.clearRect(0,0,640,480);
    }
    
    function mySlideshowCallback(){
        if(paused==false){
            if(shuffle_on==true){
                while(true){
                    var myNewRandIndex = Math.floor((Math.random() * images.img.length));
                    if(myNewRandIndex!=index){ //0 to 19
                        index = myNewRandIndex;
                        break;
                    }
                }
            }else if(shuffle_on==false){
                if(index<19){
                    index++;
                }else{
                    index = 0;
                }
            }

            function writeCaption(index){
                context.font = "25pt Calibri";
                context.fillStyle = "white";
                var textWidth = context.measureText(images.caption[index]).width; //measure after font changes
                context.fillStyle = "black";
                context.fillRect((canvas.width-(textWidth+10))/2,435,textWidth+10,45); //height of text approx 42px
                //center is 245,190,150,100
                context.fillStyle = "white";
                context.fillText(images.caption[index], (canvas.width/2) - (textWidth / 2), 470);            
            }

            //context.clearRect(0,0,640,480); //this is bad
            slide_image.src = images.img[index];
            slide_image.onload = function(){
                transition_value = document.getElementById("selectTransition").value;
                context.globalAlpha = 1; //no transparency
                if(transition_value=="transition0"){
                    //No transition effect
                    document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+index;
                    context.drawImage(slide_image, 0, 0, 640, 480);
                    writeCaption(index);
                }else if(transition_value=="transition1"){
                    //Fade in effect
                    function fadeInImage(){
                        context.save();
                        context.drawImage(slide_image, 0, 0, 640, 480);
                        writeCaption(index);   
                        alpha += 0.1; //delta are changes of 0.1
                        context.globalAlpha = alpha;
                        //if hit boundaries of alpha, change direction of delta
                        if(alpha > 1){  //first one second of each cycle is spent transitioning smoothly
                            clearInterval(revealTimer);
                            alpha = 0.1;
                        }
                        console.log("alpha is: "+alpha);
                        //context.restore();    //don't want this retains the older image in background
                    }
                    document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+index;
                    alpha = 0.1;    //every new index reset the alpha back to lowest 10% visibility
                    context.globalAlpha = alpha;
                    revealTimer = setInterval(fadeInImage, 100); //redraw canvas every 1ms

                }else if(transition_value=="transition2"){
                    document.getElementById("currentIndexValue").innerHTML = "Transition2";
                    //Slide new image moving left, overwriting the old image without shifting old image
                    function slideInImage(){
                        slideInBars--; //increase bar number by 1, each bar is 640/10 or 64pixel width
                        context.save();
                        //Do two draws, old one pushed out through left
                        //new one being pushed in from right
                        //context.drawImage(slide_image, 0, 0, 640, 480);
                        context.drawImage(slide_image_next, slideInBars*64, 0, 640, 480);
                        writeCaption((index+1)%20);
                        if(slideInBars < 1){  //first one second of each cycle is spent transitioning smoothly
                            clearInterval(revealTimer);
                            slideInBars = 0;
                        }
                        
                        console.log("slideInBars is: "+slideInBars);
                    }
                    document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+((index+1)%20);
                    slideInBars = 10;    //every new index reset the bar numbers to 0
                    slide_image_next = new Image();
                    slide_image_next.src = images.img[(index+1)%20];
                    revealTimer = setInterval(slideInImage, 100); //redraw canvas every 1ms
                }else if(transition_value=="transition3"){
                    
                    //Slide new image moving down, shifting the old image
                    document.getElementById("currentIndexValue").innerHTML = "Transition3";
                    function slideDownImage(){
                        slideInBars--; //increase bar number by 1, each bar is 640/10 or 64pixel width
                        context.save();
                        //Do two draws, old one pushed out through left
                        //new one being pushed in from right
                        slide_image_old.src = images.img[old_index];
                        context.drawImage(slide_image_old, 0, -1*(10-slideInBars)*48, 640, 480);
                        context.drawImage(slide_image, 0, slideInBars*48, 640, 480);
                        writeCaption(index);
                        if(slideInBars < 1){  //first one second of each cycle is spent transitioning smoothly
                            old_index = index;
                            clearInterval(revealTimer);
                            slideInBars = 0;
                        }
                        
                        console.log("slideInBars is: "+slideInBars);
                    }
                    document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+((index+1)%20);
                    slideInBars = 10;    //every new index reset the bar numbers to 0
                    slide_image_old = new Image();
                    revealTimer = setInterval(slideDownImage, 150); //redraw canvas every 1ms
                }
            }
        }
    }
    
    var prevButton = document.getElementById("prevButton");
    
    prevButton.onclick = function(){
        if(shuffle_on==false){
            if(index==0){
                index=19;
            }else{
                index--;
            }        
        }
        //if you wanted to spend an entire cycle on the prev image
        /*if(index==1 && paused==false){ 
            index=19;
        }else if(index==0 && paused==true){
            index=19;
        }else if(paused==false){
            index=index-2;
        }else if(paused==true){
            index--;
        } */

        slide_image.src = images.img[index];
        slide_image.onload = function(){
            if(shuffle_on==false){
            document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+index;
            context.drawImage(slide_image, 0, 0, 640, 480);
            context.font = "25pt Calibri";
            context.fillStyle = "white";
            var textWidth = context.measureText(images.caption[index]).width; //measure after font changes
            context.fillStyle = "black";
            context.fillRect((canvas.width-(textWidth+10))/2,435,textWidth+10,45); //height of text approx 42px
            //center is 245,190,150,100
            context.fillStyle = "white";
            context.fillText(images.caption[index], (canvas.width/2) - (textWidth / 2), 470);
            }
        }                
    }
    
    var nextButton = document.getElementById("nextButton");
    
    nextButton.onclick = function(){
        if(index<19){
            index++;
        }else{
            index = 0;
        }

        slide_image.src = images.img[index];
        slide_image.onload = function(){
            if(shuffle_on==false){
            document.getElementById("currentIndexValue").innerHTML = "Current Index is: "+index;
            context.drawImage(slide_image, 0, 0, 640, 480);
            context.font = "25pt Calibri";
            context.fillStyle = "white";
            var textWidth = context.measureText(images.caption[index]).width; //measure after font changes
            context.fillStyle = "black";
            context.fillRect((canvas.width-(textWidth+10))/2,435,textWidth+10,45); //height of text approx 42px
            //center is 245,190,150,100
            context.fillStyle = "white";
            context.fillText(images.caption[index], (canvas.width/2) - (textWidth / 2), 470);
            }
        }       
    
    }

    
    var shuffleShowButton = document.getElementById("shuffleShow");
    
    shuffleShowButton.onclick = function(){
        if(shuffle_on==false){
            shuffle_on = true;
            shuffleShowButton.innerHTML = "Random";
        }else if(shuffle_on==true){
            shuffle_on = false;
            shuffleShowButton.innerHTML = "Sequential";
        }
    }       
        
    
    var startStopButton = document.getElementById("startStopButton");
    
    startStopButton.onclick = function(){
        if(paused==false){
            paused=true;
            startStopButton.innerHTML = "&#9654;"; //pause icon
        }else if(paused==true){
            paused=false;
            startStopButton.innerHTML = "||"; //play icon
            // startStopButton.style.fontSize = "150%";
        }
    }    
    

    
    
    
    