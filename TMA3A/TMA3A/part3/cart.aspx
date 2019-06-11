<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cart.aspx.cs" Inherits="Comp466_Assign3a.part3.cart" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 3 - My Cart</title>
    <%--<link rel="stylesheet" href="../shared/styles/tma3.css" />--%>
    <link rel="icon" href="../shared/images/store.png" />
    <link rel="stylesheet" href="part3.css" />      <%--any !important styles override from tma3.css here--%>
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
    <form id="contactForm" runat="server">
        <asp:Panel runat="server" DefaultButton="submitSearchButton">
            <asp:textbox ID="searchBar" CssClass="searchBar" style="margin-top:-90px" type="text" runat="server" placeholder="Search..."/>
            <asp:Button ID="submitSearchButton" runat="server" style="display:none" OnClick="submitSearchButton_Click" />
        </asp:Panel>
        <div id="cartHeaderContainer">
            <h1 id="cartHeader">Your Cart</h1>
        </div>
        <div id="shoppingCartContainer">
            <%--Insert all the appropriate labels, and elements to show summary to user--%>
            <asp:Panel ID="shoppingCartPanel" runat="server"></asp:Panel>
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
