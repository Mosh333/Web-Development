using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Comp466_Assign3a.part3
{
    public partial class orderParts : System.Web.UI.Page
    {
        protected global::System.Web.UI.WebControls.TextBox searchBar;

        protected void Page_Load(object sender, EventArgs e)
        {
            clientCart tempCart = new clientCart();
            String dispString = tempCart.returnCartSummary();
            cartTotal.InnerHtml = dispString;
            //Write a method to automatically click appropriate
            //tab from homepage session variable
            clickComponentTab();
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
            public void addComponentToCart(string item, double itemPrice, int itemQty)
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

        protected void clickComponentTab()
        {
            String componentSelected = (String)Session["prodTypeSelected"];
            Debug.Write("*********");
            Debug.Write(componentSelected);
            Debug.Write("*********");
            if (componentSelected == "cpu_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickCpuTab()", true);
            }else if(componentSelected== "gpu_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickGpuTab()", true);
            }
            else if(componentSelected == "monitor_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickMonitorTab()", true);
            }
            else if(componentSelected == "os_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickOsTab()", true);
            }
            else if(componentSelected == "ram_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickRamTab()", true);
            }
            else if(componentSelected == "soundcard_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickSoundcardTab()", true);
            }
            else if(componentSelected == "hdd_icon")
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "clickHddTab()", true);
            }

        }
        protected void addToCart_Click(object sender, EventArgs e)
        {
            clientCart updatedCart = new clientCart();
            Button addToCartButton = (Button)sender;
            Debug.WriteLine(addToCartButton.ID);
            String findProdInfo = addToCartButton.ID;
            String item;
            double itemPrice;
            int itemQty;
            //Given a specific component, add to cart
            //public void addComponentToCart(string item, double itemPrice, int itemQty)
            if (findProdInfo == "addToCart_cpu")
            {
                if (Convert.ToInt32(cpu1_qty.Value) > 0)
                {
                    item = cpu1.InnerText;
                    itemPrice = 100.0;
                    itemQty = Convert.ToInt32(cpu1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);

                }
                if (Convert.ToInt32(cpu2_qty.Value) > 0)
                {
                    item = cpu2.InnerText;
                    itemPrice = 150.0;
                    itemQty = Convert.ToInt32(cpu2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(cpu3_qty.Value) > 0)
                {
                    item = cpu3.InnerText;
                    itemPrice = 200.0;
                    itemQty = Convert.ToInt32(cpu3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                cpu1_qty.Value = "0";
                cpu2_qty.Value = "0";
                cpu3_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_gpu")
            {
                if (Convert.ToInt32(gpu1_qty.Value) > 0)
                {
                    item = gpu1.InnerText;
                    itemPrice = 100.0;
                    itemQty = Convert.ToInt32(gpu1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(gpu2_qty.Value) > 0)
                {
                    item = gpu2.InnerText;
                    itemPrice = 200.0;
                    itemQty = Convert.ToInt32(gpu2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(gpu3_qty.Value) > 0)
                {
                    item = gpu3.InnerText;
                    itemPrice = 300.0;
                    itemQty = Convert.ToInt32(gpu3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                gpu1_qty.Value = "0";
                gpu2_qty.Value = "0";
                gpu3_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_hdd")
            {
                if (Convert.ToInt32(hdd1_qty.Value) > 0)
                {
                    item = hdd1.InnerText;
                    itemPrice = 50.0;
                    itemQty = Convert.ToInt32(hdd1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(hdd2_qty.Value) > 0)
                {
                    item = hdd2.InnerText;
                    itemPrice = 100.0;
                    itemQty = Convert.ToInt32(hdd2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(hdd3_qty.Value) > 0)
                {
                    item = hdd3.InnerText;
                    itemPrice = 150.0;
                    itemQty = Convert.ToInt32(hdd3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(hdd4_qty.Value) > 0)
                {
                    item = hdd4.InnerText;
                    itemPrice = 150.0;
                    itemQty = Convert.ToInt32(hdd4_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(hdd5_qty.Value) > 0)
                {
                    item = hdd5.InnerText;
                    itemPrice = 200.0;
                    itemQty = Convert.ToInt32(hdd5_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                hdd1_qty.Value = "0";
                hdd2_qty.Value = "0";
                hdd3_qty.Value = "0";
                hdd4_qty.Value = "0";
                hdd5_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_monitor")
            {
                if (Convert.ToInt32(monitor1_qty.Value) > 0)
                {
                    item = monitor1.InnerText;
                    itemPrice = 100.0;
                    itemQty = Convert.ToInt32(monitor1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(monitor2_qty.Value) > 0)
                {
                    item = monitor2.InnerText;
                    itemPrice = 150.0;
                    itemQty = Convert.ToInt32(monitor2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(monitor3_qty.Value) > 0)
                {
                    item = monitor3.InnerText;
                    itemPrice = 200.0;
                    itemQty = Convert.ToInt32(monitor3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                monitor1_qty.Value = "0";
                monitor2_qty.Value = "0";
                monitor3_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_os")
            {
                if (Convert.ToInt32(os1_qty.Value) > 0)
                {
                    item = os1.InnerText;
                    itemPrice = 50.0;
                    itemQty = Convert.ToInt32(os1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(os2_qty.Value) > 0)
                {
                    item = os2.InnerText;
                    itemPrice = 50.0;
                    itemQty = Convert.ToInt32(os2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(os3_qty.Value) > 0)
                {
                    item = os3.InnerText;
                    itemPrice = 50.0;
                    itemQty = Convert.ToInt32(os3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                os1_qty.Value = "0";
                os2_qty.Value = "0";
                os3_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_ram")
            {
                if (Convert.ToInt32(ram1_qty.Value) > 0)
                {
                    item = ram1.InnerText;
                    itemPrice = 25.0;
                    itemQty = Convert.ToInt32(ram1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(ram2_qty.Value) > 0)
                {
                    item = ram2.InnerText;
                    itemPrice = 40.0;
                    itemQty = Convert.ToInt32(ram2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(ram3_qty.Value) > 0)
                {
                    item = ram3.InnerText;
                    itemPrice = 80.0;
                    itemQty = Convert.ToInt32(ram3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(ram4_qty.Value) > 0)
                {
                    item = ram4.InnerText;
                    itemPrice = 100.0;
                    itemQty = Convert.ToInt32(ram4_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                ram1_qty.Value = "0";
                ram2_qty.Value = "0";
                ram3_qty.Value = "0";
                ram4_qty.Value = "0";
            }
            else if (findProdInfo == "addToCart_soundcard")
            {
                if (Convert.ToInt32(soundcard1_qty.Value) > 0)
                {
                    item = soundcard1.InnerText;
                    itemPrice = 80.0;
                    itemQty = Convert.ToInt32(soundcard1_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(soundcard2_qty.Value) > 0)
                {
                    item = soundcard2.InnerText;
                    itemPrice = 120.0;
                    itemQty = Convert.ToInt32(soundcard2_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                if (Convert.ToInt32(soundcard3_qty.Value) > 0)
                {
                    item = soundcard3.InnerText;
                    itemPrice = 200.0;
                    itemQty = Convert.ToInt32(soundcard3_qty.Value);
                    updatedCart.addComponentToCart(item, itemPrice, itemQty);
                    Debug.WriteLine("item is: ");
                    Debug.WriteLine(item);
                    Debug.WriteLine("item price is: $");
                    Debug.WriteLine(itemPrice);
                    Debug.WriteLine("item quantity is: ");
                    Debug.WriteLine(itemQty);
                }
                soundcard1_qty.Value = "0";
                soundcard2_qty.Value = "0";
                soundcard3_qty.Value = "0";
            }

            Response.Redirect("cart.aspx");
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