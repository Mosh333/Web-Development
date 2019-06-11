using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Comp466_Assign3a.part3
{
    public partial class cart : System.Web.UI.Page
    {
        protected global::System.Web.UI.WebControls.TextBox searchBar;

        protected void Page_Load(object sender, EventArgs e)
        {
            clientCart tempCart = new clientCart();
            String dispString = tempCart.returnCartSummary();
            cartTotal.InnerHtml = dispString;

            displayCartSummaryDOM(tempCart);
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
                    Debug.WriteLine("productIdCookie.Value",productIdCookie.Value);
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
                Debug.WriteLine("Removing From Cart!");
                Debug.WriteLine("this.productId is", this.productId.ToString());
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

                //else if (this.productId.Count == 1)
                //{
                //    this.productId = new List<int> { };
                //    this.clientItems = new List<string> { };
                //    this.price = new List<double> { };
                //    this.quantity = new List<int> { };

                //    this.computerType = new List<string> { };
                //    this.computerBrand = new List<string> { };
                //    this.computerOS = new List<string> { };
                //    this.computerMonitor = new List<string> { };
                //    this.computerCPU = new List<string> { };
                //    this.computerGPU = new List<string> { };
                //    this.computerHDD = new List<string> { };
                //    this.computerRAM = new List<string> { };
                //    this.computerSoundcard = new List<string> { };
                //}
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

            public void eraseAllCookies()
            {
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

                //Erase cookie by setting expiration date to less than 0
                productIdCookie.Expires = DateTime.Now.AddDays(-1);
                itemsCookie.Expires = DateTime.Now.AddDays(-1);     //Let it expire in one day
                priceCookie.Expires = DateTime.Now.AddDays(-1);
                quantityCookie.Expires = DateTime.Now.AddDays(-1);
                computerTypeCookie.Expires = DateTime.Now.AddDays(-1);
                computerBrandCookie.Expires = DateTime.Now.AddDays(-1);
                computerOSCookie.Expires = DateTime.Now.AddDays(-1);
                computerMonitorCookie.Expires = DateTime.Now.AddDays(-1);
                computerCPUCookie.Expires = DateTime.Now.AddDays(-1);
                computerGPUCookie.Expires = DateTime.Now.AddDays(-1);
                computerRAMCookie.Expires = DateTime.Now.AddDays(-1);
                computerHDDCookie.Expires = DateTime.Now.AddDays(-1);
                computerSoundcardCookie.Expires = DateTime.Now.AddDays(-1);

                //Write/Save the cookie back to Client
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
                    String totalPriceDisp = string.Format("{0:C}", totalPrice.ToString());
                    dispString = String.Concat("Cart Total: $", totalPriceDisp, "; Number of Items: ");
                    dispString = String.Concat(dispString, numberItems.ToString());
                    Debug.WriteLine("Returning dispString: ", dispString);
                }
                return dispString;
            }
        }

        protected void displayCartSummaryDOM(clientCart myCart)
        {
            //Add relevant summary to "shoppingCartPanel"
            //Button dynamicbutton = new Button();
            //dynamicbutton.Click += new System.EventHandler(menuItem_Click);
            //dynamicbutton.Text = "Moshiur";
            //dynamicbutton.Visible = true;
            //shoppingCartPanel.Controls.Add(dynamicbutton);
            if (myCart.productId.Count == 0)
            {
                Label cartEmptyLabel = new Label();
                cartEmptyLabel.CssClass = "cartEmptyLabel";
                cartEmptyLabel.Text = "Cart is Empty!";
                shoppingCartPanel.Controls.Add(cartEmptyLabel);
                Debug.WriteLine("Cart is Empty!");
            }
            else
            {
                for(int i = 0; i < myCart.productId.Count; i++)
                {
                    if (myCart.clientItems[i] == "Desktop")
                    {
                        //Place Item Title, all its configurations info,
                        //Price, Qty, an image, 
                        //and Button to remove item
                        Label itemTitle = new Label();
                        itemTitle.Text = String.Concat(myCart.clientItems[i], " Computer<br><br>");
                        itemTitle.CssClass = "itemTitle";

                        Label itemConfiguration = new Label();
                        String info1 = String.Concat("Desktop brand: ",myCart.computerBrand[i], "<br>");
                        String info2 = String.Concat("CPU: ", myCart.computerCPU[i], "<br>");
                        String info3 = String.Concat("GPU: ", myCart.computerGPU[i], "<br>");
                        String info4 = String.Concat("Hard Drive: ", myCart.computerHDD[i], "<br>");
                        String info5 = String.Concat("Monitor: ", myCart.computerMonitor[i], "<br>");
                        String info6 = String.Concat("Operating System: ", myCart.computerOS[i], "<br>");
                        String info7 = String.Concat("RAM: ", myCart.computerRAM[i], "<br>");
                        String info8 = String.Concat("Soundcard: ", myCart.computerSoundcard[i], "<br>");
                        String configString = String.Concat(info1, info2, info3, info4, info5, info6, info7, info8);
                        itemConfiguration.Text = configString;
                        itemConfiguration.CssClass = "itemConfiguration";

                        Label itemQty = new Label();
                        String qtyString = String.Concat("Quantity: ", myCart.quantity[i], " Unit(s)<br><br>");
                        itemQty.Text = qtyString;
                        itemQty.CssClass = "itemQty";

                        Label itemPrice = new Label();
                        String priceString = String.Concat("Desktop Total: $", myCart.price[i], "<br>");
                        itemPrice.Text = priceString;
                        itemPrice.CssClass = "itemPrice";

                        Button removeItemButton = new Button();
                        removeItemButton.Text = "Remove This From Cart";
                        removeItemButton.ID = String.Concat("indexToRemove", Convert.ToString(i));
                        removeItemButton.CssClass = String.Concat("indexToRemoveDesktop");
                        removeItemButton.Click += new System.EventHandler(removeItemFromCart);

                        Image productImage = new Image();
                        productImage.CssClass = "productImageDesktop";
                        String imageLink = "~/part3/assets/images/brands/comware.png";
                        if (myCart.computerBrand[i] == "Comware ($0)")
                        {
                            imageLink = "~/part3/assets/images/brands/comware.png";
                        }
                        else if (myCart.computerBrand[i] == "Asus ($50)")
                        {
                            imageLink = "~/part3/assets/images/brands/asus.png";
                        }
                        else if (myCart.computerBrand[i]== "Dell ($50)")
                        {
                            imageLink = "~/part3/assets/images/brands/dell.png";
                        }
                        productImage.ImageUrl = imageLink;

                        Label lineBreak = new Label();
                        lineBreak.Text = "<hr>";
                        lineBreak.CssClass = "shoppingCartDesktopLineBreak";

                        //Insert Everything Now
                        shoppingCartPanel.Controls.Add(itemTitle);
                        shoppingCartPanel.Controls.Add(itemConfiguration);
                        shoppingCartPanel.Controls.Add(itemQty);
                        shoppingCartPanel.Controls.Add(itemPrice);
                        shoppingCartPanel.Controls.Add(removeItemButton);
                        shoppingCartPanel.Controls.Add(productImage);
                        shoppingCartPanel.Controls.Add(lineBreak);
                    }
                    else if(myCart.clientItems[i] == "Laptop")
                    {
                        Label itemTitle = new Label();
                        itemTitle.Text = String.Concat(myCart.clientItems[i], " Computer<br><br>");
                        itemTitle.CssClass = "itemTitle";

                        Label itemConfiguration = new Label();
                        String info1 = String.Concat("Laptop brand: ", myCart.computerBrand[i], "<br>");
                        String info2 = String.Concat("CPU: ", myCart.computerCPU[i], "<br>");
                        String info3 = String.Concat("GPU: ", myCart.computerGPU[i], "<br>");
                        String info4 = String.Concat("Hard Drive: ", myCart.computerHDD[i], "<br>");
                        String info5 = String.Concat("Monitor: ", myCart.computerMonitor[i], "<br>");
                        String info6 = String.Concat("Operating System: ", myCart.computerOS[i], "<br>");
                        String info7 = String.Concat("RAM: ", myCart.computerRAM[i], "<br>");
                        String info8 = String.Concat("Soundcard: ", myCart.computerSoundcard[i], "<br>");
                        String configString = String.Concat(info1, info2, info3, info4, info5, info6, info7, info8);
                        itemConfiguration.Text = configString;
                        itemConfiguration.CssClass = "itemConfiguration";

                        Label itemQty = new Label();
                        String qtyString = String.Concat("Quantity: ", myCart.quantity[i], " Unit(s)<br><br>");
                        itemQty.Text = qtyString;
                        itemQty.CssClass = "itemQty";

                        Label itemPrice = new Label();
                        String priceString = String.Concat("Laptop Total: $", myCart.price[i], "<br>");
                        itemPrice.Text = priceString;
                        itemPrice.CssClass = "itemPrice";

                        Button removeItemButton = new Button();
                        removeItemButton.Text = "Remove This From Cart";
                        removeItemButton.ID = String.Concat("indexToRemove", Convert.ToString(i));
                        removeItemButton.CssClass = String.Concat("indexToRemoveLaptop");
                        removeItemButton.Click += new System.EventHandler(removeItemFromCart);

                        Image productImage = new Image();
                        productImage.CssClass = "productImageLaptop";
                        String imageLink = "~/part3/assets/images/brands/comware.png";
                        if (myCart.computerBrand[i] == "Comware ($0)")
                        {
                            imageLink = "~/part3/assets/images/brands/comware.png";
                        }
                        else if (myCart.computerBrand[i] == "Asus ($50)")
                        {
                            imageLink = "~/part3/assets/images/brands/asus.png";
                        }
                        else if (myCart.computerBrand[i] == "Dell ($50)")
                        {
                            imageLink = "~/part3/assets/images/brands/dell.png";
                        }
                        productImage.ImageUrl = imageLink;

                        Label lineBreak = new Label();
                        lineBreak.Text = "<hr>";
                        lineBreak.CssClass = "shoppingCartLaptopLineBreak";

                        //Insert Everything Now
                        shoppingCartPanel.Controls.Add(itemTitle);
                        shoppingCartPanel.Controls.Add(itemConfiguration);
                        shoppingCartPanel.Controls.Add(itemQty);
                        shoppingCartPanel.Controls.Add(itemPrice);
                        shoppingCartPanel.Controls.Add(removeItemButton);
                        shoppingCartPanel.Controls.Add(productImage);
                        shoppingCartPanel.Controls.Add(lineBreak);
                    }
                    else //myCart.clientItems[i] was not a custom made PC/Laptop
                    {
                        Label productItem = new Label();
                        Label productQty = new Label();
                        Image productImage = new Image();
                        Label productPrice = new Label();
                        Button removeItemButton = new Button();
                        removeItemButton.Text = "Remove This From Cart";
                        removeItemButton.ID = String.Concat("indexToRemove", Convert.ToString(i));
                        removeItemButton.CssClass = String.Concat("indexToRemoveComponent");
                        removeItemButton.Click += new System.EventHandler(removeItemFromCart);
                        productItem.CssClass = "productItem";
                        productQty.CssClass = "productQty";
                        productImage.CssClass = "productImage";
                        productPrice.CssClass = "productPrice";

                        if (myCart.clientItems[i] == "Window 10 ($50)")
                        {
                            productItem.Text = String.Concat(myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ",Convert.ToString(myCart.quantity[i])," Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/operatingSystem/windows10.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "MacOS Mojave ($50)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/operatingSystem/macOS.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Ubuntu Linux ($50)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/operatingSystem/ubuntu.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "21 Inch Monitor ($100)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/monitor/monitor_21inch.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "24 Inch Monitor ($150)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/monitor/monitor_24inch.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "27 Inch Monitor ($200)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/monitor/monitor_27inch.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Intel i3 Processor ($100)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/cpu/intel_i3.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Intel i5 Processor ($150)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/cpu/intel_i5.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Intel i7 Processor ($250)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/cpu/intel_i7.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "NVIDIA GT1030 ($100)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/gpu/gt1030.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "NVIDIA GTX1050 ($200)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/gpu/gt1050.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "NVIDIA GTX1060 ($300)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/gpu/gt1060.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "HDD 500GB ($50)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/hdd/hdd500.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "HDD 750GB ($100)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/hdd/hdd750.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "HDD 1TB ($150)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/hdd/hdd1000.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "SSD 250GB ($150)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/hdd/ssd250.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "SSD 500GB ($250)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/hdd/ssd500.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "4 GB DDR3 RAM ($25)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/ram/ram4gb.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "8 GB DDR3 RAM ($40)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/ram/ram8gb.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "16 GB DDR3 RAM ($80)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/ram/ram16gb.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "8GB DDR4 RAM ($100)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/ram/ram8gb_ddr4.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Regular Soundcard ($80)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardRegular.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Gaming Soundcard ($120)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardGaming.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }
                        else if (myCart.clientItems[i] == "Professional Soundcard ($200)")
                        {
                            productItem.Text = String.Concat( myCart.clientItems[i], "<br>");
                            productQty.Text = String.Concat("Quantity: ", Convert.ToString(myCart.quantity[i]), " Unit(s)<br>");
                            productImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardProfessional.png";
                            productPrice.Text = String.Concat("Total: $",myCart.quantity[i]*myCart.price[i], "<br>");
                        }

                        Label lineBreak = new Label();
                        lineBreak.Text = "<hr class=\"shoppingCartComponentLineBreak\">";


                        shoppingCartPanel.Controls.Add(productItem);
                        shoppingCartPanel.Controls.Add(productQty);
                        shoppingCartPanel.Controls.Add(productImage);
                        shoppingCartPanel.Controls.Add(removeItemButton);
                        shoppingCartPanel.Controls.Add(productPrice);
                        shoppingCartPanel.Controls.Add(lineBreak);

                    }
                }
                Label TotalPrice = new Label();
                TotalPrice.ID = "finalShoppingCartContainerSummary";
                TotalPrice.Text = myCart.returnCartSummary();
                shoppingCartPanel.Controls.Add(TotalPrice);

            }
        }

        private void removeItemFromCart(object sender, EventArgs e)
        {
            //removeItemButton.ID = indexToRemove#
            //removeItemButton.CssClass = String.Concat("indexToRemove");
            //int numButtons = document.getElementsByClass("indexToRemove");
            clientCart tempCart = new clientCart();
            Button myRemoveButton = (Button)sender;
            String indexToRemove = myRemoveButton.ID;   //CSS Class is irrelevant for this
            String stringToRemove = "indexToRemove";
            indexToRemove = indexToRemove.Substring(stringToRemove.Length); //retains only index

            //Finally remove, or update Data Structure
            if (tempCart.productId.Count > 1) { 
                tempCart.removeFromClientCart(Convert.ToInt32(indexToRemove));
            }
            else
            {
                Debug.WriteLine("Make custom remove here!");
                Debug.WriteLine("Set Cookie Value to zero or remove by expire");
                tempCart.eraseAllCookies();
            }
            Response.Redirect("cart.aspx"); //Remake shoppingCartPanel from scratch
        }

        private void menuItem_Click(object sender, EventArgs e)
        {
            Debug.WriteLine("Moshiur is awesome!");
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
    }
}