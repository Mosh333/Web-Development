<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="part2.aspx.cs" Inherits="Comp466_Assign3a.part2.part2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Slideshow in ASP.net C#</title>
    <link rel="stylesheet" href="../shared/styles/tma3.css" />
    <link rel="icon" href="../shared/images/slideshow.png" />
    <link rel="stylesheet" href="part2.css" />      <%--any !important styles override from tma3.css here--%>
</head>
<body>
    <!-- Navbar -->
    <div class="topnav">
        <a class="home" href="../tma3.htm">Home</a>
        <a class="part1" href='../part1/part1.aspx'>Part 1</a>
        <a class="active part2">Part 2</a>
        <a class="part3" href="../part3/homepage.aspx">Part 3</a>
        <a class="part4" href='../part4/homepage.aspx'>Part 4</a>
        <a class="doc" href='../shared/doc.htm'>Full Documentation</a>
        <p id="navbarTitle">Comp 466 Assignment 3a</p>
    </div>
    <form id="part2Form" runat="server">
        <div>
            <p ID="orange" runat="server"></p>
        </div>
        <h2 id="slideshow_title">Slideshow Application using ASP.NET in C#</h2>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <asp:ScriptManager ID="slideshowManager" runat="server"></asp:ScriptManager>
                <asp:UpdatePanel ID="slideshowPanel" runat="server" style="text-align: center" ></asp:UpdatePanel>
                <asp:Timer ID="slideshowTimer" runat="server" Interval="5000" OnTick="slideshowTimer_Tick"></asp:Timer>
                <asp:Image ID="slideshowImage" CssClass="slideshowImage" runat="server" ImageUrl="~/part2/images/car1.jpg" />         
                <p id="slideshowCaption" class="slideshowCaption" runat="server">Mt. Fuji</p>
                <br />
                <p id="currentIndexValue" class="currentIndexValue" runat="server">Current Index is: 0</p>
                <asp:Button ID="prevButton" CssClass="myButton" runat="server" Text="Prev" OnClick="prevButton_Click"/>
                <asp:Button ID="startStopButton" CssClass="myButton" runat="server" Text="||" OnClick="startStopButton_Click"/>
                <asp:Button ID="nextButton" CssClass="myButton" runat="server" Text="Next" OnClick="nextButton_Click" />
                <asp:Button ID="slideshowMode" CssClass="myButton" runat="server" Text="Sequential" OnClick="toggleMode"/>
            </ContentTemplate>
        </asp:UpdatePanel>
    </form>
    <footer>
        Copyright &copy; 2019 Moshiur Howlader. All rights reserved.
        <br />
    </footer>
</body>
</html>
