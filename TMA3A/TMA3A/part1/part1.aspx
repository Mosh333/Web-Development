<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="part1.aspx.cs" Inherits="Comp466_Assign3a.part1.part1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Cookie Tracker</title>
    <link rel="stylesheet" href="../shared/styles/tma3.css" />
    <link rel="icon" href="../shared/images/cookies.png" />
    <link rel="stylesheet" href="part1.css" />
</head>
<body id="cookietrackerBody">
    <!-- Navbar -->
    <div class="topnav">
        <a class="home" href="../tma3.htm">Home</a>
        <a class="active part1" href='./part1/part1.aspx'>Part 1</a>
        <a class="part2" href='../part2/part2.aspx'>Part 2</a>
        <a class="part3" href="../part3/homepage.aspx">Part 3</a>
        <a class="part4" href='../part4/homepage.aspx'>Part 4</a>
        <a class="doc" href='../shared/doc.htm'>Full Documentation</a>
        <p id="navbarTitle">Comp 466 Assignment 3a</p>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div id="cookieTrackerContainer">
        <div id="cookieTrackerLogo">
            <img id="cookieImage" src="../shared/images/cookies.png" />
            <p id="cookieTitle" style="display: inline">Cookie Tracker</p>
        </div>
        <hr />
        <form runat="server">
            <%--Update Panel does not give us the behaviour that we want.--%>
            <%--<asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
            <asp:ScriptManager ID="cookieTrackerManager" runat="server"></asp:ScriptManager>--%>
                    
            <p class="description">
                Welcome to Cookie Tracker Application!
                  Please view the number of visits you made to this webpage,
                  your IP address, as well as your time zone!
            </p>
            <hr />
            <div class="infoContainer">
                <h3>Number of visits: </h3>
                <asp:Label ID="visitsId" runat="server">Visit Count Placeholder</asp:Label>
            </div>
            <div class="infoContainer">
                <h3>Your IP Address: </h3>
                <asp:Label ID="ipAddrId" runat="server">IP Adress Placeholder</asp:Label>
            </div>
            <div class="infoContainer">
                <h3>Your Time Zone: </h3>
                <asp:Label ID="timezoneId" runat="server" Text="Loading Your Time Zone Now!"></asp:Label> <%--Text="Time Zone Placeholder"--%>
            </div>
            <br />
            <asp:Button ID="Button1" CssClass="myButton myButtonAlt" runat="server" Text="Send POST" />
            <button id="reloadButton" class="myButton">Reload</button>
            <asp:Button ID="resetCookie" CssClass="myButton" runat="server" Text="Reset Cookie Counter" OnClick="ResetCookie" />
            <%--</ContentTemplate>
            </asp:UpdatePanel>--%>
        </form>
    </div>
    <script src="part1.js"></script>
    <footer>
        Copyright &copy; 2019 Moshiur Howlader. All rights reserved.
        <br />
    </footer>
</body>



</html>
