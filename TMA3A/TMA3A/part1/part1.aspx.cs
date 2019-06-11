using System;
using System.Diagnostics;
using System.Text;
using System.Web;

namespace Comp466_Assign3a.part1
{
    public partial class part1 : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            updateCookieValue(sender, e, false);
            getClientIPaddress();
        }

        protected void updateCookieValue(object sender, EventArgs e, bool reset)
        {
            //Create Cookie If does not exist, else update the value
            //and display in the website appropriately
            StringBuilder sb = new StringBuilder();
            // Get cookie from the current request.
            HttpCookie cookie = Request.Cookies.Get("DateCookieExample");

            // Check if cookie exists in the current request.
            if (cookie == null)
            {
                sb.Append("Cookie was not received from the client. ");
                sb.Append("Creating cookie to add to the response. <br/>");
                // Create cookie.
                cookie = new HttpCookie("DateCookieExample");
                // Set value of cookie to current date time.
                int cookieHit = 0;
                cookie.Value = cookieHit.ToString();
                // Set cookie to expire in 10 minutes.
                cookie.Expires = DateTime.Now.AddHours(12d);
                // Insert the cookie in the current HttpResponse.
                Response.Cookies.Add(cookie);
            }
            else if (cookie!=null && reset)
            {
                int cookieHit = 0;
                //cookieHit = int.Parse(cookie.Value);
                //cookieHit = cookieHit - cookieHit;
                //cookieHit++;
                cookie.Value = cookieHit.ToString();
                //sb.Append("Cookie retrieved from client. <br/>");
                //sb.Append("Cookie Name: " + cookie.Name + "<br/>");
                sb.Append("Number of Visits to this site: " + cookie.Value + "<br/>");
                //sb.Append("Cookie Expiration Date: " + cookie.Expires.ToString() + "<br/>");
                cookie.Value = cookieHit.ToString();
                Request.Cookies.Set(cookie);
                //Response.Cookies.Add(cookie);
            }
            else
            {
                int cookieHit = int.Parse(cookie.Value);
                //cookieHit++;

                cookie.Value = (++cookieHit).ToString(); //must be preincrement
                //sb.Append("Cookie retrieved from client. <br/>");
                //sb.Append("Cookie Name: " + cookie.Name + "<br/>");
                sb.Append("Number of Visits to this site: " + cookie.Value + "<br/>");
                //sb.Append("Cookie Expiration Date: " + cookie.Expires.ToString() + "<br/>");
                Response.Cookies.Add(cookie);
            }
            visitsId.Text = sb.ToString();
        }

        protected void ResetCookie(object sender, EventArgs e)
        {
            updateCookieValue(sender, e, true); //pass a reset flag and update
            //alternatively, update and set label here
        }
        protected void getClientIPaddress()
        {
            //https://stackoverflow.com/questions/735350/how-to-get-a-users-client-ip-address-in-asp-net
            String myResult = "";
            System.Web.HttpContext myContext = System.Web.HttpContext.Current;
            String ip_address = Context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ip_address))
            {
                string[] address_list = ip_address.Split(',');
                if(address_list.Length != 0)
                {
                    myResult = address_list[0];
                }
            }
            //myHelloWorld.InnerHtml = myResult;
            ipAddrId.Text = myContext.Request.ServerVariables["REMOTE_ADDR"];
            //myHelloWorld.InnerHtml = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_TIMEZONE"];
            Debug.WriteLine("Test is:", myContext.Request.ServerVariables["REMOTE_ADDR"]);
        }

        protected void testFunc()
        {
            Debug.WriteLine("Hello World!");
        }

    }
}