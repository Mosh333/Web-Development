<?php
$servername = 'student.athabascau.ca';
$username = 'moshiurho';
$password = 'moshiurhoabyz';
$dbname = 'moshiurho';
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    print "Connected to MySQL database $database";
} 
?>