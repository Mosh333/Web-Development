<?php
$servername = "localhost"; //"sql312.unaux.com";//
$username = "moshiurho"; //"unaux_23022042";//
$password = "moshiurhoabyz";//"moshiur391";
$database = "moshiurho";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}





//Handle three different $_POST requests from the bookmarking app

if(isset($_POST['addLink'])){
    $urlToAdd = $_POST["addLink"];
    $username = $_POST["username"];
    //Make an SQL query to add the link to the user's bookmark record
    //Note var Bookmark is being updated on client side, and whether the url is unique has been checked on the client side
    //Also note, the Bookmark var updates everytime user logs in
    //insert into bookmark( LinkId,urlLink,username) values('', 'https://www.instagram.com','mosh333');
    $sql = "insert into bookmark(LinkId,urlLink,username) values('','" . (string)$urlToAdd . "','" . (string)$username . "')";
    $result = $conn->query($sql);
    echo "DB updated for " . $username . " with url " . $urlToAdd;
}

if(isset($_POST['deleteLink'])){
    $urlToDelete = $_POST["deleteLink"];
    $username = $_POST["username"];
    
    /* delete from bookmark where urlLink="https://www.google.ca" and username="ashe"; */
    $sql = "DELETE FROM bookmark where urlLink='" . (string)$urlToDelete . "' AND username='" . (string)$username . "'";
    //echo $sql;
    $result = $conn->query($sql);
    echo "DB updated for " . $username . " with url " . $urlToDelete;    
}

if(isset($_POST['editLink'])){
    $newURL = $_POST["editLink"];
    $oldURL = $_POST["oldLink"];
    $username = $_POST["username"];
    /* delete from bookmark where urlLink="https://www.google.ca" and username="ashe"; */
    $sql = "UPDATE bookmark SET urlLink='" . (string)$newURL . "' WHERE username='" . (string)$username . "' AND urlLink='" . (string)$oldURL . "'";
    //echo $sql;
    $result = $conn->query($sql);
    echo "DB updated for " . $username . " with url " . $urlToEdit;    
}

//Handle the request to make sure the link is accessible
if(isset($_GET['checkLink'])){ //check if link is reachable using sockets (status==200??)
    $verifyURL = $_GET["checkLink"];
    //echo $verifyURL;
    $status = get_headers($verifyURL);
    echo substr($status[0], 9, 3);
}

$conn->close();


?>