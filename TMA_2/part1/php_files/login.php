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

$data_to_echo = "";
$linkId_data = "";
$urlLink_data = "";
$credentialValid = false;
$passwd_Array = array();
$username = $_POST["usernamePOST"];
$checkUser = $_POST["usernamePOST"];
$checkPasswd = $_POST["passwordPOST"];
//echo var_dump($_POST);
//echo $checkUser;
//echo "_";
//echo $checkPasswd;
//echo " ";
//select passwd from userList WHERE username='mosh333'; the query to do
$sql = "select passwd from userList WHERE username='".(string)$checkUser."'";//"select * from bookmark";
//echo $sql;
$result = $conn->query($sql);

if($result->num_rows > 0){
    //echo "Greater than 0 rows!<br/>\n";
    //output data of each row si
    while($row = $result->fetch_assoc()){
        //echo "LinkId: " . $row["LinkId"] . " urlLink: " . $row["urlLink"] . " username: " . $row["username"] . "<br/>\n";
        array_push($passwd_Array, $row["passwd"]);
    }
}else{
        //echo "0 results";
}
for($i = 0; $i < count($passwd_Array); $i++) {
    //Here check if a combination matches,
    //if it does, then echo back with appropriate data,
    //else just echo "invalid"
    if($passwd_Array[$i]==$checkPasswd){
        //echo "Credential Valid";
        $credentialValid=true;
    }
    //echo $passwd_Array[$i] . "_";
}

if($credentialValid==false){
    echo "Credential Invalid";
    $conn->close();
}else if($credentialValid==true){
    //since credentials were valid,
    //we will send a message containing all the bookmark
    //info for that given user ($checkuser)
    
    //select * from bookmark where username='mosh333';
    $sql = "select * from bookmark where username='" . $username . "'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        //output data of each row
        while($row = $result->fetch_assoc()){
            $linkId_data = $linkId_data . (string)$row["LinkId"] . "_";
            $urlLink_data = $urlLink_data . (string)$row["urlLink"] . "_";
        }
        //$data_to_echo = $linkId_data . $username . "_" . $urlLink_data;
        $urlLink_data = $username . "_" . $urlLink_data;
        $data_to_echo = substr($urlLink_data, 0, -1);
        echo $data_to_echo;
    }else{
        echo $username;
    }
}


$conn->close();


//https://www.tutorialspoint.com/php/php_mysql_login.htm
//You can embed the <?php ?< as well the html to render
//after login is successful, render the app for the logged in user
//https://stackoverflow.com/questions/2954961/execute-php-without-leaving-page
//also figure out how to execute php without leaving page by using Ajax

//Server side
//Use the global variable $_POST to verify the MYSQL table userList
//see if the user exists, if they do send the result back to client through AJAX

//Client Side
//Algorithm
//Once the user submits the username and password
//use ajax and send the info to php through $_POST
//get back the result again with Ajax,
//then update the page
?>