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

if(isset($_GET["selectCourse"])){
    if($_GET["selectCourse"]=="instructor"){
        //Go to database and retrieve list of available uploaded courses
        //print "selectCourse is: ".$_GET["selectCourse"]."\n";
        //print "user is: ".$_GET["user"]."\n";
        
        //select * from educordCourseContent where instructorname="test";
        $arrayToSend = [];
        $coursecodeArray = [];
        $coursetypeArray = [];
        $coursenameArray = [];
        
        $sql = "select * from educordCourseContent where instructorname='".$_GET["user"]."'";
        //print "sql query is: ".$sql."\n";
        $result = $conn->query($sql);
        
        if($result->num_rows > 0){
            // output data of each row
            while($row = $result->fetch_assoc()) {
                array_push($coursecodeArray,$row["coursecode"]);
                array_push($coursetypeArray,$row["coursetype"]);
                array_push($coursenameArray,$row["coursename"]);
            }
        }else{
            echo "0 results";
        }    
        //Use JSON encode decode to efficiently transfer data
        array_push($arrayToSend,$coursecodeArray);
        array_push($arrayToSend,$coursetypeArray);
        array_push($arrayToSend,$coursenameArray);
        print json_encode($arrayToSend);    
        
    }if($_GET["selectCourse"]=="student"){
        if($_GET["request"]=="listCourse"){
            //print json_encode("Output entire Educord Courses!");
            $arrayToSend = [];
            $coursecodeArray = [];
            $coursenameArray = [];
            $instructorArray = [];            
            $sql = "select coursecode, coursename, instructorname from educordCourseContent;";
            $result = $conn->query($sql);
            if($result->num_rows > 0){
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    array_push($coursecodeArray,$row["coursecode"]);
                    array_push($coursenameArray,$row["coursename"]);
                    array_push($instructorArray,$row["instructorname"]);
                }
            }else{
                echo "0 results";
            }    
            //Use JSON encode decode to efficiently transfer data
            array_push($arrayToSend,$coursecodeArray);
            array_push($arrayToSend,$coursenameArray);
            array_push($arrayToSend,$instructorArray);
            print json_encode($arrayToSend);
            
        }else if($_GET["request"]=="listEnrolment"){
            //Given a student name, return relevant data from "educordEnrolledStudents" table
            //In other words, return list of courses given student is enrolled in
            $arrayToSend = [];
            $coursecodeArray = [];
            $coursenameArray = [];
            $instructorArray = [];
            $sql = "select coursecode, coursename, instructorname from educordEnrolledStudents where studentname='".$_GET["user"]."'";
            $result = $conn->query($sql);
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()) {
                    array_push($coursecodeArray,$row["coursecode"]);
                    array_push($coursenameArray,$row["coursename"]);
                    array_push($instructorArray,$row["instructorname"]);
                }
            }else{
                echo "0 results";
            }
            //print json_encode("Retrieve Classlist and output all enrolled courses");      
            array_push($arrayToSend,$coursecodeArray);
            array_push($arrayToSend,$coursenameArray);
            array_push($arrayToSend,$instructorArray);
            print json_encode($arrayToSend);
            
        }else if($_GET["request"]=="enrollStudent"){
            //Insert Student into a specific course
            //print json_encode("Time for enrollment")."\n";
            $arrayToSend = [];
            array_push($arrayToSend,$_GET["coursecode"]);
            array_push($arrayToSend,$_GET["coursename"]);
            array_push($arrayToSend,$_GET["instructorname"]);
            //Only insert if the student is not enrolled in the course regardless of the instructor
            $sql = "select * from educordEnrolledStudents where studentname='".$_GET["user"]."' and coursecode='".$_GET["coursecode"]."'";
            $result = $conn->query($sql);
            if($result->num_rows == 0){
                $sql = "insert into educordEnrolledStudents(studentname,coursecode,coursename,instructorname) values('" . $_GET["user"] . "', '" . $_GET["coursecode"] . "', '" . $_GET["coursename"] . "', '" . $_GET["instructorname"] . "')";
                $conn->query($sql); //insert or enroll student into database
                print json_encode($arrayToSend);
            }else{
                print json_encode("cannot enroll");
            }

            // print json_encode($arrayToSend);
            // print $_GET["coursecode"]."\n";
            // print $_GET["selectCourse"]."\n"; selectCourse.php
            // print $_GET["user"]."\n";
            // print $_GET["request"]."\n";
            // print $_GET["instructorname"]."\n";
            
        }else if($_GET["request"]=="withdrawStudent"){
            //Remove Student from a specific course
            $sql = "delete from educordEnrolledStudents where studentname='".$_GET["user"]."' and coursecode='".$_GET["coursecode"]."'";
            $conn->query($sql); //withdraw student from database
            print json_encode('Withdrew student "'.$_GET["user"].'" from '.$_GET["coursecode"].".");
        }
        
    }
    
    $conn->close();
}