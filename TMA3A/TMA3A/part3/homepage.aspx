<%@ Page Language="C#" AutoEventWireup="True" CodeBehind="homepage.aspx.cs" Inherits="Comp466_Assign3a.part3.homepage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 3 - Comware</title>
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
    
    <form id="homepageForm" runat="server">
        <asp:Panel runat="server" DefaultButton="submitSearchButton">
            <asp:textbox ID="searchBar" CssClass="searchBar" style="margin-top:-90px" type="text" runat="server" placeholder="Search..."/>
            <asp:Button ID="submitSearchButton" runat="server" style="display:none" OnClick="submitSearchButton_Click" />
        </asp:Panel>
        
        <asp:UpdatePanel style="margin-top:150px" ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <asp:ScriptManager ID="slideshowManager" runat="server"></asp:ScriptManager>
                <asp:UpdatePanel ID="slideshowPanel" runat="server" style="text-align: center" ></asp:UpdatePanel>
                <asp:Timer ID="slideshowTimer" runat="server" Interval="5000" OnTick="slideshowTimer_Tick"></asp:Timer>
                <a id="slideshowHyperlink" runat="server" href="buildComputer.aspx"><asp:Image ID="slideshowImage" CssClass="slideshowImage" runat="server" ImageUrl="~/part3/assets/images/ads/ad1.png" /></a>
                <br />
                <br />
                <br />
<%--                <asp:Button ID="prevButton" CssClass="myButton" runat="server" Text="Prev" OnClick="prevButton_Click"/>
                <asp:Button ID="nextButton" CssClass="myButton" runat="server" Text="Next" OnClick="nextButton_Click" />--%>
            </ContentTemplate>
        </asp:UpdatePanel>
        <div class="productCategoryIcons">
            <div class="productCategoryRow">
                    <div class="productTypeContainer">                
                        <a id="buildPC_icon" class="productTypeImage" href="buildComputer.aspx" runat="server"><img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/buildComputer.png" /></a>
                        <p class="productTextDesc">Build Computer</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="gpu_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/graphicsCard.png" /></a>
                        <p class="productTextDesc">Graphics Card</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="cpu_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/cpu.png" /></a>
                        <p class="productTextDesc">CPU</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="monitor_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/monitor.png" /></a>
                        <p class="productTextDesc">Monitor</p>
                    </div>
            </div>
            <div class="productCategoryRow">
                    <div class="productTypeContainer">
                        <a id="os_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/operatingSystem.png" /></a>
                        <p class="productTextDesc">OS</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="ram_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/ram.png" /></a>
                        <p class="productTextDesc">RAM</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="soundcard_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/soundCard.png" /></a>
                        <p class="productTextDesc">Soundcard</p>
                    </div>
                    <div class="productTypeContainer">
                        <a id="hdd_icon" class="productTypeImage" href="orderParts.aspx" runat="server"> <img style="width:75px; height:75px" alt="Store Logo" src="assets/images/comware_icons/hdd.png" /></a>
                        <p class="productTextDesc">HDD</p>
                    </div>

            </div>
        </div>








        <%--<a href="homepage.aspx" class="storeLogoLink"><img class="storeLogo" alt="Store Logo" src="assets/images/comware_icons/hdd.png" /></a>--%>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div class="storeFooter">
            <footer id="homepageFooter">
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
