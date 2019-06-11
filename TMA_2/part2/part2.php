<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title id="page-title">Educord: Learn Your Way</title>
    <link rel="stylesheet" href="../shared/tma2.css">
    <link rel="stylesheet" href="part2.css">
    <link rel="icon" href="../shared/learning.png">
  </head>
  <body>
  
    <!-- Navbar -->
    <div class="topnav">
      <a href='../tma2.htm'>Home</a>
      <a href='../part1/part1.php'>Part 1</a>
      <a class="active">Part 2</a>
      <a href='../shared/doc.htm'>Full Documentation</a>
    </div>
    
    <!-- <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_ajax_display_table">How to display xml data in html</a> -->

    <br>

    <div class="educordContainer">
        <img id="educordLogo" src="../shared/educord.png"></img>
        <h2 class="welcomeEducord">Educord: World Class Learning Platform!<h1>
        <!-- <h3 class="top10Popular">Below are the most popular bookmarks: <h2> -->
        <div class="educordOptions">
       
            <button class="myButton loginButton">Login</button>
            <button class="myButton signupButton">Sign-up</button> 
            <hr class="optionDivider"></hr>
            <div>
            <div class="educordOptionsText">
                <strong style="color: #990033; font-weight: bold; font-size: large;" >Instructions</strong>
                <br>
                Select the course you wish learn about on the right hand side.
                If you are a student with access to more resources, please login as "student" using <i>"yourId"</i>.
                Also if you are an instructor wishing to update your course, login as "instructor" using <i>"yourId"</i>.
            </div>
            <hr class="optionDivider"></hr>
            <div class="educordOptionsText"> 
                <strong style="color: #990033; font-weight: bold; font-size: large;" >Announcements</strong>
                <br>
                Educord Online Learning System Launched!
            </div>
            <hr class="optionDivider"></hr>
            <div class="educordOptionsText" style="margin-bottom: 10px;">
                <strong style="color: #990033; font-weight: bold; font-size: large;" >Maintenance</strong>
                <br>
                No More Downtime for Maintenance
            </div>
            
            </div>
        </div>
        <div class="educordLessons">
            <select style="margin-left:30px" class="courseListing">
                <option value="" disabled selected>Select your course</option>
            </select>
            <div class="buttonContainer"></div>
            <div class="lectureContainer"></div>
        </div>
    </div>
    
    <footer>
        Copyright &copy; 2018 Moshiur Howlader. All rights reserved. <br/>
    </footer>
    <script src="part2.js"></script>
  </body>
</html>