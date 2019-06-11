<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="Comp466_Assign3a.part4.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Part 4 - Login/Signup</title>
    <%--<link rel="stylesheet" href="../shared/styles/tma3.css" />--%>
    <link rel="icon" href="../shared/images/store.png" />
    <link rel="stylesheet" href="part4.css" />
    <%--any !important styles override from tma3.css here--%>
    <script type="text/javascript">
        //https://keithscode.com/tutorials/javascript/3-a-simple-javascript-password-validator.html
        function checkPass() {
            //Store the password field objects into variables ...
            var pass1 = document.getElementById('signup_password');
            var pass2 = document.getElementById('signup_password2');
            //Store the Confimation Message Object ...
            var message = document.getElementById('confirmPassword2');
            //Set the colors we will be using ...
            var goodColor = "#66cc66";
            var badColor = "#ff6666";
            //Compare the values in the password field 
            //and the confirmation field
            if (pass1.value == pass2.value) {
                //The passwords match. 
                //Set the color to the good color and inform
                //the user that they have entered the correct password 
                pass2.style.backgroundColor = goodColor;
                message.style.color = goodColor;
                message.innerHTML = "Passwords Match!"
            } else {
                //The passwords do not match.
                //Set the color to the bad color and
                //notify the user.
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "Passwords Do Not Match!"
            }
        }
        //function checkEmail() {
        //    //Store the password field objects into variables ...
        //    var email = document.getElementById('signup_email');
        //    //Store the Confimation Message Object ...
        //    var message = document.getElementById('confirmEmail');
        //    //Set the colors we will be using ...
        //    var goodColor = "#66cc66";
        //    var badColor = "#ff6666";
        //    function ValidateEmail(mail) {
        //        var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        //        return re.test(mail.value);
        //    }
        //    //Compare the values in the password field 
        //    //and the confirmation field
        //    if (ValidateEmail(email.innerText)) {
        //        //The passwords match. 
        //        //Set the color to the good color and inform
        //        //the user that they have entered the correct password 
        //        email.style.backgroundColor = goodColor;
        //        message.style.color = goodColor;
        //        message.innerHTML = "Valid Email Format!"
        //    } else {
        //        //The passwords do not match.
        //        //Set the color to the bad color and
        //        //notify the user.
        //        email.style.backgroundColor = badColor;
        //        message.style.color = badColor;
        //        message.innerHTML = "Invalid Email Format"
        //    }
        //}
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
                <a class="selectable">Currently Viewing Part 4</a>
                <a class="dropmenuStyle" href="../tma3.htm">Home</a>
                <a class="dropmenuStyle" href='../part1/part1.aspx'>Part 1</a>
                <a class="dropmenuStyle" href="../part2/part2.aspx">Part 2</a>
                <a class="dropmenuStyle" href='../part3/homepage.aspx'>Part 3</a>
                <a class="dropmenuStyle" href='../shared/doc.htm'>Full Documentation</a>
            </div>
        </div>
        <%--<a id="logoutButton" runat="server" visible="false" onclick="gui_logout" >Not Logged In</a>--%>
        <a class="loginButton" href="login.aspx">Login Page</a>
        <p id="cartTotal" runat="server">Currently Cart Empty!</p>
        <a class="cartHyperlink" href="cart.aspx">
            <asp:Image ID="Image1" CssClass="cartIcon" runat="server" ImageUrl="~/part4/assets/images/comware_icons/cart.png" /></a>
        <a class="topnavHyperlinks topnavBuildComp" style="margin-left: -50px" href="buildComputer.aspx">Build a PC</a>
        <a class="topnavHyperlinks topnavOrderParts" href="orderParts.aspx">Order Parts</a>
        <a class="topnavHyperlinks topnavContact" href="contacts.aspx">Contacts</a>
    </div>
    <form id="contactForm" runat="server">
        <asp:Button ID="logoutButton" Visible="false" runat="server" Text="Not Logged In" OnClick="gui_logout" />
        <asp:Panel runat="server" DefaultButton="submitSearchButton">
            <asp:TextBox ID="searchBar" CssClass="searchBar" Style="margin-top: -90px" type="text" runat="server" placeholder="Search..." />
            <asp:Button ID="submitSearchButton" runat="server" Style="display: none" OnClick="submitSearchButton_Click" />
        </asp:Panel>
        <div id="aboutUsHeaderContainer">
            <h1 id="aboutUsHeader">Login/Sign-Up</h1>
            <%--<h2 class="aboutUsH2">Contact Us</h2>--%>
        </div>

        <div id="loginDescription">
            <h3>Login:</h3>
            <p style="display: inline">Username:</p>
            <input id="login_username" type="text" runat="server" />
            <br />
            <p style="display: inline; margin-left: 3px; margin-top: 10px;">Password:</p>
            <input id="login_password" type="password" style="margin-top: 5px;" runat="server" />
            <br />
            <asp:Button ID="login_button" runat="server" Text="Login" Style="margin-left: 250px; margin-top: 10px;" OnClick="login_button_Click" />
            <br />
            <span id="confirmLogin" class="confirmEmail" runat="server"></span>
        </div>
        <div id="signupDescription">
            <h3>Sign-Up:</h3>
            <%--<p>Sign Up for Your New Account</p>--%>
            <p style="display: inline; margin-left: 55px; margin-top: -8px;">Username:</p>
            <input id="signup_username" type="text" style="margin-top: -8px;" runat="server" />
            <span id="confirmUsername" class="confirmPassword2" runat="server"></span>
            <br />
            <p style="display: inline; margin-left: 58px; margin-top: 10px;">Password:</p>
            <input id="signup_password" type="password" style="margin-top: 5px;" runat="server" />
            <span id="confirmPassword" class="confirmPassword2" runat="server"></span>
            <br />
            <p style="display: inline; margin-top: 10px;">Confirm Password:</p>
            <input id="signup_password2" type="password" style="margin-top: 5px;" runat="server" onkeyup="checkPass(); return false;" />
            <span id="confirmPassword2" class="confirmPassword2" runat="server"></span>
            <br />
            <p style="display: inline; margin-left: 81px; margin-top: 10px;">Email:</p>
            <input id="signup_email" type="email" style="margin-top: 5px;" runat="server" />
            <span id="confirmEmail" class="confirmEmail" runat="server"></span>
            <br />
            <asp:Button ID="signup_button" runat="server" Text="Register" Style="margin-left: 280px; margin-top: 10px;" OnClick="signup_button_Click" />
            <br />
            <span id="signupSuccess" visible="false" class="confirmEmail" runat="server"></span>

        </div>
        <div id="passwordRecoverDescription">
            <h3>Recover Password:</h3>
            <p style="display: inline; margin-top: -20px">Email:</p>
            <input id="recover_email" type="email" runat="server" />
            <br />
            <asp:Button ID="recover_button" runat="server" Text="Recover" Style="margin-left: 205px; margin-top: 10px;" OnClick="recover_button_Click" />
            <br />
            <span id="confirmRecovery" class="confirmEmail" runat="server"></span>
        </div>

        <div class="storeFooter">
            <footer>
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
    <script src="part4.js"></script>
</body>
</html>
