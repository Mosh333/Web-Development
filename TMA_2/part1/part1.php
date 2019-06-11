<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title id="page-title">BookIt: Online Bookmarker</title>
    <link rel="stylesheet" href="../shared/tma2.css">
    <link rel="stylesheet" href="part1.css">
    <link rel="icon" href="../shared/bookmark.png">
  </head>
  <body>
  
    <!-- Navbar -->
    <div class="topnav">
      <a class="home" href='../tma2.htm'>Home</a>
      <a class="active part1">Part 1</a>
      <a class="part2" href='../part2/part2.php'>Part 2</a>
      <a class="doc" href='../shared/doc.htm'>Full Documentation</a>
    </div>
    
    <div class="bookmarkerContainer">
        <img id="bookItLogo" src="../shared/bookIt.png"></img>
        <button class="myButton signupButton">Sign-up</button>        
        <button class="myButton loginButton">Login</button>
        <h2 class="welcomeBookIt">Welcome to BookIt: time for you to bookmark!<h1>
        <h3 class="top10Popular">Below are the most popular bookmarks: <h2>
        <?php include 'php_files/loadTop10Link.php';?>
    </div>

    <footer>
        Copyright &copy; 2018 Moshiur Howlader. All rights reserved. <br/>
    </footer>
    <script src="part1.js"></script>
  </body>
</html>