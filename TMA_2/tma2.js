var bookmarkIcon = document.getElementById("bookmarkHome");
var eLearningIcon = document.getElementById("learningHome");
var part1 = document.getElementsByClassName("part1")[0];
var part2 = document.getElementsByClassName("part2")[0];

try{

    bookmarkIcon.onclick = function(){
        part1.click();    
    };
    
    eLearningIcon.onclick = function(){
        part2.click();    
    };


}catch(err){
    console.log(err);
}
