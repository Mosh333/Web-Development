<?php

$hostname = "localhost";
$username = "moshiurho";
$password = "moshiurhoabyz";
$database = "moshiurho";

$dbh = mysql_connect($hostname, $username, $password)
        or die("Unable to connect to MySQL");
$selected = mysql_select_db($database,$dbh)
        or die("Could not select database $database");
print "Connected to MySQL database $database";
mysql_close($dbh);

?>