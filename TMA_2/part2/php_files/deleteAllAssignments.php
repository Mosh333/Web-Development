<?php 

//Delete stuff with script since Apache permissions deny you from
//deleting stuff with winscp

//source http://thisinterestsme.com/php-delete-all-files-from-a-folder/

//Use recursion to delete each file, and all files from each
//sub-directory

function deleteAll($str) {
    //It it's a file.
    if (is_file($str)) {
        //Attempt to delete it.
        return unlink($str);
    }
    //If it's a directory.
    elseif (is_dir($str)) {
        //Get a list of the files in this directory.
        $scan = glob(rtrim($str,'/').'/*');
        //Loop through the list of files.
        foreach($scan as $index=>$path) {
            //Call our recursive function.
            deleteAll($path);
        }
        //Remove the directory itself.
        return @rmdir($str);
    }
}

deleteAll('/home/moshiurho/public_html/Comp466_Assignment2/part2/submissions/');


$servername = "localhost";
$username = "moshiurho";
$password = "moshiurhoabyz";
$database = "moshiurho";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "truncate educordAssignmentSubmissions";
//print "Query to be done is: ".$sql."\n";
$conn->query($sql);
$conn->close();

print "Deleted All Assignment Submissions.";