<?php
$servername = "localhost"; /* "student.athabascau.ca"; */
                           // Localhost because
                           /* this file is in the server */
$username = "moshiurho";
$password = "moshiurhoabyz";
$database = "moshiurho";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connection Successful!<br/>\n";
/*****************************************************************************/
$linkId_arr = array();
$urlLink_arr = array();
$username_arr = array();

$sql = "select * from bookmark";
$result = $conn->query($sql);


if($result->num_rows > 0){
    //echo "Greater than 0 rows!<br/>\n";
    //output data of each row si
    while($row = $result->fetch_assoc()){
        //echo "LinkId: " . $row["LinkId"] . " urlLink: " . $row["urlLink"] . " username: " . $row["username"] . "<br/>\n";
        array_push($linkId_arr, $row["LinkId"]);
        array_push($urlLink_arr, $row["urlLink"]);
        array_push($username_arr, $row["username"]);
    }
}else{
        //echo "0 results";
}
for($i = 0; $i < count($linkId_arr); $i++) {
    //echo $linkId_arr[$i] . " " . $urlLink_arr[$i]. " " . $username_arr[$i] . "<br/>\n";
}

//https://stackoverflow.com/questions/11521944/sort-by-number-of-occurrence-in-tables
$sql = "select urlLink  from bookmark group by urlLink  order by count(urlLink) desc"; /*Get table by occurrence*/
$result = $conn->query($sql);
$counter = 1;
$dispCounter = "";
$myLinkString = "";
if($result->num_rows > 0){
    //echo "Greater than 0 rows!<br/>\n";
    //output data of each row
    while($row = $result->fetch_assoc() and $counter<11){
        $dispCounter = $counter . ". ";
        $myLinkString = $row["urlLink"] . "<br/>\n";
        //echo $myString;
        echo "<p class ='linkNum'>{$dispCounter} </p>";
        echo "<a class ='linkClass' target='_blank'  href={$row["urlLink"]}>{$myLinkString}</a>";
        array_push($urlLink_arr, $row["urlLink"]);
        $counter = $counter + 1;
    }
}else{
        echo "0 results";//"No bookmarks by users.";
}
//echo "<p>Copyright &copy; 1999-" . date("Y") . " W3Schools.com</p>";
/* echo count($linkId_arr); */
$conn->close();

?>