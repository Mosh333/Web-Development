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
$userType = $_POST["userTypePOST"]; //this stores "instructor" or "student"
$username = $_POST["usernamePOST"]; //because we use post global variables
$password = $_POST["passwordPOST"]; //no need for $_Session variables to store it
$checkUser = $_POST["usernamePOST"];


//Make SQL query and check if that user already exists or not
//Do the below query
//insert into educordUserList(username,passwd,usertype) values('bobTheBuilder', 'bobPassword', 'instructor');
/* $sql = "insert into educordUserList(username,passwd,usertype) values('" . (string)$username . "', '" . (string)$password . "', '" . (string)$userType . "')";
$result = $conn->query($sql); */

//printf("Errormessage: %s\n", $conn->error);
//echo $result->error;
//echo $conn->error;
$sql = "select * from educordUserList WHERE username='".(string)$checkUser."'";
$result = $conn->query($sql);

if($result->num_rows > 0){ //if a user exists
    $credentialValid = false;
}else{                     //if a user does not exist and need to insert
    $credentialValid = true;
}

if($credentialValid==true){
    $sql = "insert into educordUserList(username,passwd,usertype) values('" . (string)$username . "', '" . (string)$password . "', '" . (string)$userType . "')";
    $result = $conn->query($sql);
    echo "Signup Complete for User: " . $username;
}else{
    echo "Credential Invalid";
    $conn->close();
}
$conn->close();




?>




