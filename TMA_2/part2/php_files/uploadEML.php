<?php 

//This php script will:
// 1) Upload the zip, and the folder by unzipping it into "/home/moshiurho/public_html/Comp466_Assignment2/part2/course_files"
// 2) Stores the contents of the EML XML file and storing it in
//      in the database in unprocessed form

//http://www.justin-cook.com/2006/03/31/php-parse-a-string-between-two-strings/
//Given a string, find the substring between two specified strings A and B
// myString = ".....A mySubString B....";
function get_string_between($string, $start, $end){
	$string = " ".$string;
	$ini = strpos($string,$start);
	if ($ini == 0) return "";
	$ini += strlen($start);   
	$len = strpos($string,$end,$ini) - $ini;
	return substr($string,$ini,$len);
}

function get_entry_dates($xmlFile,$index){
    return $xmlFile->announcements->announce['date'];
}

//Custom Function To Efficiently Store educordAnnouncements and Modules
//by extracting only the raw contents of each entries
function get_entry_text($text, $attribute1, $attribute2){

/*     $attribute1 = '<module';
    $attribute2 = '</module>'; */
    $attribute1 = substr($attribute1, 0, -1); //'<announce'; trim last char
    // print "text is: ".$text."\n";
    // print "attribute1 is: ".$attribute1."\n";
    // print "attribute2 is: ".$attribute2."\n";
    $positionText1 = $text;
    $positionText2 = $text;
    $textArray = str_split($text);
    
    $length = count($textArray);
    $length2 = strlen($text);
    
    //Find <announce
    if(strlen($attribute1) > strlen($positionText1))
        trigger_error(sprintf("%s: length of argument 2 must be <= argument 1", __FUNCTION__), E_USER_WARNING);

    $beginPositions = array();
    while($beginPosition = strrpos($positionText1, $attribute1))
    {
        array_push($beginPositions, $beginPosition);
        $positionText1 = substr($positionText1, 0, $beginPosition);
    }
    //print_r($beginPositions);
    //print_r($textArray);
    //Adjust beginPositions to go to closest neighbour ">"
    for($j=0; $j<count($beginPositions); $j++){ //better way is to use a while loop
        for($k=0; $k<2000; $k++){
            //print $textArray[$beginPositions[$j]+$k]."\n";
            if($textArray[$beginPositions[$j]+$k]==">"){
                //print "Found a '>' at k=".$k."\n";
                break;
            }
        }
        $beginPositions[$j] = $beginPositions[$j]+$k;
    }
    
    //print_r($beginPositions);
    //Find </announce>
    if(strlen($attribute2) > strlen($positionText2))
        trigger_error(sprintf("%s: length of argument 2 must be <= argument 1", __FUNCTION__), E_USER_WARNING);

    $endPositions = array();
    while($endPosition = strrpos($positionText2, $attribute2))
    {
        array_push($endPositions, $endPosition);
        $positionText2 = substr($positionText2, 0, $endPosition);
    }
    //print_r($endPositions);
    //print_r($text);
    
    $resultText = array();
    
    for($j=0; $j<count($beginPositions); $j++){
        $tempText = substr($text, $beginPositions[$j]+1,$endPositions[$j]-$beginPositions[$j]-1);
        $tempText = trim($tempText);    //trim the extra spaces from front and back
        array_push($resultText, $tempText);
    }
    
    //print "Moshiur "."\n";
    //print_r($resultText); //note algorithm reads text bottom up

    return array_reverse($resultText);

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //print "Received POST request!";
    //echo getcwd() . "\n";
    if (isset($_FILES['myFiles'])) {
        //print "Detected Files Upload\r\n";
        $errors = [];
        $path = dirname( dirname(__FILE__) ).'/course_files/';    //"sampleEML_zip/"; This one works
        //print "path is: ".$path."\n";
        $extensions = ['zip'];//['jpg', 'jpeg', 'png', 'gif', 'pdf', 'zip'];

        $all_myFiles = count($_FILES['myFiles']['tmp_name']);
        //print "number of files detected: ".$all_myFiles."\r\n";
        
        for ($i = 0; $i < $all_myFiles; $i++) {
            //print "value of i is: ".$i."\n";
            $file_name = $_FILES['myFiles']['name'][$i];
            //print "file_name is: ".$file_name."\n";
            $file_tmp = $_FILES['myFiles']['tmp_name'][$i];
            //print "file_tmp is: ".$file_tmp."\n";
            $file_type = $_FILES['myFiles']['type'][$i];
            //print "file_type is: ".$file_type."\n";
            $file_size = $_FILES['myFiles']['size'][$i];
            //print "file_size is: ".$file_size."\n";
            $file_ext = strtolower(end(explode('.', $_FILES['myFiles']['name'][$i])));

            $file = $path . $file_name; //"/home/moshiurho/public_html/Comp466_Assignment2/part2/php_files" . 

            
            if (!in_array($file_ext, $extensions)) {
                $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
            }

            //print "file_tmp is: ".$file_tmp."\n";
            //print "file is: ".$file."\n";
            if(move_uploaded_file($file_tmp, $file)){
                //Unzip, and maybe delete zip?
                //print "Did work.\n";
                $zip = new ZipArchive;
                $res = $zip->open($file);
                if ($res === TRUE) {
                    $zip->extractTo($path);
                    $zip->close();
                    //print 'woot!'."\n";

                    //Time to translate the contents
                    //note all variables this calling file are
                    //available in uploadEML_Database.php
                    include "/php_files/uploadEML_database.php";
                    //We develop here that paste into the file above
                    $servername = "localhost";
                    $accountname = "moshiurho";
                    $dbPasswd = "moshiurhoabyz";
                    $database = "moshiurho";
                  
                    //Insert new user into the database/Educord system
                    // Create connection
                    $conn = new mysqli($servername, $accountname, $dbPasswd, $database);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }
                    
                    $credentialValid = false;
                    $username = ""; //because we use post global variables
                    $password = ""; //irrelevant
                    $userType = "instructor"; //this stores "instructor" or "student"
                    $coursename = "";
                    
                    //Set username value to user
                    $file_delimited = explode("_",$file);
                    print_r($file_delimited);
                    $username = $file_delimited[count($file_delimited)-1];
                    $username = explode(".",$username); //or $username = substr($username, 0, -4); //remove .zip
                    $username = $username[0];
                    print "username is: ".$username."\n"; //Array
                    $coursename = $file_delimited[count($file_delimited)-2];
                    $coursename = explode("/",$coursename);
                    $coursename = $coursename[1];
                    print "coursename is: ".$coursename."\n"; //Array
                    
                    print "Final username is: ".$username."\n";
                    print "Final coursename is: ".$coursename."\n";
                    
                    //Now make sure that the user is an instructor
                    //Do this query: <<<<<select * from educordUserList where username="test" and usertype="student";>>>>>
                    $sql = "select * from educordUserList WHERE username='".(string)$username."' and usertype='".(string)$userType."'";
                    $result = $conn->query($sql);

                    if($result->num_rows > 0){ //if a user exists proceed with uploading EML to database
                        $credentialValid = true;                        
                    }else{
                        $credentialValid = false; //else stop                        
                    }                    
                    //Use PHP magic to read the .XML file and store
                    //the file piece by piece into the SQL tables
                    if($credentialValid){
                        //print "Time for PHP magics!\n";
                        //Find the .XML file and store contents into database
                        $xmlFile = dirname(dirname(__FILE__))."/course_files/".$coursename."_".$username."/".$coursename."_".$username.".xml";
                        $readingFile = file_get_contents($xmlFile); //"/home/moshiurho/public_html/Comp466_Assignment2/part2/course_files/Comp466_test/Comp466_test.xml"
                        //print $readingFile."\n";
                        //echo htmlspecialchars(file_get_contents("/home/moshiurho/public_html/Comp466_Assignment2/part2/course_files/Comp466_test/Comp466_test.xml"), ENT_QUOTES);
                        //Use built-in SimpleXML Parser for some of the easy processing
                        $xmlFile=simplexml_load_string($readingFile) or die("Error: Cannot create object");
                        //print_r($xmlFile);
                        
                        print "Username is: ".$username."\n";
                        // Create connection
                        $servername = "localhost";
                        $accountID = "moshiurho";
                        $dbPasswd = "moshiurhoabyz";
                        $database = "moshiurho";
                        $conn = new mysqli($servername,$accountID, $dbPasswd,$database);

                        // Check connection
                        if ($conn->connect_error) {
                            die("Connection failed: " . $conn->connect_error);
                        }

                        //Initialize Course Content
                        print "Initialize Course Content"."\n";
                        $coursecode = $xmlFile[courseCode];
                        print $coursecode."\n";
                        $coursetype = $xmlFile[courseType];
                        print $coursetype."\n";
                        $coursename = $xmlFile[courseName];
                        print $coursename."\n";
                        $instructorname = $username;
                        
                        //Clear all entries related to $coursecode
                        //to overwrite it with the new stuff, not sure
                        //if need because PRIMARY KEY?

                        $sql = "DELETE from educordAnnouncements WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        $sql = "DELETE from educordModules WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        $sql = "DELETE from educordReferences WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        $sql = "DELETE from educordAssignments WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        $sql = "DELETE from educordQuizQuestions WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        $sql = "DELETE from educordCourseContent WHERE coursecode='".(string)$coursecode."' and instructorname='".$instructorname."'";
                        $result = $conn->query($sql);
                        
                        //while ($conn->next_result()) {;} // flush multi_queries
                        print "***********CourseContent*************\n";
                        //$sql4 = "insert into educordCourseContent(coursecode,coursetype,coursename,instructorname) values('Comp466','Computer Science','Web Dev','test')";
                        //$conn->query($sql);
                        $sql = "insert into educordCourseContent(coursecode,coursetype,coursename,instructorname) values('".$coursecode."','".$coursetype."','".$coursename."','".$instructorname."')";
                        $conn->multi_query($sql);
                        //print $sql."\n";
                        //print $sql4."\n";
                        //$testing2 = "insert into educordQuizQuestions(coursecode,quizName,week,question,choiceA,choiceB,choiceC,choiceD,answer) values('Comp 466','HTML and CSS Quiz','1,2,3,4','What does HTML stand for?','High Transmisson Mail Letter','High Transmission Message Line','Hypertext Markup Language','Hypertext Message Link','choiceC');";
                            
                        print "***********Announcements*************\n";
                        unset($sql);
                        $announcementText = get_entry_text(get_string_between($readingFile, "<announcements>", "</announcements>"),"<announce>","</announce>");
                        for($j=0;$j<count($announcementText);$j++){
                            $announceDate = $xmlFile->announcements->announce[$j]['date'];
                            $announcement = $announcementText[$j];
                            $sql = "insert into educordAnnouncements(coursecode,announcement,announceDate,instructorname) values('".$coursecode."','".$announcement."','".$announceDate."','".$instructorname."'); ";
                            $conn->query($sql);
                        }
                        
                        print "************References***************\n";
                        //$referenceText = get_entry_text(get_string_between($readingFile, "<references>", "</references>"),"<reference>","</reference>");
                        for($j=0;$j<$xmlFile->references->reference->count();$j++){
                            $link = $xmlFile->references->reference[$j]['src'];
                            $week = $xmlFile->references->reference[$j]['week'];
                            $title = $xmlFile->references->reference[$j]['title'];
                            $referenceText = $xmlFile->references->reference[$j];
                            $sql = "insert into educordReferences(coursecode,title,week,link,referenceText,instructorname) values('".$coursecode."','".$title."','".$week."','".$link."','".$referenceText."','".$instructorname."'); ";
                            
                            //print $sql."\n";
                            $conn->query($sql);
                        }
                        
                        
                        print "************Assignments***************\n";
                        for($j=0;$j<$xmlFile->assignments->assignment->count();$j++){
                            $link = $xmlFile->assignments->assignment[$j]['src'];
                            $dueDate = $xmlFile->assignments->assignment[$j]['due'];
                            $week = $xmlFile->assignments->assignment[$j]['week'];
                            $assignmentText = $xmlFile->assignments->assignment[$j];
                            $sql = "insert into educordAssignments(coursecode,week,link,dueDate,assignmentText,instructorname) values('".(string)$coursecode."','".(string)$week."','".(string)$link."','".(string)$dueDate."','".(string)$assignmentText."','".(string)$instructorname."'); ";
                            
                            //print $sql."\n";
                            $conn->query($sql);
                        }
                        
                        
                        print "************Quizzes***************\n";
                        for($j=0;$j<$xmlFile->quizzes->quiz->count();$j++){
                            for($k=0;$k<$xmlFile->quizzes->quiz[$j]->question->count();$k++){
                                $week = $xmlFile->quizzes->quiz[$j]['week'];
                                $quizName = $xmlFile->quizzes->quiz[$j]['title'];
                                $question = $xmlFile->quizzes->quiz[$j]->question[$k]['text'];
                                $choiceA = $xmlFile->quizzes->quiz[$j]->question[$k]->choiceA; //seems like
                                $choiceB = $xmlFile->quizzes->quiz[$j]->question[$k]->choiceB; //doesn't like
                                $choiceC = $xmlFile->quizzes->quiz[$j]->question[$k]->choiceC; //->textContent
                                $choiceD = $xmlFile->quizzes->quiz[$j]->question[$k]->choiceD;
                                $answer = $xmlFile->quizzes->quiz[$j]->question[$k]->answer;
                                $sql = "insert into educordQuizQuestions(coursecode,quizName,week,question,choiceA,choiceB,choiceC,choiceD,answer,instructorname) values('".(string)$coursecode."','".(string)$quizName."','".(string)$week."','".(string)$question."','".(string)$choiceA."','".(string)$choiceB."','".(string)$choiceC."','".(string)$choiceD."','".(string)$answer."','".(string)$instructorname."')";
                                
                                // var_dump($sql);
                                // var_dump($testing2);
                                // $sameThing = strcmp($sql,$testing2);
                                // print $sameThing."\n";
                                //$conn->query("insert into educordQuizQuestions(coursecode,quizName,week,question,choiceA,choiceB,choiceC,choiceD,answer) values('Comp 466','HTML and CSS Quiz','1,2,3,4','What does HTML stand for?','High Transmisson Mail Letter','High Transmission Message Line','Hypertext Markup Language','Hypertext Message Link','choiceC');");
                                $conn->query($sql);
                            }
                        }

                        //Debug the beast
                        print "************Modules***************\n";
                        //unset($sql);
                        $moduleString = get_entry_text(get_string_between($readingFile, "<modules>", "</modules>"),"<module>","</module>");
                        for($j=0;$j<count($moduleString);$j++){
                            $week = $xmlFile->modules->module[$j]['week'];
                            $title = $xmlFile->modules->module[$j]['title'];
                            $moduleText = mysqli_real_escape_string($conn,$moduleString[$j]);//mysql_real_escape_string($moduleString[$j]) was able to upload 10000 char data
                            print strlen($moduleText)."\n";
                            $sql = "insert into educordModules(coursecode,title,week,moduleText,instructorname) values('".$coursecode."','".$title."','".$week."','".$moduleText."','".$instructorname."'); ";
                            $conn->query($sql);
                            //print $sql."\n";
                            var_dump($sql);
                        }            
                        //$sql = "insert into educordModules(coursecode,title,week,moduleText) values('Comp 466','Hello Guys!','21','texttt'); insert into educordModules(coursecode,title,week,moduleText) values('Comp 466','Hello Guys!','21','texttt'); ";
                        //print $sql."\n";
                        // print count($moduleString)."\n";
                        // $conn->multi_query($sql);
                        // print "Any issues?: ".$conn->error."\n"; */                        
                        
                        $conn->close();
                        
                    }else{
                        //print "Not time for PHP magics :(\n";
                    }
                } else {
                  //echo 'doh!';
                }
            }else{
                //print "Did not work.";
            }
            
/*             if (empty($errors)) {
                
                print "Temp File name: ".$file_tmp."\r\n";
                print "Final File name: ".$file;
                $resulting = move_uploaded_file($file_tmp, $file);
                print "resulting is: ".$resulting."\n";
                print "Should have uploaded files in server now!\r\n";
            } */
        }

        if ($errors) print_r($errors);
    }
}