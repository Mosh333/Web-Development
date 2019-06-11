<?php
$servername = "localhost"; //"sql312.unaux.com";//
$username = "moshiurho"; //"unaux_23022042";//
$password = "moshiurhoabyz";//"moshiur391";
$database = "moshiurho";

//Insert new user into the database/BookIt system
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$credentialValid = false;
$passwd_Array = array();
$username = $_POST["usernamePOST"]; //because we use post global variables
$password = $_POST["passwordPOST"]; //no need for $_Session variables to store it
$checkUser = $_POST["usernamePOST"];


//Make SQL query and check if that user already exists or not
//select username from userList where username='mosh333'; the query to do
$sql = "select passwd from userList WHERE username='".(string)$checkUser."'";//"select * from bookmark";
$result = $conn->query($sql);

if($result->num_rows > 0){ //if a user exists
    //echo "Greater than 0 rows!<br/>\n";
    //output data of each row si
    $credentialValid = false;
}else{
    $credentialValid = true;
    //echo "0 results";
}


if($credentialValid==true){
    //insert new user into the system
    //insert into userList(username, passwd) values('mosh333', 'mosh391'); the query to do
    $sql = "insert into userList(username, passwd) values('" . (string)$username . "', '" . (string)$password . "')";//"select * from bookmark";
    $result = $conn->query($sql);
    echo "Signup Complete for User: " . $username;
}else{
    echo "Credential Invalid";
    $conn->close();
}
$conn->close();




?>




