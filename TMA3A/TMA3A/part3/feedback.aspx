<%@ Page Language="C#" AutoEventWireup="True" CodeBehind="feedback.aspx.cs" Inherits="Comp466_Assign3a.part3.feedback" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 3 - Feedback</title>
    <%--<link rel="stylesheet" href="../shared/styles/tma3.css" />--%>
    <link rel="icon" href="../shared/images/store.png" />
    <link rel="stylesheet" href="part3.css" />      <%--any !important styles override from tma3.css here--%>
    <script type="text/javascript"></script>
</head>
<body>

    <!-- Navbar -->
    <%--This Navbar should contain store Logo, search bar, cart icon, Login menu, as well as drop down menu
    for navigating back to other pages--%>
    <div class="topnav alt_topnav">
        <a href="homepage.aspx" class="storeLogoLink"><img class="storeLogo" alt="Store Logo" src="assets/images/logo1.PNG" /></a>
        <div class="dropdown">
            <button class="dropbtn">View Other Parts</button>
            <div id="myDropdown" class="dropdown-content">
            <a class="selectable">Currently Viewing Part 3</a>
            <a class="dropmenuStyle" href="../tma3.htm">Home</a>
            <a class="dropmenuStyle" href='../part1/part1.aspx'>Part 1</a>
            <a class="dropmenuStyle" href="../part2/part2.aspx">Part 2</a>
            <a class="dropmenuStyle" href='../part4/homepage.aspx'>Part 4</a>
            <a class="dropmenuStyle" href='../shared/doc.htm'>Full Documentation</a>
            </div>
        </div>
        <a class="loginButton" href="login.aspx">Login Page</a>
        <p id="cartTotal" runat="server">Currently Cart Empty!</p>
        <a class="cartHyperlink" href="cart.aspx"><asp:Image ID="Image1" CssClass="cartIcon" runat="server" ImageURL="~/part3/assets/images/comware_icons/cart.png"/></a>
        <a class="topnavHyperlinks topnavBuildComp" style="margin-left: -50px" href="buildComputer.aspx">Build a PC</a>
        <a class="topnavHyperlinks topnavOrderParts" href="orderParts.aspx">Order Parts</a>
        <a class="topnavHyperlinks topnavContact" href="contacts.aspx">Contacts</a>    
    </div>
    <form id="feedbackForm2" runat="server">
        <asp:Panel runat="server" DefaultButton="submitSearchButton">
            <asp:textbox ID="searchBar" CssClass="searchBar" style="margin-top:-90px" type="text" runat="server" placeholder="Search..."/>
            <asp:Button ID="submitSearchButton" runat="server" style="display:none" OnClick="submitSearchButton_Click" />
        </asp:Panel>
        <div id="aboutUsHeaderContainer">
            <h1 id="aboutUsHeader">Give Us Your Feedback!</h1>
        </div>
        <img id="feedbackLogoImage" alt="Comware Headquarter" src="assets/images/logo1.PNG" />
        <div id="aboutUsDescription">
            <h2 class="aboutUsH2">Feedback:</h2>
            <p>Please let us know in anyway we can improve our quality of service,
                or this website by sending us your thoughts using the feedback form
                below! Thank you very much!
            </p>
            <div runat="server" id="feedbackForm">
<%---            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                <asp:ScriptManager ID="slideshowManager" runat="server"></asp:ScriptManager>--%>
                    <asp:Label ID="feedbackFirstname" CssClass="" runat="server" Text="First Name"></asp:Label>
                    <asp:RequiredFieldValidator runat="server" id="reqFirstName" controltovalidate="feedbackTextBox1" errormessage="Please enter your first name!" />
                    <asp:TextBox ID="feedbackTextBox1" CssClass="feedbackInputStyle" placeholder="Your First Name..." runat="server"></asp:TextBox>
                    
                    <asp:Label ID="feedbackLastname" CssClass="" runat="server" Text="Last Name"></asp:Label>
                    <asp:RequiredFieldValidator runat="server" id="reqLastName" controltovalidate="feedbackTextBox2" errormessage="Please enter your last name!" />
                    <asp:TextBox ID="feedbackTextBox2" CssClass="feedbackInputStyle" placeholder="Your Last Name..." runat="server"></asp:TextBox>

                    <asp:Label ID="feedbackEmail" CssClass="" runat="server" Text="Email"></asp:Label>
                    <asp:RequiredFieldValidator runat="server" id="reqEmail" controltovalidate="feedbackTextBox3" errormessage="Please enter your email!" />
                    <asp:RegularExpressionValidator ID="regexEmailValid" runat="server" ValidationExpression="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="feedbackTextBox3" ErrorMessage="Invalid Email Format!"></asp:RegularExpressionValidator>
                    <asp:TextBox ID="feedbackTextBox3" CssClass="feedbackInputStyle" placeholder="Your Email..." runat="server"></asp:TextBox>
                    
                    <asp:Label ID="feedbackComment" runat="server" Text="Your Feedback:"></asp:Label>
                    <asp:RequiredFieldValidator runat="server" id="reqFeedback" controltovalidate="feedbackTextBox4" errormessage="Please enter your feedback!" />
                    <%--<asp:TextBox ID="TextBox4" style="height:200px" CssClass="feedbackInputStyle" placeholder="Write Feedback Here" runat="server"></asp:TextBox>--%>
                    <textarea class="feedbackInputStyle" id="feedbackTextBox4" runat="server" style="height:200px" placeholder="Write Feedback Here"></textarea>
                    <asp:Button ID="submitButton" runat="server" Text="Submit" OnClick="submitButton_Click"/>
                <%--<button id="submitButton" runat="server">Submit</button>--%>
<%--                </ContentTemplate>
            </asp:UpdatePanel>--%>
            </div>
            <p id="feedbackSubmitResult" runat="server" style="margin-bottom: 150px"></p>
        </div>

        <div class="storeFooter">
            <footer>
                <a href="homepage.aspx" class="storeLogoLink" id="storeLogoLinkFooter"><img class="storeLogo" alt="Store Logo" src="assets/images/logo1.PNG" /></a>
                <a class="footerHyperlinks" href="aboutUs.aspx">About Us</a>
                <a class="footerHyperlinks" href="contacts.aspx">Contact Us</a>
                <a class="footerHyperlinks" href="feedback.aspx">Give Us Feedback</a>
                <br />
                Copyright &copy; 2019 Moshiur Howlader. All rights reserved.
                <br />
            </footer>
        </div>
    </form>
    <script src="part3.js"></script>
</body>
</html>
