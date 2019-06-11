<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="orderParts.aspx.cs" Inherits="Comp466_Assign3a.part3.orderParts" %>

<!DOCTYPE html>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 3 - Order</title>
    <%--<link rel="stylesheet" href="../shared/styles/tma3.css" />--%>
    <link rel="icon" href="../shared/images/store.png" />
    <link rel="stylesheet" href="part3.css" />
    <%--any !important styles override from tma3.css here--%>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
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
    <script type="text/javascript">
        function clickCpuTab() {
            //var tab = document.getElementById("buy_cpu");
            //tab.click();
            openLink(event, 'Fade1');
        }
        function clickGpuTab() {
            openLink(event, 'Fade2');
        }
        function clickMonitorTab() {
            openLink(event, 'Fade4');
        }
        function clickOsTab() {
            openLink(event, 'Fade5');
        }
        function clickRamTab() {
            openLink(event, 'Fade6');
        }
        function clickSoundcardTab() {
            openLink(event, 'Fade7');
        }
        function clickHddTab() {
            openLink(event, 'Fade3');
        }

    </script>
</head>
<body>
    <!-- Navbar -->
    <%--This Navbar should contain store Logo, search bar, cart icon, Login menu, as well as drop down menu
    for navigating back to other pages--%>
    <div class="topnav alt_topnav">
        <a href="homepage.aspx" class="storeLogoLink">
            <img class="storeLogo" alt="Store Logo" src="assets/images/logo1.PNG" /></a>
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
            <h1 id="buildPCHeader">Order Component Parts</h1>
        </div>
        <div class="w3-sidebar w3-bar-block w3-black w3-card" style="width: 130px; position: absolute !important; height: 490px !important; margin-left: 100px !important;">
            <h5 class="w3-bar-item" style="background-color: #4b7a7c">Order Parts</h5>
            <p id="buy_cpu" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade1')">CPU</p>
            <p id="buy_gpu" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade2')">GPU</p>
            <p id="buy_hdd" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade3')">HDD</p>
            <p id="buy_monitor" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade4')">Monitor</p>
            <p id="buy_os" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade5')">Operating System</p>
            <p id="buy_ram" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade6')">RAM</p>
            <p id="buy_soundcard" runat="server" class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Fade7')">Soundcard</p>
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
                    <div id="Fade0" runat="server" class="w3-animate-opacity systemArea" style="padding-left: 25px; margin-bottom: 400px;">
                        <h2>Order Parts!</h2>
                        <p>Pick Your Component Parts by clicking one of the tabs on the left!</p>
                        <img id="systemAreaPic1" src="assets/images/ads/ad3.png" />
                        <img id="systemAreaPic2" src="assets/images/gpu/gt1030.png" style="margin-left: 6px" />
                    </div>
                    <div id="Fade1" runat="server" class="w3-container city cpuArea" style="display: none">
                        <h2>CPU Catalogue:</h2>
                        <p>Please select your cpu choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="cpu1" runat="server">Intel i3 Processor ($100)</p>
                            <img id="cpuPic1" class="catalogueImage" src="assets/images/cpu/intel_i3.png" />
                            <br />
                            <asp:Label ID="partsLabel1" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="cpu1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="cpu2" runat="server">Intel i5 Processor ($150)</p>
                            <img id="cpuPic2" class="catalogueImage" src="assets/images/cpu/intel_i5.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel2" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="cpu2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="cpu3" runat="server">Intel i7 Processor ($250)</p>
                            <img id="cpuPic3" class="catalogueImage" src="assets/images/cpu/intel_i7.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel3" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="cpu3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_cpu" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade2" runat="server" class="w3-container city gpuArea" style="display: none">
                        <h2>GPU Catalogue:</h2>
                        <p>Please select your gpu choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="gpu1" runat="server">NVIDIA GT1030 ($100)</p>
                            <img id="gpuPic1" class="catalogueImage" src="assets/images/gpu/gt1030.png" />
                            <br />
                            <asp:Label ID="partsLabel4" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="gpu1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="gpu2" runat="server">NVIDIA GTX1050 ($200)</p>
                            <img id="gpuPic2" class="catalogueImage" src="assets/images/gpu/gt1050.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel5" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="gpu2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="gpu3" runat="server">NVIDIA GTX1060 ($300)</p>
                            <img id="gpuPic3" class="catalogueImage" src="assets/images/gpu/gt1060.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel6" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="gpu3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_gpu" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade3" runat="server" class="w3-container city hddArea" style="display: none">
                        <h2>HDD Catalogue:</h2>
                        <p>Please select your HDD choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="hdd1" runat="server">HDD 500GB ($50)</p>
                            <img id="hddPic1" class="catalogueImage" src="assets/images/hdd/hdd500.png" />
                            <br />
                            <asp:Label ID="partsLabel7" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="hdd1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="hdd2" runat="server">HDD 750GB ($100)</p>
                            <img id="hddPic2" class="catalogueImage" src="assets/images/hdd/hdd750.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel8" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="hdd2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="hdd3" runat="server">HDD 1TB ($150)</p>
                            <img id="hddPic3" class="catalogueImage" src="assets/images/hdd/hdd1000.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel9" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="hdd3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="hdd4" runat="server">SSD 250GB ($150)</p>
                            <img id="hddPic4" class="catalogueImage" src="assets/images/hdd/ssd250.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel10" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="hdd4_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="hdd5" runat="server">SSD 500GB ($250)</p>
                            <img id="hddPic5" class="catalogueImage" src="assets/images/hdd/ssd500.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel11" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="hdd5_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_hdd" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade4" runat="server" class="w3-container city monitorArea" style="display: none">
                        <h2>Monitor Catalogue:</h2>
                        <p>Please select your monitor choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="monitor1" runat="server">21 Inch Monitor ($100)</p>
                            <img id="monitorPic1" class="catalogueImage" src="assets/images/monitor/monitor_21inch.png" />
                            <br />
                            <asp:Label ID="partsLabel12" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="monitor1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="monitor2" runat="server">24 Inch Monitor ($150)</p>
                            <img id="monitorPic2" class="catalogueImage" src="assets/images/monitor/monitor_24inch.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel13" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="monitor2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="monitor3" runat="server">27 Inch Monitor ($200)</p>
                            <img id="monitorPic3" class="catalogueImage" src="assets/images/monitor/monitor_27inch.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel14" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="monitor3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_monitor" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade5" runat="server" class="w3-container city osArea" style="display: none">
                        <h2>Operating System Catalogue:</h2>
                        <p>Please select your OS software choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="os1" runat="server">Window 10 ($50)</p>
                            <img id="osPic1" class="catalogueImage" src="assets/images/operatingSystem/windows10.png" />
                            <br />
                            <asp:Label ID="partsLabel15" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="os1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="os2" runat="server">MacOS Mojave ($50)</p>
                            <img id="osPic2" class="catalogueImage" src="assets/images/operatingSystem/macOS.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel16" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="os2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="os3" runat="server">Ubuntu Linux ($50)</p>
                            <img id="osPic3" class="catalogueImage" src="assets/images/operatingSystem/ubuntu.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel17" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="os3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_os" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>
                    <div id="Fade6" runat="server" class="w3-container city ramArea" style="display: none">
                        <h2>RAM Catalogue:</h2>
                        <p>Please select your RAM choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="ram1" runat="server">4 GB DDR3 RAM ($25)</p>
                            <img id="ramPic1" class="catalogueImage" src="assets/images/ram/ram4gb.png" />
                            <br />
                            <asp:Label ID="partsLabel18" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="ram1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="ram2" runat="server">8 GB DDR3 RAM ($40)</p>
                            <img id="ramPic2" class="catalogueImage" src="assets/images/ram/ram8gb.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel19" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="ram2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="ram3" runat="server">16 GB DDR3 RAM ($80)</p>
                            <img id="ramPic3" class="catalogueImage" src="assets/images/ram/ram16gb.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel20" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="ram3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="ram4" runat="server">8GB DDR4 RAM ($100)</p>
                            <img id="ramPic4" class="catalogueImage" src="assets/images/ram/ram8gb_ddr4.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel21" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="ram4_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_ram" OnClick="addToCart_Click"
                            Text="Add To Cart" runat="server" />
                    </div>

                    <div id="Fade7" runat="server" class="w3-container city soundcardArea" style="display: none">
                        <h2>Soundcard Catalogue:</h2>
                        <p>Please select your soundcard choices and hit "Add to Cart".</p>
                        <div class="catalogueContainer">
                            <p id="soundcard1" runat="server">Regular Soundcard ($80)</p>
                            <img id="soundcardPic1" class="catalogueImage" src="assets/images/soundcard/soundcardRegular.png" />
                            <br />
                            <asp:Label ID="partsLabel22" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="soundcard1_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="soundcard2" runat="server">Gaming Soundcard ($120)</p>
                            <img id="soundcardPic2" class="catalogueImage" src="assets/images/soundcard/soundcardGaming.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel23" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="soundcard2_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <div class="catalogueContainer">
                            <p id="soundcard3" runat="server">Professional Soundcard ($200)</p>
                            <img id="soundcardPic3" class="catalogueImage" src="assets/images/soundcard/soundcardProfessional.png" style="margin-left: 6px" />
                            <br />
                            <asp:Label ID="partsLabel24" runat="server" Text="Qty: " Style="margin-left: 42px;"></asp:Label>
                            <input id="soundcard3_qty" type="number" runat="server" value="0" min="0" max="10" style="width:60px;"/>
                        </div>
                        <hr style="border-top: 1px solid gray;" />
                        <asp:Button ID="addToCart_soundcard" OnClick="addToCart_Click"
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

</body>
</html>
