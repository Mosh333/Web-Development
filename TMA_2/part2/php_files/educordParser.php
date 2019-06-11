<?php  
$servername = "localhost";
$username = "moshiurho";
$password = "moshiurhoabyz";
$database = "moshiurho";

//Helper Functions for Parsing
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

function getContents($str, $startDelimiter, $endDelimiter) {
  //https://stackoverflow.com/questions/27078259/get-string-between-find-all-occurrences-php
  $contents = array();
  $startDelimiterLength = strlen($startDelimiter);  //account for the offsets of the needles
  $endDelimiterLength = strlen($endDelimiter);  //to find the exact indexs for contents of src
  $startFrom = $contentStart = $contentEnd = 0;
  while (false !== ($contentStart = strpos($str, $startDelimiter, $startFrom))) {   //strpos returns an int if search is found
    //Use bisection search to narrow down on the links
    $contentStart += $startDelimiterLength;
    $contentEnd = strpos($str, $endDelimiter, $contentStart);
    if(false === $contentEnd) {    //if between the content start and endDelimiter 
                                   //no needle is found exit since we found the needle
        break;
    }
    $contents[] = substr($str, $contentStart, $contentEnd - $contentStart);
    $startFrom = $contentEnd + $endDelimiterLength;
  }

  return $contents;
}


function convert_documentTag($string,$coursecode, $instructor, $classname){
    //Replace all instances of <embed and </embed>
    //print $string."\n";
    $result = $string;

    //Check if <document and </document> exists
    
    //print $result."\n";
    // $linkToReplace = get_string_between($result,'src="','"></document>'); //</embed> is removed!
    // $result = str_replace("</document>", "", $result);
    ///home/moshiurho/public_html/Comp466_Assignment2/part2/course_files/Comp466_Assignment2/part2/course_files/Comp268_test/modules&references/
    //Remember, displaying from client-side, not server side!
    $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all documents lie
    $replacementLink = $baseLink.$coursecode."_".$instructor."/modules&references/";
    $result = str_replace('<document src="', '<br><br><embed class="'.(string)$classname.'" src="'.$replacementLink, $result);
    //print $linkToReplace."\n";
    //print $replacementLink."\n";
    //$result = str_replace($linkToReplace, $replacementLink, $result);
    //print $result."\n";

    return $result;
}

function convert_headingTag($string){
    //<heading> to <h2> tag
    //only one <heading> tag per module, but let's try to do with while loop
    $result = $string;

    $result = str_replace("<heading>", "<h2 class='educordModuleHeader'>", $result);
    $result = str_replace("</heading>", "</h2>", $result);
  
    return $result;
}

function convert_subheadingTag($string){
    //<heading> to <h3> tag
    //only one <heading> tag per module, but let's try to do with while loop
    $result = $string;

    $result = str_replace("<subheading>", "<h3 class='educordModuleSubheader'>", $result);
    $result = str_replace("</subheading>", "</h3>", $result);
  
    return $result;
}

function convert_codeTag($string){
    //more work can be done to properly indent code
    //but we do not bother for sake of simplicity
    $result = $string;
    
    //Support codes that end with > or ; each line
    //Too much work, and poorly designed EML to handle all code types
    //will use CSS tricks to make it bearable to view
    $result = str_replace("<code>", "<code class='educordModuleCode'>", $result);
    $result = str_replace("</code>", "</code>", $result);
  
    return $result;    
}

function convert_imageTag($string,$coursecode, $instructor){
    //only support server side stored images
    //unlike linkTag which support links of docs on server as well as URLs
    $result = $string;
    $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all images lie
    $completeLink = $baseLink.$coursecode."_".$instructor."/images/";
    $replacementLink = "<img class='educordModuleImage'".' src="'.$completeLink;
    $result = str_replace('<image src="', $replacementLink, $result);
    $result = str_replace("</image>", "</img>", $result);    
    return $result; 
}

function convert_tableTag($string){
    $result = $string;

    $result = str_replace("<table>", "<table class='educordModuleTable'>", $result);
    $result = str_replace("<row>", "<tr>", $result);
    $result = str_replace("</row>", "</tr>", $result);    
    $result = str_replace("<col>", "<th>", $result);
    $result = str_replace("</col>", "</th>", $result);
  
    return $result;    
}

function convert_lineTag($string){
    //<line> to <hr> tag
    
    $result = $string;
    $result = str_replace("<line>", "<hr class='educordModuleDivider'>", $result);
    $result = str_replace("</line>", "</hr>", $result);


    return $result;    
}

function convert_linkTag($string,$coursecode, $instructor){
    //Detect the difference of ... <link src="http ...
    //<link src="https://webfoundation.org/about/vision/history-of-the-web/">WWW History</link>
    //<link src="php_cheatsheet.pdf"></link>
    //$baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all documents lie    
    $result = $string;
    $linkClassname = '"moduleLink"';    //<a> tag, make sure the actual string contains quote characters
    
    $supported_files = array(
        'pdf',
        'doc',
        'docx'
    );
    
    $preliminaryLinkArray = getContents($string, '<link ', '</link>');
    $findLinkTextArray = getContents($string, '<link ', '/link>');
    $replacementArray = getContents($string, '<link ', '</link>');      //this array entries will be used to find text to delete
    $temp = array();
    $linkText = array();
    for($i=0; $i<count($preliminaryLinkArray); $i++){
        $temp[] = getContents($preliminaryLinkArray[$i], 'src="', '">');
    }
    for($i=0; $i<count($findLinkTextArray); $i++){
        $linkText[] = getContents($findLinkTextArray[$i], '>', '<');
    }
    $preliminaryLinkArray = $temp;      //an array of array, each entry contains an array of links for given module week
    //var_dump($preliminaryLinkArray);
    //var_dump($linkText);
    //var_dump($preliminaryLinkArray);
    
    for($i=0; $i<count($preliminaryLinkArray); $i++){
        for($j=0; $j<count($preliminaryLinkArray[$i]); $j++){   
            //process the links as needed
            //Search for either a url, or file on server then parse
            $link = $preliminaryLinkArray[$i][$j];
            //print "link is: ".$link."\n";
            $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all documents lie
            $completeLink = $baseLink.$coursecode."_".$instructor."/modules&references/".$link;
            $ext = strtolower(pathinfo($completeLink, PATHINFO_EXTENSION)); // Using strtolower to overcome case sensitive
            if(in_array($ext, $supported_files)){   //if file is in server
                //print "Was a PDF file"."\n";
                //print "linkText[i][j] is: ".$linkText[$i][$j]."\n";   
                if((int)(strlen($linkText[$i][$j]))==0){
                    $replaceLink = '<a target="_blank" class='.$linkClassname.' href="'.$completeLink.'"'.">Click To View"."</a>";
                }else{
                    $replaceLink = '<a target="_blank" class='.$linkClassname.' href="'.$completeLink.'"'.">".$linkText[$i][$j]."</a>";
                }
                $result = str_replace('<link '.$replacementArray[$i].'</link>',$replaceLink,$result);
            }else{  //if link is an external link
                //print 'not a doc'."\n";
                //Change $completeLink to the HTTP...
                //print "Was a HTTP link"."\n";
                //print "linkText[i][j] is: ".$linkText[$i][$j]."\n";
                if((int)(strlen($linkText[$i][$j]))==0){
                    $replaceLink = '<a target="_blank" class='.$linkClassname.' href="'.$link.'"'.">Click To View".".</a>";
                }else{
                    $replaceLink = '<a target="_blank" class='.$linkClassname.' href="'.$link.'"'.">".$linkText[$i][$j]."</a>";
                }
                $result = str_replace('<link '.$replacementArray[$i].'</link>',$replaceLink,$result);
            }           
        }
    }
    // var_dump($strPosArray);
    //var_dump($result);   
    //print "*******************\n";  
    return $result;
}

function convert_videoTag($string){
    //My design will only support Youtube Videos
    //possible to extend to support server stored videos
    //but not going to bother
    $result = $string;
    $linkClassname = '"moduleVideo"';    //<iframe> tag, make sure the actual string contains quote characters
    $result = str_replace('<video','<br><br><iframe class='.$linkClassname,$result);
    $result = str_replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/',$result);
    $result = str_replace('</video>','</iframe>',$result);
    
    return $result;
}

function convert_descriptionTag($string){
    //<desc> to <p> tag
    //only one <heading> tag per module, but let's try to do with while loop
    $result = $string;

    //if((strpos($result,"<heading>") && strpos($result,"</heading>"))!==false){
    $result = str_replace("<desc>", "<p class='educordModuleDescription'>", $result);
    $result = str_replace("</desc>", "</p>", $result);
    //}
    
    return $result;
}

function convert_bulletPointsTag($string){
    //<desc> to <p> tag
    //only one <heading> tag per module, but let's try to do with while loop
    $result = $string;

    $result = str_replace("<bulletPoints>", "<ul class='educordModuleBulletList'>", $result);
    $result = str_replace("</bulletPoints>", "</ul>", $result);
    $result = str_replace("<point>", "<li>", $result);
    $result = str_replace("</point>", "</li>", $result);
    
    return $result;
}

//Standalone tags
function convert_announcementTag($announceText,$date, $coursecode, $instructor){

    $result = [];
    //Date
    $dateClassname = '"announcementDate"'; //make sure the actual string contains quote characters
    $date = "<h3 class=".$dateClassname.">"."Announcement on ".$date.".</h3>";
    array_push($result, $date);
    
    //Anouncement Text
    $announceClassname = '"announcementText"';
    //$announceText = "<p class=".$announceClassname.">".$announceText."</p>";
    //print $announceText."\n";
    //Find any <document> tags and change as needed
    $announceText = convert_documentTag($announceText,$coursecode, $instructor, "educordDoc");
    $announceText = "<p class=".$announceClassname.">".$announceText."</p>"; //add <p> tag at end so 
                                                                             //convert_documentTag() is more versatile function    
    array_push($result, $announceText);
    
    //var_dump($result);
    return $result;
}
//Standalone tags
function convert_referenceTag($title, $week, $link, $referenceText, $coursecode, $instructor){
    //Note referenceTag is self-contained
    $result = [];
    $referenceTitleClassname = '"referenceTitle"';    //<h3> tag, make sure the actual string contains quote characters
    $referenceWeekClassname = '"referenceWeek"';      //<h4> tag
    $referenceLinkClassname = '"referenceLink"';      //<a> tag
    
    //print $link."\n";
    $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all documents lie
    $completeLink = $baseLink.$coursecode."_".$instructor."/modules&references/".$link;
    //print $completeLink."\n";
    
    $supported_files = array(
        'pdf',
        'doc',
        'docx'
    );
    //Below line of code check if file exists in "/modules&references/"
    //and if it exists, it strips off the extension of that existing file
    //then compares against $supported_files to see if the file is a
    //renderable document for educord
    $ext = strtolower(pathinfo($completeLink, PATHINFO_EXTENSION)); // Using strtolower to overcome case sensitive
    if(in_array($ext, $supported_files)){   //if file is in server
        //print "it's a doc"."\n";
        //Keep $completeLink the same
        //Generate appropriate HTML string code
        $referenceTitle = "<h3 class=".$referenceTitleClassname.">".$title.".</h3>";
        $referenceWeek = "<h4 class=".$referenceWeekClassname."> Relevant Lecture Week(s): ".$week.".</h4>";
        $referenceLink = '<a target="_blank" class='.$referenceLinkClassname.' href="'.$completeLink.'"'.">".$referenceText.".</a>";
        
    }else{  //if link is an external link
        //print 'not a doc'."\n";
        //Change $completeLink to the HTTP...
        $completeLink = $link;
        //Generate appropriate HTML string code
        $referenceTitle = "<h3 class=".$referenceTitleClassname.">".$title.".</h3>";
        $referenceWeek = "<h4 class=".$referenceWeekClassname."> Relevant Lecture Week(s): ".$week."</h4>";
        $referenceLink = '<a target="_blank" class='.$referenceLinkClassname.' href="'.$link.'"'.">".$referenceText.".</a>";
    }
    // print $referenceTitle."\n";
    // print $referenceWeek."\n";
    // print $referenceLink."\n";
    array_push($result, $referenceTitle);
    array_push($result, $referenceWeek);
    array_push($result, $referenceLink);
    
    // var_dump($result);
    return $result;
}

function convert_moduleTag($title, $week, $moduleText, $coursecode, $instructor){
    //Convert all the different tags that can be contained in a module tag
    //print $result."\n";
    $result = $moduleText; //$moduleText must be transformed into HTML string code
    $result = convert_headingTag($result);
    $result = convert_descriptionTag($result);
    $result = convert_lineTag($result);
    $result = convert_linkTag($result,$coursecode, $instructor);
    $result = convert_videoTag($result);
    $result = convert_subheadingTag($result);
    $result = convert_codeTag($result);
    $result = convert_tableTag($result);
    $result = convert_bulletPointsTag($result);
    $result = convert_imageTag($result,$coursecode, $instructor);
    $result = convert_documentTag($result,$coursecode, $instructor, "educordDoc educordDoc2");
    
    //Wrap in a moduleContainer
    $result = "<div class='moduleContainer' '".$title."' 'module_".$week."'>".$result."</div>";
    //var_dump($result)."\n";
    return $result;
}

//Insert new user into the database/Educord system
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_GET["announcements"])){
    // print $_GET["announcements"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";

    //Data Structures to store announcement data
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $announceTextArray = [];
    $announceDateArray = [];

    
    $sql = "select announcement,announceDate from educordAnnouncements WHERE coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    //print "Query to be done is: ".$sql."\n";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($announceTextArray,$row["announcement"]);
            array_push($announceDateArray,$row["announceDate"]);
        }
    }else{
        echo "0 results";
    }
    // var_dump($announceTextArray);
    // var_dump($announceDateArray);
    for($i=0; $i<count($announceTextArray); $i++){
        $temp = convert_announcementTag($announceTextArray[$i], $announceDateArray[$i], $_GET["coursecode"], $_GET["instructor"]);
        //print $temp."\n";
        array_push($arrayToSend,$temp);    
    }
    $arrayToSend = array_reverse($arrayToSend);
    print json_encode($arrayToSend);
    $conn->close();
}


if(isset($_GET["classlist"])){  //instructor perspective
    // print $_GET["announcements"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";
    
    $arrayToSend = [];      //store everything in this, and send as json_encode
    
    $sql = "select studentname from educordEnrolledStudents where coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($arrayToSend,$row["studentname"]);
        }
    }
    
    print json_encode($arrayToSend);
}

if(isset($_GET["viewSubmissions"])){ //instructor perspective
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $studentnameArray = [];
    $linkArray = [];
    $filenameArray = [];
    $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/submissions/"; //where all documents lie
    $sql = "select studentname, link from educordAssignmentSubmissions where coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($studentnameArray,$row["studentname"]);
            array_push($filenameArray,$row["link"]);
            $myLink = $baseLink.$row["link"];
            array_push($linkArray,$myLink);
        }
    }
    
    array_push($arrayToSend,$studentnameArray);
    array_push($arrayToSend,$linkArray);
    array_push($arrayToSend,$filenameArray);
    
    print json_encode($arrayToSend);
}

if(isset($_GET["quizMarks"])){ //instructor perspective
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $studentnameArray = [];
    $gradeArray = [];
    $quiznameArray = [];
    $submitTimeArray = [];
    $sql = "select studentname, grade, quizName, submitTime from educordQuizGrades where coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($studentnameArray,$row["studentname"]);
            array_push($gradeArray,$row["grade"]."%");
            array_push($quiznameArray,$row["quizName"]);
            array_push($submitTimeArray,$row["submitTime"]);
        }
    }
    
    array_push($arrayToSend,$studentnameArray);
    array_push($arrayToSend,$quiznameArray);
    array_push($arrayToSend,$gradeArray);
    array_push($arrayToSend,$submitTimeArray);
    
    print json_encode($arrayToSend);
}


if(isset($_GET["lectures"])){
    // print $_GET["lectures"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n
    //print "Getting Lecture Notes!"."\n";
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $arrayTemp = [];      
    $titleArray = [];
    $weekArray = [];
    $moduleTextArray = [];
    $sql = "select title,week,moduleText from educordModules WHERE coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($titleArray,$row["title"]);
            array_push($weekArray,$row["week"]);
            array_push($moduleTextArray,$row["moduleText"]);
        }
    }
    for($i=0; $i<count($titleArray); $i++){
        $temp = convert_moduleTag($titleArray[$i], $weekArray[$i], $moduleTextArray[$i], $_GET["coursecode"], $_GET["instructor"]);
        //print $temp."\n";
        array_push($arrayTemp,$temp);    
    }
    //var_dump($arrayToSend);
    //print count($arrayToSend)."\n";
    array_push($arrayToSend,$arrayTemp);    
    array_push($arrayToSend,$titleArray);
    array_push($arrayToSend,$weekArray);
    print json_encode($arrayToSend);  
    $conn->close();    
}

if(isset($_GET["courselist"])){
    // print $_GET["lectures"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n
    //print "Getting Lecture Notes!"."\n";
    $arrayToSend = [];      //store everything in this, and send as json_encode    
    $coursecodeArray = [];
    $coursenameArray = [];
    $instructorArray = [];
    $sql = "select coursecode, coursename, instructorname from educordCourseContent";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($coursecodeArray,$row["coursecode"]);
            array_push($coursenameArray,$row["coursename"]);
            array_push($instructorArray,$row["instructorname"]);
        }
    }
    //var_dump($arrayToSend);
    //print count($arrayToSend)."\n";
    array_push($arrayToSend,$coursecodeArray);    
    array_push($arrayToSend,$coursenameArray);
    array_push($arrayToSend,$instructorArray);
    print json_encode($arrayToSend);  
    $conn->close();    
}

if(isset($_GET["references"])){
    // print $_GET["announcements"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";
    // print json_encode("Hello World!");
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $titleArray = [];
    $weekArray = [];
    $linkArray = [];
    $referenceTextArray = [];
    $sql = "select title,week,link,referenceText from educordReferences WHERE coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($titleArray,$row["title"]);
            array_push($weekArray,$row["week"]);
            array_push($linkArray,$row["link"]);
            array_push($referenceTextArray,$row["referenceText"]);
        }
    }
    for($i=0; $i<count($titleArray); $i++){
        $temp = convert_referenceTag($titleArray[$i], $weekArray[$i], $linkArray[$i], $referenceTextArray[$i], $_GET["coursecode"], $_GET["instructor"]);
        //print $temp."\n";
        array_push($arrayToSend,$temp);    
    }
    print json_encode($arrayToSend);
    $conn->close();
}

if(isset($_GET["assignments"])){ //student's request to see assignment lists
    // print $_GET["assignments"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";    
    //Get assignment names for the course and return in array
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $weekArray = [];
    $linkArray = [];
    $dueDateArray = [];
    $assignmentTextArray = [];
    $absLinkArray = [];
    $baseLink = "http://student.athabascau.ca/~moshiurho/Comp466_Assignment2/part2/course_files/"; //where all documents lie
    $baseLink = $baseLink.$_GET["coursecode"]."_".$_GET["instructor"]."/assignments/";
    $sql = "select week,link,dueDate,assignmentText from educordAssignments WHERE coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    $result = $conn->query($sql);    
    
    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($weekArray,$row["week"]);
            array_push($linkArray,$row["link"]);
            array_push($dueDateArray,$row["dueDate"]);
            array_push($assignmentTextArray,$row["assignmentText"]);

            $myTempAbsLink = $baseLink.$row["link"];
            array_push($absLinkArray,$myTempAbsLink);
        }
    }    

    array_push($arrayToSend,$assignmentTextArray);
    array_push($arrayToSend,$linkArray);
    array_push($arrayToSend,$dueDateArray);  
    array_push($arrayToSend,$weekArray);
    array_push($arrayToSend,$absLinkArray);
  
    print json_encode($arrayToSend);
    $conn->close();
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){ //for submitting student's assignments

    if (isset($_FILES['myFiles'])) {
        $errors = [];
        $path = dirname( dirname(__FILE__) ).'/submissions/';    //"sampleEML_zip/"; This one works
        //print "path is: ".$path."\n";
        $extensions = ['doc', 'docx', 'pdf', 'zip'];

        $all_myFiles = count($_FILES['myFiles']['tmp_name']);
        
        for ($i = 0; $i < $all_myFiles; $i++) {
            $file_name = $_FILES['myFiles']['name'][$i];
            $file_tmp = $_FILES['myFiles']['tmp_name'][$i];
            $file_type = $_FILES['myFiles']['type'][$i];
            $file_size = $_FILES['myFiles']['size'][$i];
            $file_ext = strtolower(end(explode('.', $_FILES['myFiles']['name'][$i])));

            $file = $path . $file_name; //"/home/moshiurho/public_html/Comp466_Assignment2/part2/php_files" . 
            print "path is: ".$file."\n";
            if (!in_array($file_ext, $extensions)) {
                $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
            }
            
            if(move_uploaded_file($file_tmp, $file)){        
                print "File transferred correctly!!!";
                //Store the name of the file into the database
                $explodeFileName = explode("_",$file_name);
                $studentname = $explodeFileName[0];
                $coursecode = $explodeFileName[2];
                $instructorname = explode(".",$explodeFileName[3]);
                $instructorname = $instructorname[0];
                var_dump($explodeFileName);
                //moduleText) values('Comp 466','The Web','1','<heading>History of the Internet/Web</heading>
                $sql = "select * from educordAssignmentSubmissions where link='".$file_name."'";
                $result = $conn->query($sql);
                if($result->num_rows == 0){
                    $sql = "insert into educordAssignmentSubmissions(studentname,coursecode,link,instructorname) values('".$explodeFileName[0]."','".$coursecode."','".$file_name."','".$instructorname."')";
                    print "sql is: ".$sql."\n";
                    $conn->query($sql);
                    print "Inserted user into submission: ".$studentname."\n";
                }else if($result->num_rows > 0){
                    //delete from educordAssignmentSubmissions where link="best_Assignment1_Comp268_test.pdf";
                    $sql = "delete from educordAssignmentSubmissions where link='".$file_name."'";
                    $conn->query($sql);
                    print "sql is: ".$sql."\n";
                    print "Delete old data!\n";
                    $sql = "insert into educordAssignmentSubmissions(studentname,coursecode,link,instructorname) values('".$explodeFileName[0]."','".$coursecode."','".$file_name."','".$instructorname."')";
                    print "sql is: ".$sql."\n";
                    $conn->query($sql);
                    print "Inserted user into submission: ".$studentname."\n";
                }
                $conn->close();
            }
        }
    }
}

if(isset($_GET["quizzes"])){
    // print $_GET["quizzes"]."\n";
    // print $_GET["instructor"]."\n";
    // print $_GET["coursecode"]."\n";
    $arrayToSend = [];      //store everything in this, and send as json_encode
    $quizNameArray = [];
    $weekArray = [];
    $questionArray = [];
    $choiceA_Array = [];
    $choiceB_Array = [];
    $choiceC_Array = [];
    $choiceD_Array = [];
    $answerArray = [];
    $sql = "select * from educordQuizQuestions where coursecode='".$_GET["coursecode"]."' and instructorname='".$_GET["instructor"]."'";
    //print "sql query is: ".$sql."\n";
    $result = $conn->query($sql);
    //print "result of query is: ".$result."\n";
    if($result->num_rows > 0){
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($quizNameArray,$row["quizName"]);
            array_push($weekArray,$row["week"]);
            array_push($questionArray,$row["question"]);
            array_push($choiceA_Array,$row["choiceA"]);
            array_push($choiceB_Array,$row["choiceB"]);
            array_push($choiceC_Array,$row["choiceC"]);
            array_push($choiceD_Array,$row["choiceD"]);
            array_push($answerArray,$row["answer"]);
        }
    }
    array_push($arrayToSend,$quizNameArray);
    array_push($arrayToSend,$weekArray);
    array_push($arrayToSend,$questionArray);
    array_push($arrayToSend,$choiceA_Array);
    array_push($arrayToSend,$choiceB_Array);
    array_push($arrayToSend,$choiceC_Array);
    array_push($arrayToSend,$choiceD_Array);
    array_push($arrayToSend,$answerArray);
    
    print json_encode($arrayToSend);
    $conn->close();
}


if(isset($_POST["uploadQuizMark"])){
    print $_POST["uploadQuizMark"]."\n";
    print $_POST["student"]."\n";
    print $_POST["grade"]."\n";
    print $_POST["coursecode"]."\n";
    print $_POST["quizName"]."\n";
    print $_POST["instructor"]."\n";

    date_default_timezone_set("America/Toronto");
    $timeStamp = date("Y-m-d H:i:s")."\n";
    
    //Check if the user did better than previous attempt
    $sql = "select * from educordQuizGrades where quizName='".$_POST["quizName"]."' and studentname='".$_POST["student"]."' and instructorname='".$_POST["instructor"]."' and coursecode='".$_POST["coursecode"]."'";
    $result = $conn->query($sql);
    if($result->num_rows == 0){
        $sql = "insert into educordQuizGrades(studentname,grade,coursecode,submitTime,quizName,instructorname) values('".$_POST["student"]."','".$_POST["grade"]."','".$_POST["coursecode"]."','".$timeStamp."','".$_POST["quizName"]."','".$_POST["instructor"]."')";
                
        print "sql is: ".$sql."\n";
        $conn->query($sql);
        print "Inserted user into submission: ".$_POST["student"]."\n";
    }else if($result->num_rows > 0){
        // output data of each row
        $newMarkBetter = false;
        while($row = $result->fetch_assoc()) {
            if((float)$_POST["grade"] > (float)$row["grade"]){
                $newMarkBetter = true;
            }
        }
        
        if($newMarkBetter){
            $sql = "delete from educordQuizGrades where quizName='".$_POST["quizName"]."' and studentname='".$_POST["student"]."' and instructorname='".$_POST["instructor"]."' and coursecode='".$_POST["coursecode"]."'";
            print "sql is: ".$sql."\n";
            $conn->query($sql);
            $sql = "insert into educordQuizGrades(studentname,grade,coursecode,submitTime,quizName,instructorname) values('".$_POST["student"]."','".$_POST["grade"]."','".$_POST["coursecode"]."','".$timeStamp."','".$_POST["quizName"]."','".$_POST["instructor"]."')";     
            print "sql is: ".$sql."\n";
            $conn->query($sql);
        }

        print "Inserted user into submission: ".$studentname."\n";
    }
    
    $conn->close();
}


















