<?php
$servername = "localhost";
$username = "moshiurho";
$password = "moshiurhoabyz";
$database = "moshiurho";

//Insert new user into the database/Educord system
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$credentialValid = false;
$username = $_POST["usernamePOST"]; //because we use post global variables
$password = $_POST["passwordPOST"]; //no need for $_Session variables to store it
$userType = $_POST["userTypePOST"]; //this stores "instructor" or "student"
$checkUser = $_POST["usernamePOST"];


//Make SQL query and check if that user already exists or not
//Do the below query
//insert into educordUserList(username,passwd,usertype) values('bobTheBuilder', 'bobPassword', 'instructor');
/* $sql = "insert into educordUserList(username,passwd,usertype) values('" . (string)$username . "', '" . (string)$password . "', '" . (string)$userType . "')";
$result = $conn->query($sql); */

//printf("Errormessage: %s\n", $conn->error);
//echo $result->error;
//echo $conn->error;
//attempt to search for an exact credential match of the user
//do select * from educordUserList WHERE username='best' and passwd='best' and usertype='instructor';
$sql = "select * from educordUserList WHERE username='".(string)$username."' and passwd='".(string)$password."' and usertype='".(string)$userType."'";
$result = $conn->query($sql);

if($result->num_rows > 0){ //if a user exists proceed with login
    $credentialValid = true;
}else{
    $credentialValid = false; //if the user does not exist, do not proceed with login
}

if($credentialValid==true){
    $result = (string)$username .','. (string)$password .','. (string)$userType;
    echo $result;
}else{
    echo "Credential Invalid";
    $conn->close();
}
$conn->close();




?>




