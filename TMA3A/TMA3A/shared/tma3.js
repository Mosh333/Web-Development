var cookieIcon = document.getElementById("cookieTrackerHome");
var slideshowIcon = document.getElementById("slideshowHome");
var eCommerceIcon1 = document.getElementById("store_part1Home");
var eCommerceIcon2 = document.getElementById("store_part2Home");
var part1 = document.getElementsByClassName("part1")[0];
var part2 = document.getElementsByClassName("part2")[0];
var part3 = document.getElementsByClassName("part3")[0];
var part4 = document.getElementsByClassName("part4")[0];

try {

    cookieIcon.onclick = function () {
        part1.click();
    };

    slideshowIcon.onclick = function () {
        part2.click();
    };
    eCommerceIcon1.onclick = function () {
        part3.click();
    };
    eCommerceIcon2.onclick = function () {
        part4.click();
    };


} catch (err) {
    console.log(err);
}
