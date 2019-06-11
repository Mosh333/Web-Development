using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace Comp466_Assign3a.part3
{
    public partial class buildComputer : System.Web.UI.Page
    {
        protected global::System.Web.UI.WebControls.TextBox searchBar;

        protected void Page_Load(object sender, EventArgs e)
        {
            clientCart tempCart = new clientCart();
            String dispString = tempCart.returnCartSummary();
            cartTotal.InnerHtml = dispString;
        }


        //https://stackoverflow.com/questions/11800254/difference-between-request-cookies-and-response-cookies
        //https://stackoverflow.com/questions/41636607/cookie-always-return-null
        //https://stackoverflow.com/questions/12079332/creating-simple-cookies-in-asp-net-c-sharp
        //Move this to buildComputer and orderParts
        //A simplified version of this class will need to be
        //transferred to rest of classes for reading and displaying cookie data
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
                    Debug.WriteLine("Returning dispString: ");
                    Debug.WriteLine(dispString);
                }
                return dispString;
            }
        }

        protected void submitSearchButton_Click(object sender, EventArgs e)
        {
            // <%--AutoPostBack="True"--%>
            String output = searchBar.Text;
            //Debug.WriteLine(output);
            //Debug.WriteLine("submitSearchButton Clicked!");
            //Initialize a session variable
            Session["searchQuery"] = String.Concat("The string to search in DB is: ", output);
            Response.Redirect("searchResults.aspx");
        }

        protected void adjustTotal_Desktop(object sender, EventArgs e)
        {
            //Two Tasks for Desktop Config:
            //1) Change image of the product (based on sender object)
            //2) Compute PC total

            //Task 1)
            changeProductImage(sender, e);

            //Task 2)
            double totalPrice = 0.00;
            double brandPrice = Convert.ToDouble(brandnameList.SelectedValue);
            //Debug.WriteLine(brandPrice);
            double operatingSystemPrice = Convert.ToDouble(operatingSystemList.SelectedValue);
            double monitorPrice = Convert.ToDouble(monitorList.SelectedValue);
            double cpuPrice = Convert.ToDouble(cpuList.SelectedValue);
            double gpuPrice = Convert.ToDouble(gpuList.SelectedValue);
            double hddPrice = Convert.ToDouble(hddList.SelectedValue);
            double ramPrice = Convert.ToDouble(ramList.SelectedValue);
            double soundcardPrice = Convert.ToDouble(soundcardList.SelectedValue);
            totalPrice = brandPrice + operatingSystemPrice + monitorPrice + cpuPrice + gpuPrice + hddPrice + ramPrice + soundcardPrice;
            desktopTotal.InnerHtml = string.Format("Total: ${0:N2}", totalPrice);
            //Fade1.Visible = true;
        }
        protected void adjustTotal_Laptop(object sender, EventArgs e)
        {
            //Two Tasks for Laptop Config:
            //1) Change image of the product (based on sender object)
            //2) Compute PC total

            //Task 1)
            changeProductImage_Laptop(sender, e);

            //Task 2)
            double totalPrice = 0.00;
            double brandPrice = Convert.ToDouble(brandnameList_laptop.SelectedValue);
            //Debug.WriteLine(brandPrice);
            double operatingSystemPrice = Convert.ToDouble(operatingSystemList_laptop.SelectedValue);
            double monitorPrice = Convert.ToDouble(monitorList_laptop.SelectedValue);
            double cpuPrice = Convert.ToDouble(cpuList_laptop.SelectedValue);
            double gpuPrice = Convert.ToDouble(gpuList_laptop.SelectedValue);
            double hddPrice = Convert.ToDouble(hddList_laptop.SelectedValue);
            double ramPrice = Convert.ToDouble(ramList_laptop.SelectedValue);
            double soundcardPrice = Convert.ToDouble(soundcardList_laptop.SelectedValue);
            totalPrice = 100 + brandPrice + operatingSystemPrice + monitorPrice + cpuPrice + gpuPrice + hddPrice + ramPrice + soundcardPrice;
            laptopTotal.InnerHtml = string.Format("Total: ${0:N2}", totalPrice);
        }
        private void changeProductImage(object sender, EventArgs e)
        {
            //Change image of the product based on sender object
            //string selectedValue = rblist1.SelectedValue;
            //Debug.WriteLine("Am I live?");
            RadioButtonList selection = (RadioButtonList)sender;
            //Debug.Write("The selected value is: ");
            //Debug.WriteLine(selection.SelectedValue);
            //Debug.WriteLine(selection.ID);
            //Debug.WriteLine(selection.SelectedIndex);
            //Debug.WriteLine(selection.SelectedItem);
            if (selection.ID == "brandnameList")
            {
                if (selection.SelectedIndex == 0)
                {
                    brandnameImage.ImageUrl = "~/part3/assets/images/brands/comware.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    brandnameImage.ImageUrl = "~/part3/assets/images/brands/asus.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    brandnameImage.ImageUrl = "~/part3/assets/images/brands/dell.png";
                }
            }
            else if (selection.ID == "operatingSystemList")
            {
                if (selection.SelectedIndex == 0)
                {
                    operatingSystemImage.ImageUrl = "~/part3/assets/images/operatingSystem/windows10.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    operatingSystemImage.ImageUrl = "~/part3/assets/images/operatingSystem/macOS.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    operatingSystemImage.ImageUrl = "~/part3/assets/images/operatingSystem/ubuntu.png";
                }
            }
            else if (selection.ID == "monitorList")
            {
                if (selection.SelectedIndex == 0)
                {
                    monitorImage.Visible = true;
                    monitorImage.ImageUrl = "~/part3/assets/images/monitor/monitor_21inch.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    monitorImage.Visible = true;
                    monitorImage.ImageUrl = "~/part3/assets/images/monitor/monitor_24inch.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    monitorImage.Visible = true;
                    monitorImage.ImageUrl = "~/part3/assets/images/monitor/monitor_27inch.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    monitorImage.Visible = false;
                    monitorImage.ImageUrl = "";
                }
            }
            else if (selection.ID == "cpuList")
            {
                if (selection.SelectedIndex == 0)
                {
                    cpuImage.ImageUrl = "~/part3/assets/images/cpu/intel_i3.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    cpuImage.ImageUrl = "~/part3/assets/images/cpu/intel_i5.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    cpuImage.ImageUrl = "~/part3/assets/images/cpu/intel_i7.png";
                }
            }
            else if (selection.ID == "gpuList")
            {
                if (selection.SelectedIndex == 0)
                {
                    gpuImage.ImageUrl = "~/part3/assets/images/gpu/gt1030.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    gpuImage.ImageUrl = "~/part3/assets/images/gpu/gt1050.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    gpuImage.ImageUrl = "~/part3/assets/images/gpu/gt1060.png";
                }
            }
            else if (selection.ID == "hddList")
            {
                if (selection.SelectedIndex == 0)
                {
                    hddImage.ImageUrl = "~/part3/assets/images/hdd/hdd500.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    hddImage.ImageUrl = "~/part3/assets/images/hdd/hdd750.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    hddImage.ImageUrl = "~/part3/assets/images/hdd/hdd1000.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    hddImage.ImageUrl = "~/part3/assets/images/hdd/ssd250.png";
                }
                else if (selection.SelectedIndex == 4)
                {
                    hddImage.ImageUrl = "~/part3/assets/images/hdd/ssd500.png";
                }
            }
            else if (selection.ID == "ramList")
            {
                if (selection.SelectedIndex == 0)
                {
                    ramImage.ImageUrl = "~/part3/assets/images/ram/ram4gb.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    ramImage.ImageUrl = "~/part3/assets/images/ram/ram8gb.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    ramImage.ImageUrl = "~/part3/assets/images/ram/ram16gb.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    ramImage.ImageUrl = "~/part3/assets/images/ram/ram8gb_ddr4.png";
                }
            }
            else if (selection.ID == "soundcardList")
            {
                if (selection.SelectedIndex == 0)
                {
                    soundcardImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardRegular.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    soundcardImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardGaming.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    soundcardImage.ImageUrl = "~/part3/assets/images/soundcard/soundcardProfessional.png";
                }
            }

            //Prevent Full/Partial-Postback Reload of the page by calling a Javascript Function
            //To click in the Updatepanel
            //https://stackoverflow.com/questions/666519/difference-between-registerstartupscript-and-registerclientscriptblock
            //Page.ClientScript.RegisterStartupScript(this.GetType(), "CallMyFunction", "resetDesktopView()", true);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "resetDesktopView()", true);

        }
        private void changeProductImage_Laptop(object sender, EventArgs e)
        {
            //Change image of the product based on sender object
            RadioButtonList selection = (RadioButtonList)sender;
            if (selection.ID == "brandnameList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    brandnameImage_laptop.ImageUrl = "~/part3/assets/images/brands/comware.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    brandnameImage_laptop.ImageUrl = "~/part3/assets/images/brands/asus.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    brandnameImage_laptop.ImageUrl = "~/part3/assets/images/brands/dell.png";
                }
            }
            else if (selection.ID == "operatingSystemList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    operatingSystemImage_laptop.ImageUrl = "~/part3/assets/images/operatingSystem/windows10.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    operatingSystemImage_laptop.ImageUrl = "~/part3/assets/images/operatingSystem/macOS.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    operatingSystemImage_laptop.ImageUrl = "~/part3/assets/images/operatingSystem/ubuntu.png";
                }
            }
            else if (selection.ID == "monitorList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    monitorImage_laptop.Visible = true;
                    monitorImage_laptop.ImageUrl = "~/part3/assets/images/monitor/laptop_13inch.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    monitorImage_laptop.Visible = true;
                    monitorImage_laptop.ImageUrl = "~/part3/assets/images/monitor/laptop_15inch.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    monitorImage_laptop.Visible = true;
                    monitorImage_laptop.ImageUrl = "~/part3/assets/images/monitor/laptop_17inch.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    monitorImage_laptop.Visible = false;
                    monitorImage_laptop.ImageUrl = "";
                }
            }
            else if (selection.ID == "cpuList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    cpuImage_laptop.ImageUrl = "~/part3/assets/images/cpu/intel_i3.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    cpuImage_laptop.ImageUrl = "~/part3/assets/images/cpu/intel_i5.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    cpuImage_laptop.ImageUrl = "~/part3/assets/images/cpu/intel_i7.png";
                }
            }
            else if (selection.ID == "gpuList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    gpuImage_laptop.ImageUrl = "~/part3/assets/images/gpu/gt1030.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    gpuImage_laptop.ImageUrl = "~/part3/assets/images/gpu/gt1050.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    gpuImage_laptop.ImageUrl = "~/part3/assets/images/gpu/gt1060.png";
                }
            }
            else if (selection.ID == "hddList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    hddImage_laptop.ImageUrl = "~/part3/assets/images/hdd/hdd500.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    hddImage_laptop.ImageUrl = "~/part3/assets/images/hdd/hdd750.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    hddImage_laptop.ImageUrl = "~/part3/assets/images/hdd/hdd1000.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    hddImage_laptop.ImageUrl = "~/part3/assets/images/hdd/ssd250.png";
                }
                else if (selection.SelectedIndex == 4)
                {
                    hddImage_laptop.ImageUrl = "~/part3/assets/images/hdd/ssd500.png";
                }
            }
            else if (selection.ID == "ramList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    ramImage_laptop.ImageUrl = "~/part3/assets/images/ram/ram4gb.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    ramImage_laptop.ImageUrl = "~/part3/assets/images/ram/ram8gb.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    ramImage_laptop.ImageUrl = "~/part3/assets/images/ram/ram16gb.png";
                }
                else if (selection.SelectedIndex == 3)
                {
                    ramImage_laptop.ImageUrl = "~/part3/assets/images/ram/ram8gb_ddr4.png";
                }
            }
            else if (selection.ID == "soundcardList_laptop")
            {
                if (selection.SelectedIndex == 0)
                {
                    soundcardImage_laptop.ImageUrl = "~/part3/assets/images/soundcard/soundcardRegular.png";
                }
                else if (selection.SelectedIndex == 1)
                {
                    soundcardImage_laptop.ImageUrl = "~/part3/assets/images/soundcard/soundcardGaming.png";
                }
                else if (selection.SelectedIndex == 2)
                {
                    soundcardImage_laptop.ImageUrl = "~/part3/assets/images/soundcard/soundcardProfessional.png";
                }
            }

            //Prevent Full/Partial-Postback Reload of the page by calling a Javascript Function
            //To click in the Updatepanel
            //https://stackoverflow.com/questions/666519/difference-between-registerstartupscript-and-registerclientscriptblock
            //Page.ClientScript.RegisterStartupScript(this.GetType(), "CallMyFunction", "resetDesktopView()", true);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "resetLaptopView()", true);

        }
        protected double findComputerPrice(object sender, EventArgs e, String compType)
        {
            double totalPrice = 0.00;
            if (compType == "Desktop")
            {
                double brandPrice = Convert.ToDouble(brandnameList.SelectedValue);
                //Debug.WriteLine(brandPrice);
                double operatingSystemPrice = Convert.ToDouble(operatingSystemList.SelectedValue);
                double monitorPrice = Convert.ToDouble(monitorList.SelectedValue);
                double cpuPrice = Convert.ToDouble(cpuList.SelectedValue);
                double gpuPrice = Convert.ToDouble(gpuList.SelectedValue);
                double hddPrice = Convert.ToDouble(hddList.SelectedValue);
                double ramPrice = Convert.ToDouble(ramList.SelectedValue);
                double soundcardPrice = Convert.ToDouble(soundcardList.SelectedValue);
                totalPrice = brandPrice + operatingSystemPrice + monitorPrice + cpuPrice + gpuPrice + hddPrice + ramPrice + soundcardPrice;
            }
            else if (compType == "Laptop")
            {
                double brandPrice = Convert.ToDouble(brandnameList_laptop.SelectedValue);
                //Debug.WriteLine(brandPrice);
                double operatingSystemPrice = Convert.ToDouble(operatingSystemList_laptop.SelectedValue);
                double monitorPrice = Convert.ToDouble(monitorList_laptop.SelectedValue);
                double cpuPrice = Convert.ToDouble(cpuList_laptop.SelectedValue);
                double gpuPrice = Convert.ToDouble(gpuList_laptop.SelectedValue);
                double hddPrice = Convert.ToDouble(hddList_laptop.SelectedValue);
                double ramPrice = Convert.ToDouble(ramList_laptop.SelectedValue);
                double soundcardPrice = Convert.ToDouble(soundcardList_laptop.SelectedValue);
                totalPrice = 100 + brandPrice + operatingSystemPrice + monitorPrice + cpuPrice + gpuPrice + hddPrice + ramPrice + soundcardPrice;
            }
            return totalPrice;
        }
        protected void addToCartDesktop_Click(object sender, EventArgs e)
        {
            //Updates the cart and thereby the cookie by
            //using OOP
            Debug.WriteLine("Detected Desktop Button Press; Creating Class");
            clientCart shoppingCart = new clientCart();
            double price = findComputerPrice(sender, e, "Desktop");
            int quantity = 1;
            String compType = "Desktop";
            String compBrand = Convert.ToString(brandnameList.SelectedItem);
            String compOS = Convert.ToString(operatingSystemList.SelectedItem);
            String compMonitor = Convert.ToString(monitorList.SelectedItem);
            String compCPU = Convert.ToString(cpuList.SelectedItem);
            String compGPU = Convert.ToString(gpuList.SelectedItem);
            String compHDD = Convert.ToString(hddList.SelectedItem);
            String compRAM = Convert.ToString(ramList.SelectedItem);
            String compSoundcard = Convert.ToString(soundcardList.SelectedItem);
            shoppingCart.addComputerToCart(price, quantity, compType,
                compBrand, compOS, compMonitor, compCPU, compGPU,
                compHDD, compRAM, compSoundcard);
            Response.Redirect("cart.aspx");
            //Response.Cookies["clientCartCookie"].Expires = DateTime.Now.AddDays(-2); //clear the cookie
            //Response.Redirect("cart.aspx");
        }
        protected void addToCartLaptop_Click(object sender, EventArgs e)
        {
            //Updates the cart and thereby the cookie by
            //using OOP
            Debug.WriteLine("Detected Laptop Button Press; Creating Class");
            clientCart shoppingCart = new clientCart();
            double price = findComputerPrice(sender, e, "Laptop");
            int quantity = 1;
            String compType = "Laptop";
            String compBrand = Convert.ToString(brandnameList_laptop.SelectedItem);
            String compOS = Convert.ToString(operatingSystemList_laptop.SelectedItem);
            String compMonitor = Convert.ToString(monitorList_laptop.SelectedItem);
            String compCPU = Convert.ToString(cpuList_laptop.SelectedItem);
            String compGPU = Convert.ToString(gpuList_laptop.SelectedItem);
            String compHDD = Convert.ToString(hddList_laptop.SelectedItem);
            String compRAM = Convert.ToString(ramList_laptop.SelectedItem);
            String compSoundcard = Convert.ToString(soundcardList_laptop.SelectedItem);
            shoppingCart.addComputerToCart(price, quantity, compType,
                compBrand, compOS, compMonitor, compCPU, compGPU,
                compHDD, compRAM, compSoundcard);
            Response.Redirect("cart.aspx");
        }
    }
}