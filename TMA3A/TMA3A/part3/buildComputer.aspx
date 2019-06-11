<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buildComputer.aspx.cs" Inherits="Comp466_Assign3a.part3.buildComputer" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 3 - Build PC</title>
    <%--<link rel="stylesheet" href="../shared/styles/tma3.css" />--%>
    <link rel="icon" href="../shared/images/store.png" />
    <link rel="stylesheet" href="part3.css" />
    <%--any !important styles override from tma3.css here--%>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <script type="text/javascript">
        function resetDesktopView() {
            var desktopView = document.getElementById("buildDesktop");
            document.getElementById("Fade1").classList.remove("w3-animate-opacity");
            console.log("Hello!");
            desktopView.click();
        }
        function resetLaptopView() {
            var laptopView = document.getElementById("buildLaptop");
            document.getElementById("Fade2").classList.remove("w3-animate-opacity");
            console.log("Hello!");
            laptopView.click();
        }
    </script>
</head>
<body style="overflow-x: hidden !important; overflow-y: hidden !important;">
    <!-- Navbar -->
    <%--This Navbar should contain store Logo, search bar, cart icon, Login menu, as well as drop down menu
    for navigating back to other pages--%>
    <div class="topnav alt_topnav">
        <a href="homepage.aspx" class="storeLogoLink">
            <img class="storeLogo" alt="Store Logo" src="assets/images/logo1.PNG" /></a>
        <div class="dropdown">
            <button class="dropbtn" style="margin-top: -40px;">View Other Parts</button>
            <div id="myDropdown" class="dropdown-content" style="margin-top: 16px !important; overflow-x: hidden !important; max-width: 182px !important;">
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
        <a class="cartHyperlink" href="cart.aspx">
            <asp:Image ID="Image1" CssClass="cartIcon" runat="server" ImageUrl="~/part3/assets/images/comware_icons/cart.png" /></a>
        <a class="topnavHyperlinks topnavBuildComp" style="margin-left: -50px" href="buildComputer.aspx">Build a PC</a>
        <a class="topnavHyperlinks topnavOrderParts" href="orderParts.aspx">Order Parts</a>
        <a class="topnavHyperlinks topnavContact" href="contacts.aspx">Contacts</a>
    </div>
    <form id="contactForm" runat="server">
        <asp:Panel runat="server" DefaultButton="submitSearchButton">
            <asp:TextBox ID="searchBar" CssClass="searchBar" Style="margin-top: -90px" type="text" runat="server" placeholder="Search..." />
            <asp:Button ID="submitSearchButton" runat="server" Style="display: none" OnClick="submitSearchButton_Click" />
        </asp:Panel>
        <div id="buildPCHeaderContainer">
            <h1 id="buildPCHeader">Build PC or Laptop</h1>
        </div>
        <div class="w3-sidebar w3-bar-block w3-black w3-card" style="width: 130px; position: absolute !important; height: 50% !important; margin-left: 100px !important;">
            <h5 class="w3-bar-item" style="background-color: #4b7a7c">Build Your System:</h5>
            <p id="buildDesktop" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade1')">Desktop</p>
            <p id="buildLaptop" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade2')">Laptop</p>
            <%--<p class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Right')">Right</p>
          <p class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Top')">Top</p>
          <p class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Bottom')">Bottom</p>
          <p class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Zoom')">Zoom</p>--%>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div class="buildDesktopContainer" style="margin-left: 230px">
                    <%--<div class="w3-padding">Use any of the w3-animate-classes to fade, zoom or slide in tab content.</div>--%>
                    <%--https://www.w3schools.com/w3css/w3css_tabulators.asp--%>
                    <div id="Fade0" runat="server" class="w3-animate-opacity systemArea" style="padding-left: 25px">
                        <h2>Build Your System!</h2>
                        <p>Build Your System by clicking one of the tabs on the left!</p>
                        <img id="systemAreaPic1" src="assets/images/ads/ad1.png" />
                        <img id="systemAreaPic2" src="assets/images/ads/ad2.png" />
                    </div>
                    <div id="Fade1" runat="server" class="w3-container city w3-animate-opacity desktopArea" style="display: none">
                        <h2>Build Your Desktop:</h2>
                        <p>Please customize your desktop and hit "Add to Cart".</p>

                        <div class="brandName">
                            <asp:Label ID="brandNameLabel" BackColor="#cc9900" Text="Brand Name" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="brandnameList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="brandName1" GroupName="brandName" Selected="true"
                                    Text="Comware ($0)" Value="0" runat="server" />
                                <asp:ListItem ID="brandName2" GroupName="brandName"
                                    Text="Asus ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="brandName3" GroupName="brandName"
                                    Text="Dell ($50)" Value="50.0" runat="server" />
                            </asp:RadioButtonList>

                            <asp:Image ID="brandnameImage" CssClass="buildImageStyle" runat="server" ImageUrl="~/part3/assets/images/brands/comware.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="operatingSystem">
                            <asp:Label ID="operatingSysLabel" BackColor="#ff5555" Text="Operating System" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="operatingSystemList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="os1" GroupName="OSname" Selected="true"
                                    Text="Window 10 ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="os2" GroupName="OSname"
                                    Text="MacOS Mojave ($50)" Value="50.0" runat="server" />
                                <asp:ListItem ID="os3" GroupName="OSname"
                                    Text="Ubuntu Linux ($50)" Value="50.00" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="operatingSystemImage" CssClass="buildImageStyle" runat="server" ImageUrl="~/part3/assets/images/operatingSystem/windows10.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="monitorSize">
                            <asp:Label ID="monitorLabel" BackColor="Pink" Text="Monitor Size" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="monitorList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="monitor1" GroupName="monitorSize" Selected="true"
                                    Text="21 Inch Monitor ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="monitor2" GroupName="monitorSize"
                                    Text="24 Inch Monitor ($150)" Value="150" runat="server" />
                                <asp:ListItem ID="monitor3" GroupName="monitorSize"
                                    Text="27 Inch Monitor ($200)" Value="200" runat="server" />
                                <asp:ListItem ID="Monitor4" GroupName="monitorSize"
                                    Text="No monitor ($0)" Value="0" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="monitorImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/monitor/monitor_21inch.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>

                        <div class="cpuSelection">
                            <asp:Label ID="cpuLabel" BackColor="#99cc00" Text="Select CPU" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="cpuList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="cpu1" GroupName="cpuSelection" Selected="true"
                                    Text="Intel i3 Processor ($100)" Value="100" runat="server" />

                                <asp:ListItem ID="cpu2" GroupName="cpuSelection"
                                    Text="Intel i5 Processor ($150)" Value="150" runat="server" />

                                <asp:ListItem ID="cpu3" GroupName="cpuSelection"
                                    Text="Intel i7 Processor ($250)" Value="250" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="cpuImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/cpu/intel_i3.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="gpuSelection">
                            <asp:Label ID="gpuLabel" BackColor="#f5860a" Text="Select GPU" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="gpuList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="gpu1" GroupName="gpuSelection" Selected="true"
                                    Text="NVIDIA GT1030 ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="gpu2" GroupName="gpuSelection"
                                    Text="NVIDIA GTX1050 ($200)" Value="200" runat="server" />
                                <asp:ListItem ID="gpu3" GroupName="gpuSelection"
                                    Text="NVIDIA GTX1060 ($300)" Value="300" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="gpuImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/gpu/gt1030.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="hddSelection">
                            <asp:Label ID="hddLabel" BackColor="#cccccc" Text="Select Storage" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="hddList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="hdd1" GroupName="hddSelection" Selected="true"
                                    Text="HDD 500GB ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="hdd2" GroupName="hddSelection"
                                    Text="HDD 750GB ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="hdd3" GroupName="hddSelection"
                                    Text="HDD 1TB ($150)" Value="150" runat="server" />
                                <asp:ListItem ID="hdd4" GroupName="hddSelection"
                                    Text="SSD 250GB ($150)" Value="150.0" runat="server" />
                                <asp:ListItem ID="hdd5" GroupName="hddSelection"
                                    Text="SSD 500GB ($250)" Value="250" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="hddImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/hdd/hdd500.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="ramSelection">
                            <asp:Label ID="ramLabel" BackColor="#00cc66" Text="Select Memory Size" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="ramList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="ram1" GroupName="ramSelection" Selected="true"
                                    Text="4 GB DDR3 RAM ($25)" Value="25" runat="server" />
                                <asp:ListItem ID="ram2" GroupName="ramSelection"
                                    Text="8 GB DDR3 RAM ($40)" Value="40" runat="server" />
                                <asp:ListItem ID="ram3" GroupName="ramSelection"
                                    Text="16 GB DDR3 RAM ($80)" Value="80" runat="server" />
                                <asp:ListItem ID="ram4" GroupName="ramSelection"
                                    Text="8GB DDR4 RAM ($100)" Value="100" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="ramImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/ram/ram4gb.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="soundcardSelection">
                            <asp:Label ID="soundcardLabel" BackColor="#009ed2" Text="Select Soundcard" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="soundcardList" runat="server" OnSelectedIndexChanged="adjustTotal_Desktop" AutoPostBack="true">
                                <asp:ListItem ID="soundcard1" GroupName="soundcardSelection" Selected="true"
                                    Text="Regular Soundcard ($80)" Value="80" runat="server" />
                                <asp:ListItem ID="soundcard2" GroupName="soundcardSelection"
                                    Text="Gaming Soundcard ($120)" Value="120" runat="server" />
                                <asp:ListItem ID="soundcard3" GroupName="soundcardSelection"
                                    Text="Professional Soundcard ($200)" Value="200" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="soundcardImage" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/soundcard/soundcardRegular.png" />
                            <%--                    <br />
                    <br />--%>
                        </div>
                        <hr style="border-top: 2px solid red;" />
                        <label id="desktopTotal" runat="server">Total: $505.00</label>

                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCartDesktop" OnClick="addToCartDesktop_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade2" runat="server" class="w3-container city w3-animate-opacity laptopArea" style="display: none">
                        <h2>Build Your Laptop:</h2>
                        <p>
                            Please customize your laptop and hit "Add to Cart".
                            Please note an additional $100 is charged due to the manufacturing
                            costs associated with producing small-form laptops.
                        </p>
                        <br />

                        <div class="brandName">
                            <asp:Label ID="brandNameLabel_laptop" BackColor="#cc9900" Text="Brand Name" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="brandnameList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="brandName_laptop1" GroupName="brandName" Selected="true"
                                    Text="Comware ($0)" Value="0" runat="server" />
                                <asp:ListItem ID="brandName_laptop2" GroupName="brandName"
                                    Text="Asus ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="brandName_laptop3" GroupName="brandName"
                                    Text="Dell ($50)" Value="50.0" runat="server" />
                            </asp:RadioButtonList>

                            <asp:Image ID="brandnameImage_laptop" CssClass="buildImageStyle" runat="server" ImageUrl="~/part3/assets/images/brands/comware.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="operatingSystem">
                            <asp:Label ID="operatingSysLabel_laptop" BackColor="#ff5555" Text="Operating System" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="operatingSystemList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="os1_laptop" GroupName="OSname" Selected="true"
                                    Text="Window 10 ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="os2_laptop" GroupName="OSname"
                                    Text="MacOS Mojave ($50)" Value="50.0" runat="server" />
                                <asp:ListItem ID="os3_laptop" GroupName="OSname"
                                    Text="Ubuntu Linux ($50)" Value="50.00" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="operatingSystemImage_laptop" CssClass="buildImageStyle" runat="server" ImageUrl="~/part3/assets/images/operatingSystem/windows10.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="monitorSize">
                            <asp:Label ID="monitorLabel_laptop" BackColor="Pink" Text="Monitor Size" runat="server" /><%--&nbsp;--%>
                            <br />
                            <asp:RadioButtonList ID="monitorList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="monitor_laptop1" GroupName="monitorSize" Selected="true"
                                    Text="13 Inch Monitor ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="monitor_laptop2" GroupName="monitorSize"
                                    Text="15 Inch Monitor ($150)" Value="150" runat="server" />
                                <asp:ListItem ID="monitor_laptop3" GroupName="monitorSize"
                                    Text="17 Inch Monitor ($200)" Value="200" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="monitorImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/monitor/laptop_13inch.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>

                        <div class="cpuSelection">
                            <asp:Label ID="cpuLabel_laptop" BackColor="#99cc00" Text="Select CPU" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="cpuList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="cpu_laptop1" GroupName="cpuSelection" Selected="true"
                                    Text="Intel i3 Processor ($100)" Value="100" runat="server" />

                                <asp:ListItem ID="cpu_laptop2" GroupName="cpuSelection"
                                    Text="Intel i5 Processor ($150)" Value="150" runat="server" />

                                <asp:ListItem ID="cpu_laptop3" GroupName="cpuSelection"
                                    Text="Intel i7 Processor ($250)" Value="250" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="cpuImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/cpu/intel_i3.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="gpuSelection">
                            <asp:Label ID="gpuLabel_laptop" BackColor="#f5860a" Text="Select GPU" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="gpuList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="gpu_laptop1" GroupName="gpuSelection" Selected="true"
                                    Text="NVIDIA GT1030 ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="gpu_laptop2" GroupName="gpuSelection"
                                    Text="NVIDIA GTX1050 ($200)" Value="200" runat="server" />
                                <asp:ListItem ID="gpu_laptop3" GroupName="gpuSelection"
                                    Text="NVIDIA GTX1060 ($300)" Value="300" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="gpuImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/gpu/gt1030.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="hddSelection">
                            <asp:Label ID="Label1" BackColor="#cccccc" Text="Select Storage" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="hddList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="hdd_laptop1" GroupName="hddSelection" Selected="true"
                                    Text="HDD 500GB ($50)" Value="50" runat="server" />
                                <asp:ListItem ID="hdd_laptop2" GroupName="hddSelection"
                                    Text="HDD 750GB ($100)" Value="100" runat="server" />
                                <asp:ListItem ID="hdd_laptop3" GroupName="hddSelection"
                                    Text="HDD 1TB ($150)" Value="150" runat="server" />
                                <asp:ListItem ID="hdd_laptop4" GroupName="hddSelection"
                                    Text="SSD 250GB ($150)" Value="150.0" runat="server" />
                                <asp:ListItem ID="hdd_laptop5" GroupName="hddSelection"
                                    Text="SSD 500GB ($250)" Value="250" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="hddImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/hdd/hdd500.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="ramSelection">
                            <asp:Label ID="ramLabel_laptop" BackColor="#00cc66" Text="Select Memory Size" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="ramList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="ram_laptop1" GroupName="ramSelection" Selected="true"
                                    Text="4 GB DDR3 RAM ($25)" Value="25" runat="server" />
                                <asp:ListItem ID="ram_laptop2" GroupName="ramSelection"
                                    Text="8 GB DDR3 RAM ($40)" Value="40" runat="server" />
                                <asp:ListItem ID="ram_laptop3" GroupName="ramSelection"
                                    Text="16 GB DDR3 RAM ($80)" Value="80" runat="server" />
                                <asp:ListItem ID="ram_laptop4" GroupName="ramSelection"
                                    Text="8GB DDR4 RAM ($100)" Value="100" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="ramImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/ram/ram4gb.png" />
                            <hr style="border-top: 2px solid black;" />
                        </div>
                        <div class="soundcardSelection">
                            <asp:Label ID="soundcardLabel_laptop" BackColor="#009ed2" Text="Select Soundcard" runat="server" />
                            <br />
                            <asp:RadioButtonList ID="soundcardList_laptop" runat="server" OnSelectedIndexChanged="adjustTotal_Laptop" AutoPostBack="true">
                                <asp:ListItem ID="soundcard_laptop1" GroupName="soundcardSelection" Selected="true"
                                    Text="Regular Soundcard ($80)" Value="80" runat="server" />
                                <asp:ListItem ID="soundcard_laptop2" GroupName="soundcardSelection"
                                    Text="Gaming Soundcard ($120)" Value="120" runat="server" />
                                <asp:ListItem ID="soundcard_laptop3" GroupName="soundcardSelection"
                                    Text="Professional Soundcard ($200)" Value="200" runat="server" />
                            </asp:RadioButtonList>
                            <asp:Image ID="soundcardImage_laptop" runat="server" CssClass="buildImageStyle" ImageUrl="~/part3/assets/images/soundcard/soundcardRegular.png" />
                            <%--                    <br />
                    <br />--%>
                        </div>
                        <hr style="border-top: 2px solid red;" />
                        <label id="laptopTotal" runat="server">Total: $605.00</label>

                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCartLaptop" OnClick="addToCartLaptop_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                </div>
            </ContentTemplate>
        </asp:UpdatePanel>

        <div class="storeFooter">
            <footer style="height: 85px !important;">
                <a href="homepage.aspx" class="storeLogoLink" id="storeLogoLinkFooter">
                    <img class="storeLogo" alt="Store Logo" src="assets/images/logo1.PNG" /></a>
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
    <script>
        function openLink(evt, animName) {
            //Hide the welcome page
            var hideWelcomePage = document.getElementsByClassName("systemArea")[0];
            hideWelcomePage.style.display = "none";
            var i, x, tablinks;
            x = document.getElementsByClassName("city");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < x.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
            }
            document.getElementById(animName).style.display = "block";
            evt.currentTarget.className += " w3-red";
            return false;
        }
    </script>
</body>
</html>
