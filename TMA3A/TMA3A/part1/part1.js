


try {

    function findClientTimeZone() {
        var now = new Date();
        var myTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return [now, myTimeZone];
    }

    var reloadButton = document.getElementById("reloadButton");
    reloadButton.onclick = function () {
        document.location.reload();
    }

    var documentBody = document.getElementById("cookietrackerBody");
    documentBody.onload = function () {
        //Use builtin JS command to find time zone instead of manual
        //offset time calculation to solve for time zone
        myResult = findClientTimeZone();
        timezoneId.innerHTML = myResult[0] + " " + myResult[1];
    }

} catch (err) {
    console.log(err);
}