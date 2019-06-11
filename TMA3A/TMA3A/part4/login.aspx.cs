using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Comp466_Assign3a.part4
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            clientCart tempCart = new clientCart();
            String dispString = tempCart.returnCartSummary();
            cartTotal.InnerHtml = dispString;
            updateForLoggedInUser();
        }

        private void updateForLoggedInUser()
        {
            //Add event for the button "logoutButton"
            //And add appropriate text to give impression that the user is logged in
            HttpCookie cookie = Request.Cookies["comwareLoggedInCookie"];
            if (cookie != null && cookie.Values["loggedin"]=="true")
            {
                String username = cookie.Values["username"];
                logoutButton.Text = String.Concat("Logout as ", username);
                logoutButton.Visible = true;
                Debug.WriteLine("Did we log in?");
            }
        }

        protected void gui_logout(object sender, EventArgs e)
        {
            //Make cookie expire and hide the button
            HttpCookie cookie = Request.Cookies["comwareLoggedInCookie"];
            cookie.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Add(cookie);
            logoutButton.Visible = false;
        }

        public class clientCart
        {
            //Field Variables
            public List<int> productId; //store unique sequential int to track product order
            public List<string> clientItems;
            public List<double> price;
            public List<int> quantity;
            //These lists will account for corresponding indices of clientItems
            //Each of the string entry will contain what it is and its price
            public List<string> computerType;   //Laptop or Desktop?
            public List<string> computerBrand;
            public List<string> computerOS;
            public List<string> computerMonitor;
            public List<string> computerCPU;
            public List<string> computerGPU;
            public List<string> computerHDD;
            public List<string> computerRAM;
            public List<string> computerSoundcard;

            //Constructor
            public clientCart()
            {
                //Initialize Class using cookie (NewtonSoft did not work for us) ie clientCart readClientCart = JsonConvert.DeserializeObject<clientCart>(clientCartCookie.Value);
                HttpCookie productIdCookie = HttpContext.Current.Request.Cookies["productIdCookie"];  //Request to get, Response to modify
                HttpCookie itemsCookie = HttpContext.Current.Request.Cookies["itemsCookie"];  //Request to get, Response to modify
                HttpCookie priceCookie = HttpContext.Current.Request.Cookies["priceCookie"];
                HttpCookie quantityCookie = HttpContext.Current.Request.Cookies["quantityCookie"];
                HttpCookie computerTypeCookie = HttpContext.Current.Request.Cookies["computerTypeCookie"];
                HttpCookie computerBrandCookie = HttpContext.Current.Request.Cookies["computerBrandCookie"];
                HttpCookie computerOSCookie = HttpContext.Current.Request.Cookies["computerOSCookie"];
                HttpCookie computerMonitorCookie = HttpContext.Current.Request.Cookies["computerMonitorCookie"];
                HttpCookie computerCPUCookie = HttpContext.Current.Request.Cookies["computerCPUCookie"];
                HttpCookie computerGPUCookie = HttpContext.Current.Request.Cookies["computerGPUCookie"];
                HttpCookie computerHDDCookie = HttpContext.Current.Request.Cookies["computerHDDCookie"];
                HttpCookie computerRAMCookie = HttpContext.Current.Request.Cookies["computerRAMCookie"];
                HttpCookie computerSoundcardCookie = HttpContext.Current.Request.Cookies["computerSoundcardCookie"];
                Boolean cookiesNull = (productIdCookie == null) && (itemsCookie == null) && (priceCookie == null) && (quantityCookie == null) && (computerTypeCookie == null) && (computerBrandCookie == null) && (computerOSCookie == null) && (computerMonitorCookie == null) && (computerCPUCookie == null) && (computerGPUCookie == null) && (computerHDDCookie == null) && (computerRAMCookie == null) && (computerSoundcardCookie == null);
                if (cookiesNull)
                {
                    Debug.WriteLine("Cookies Did not Exist...");

                    Debug.WriteLine("Created a new Shopping Cart Object!!!!!");
                    this.productId = new List<int> { };
                    this.clientItems = new List<string> { };
                    this.price = new List<double> { };
                    this.quantity = new List<int> { };

                    this.computerType = new List<string> { };
                    this.computerBrand = new List<string> { };
                    this.computerOS = new List<string> { };
                    this.computerMonitor = new List<string> { };
                    this.computerCPU = new List<string> { };
                    this.computerGPU = new List<string> { };
                    this.computerHDD = new List<string> { };
                    this.computerRAM = new List<string> { };
                    this.computerSoundcard = new List<string> { };

                }
                else
                {

                    //clientCart readClientCart = JsonConvert.DeserializeObject<clientCart>(clientCartCookie.Value);
                    //Not possible to seriable this much data => causes stack overflow
                    //https://stackoverflow.com/questions/41828014/json-net-stackoverflowexception-while-serialization
                    //Will Need to use multiple cookies
                    //Cookies only made while there is cart data in it, not empty cookies are made
                    Debug.WriteLine("itemsCookie.Value is: ", itemsCookie.Value);
                    Debug.WriteLine("productIdCookie.Value is: ", productIdCookie.Value);
                    this.clientItems = itemsCookie.Value.Split(',').ToList();
                    this.productId = productIdCookie.Value.Split(',').Select(int.Parse).ToList();
                    this.price = priceCookie.Value.Split(',').Select(double.Parse).ToList();
                    this.quantity = quantityCookie.Value.Split(',').Select(int.Parse).ToList();

                    this.computerType = computerTypeCookie.Value.Split(',').ToList();
                    this.computerBrand = computerBrandCookie.Value.Split(',').ToList();
                    this.computerOS = computerOSCookie.Value.Split(',').ToList();
                    this.computerMonitor = computerMonitorCookie.Value.Split(',').ToList();
                    this.computerCPU = computerCPUCookie.Value.Split(',').ToList();
                    this.computerGPU = computerGPUCookie.Value.Split(',').ToList();
                    this.computerRAM = computerRAMCookie.Value.Split(',').ToList();
                    this.computerHDD = computerHDDCookie.Value.Split(',').ToList();
                    this.computerSoundcard = computerSoundcardCookie.Value.Split(',').ToList();
                    Debug.WriteLine("A VERY GOOD SIGN!");

                }
            }
            public void addComponentToCart(string item, int itemPrice, int itemQty)
            {
                this.productId.Add(0);  //insert dummy integer to increase length of list by 1
                for (int i = 0; i < this.productId.Count; i++)     //update according to the corresponding index
                {
                    this.productId[i] = i + 1;  //replace by 1,2,3.... entries
                }
                this.clientItems.Add(item);
                this.price.Add(itemPrice);
                this.quantity.Add(itemQty);

                //To keep indexing consistent
                this.computerType.Add("");
                this.computerBrand.Add("");
                this.computerOS.Add("");
                this.computerMonitor.Add("");
                this.computerCPU.Add("");
                this.computerGPU.Add("");
                this.computerHDD.Add("");
                this.computerRAM.Add("");
                this.computerSoundcard.Add("");

                saveCartToCookie();

            }

            public void addComputerToCart(double cost, int qty, String compType,
                String compBrand, String compOS, String compMonitor, String compCPU,
                String compGPU, String compHDD, String compRAM, String compSoundcard)
            {
                Debug.WriteLine(cost);
                Debug.WriteLine(qty);
                Debug.WriteLine(compType);
                Debug.WriteLine(compBrand);
                Debug.WriteLine(compOS);
                Debug.WriteLine(compMonitor);
                Debug.WriteLine(compCPU);
                Debug.WriteLine(compGPU);
                Debug.WriteLine(compHDD);
                Debug.WriteLine(compRAM);
                Debug.WriteLine(compSoundcard);

                this.productId.Add(0);  //insert dummy integer to increase length of list by 1
                for (int i = 0; i < this.productId.Count; i++)     //update according to the corresponding index
                {
                    this.productId[i] = i + 1;  //replace by 1,2,3.... entries
                }
                this.clientItems.Add(compType);
                this.price.Add(cost);
                this.quantity.Add(qty);

                this.computerType.Add(compType);
                this.computerBrand.Add(compBrand);
                this.computerOS.Add(compOS);
                this.computerMonitor.Add(compMonitor);
                this.computerCPU.Add(compCPU);
                this.computerGPU.Add(compGPU);
                this.computerHDD.Add(compHDD);
                this.computerRAM.Add(compRAM);
                this.computerSoundcard.Add(compSoundcard);

                saveCartToCookie();

            }

            public void removeFromClientCart(int indexToRemove)  //string item, int itemQty
            {
                //The indexToRemove directly corresponds to productId number
                this.productId.RemoveAt(indexToRemove);
                for (int i = 0; i < this.productId.Count; i++)     //update according to the corresponding index
                {
                    this.productId[i] = i + 1;  //replace by 1,2,3.... entries
                }
                this.clientItems.RemoveAt(indexToRemove);
                this.price.RemoveAt(indexToRemove);
                this.quantity.RemoveAt(indexToRemove);

                this.computerType.RemoveAt(indexToRemove);
                this.computerBrand.RemoveAt(indexToRemove);
                this.computerOS.RemoveAt(indexToRemove);
                this.computerMonitor.RemoveAt(indexToRemove);
                this.computerCPU.RemoveAt(indexToRemove);
                this.computerGPU.RemoveAt(indexToRemove);
                this.computerHDD.RemoveAt(indexToRemove);
                this.computerRAM.RemoveAt(indexToRemove);
                this.computerSoundcard.RemoveAt(indexToRemove);

                saveCartToCookie();
            }

            public void saveCartToCookie()
            {
                //Get current context of the response cookie to modify the cookie value
                //HttpCookie productIdCookie = HttpContext.Current.Response.Cookies["productIdCookie"];  //Request to get, Response to modify

                //Create new set of cookies to overwrite the old cookies
                HttpCookie productIdCookie = new HttpCookie("productIdCookie");  //Request to get, Response to modify
                HttpCookie itemsCookie = new HttpCookie("itemsCookie");  //Request to get, Response to modify
                HttpCookie priceCookie = new HttpCookie("priceCookie");
                HttpCookie quantityCookie = new HttpCookie("quantityCookie");
                HttpCookie computerTypeCookie = new HttpCookie("computerTypeCookie");
                HttpCookie computerBrandCookie = new HttpCookie("computerBrandCookie");
                HttpCookie computerOSCookie = new HttpCookie("computerOSCookie");
                HttpCookie computerMonitorCookie = new HttpCookie("computerMonitorCookie");
                HttpCookie computerCPUCookie = new HttpCookie("computerCPUCookie");
                HttpCookie computerGPUCookie = new HttpCookie("computerGPUCookie");
                HttpCookie computerHDDCookie = new HttpCookie("computerHDDCookie");
                HttpCookie computerRAMCookie = new HttpCookie("computerRAMCookie");
                HttpCookie computerSoundcardCookie = new HttpCookie("computerSoundcardCookie");

                //Set expiration date
                productIdCookie.Expires = DateTime.Now.AddDays(1);
                itemsCookie.Expires = DateTime.Now.AddDays(1);     //Let it expire in one day
                priceCookie.Expires = DateTime.Now.AddDays(1);
                quantityCookie.Expires = DateTime.Now.AddDays(1);
                computerTypeCookie.Expires = DateTime.Now.AddDays(1);
                computerBrandCookie.Expires = DateTime.Now.AddDays(1);
                computerOSCookie.Expires = DateTime.Now.AddDays(1);
                computerMonitorCookie.Expires = DateTime.Now.AddDays(1);
                computerCPUCookie.Expires = DateTime.Now.AddDays(1);
                computerGPUCookie.Expires = DateTime.Now.AddDays(1);
                computerRAMCookie.Expires = DateTime.Now.AddDays(1);
                computerHDDCookie.Expires = DateTime.Now.AddDays(1);
                computerSoundcardCookie.Expires = DateTime.Now.AddDays(1);

                //Save data to the cookies in a comma-separated string
                productIdCookie.Value = string.Join(",", this.productId);
                itemsCookie.Value = string.Join(",", this.clientItems);
                priceCookie.Value = string.Join(",", this.price);
                quantityCookie.Value = string.Join(",", this.quantity);
                computerTypeCookie.Value = string.Join(",", this.computerType);
                computerBrandCookie.Value = string.Join(",", this.computerBrand);
                computerOSCookie.Value = string.Join(",", this.computerOS);
                computerMonitorCookie.Value = string.Join(",", this.computerMonitor);
                computerCPUCookie.Value = string.Join(",", this.computerCPU);
                computerGPUCookie.Value = string.Join(",", this.computerGPU);
                computerHDDCookie.Value = string.Join(",", this.computerHDD);
                computerRAMCookie.Value = string.Join(",", this.computerRAM);
                computerSoundcardCookie.Value = string.Join(",", this.computerSoundcard);

                //Write the cookie back to Client
                HttpContext.Current.Response.Cookies.Add(productIdCookie);
                HttpContext.Current.Response.Cookies.Add(itemsCookie);
                HttpContext.Current.Response.Cookies.Add(priceCookie);
                HttpContext.Current.Response.Cookies.Add(quantityCookie);
                HttpContext.Current.Response.Cookies.Add(computerTypeCookie);
                HttpContext.Current.Response.Cookies.Add(computerBrandCookie);
                HttpContext.Current.Response.Cookies.Add(computerOSCookie);
                HttpContext.Current.Response.Cookies.Add(computerMonitorCookie);
                HttpContext.Current.Response.Cookies.Add(computerCPUCookie);
                HttpContext.Current.Response.Cookies.Add(computerGPUCookie);
                HttpContext.Current.Response.Cookies.Add(computerRAMCookie);
                HttpContext.Current.Response.Cookies.Add(computerHDDCookie);
                HttpContext.Current.Response.Cookies.Add(computerSoundcardCookie);
            }

            public String returnCartSummary()
            {
                HttpCookie productIdCookie = HttpContext.Current.Request.Cookies["productIdCookie"];  //Request to get, Response to modify
                HttpCookie itemsCookie = HttpContext.Current.Request.Cookies["itemsCookie"];  //Request to get, Response to modify
                HttpCookie priceCookie = HttpContext.Current.Request.Cookies["priceCookie"];
                HttpCookie quantityCookie = HttpContext.Current.Request.Cookies["quantityCookie"];
                Boolean cookiesNull = (productIdCookie == null) && (itemsCookie == null) && (priceCookie == null) && (quantityCookie == null);
                if (!cookiesNull)
                {
                    this.productId = productIdCookie.Value.Split(',').Select(int.Parse).ToList();
                    this.clientItems = itemsCookie.Value.Split(',').ToList();
                    this.price = priceCookie.Value.Split(',').Select(double.Parse).ToList();
                    this.quantity = quantityCookie.Value.Split(',').Select(int.Parse).ToList();
                }
                //else
                //{
                //    this.productId = new List<int> { };//we do not need to check this
                //    this.clientItems = new List<string> { };
                //    this.price = new List<double> { };
                //    this.quantity = new List<int> { };
                //}


                Debug.WriteLine("this.clientItems.Count is: ", this.clientItems.Count);
                String dispString = "Currently Cart Empty";
                if (this.clientItems.Count > 0)
                {
                    double totalPrice = 0;
                    int numberItems = 0; //number of indivisual items

                    for (int i = 0; i < this.clientItems.Count; i++)
                    {
                        totalPrice += this.price[i] * (double)this.quantity[i];
                        numberItems += this.quantity[i];
                    }
                    String totalPriceDisp = string.Format("{0:N2}", totalPrice.ToString());
                    dispString = String.Concat("Cart Total: $", totalPriceDisp, "; Number of Items: ");
                    dispString = String.Concat(dispString, numberItems.ToString());
                    Debug.WriteLine("Returning dispString: ", dispString);
                }
                return dispString;
            }
        }
        protected void submitSearchButton_Click(object sender, EventArgs e)
        {
            // <%--AutoPostBack="True"--%>
            String output = searchBar.Text;
            Debug.WriteLine(output);
            Debug.WriteLine("submitSearchButton Clicked!");
            //Initialize a session variable
            Session["searchQuery"] = String.Concat("The string to search in DB is: ", output);
            Response.Redirect("searchResults.aspx");
        }

        protected void login_button_Click(object sender, EventArgs e)
        {
            Debug.WriteLine("Time to login!");
            String usernameInput = login_username.Value;
            String passwordInput = login_password.Value;
            if ((usernameInput.Length == 0))
            {
                signup_username.Value = usernameInput;
                confirmUsername.InnerHtml = "Username cannot be empty!";
            }
            if ((passwordInput.Length == 0))
            {
                signup_password.Value = passwordInput;
                confirmPassword.InnerHtml = "Password cannot be empty!";
            }
            if ((usernameInput.Length != 0) && (passwordInput.Length != 0))
            {
                Debug.WriteLine("The inputs are ok!");
                //Get parameters and pass it to signUp()
                logUserIn(usernameInput, passwordInput);
            }
        }

        private void logUserIn(string usernameInput, string passwordInput)
        {
            string connectionString = "Data Source=comware.database.windows.net;Initial Catalog=comware_comp466_assign3A;User ID=mosh333;Password=$Stapler391;Connect Timeout=60;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            Debug.WriteLine("Starting SQL Signup Sequence.");
            //Check if the username, and password combination exists
            String checkUser = String.Concat("select * from comware_customers where username='", usernameInput, "' and password='", passwordInput, "'");
            Debug.WriteLine(checkUser, " is checkUser");
            SqlCommand queryCmd = new SqlCommand(checkUser, connection);
            SqlDataReader numUserReader = queryCmd.ExecuteReader();
            int numUser = 0;
            String username = "";
            String password = "";
            try
            {
                while (numUserReader.Read())
                {
                    numUser++;
                    username = Convert.ToString(numUserReader["username"]);
                    password = Convert.ToString(numUserReader["password"]);
                }
            }
            finally
            {
                // Always call Close when done reading.
                numUserReader.Close();
            }
            if (numUser > 0)
            {
                confirmLogin.InnerHtml = String.Concat("Welcome User: ", username);
                //Create cookie to track whether the user is logged in
                HttpCookie cookie = Request.Cookies["comwareLoggedInCookie"];
                if (cookie == null)
                {
                    // no cookie found, create it
                    cookie = new HttpCookie("comwareLoggedInCookie");
                    cookie.Values["loggedIn"] = "true";
                    cookie.Values["username"] = username;
                }
                else
                {
                    cookie = new HttpCookie("comwareLoggedInCookie");
                    cookie.Values["loggedIn"] = "true";
                    cookie.Values["username"] = username;
                }
                cookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(cookie);
                Debug.WriteLine("The user: ", username, "is logged in!");
                logoutButton.Visible = true;
            }
            else
            {
                confirmLogin.InnerHtml = "Invalid Credentials!";
            }
        }

        protected void signup_button_Click(object sender, EventArgs e)
        {
            Debug.WriteLine("Time to signup!");
            //Check if all the inputs are filled
            String usernameInput = signup_username.Value;
            String passwordInput = signup_password.Value;
            String password2Input = signup_password2.Value;
            String emailInput = signup_email.Value;
            if ((usernameInput.Length == 0))
            {
                signup_username.Value = usernameInput;
                confirmUsername.InnerHtml = "Username cannot be empty!";
            }
            if ((passwordInput.Length == 0))
            {
                signup_password.Value = passwordInput;
                confirmPassword.InnerHtml = "Password cannot be empty!";
            }
            if ((password2Input.Length == 0))
            {
                signup_password2.Value = password2Input;
                confirmPassword2.InnerHtml = "Password cannot be empty!";
            }
            if ((emailInput.Length == 0))
            {
                signup_email.Value = emailInput;
                confirmEmail.InnerHtml = "Email cannot be empty!";
            }

            if ((usernameInput.Length != 0) && (passwordInput.Length != 0) && (password2Input.Length != 0) && (emailInput.Length != 0))
            {
                Debug.WriteLine("The inputs are ok!");
                //Get parameters and pass it to signUp()
                signUp(usernameInput, passwordInput, emailInput);
            }
            else
            {
                signup_username.Value = usernameInput;
                signup_password.Value = passwordInput;
                signup_password2.Value = password2Input;
                signup_email.Value = emailInput;
            }
            Debug.WriteLine(usernameInput);
            Debug.WriteLine(passwordInput);
            Debug.WriteLine(password2Input);
            Debug.WriteLine(emailInput);

        }

        protected void recover_button_Click(object sender, EventArgs e)
        {
            Debug.WriteLine("Time to recover password!");
            //Connect to Database and retrieve the username and password for the given email
            //note the email is enforced to be unique by server side coding (here)
            //and through SQL keyword "unique"
            String emailAddress = recover_email.Value;
            String usernameToSend = "";
            String passwordToSend = "";
            String emailHeading = "Your Comware Password Recovery!";
            String emailBody;
            if ((emailAddress.Length == 0))
            {
                signup_email.Value = emailAddress;
                confirmRecovery.InnerHtml = "Email cannot be empty!";
            }
            else
            {
                confirmRecovery.InnerHtml = "";

                string connectionString = "Data Source=comware.database.windows.net;Initial Catalog=comware_comp466_assign3A;User ID=mosh333;Password=$Stapler391;Connect Timeout=60;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                Debug.WriteLine("Starting SQL Signup Sequence.");
                String checkEmail = String.Concat("select * from comware_customers where emailAddr='", emailAddress, "'");
                Debug.WriteLine(checkEmail, " is checkEmail");
                SqlCommand queryCmd = new SqlCommand(checkEmail, connection);
                SqlDataReader numEmailReader = queryCmd.ExecuteReader();
                int numEmailExist = 0;
                try
                {
                    while (numEmailReader.Read())
                    {
                        numEmailExist++;
                        usernameToSend = Convert.ToString(numEmailReader["username"]);
                        passwordToSend = Convert.ToString(numEmailReader["password"]);
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    numEmailReader.Close();
                }
                Debug.WriteLine("numEmailExist is: ", numEmailExist);
                if (numEmailExist > 0)
                {
                    Debug.WriteLine("Batman is not a fatman!");
                    confirmRecovery.InnerHtml = String.Concat("Your password is: ", passwordToSend);
                    emailBody = String.Concat("Hello Comware User: ", usernameToSend, ", your password is: ", passwordToSend);
                    sendEmail(emailHeading, emailBody, emailAddress);
                }
                else
                {
                    Debug.WriteLine("Email does not exist!");
                    confirmRecovery.InnerHtml = "No user with such email!";
                }

            }

        }
        //https://docs.microsoft.com/en-us/azure/sendgrid-dotnet-how-to-send-email
        //send grid api:
        //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
        //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
        //Configuration from Azure does not seem to want to work with SendGrid.api
        //So i will hardcode the api key here although dangerous practice...
        private void sendEmail(String emailHeading, String emailBody, String emailAddress)
        {
            Debug.WriteLine("**************sendEmail************");
            Debug.WriteLine(emailHeading);
            Debug.WriteLine(emailBody);
            Debug.WriteLine(emailAddress);
            Debug.WriteLine("**************sendEmail************");
            var apiKey = System.Environment.GetEnvironmentVariable("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");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("howladermoshiur@gmail.com", "Comware Team"),
                Subject = emailHeading,
                PlainTextContent = emailBody,
                HtmlContent = String.Concat(emailBody)
            };
            msg.AddTo(new EmailAddress(emailAddress));  //"howlam@mcmaster.ca"
            client.SendEmailAsync(msg);
        }

        private void signUp(String usernameInput, String passwordInput, String emailInput)
        {
            string connectionString = "Data Source=comware.database.windows.net;Initial Catalog=comware_comp466_assign3A;User ID=mosh333;Password=$Stapler391;Connect Timeout=60;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            Debug.WriteLine("Starting SQL Signup Sequence.");
            Boolean canInsert = false;
            //Check if the username, and email exists indivisually
            String checkUser = String.Concat("select * from comware_customers where username='", usernameInput, "'");
            Debug.WriteLine(checkUser, " is checkUser");
            SqlCommand queryCmd = new SqlCommand(checkUser, connection);
            SqlDataReader numUserReader = queryCmd.ExecuteReader();
            int numUserExist = 0;
            try
            {
                while (numUserReader.Read())
                {
                    numUserExist++;
                }
            }
            finally
            {
                // Always call Close when done reading.
                numUserReader.Close();
            }
            if (numUserExist > 0)
            {
                Debug.WriteLine("User already exists!");
                confirmUsername.InnerHtml = "User Already Exists!";
            }
            else
            {
                confirmUsername.InnerHtml = "";
                confirmPassword.InnerHtml = "";
                confirmPassword2.InnerHtml = "";
            }
            String checkEmail = String.Concat("select * from comware_customers where emailAddr='", emailInput, "'");
            Debug.WriteLine(checkEmail, " is checkEmail");
            queryCmd = new SqlCommand(checkEmail, connection);
            SqlDataReader numEmailReader = queryCmd.ExecuteReader();
            int numEmailExist = 0;
            try
            {
                while (numEmailReader.Read())
                {
                    numEmailExist++;
                }
            }
            finally
            {
                // Always call Close when done reading.
                numEmailReader.Close();
            }
            if (numEmailExist > 0)
            {
                Debug.WriteLine("Email already exists!");
                confirmEmail.InnerHtml = "Email Already Being Used!";
            }
            else
            {
                confirmEmail.InnerHtml = "";
                confirmPassword.InnerHtml = "";
                confirmPassword2.InnerHtml = "";
            }
            if (numUserExist + numEmailExist == 0)
            {
                canInsert = true;
            }

            if (canInsert)
            {
                //INSERT INTO comware_customers(username, password, emailAddr) VALUES('Moshiur', 'Howlader', 'howladermoshiur@gmail.com');
                String queryString = "";
                String queryString1 = "INSERT INTO comware_customers(username, password, emailAddr) VALUES("; //comware_customers(username, password, emailAddr, securityQues,securityAns) VALUES('Moshiur', 'Howlader', 'howladermoshiur@gmail.com', 'what is 1+1', '2');
                String queryString2 = String.Concat("'", usernameInput, "','", passwordInput, "','", emailInput, "')");
                queryString = String.Concat(queryString1, queryString2);
                queryCmd = new SqlCommand(queryString, connection);
                int result = queryCmd.ExecuteNonQuery();
                if (result > 0)
                {
                    Debug.WriteLine("The result of the insert was greater than 0!");
                    signupSuccess.InnerHtml = String.Concat("Signup success for user: ", usernameInput);
                    signupSuccess.Visible = true;
                    login_username.Value = usernameInput;
                    signup_username.Value = "";
                    signup_email.Value = "";
                }
            }

            connection.Close();
            Debug.WriteLine("Finished Receiving Data from DB!");
        }
    }
}