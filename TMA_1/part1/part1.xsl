<?xml version="1.0" encoding="UTF-8"?>


<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="resume">
        <html>
            <head>
                <!-- For some reason linking the css stylesheet doesn't do anything... :( -->
                <!-- <link rel="stylesheet" type="text/css" href="..\shared\main.css"> -->
                <title id="page-title">part1.xsl</title>
                <style>
                    <!-- <link rel="stylesheet" type="text/css" href="part1.css"> -->
                    <!-- <link rel="stylesheet" type="text/css" href="..\shared\main.css"> -->
                                        <!-- /* Top Nav Bar */
                    /* Add a black background color to the top navigation */ -->
                    .topnav {
                        background-color: #333;
                        overflow: hidden;
                        margin-left: 30px;
                        margin-right: 30px;
                    }

                    <!-- /* Style the links inside the navigation bar */ -->
                    .topnav a {
                        float: left;
                        color: #f2f2f2;
                        text-align: center;
                        padding: 14px 16px;
                        text-decoration: none;
                        font-size: 17px;
                    }

                    <!-- /* Change the color of links on hover */ -->
                    .topnav a:hover {
                        background-color: #ddd;
                        color: black;
                    }

                    <!-- /* Add a color to the active/current link */ -->
                    .topnav a.active {
                        background-color: #4CAF50;
                        color: white;
                    }

                    h1 {
                        margin-left: 30px;
                    }

                    footer{
                        background-color: #dfdae5;
                        text-align: center;
                        font-family: 'Lato', sans-serif;
                        /* set margin and padding 0*/
                        margin:0;
                        padding:0;
                        height: 32px;
                    }

                    html, body {
                      <!-- overflow-x: hidden; -->
                      margin: 0;   <!-- remove margin from the entire web page -->
                      padding-top: 10px; <!-- shift everything down 10px -->  
                    }                          

                    <!-- /**********************************************/ -->
                    #resume{
                        width: 600px;
                        border: 10px solid green; <!-- #4256f4 -->
                        padding: 25px;
                        margin: 25px;
                    }
                </style>
            </head>
            <body>
                <h1>Comp 466 - Assignment#1 Part 1</h1>
                <div class="topnav" style="color:red">
                    <a href='../tma1.htm'>Home</a>
                    <a class="active">Part 1</a>
                    <a href="../part2/part2.htm">Part 2</a>
                    <a href="../part3/part3.htm">Part 3</a>
                    <a href="../part4/part4.htm">Part 4</a>
                    <a href="../shared/doc.htm">Full Documentation</a>
                </div>
                
                
                <div id="resume">
                    <h2><xsl:value-of select="Name"/></h2>
                    
                    <h4>Highlights</h4>
                    <p><xsl:value-of select="Highlights/description_1"/> <br/>
                    <xsl:value-of select="Highlights/description_2"/> <br/>
                    <xsl:value-of select="Highlights/description_3"/> <br/>
                    <xsl:value-of select="Highlights/description_4"/> <br/>
                    <xsl:value-of select="Highlights/description_5"/></p>
                    <hr></hr>
                    <h4>Skills</h4>
                    <p><xsl:value-of select="Skills/skills1"/></p>
                    <p><xsl:value-of select="Skills/skills2"/></p>
                    <hr></hr>
                    <h4>Education</h4>
                    <p><xsl:value-of select="Education/degree"/></p>
                    <hr></hr>
                    
                    <h4>Work Experience</h4>
                    <p><xsl:value-of select="Work_Experience/job1/title"/></p>
                    <p><xsl:value-of select="Work_Experience/job1/responsibility1" /></p>
                    <p><xsl:value-of select="Work_Experience/job1/responsibility2" /></p>
                

                </div>

                <footer>
                    <hr id="footerLine"></hr>
                    Copyright © 2018 Moshiur Howlader. All rights reserved. <br/>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>