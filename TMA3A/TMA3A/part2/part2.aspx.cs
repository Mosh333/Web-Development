using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;


namespace Comp466_Assign3a.part2
{
    public partial class part2 : System.Web.UI.Page
    {
        public string[] storeImageArray;    //define "global" or a public array to store the
        public string[] storeCaptionArray;  //important DATA
        //For larger projects, better to use fields instead of public variables
        //https://softwareengineering.stackexchange.com/questions/161303/is-it-bad-practice-to-use-public-fields
        //slideshowTimer.Enabled = true or false for playing/paused functionality

        protected void Page_Load(object sender, EventArgs e)
        {
            initViewStateSlideshow(); //initializes Viewstates if null
            store_json();   //Stores JSON contents in public array every partial-POST
                            //needed since between every POST instance, the contents in the public
                            //array above gets erased
        }

        protected void store_json()
        {
            //Stores the contents in the JSON file to the two public string arrays above
            string filePath = Server.MapPath("slideshow.json");
            Debug.WriteLine("filePath is: ");
            Debug.WriteLine(filePath);
            //string imagePath = Server.MapPath("\\");
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();             
                dynamic slideshow_images = JsonConvert.DeserializeObject(json);
                storeImageArray = new string[(slideshow_images.img).Count];     //allocate memory
                storeCaptionArray = new string[(slideshow_images.caption).Count];
                for (int i=0; i<(slideshow_images.img).Count; i++)
                {
                    storeImageArray[i] = String.Concat("~/part2/", slideshow_images.img[i]);
                    storeCaptionArray[i] = slideshow_images.caption[i];
                }

            //for (int i = 0; i < storeImageArray.Length; i++)
            //{
            //    Debug.WriteLine("{0}{1}{2}", storeImageArray[i], "-", storeCaptionArray[i]);
            //    orange.InnerHtml += String.Concat(storeImageArray[i], "-", storeCaptionArray[i]);
            //}
            }
        }

        protected void slideshowTimer_Tick(object sender, EventArgs e)
        {
            //This function runs every 5000ms when if(slideshowTimer.Enabled)
            //https://www.c-sharpcorner.com/UploadFile/225740/what-is-view-state-and-how-it-works-in-Asp-Net53/
            //https://stackoverflow.com/questions/2883149/viewstate-vs-session-maintaining-object-through-page-lifecycle
            
            if ((Boolean)ViewState["seq_mode"] == true)
            {
                if ((int)ViewState["currentIndex"] == (storeImageArray.Length-1)) //19 (int)ViewState["imageArrayLength"]
                {
                    ViewState["currentIndex"] = 0;
                }
                else
                {
                    ViewState["currentIndex"] = (int)ViewState["currentIndex"] + 1; //Increment currentIndex
                }
                
                slideshowImage.ImageUrl = storeImageArray[(int)ViewState["currentIndex"]]; //"~/part2/images/grass1.jpg";
                slideshowCaption.InnerHtml = storeCaptionArray[(int)ViewState["currentIndex"]];
                int indexDisplay = (int)ViewState["currentIndex"];
                currentIndexValue.InnerHtml = String.Concat("Current Index is: ", indexDisplay.ToString());
            }else if ((Boolean)ViewState["seq_mode"] == false)
            {
                Random r = new Random();
                int myRandIndex;
                while (true)
                {
                    myRandIndex = r.Next(storeImageArray.Length);
                    if ((int)ViewState["currentIndex"] != myRandIndex)
                    {
                        ViewState["currentIndex"] = myRandIndex;
                        break;
                    }
                }

                slideshowImage.ImageUrl = storeImageArray[(int)ViewState["currentIndex"]]; //"~/part2/images/grass1.jpg";
                slideshowCaption.InnerHtml = storeCaptionArray[(int)ViewState["currentIndex"]];
                currentIndexValue.InnerHtml = String.Concat("Current Index is: ", ViewState["currentIndex"].ToString());
            }
        }
        private void initViewStateSlideshow()
        {
            if (ViewState["slideshowTimer"] == null)
            {
                ViewState["slideshowTimer"] = slideshowTimer.Enabled;
            }
            if (ViewState["currentIndex"] == null)
            {
                ViewState["currentIndex"] = 0;
            }
            if (ViewState["seq_mode"] == null)
            {
                ViewState["seq_mode"] = true;
            }
            
        }

        protected void startStopButton_Click(object sender, EventArgs e)
        {
            if (ViewState["slideshowTimer"] == null)
            {
                ViewState["slideshowTimer"] = slideshowTimer.Enabled;
            }
            else
            {
                if ((bool)ViewState["slideshowTimer"]) //or slideshowTime.Enabled
                {
                    startStopButton.Text = "▶";
                }
                else if(!(bool)ViewState["slideshowTimer"])
                {
                    startStopButton.Text = "||";
                }
                slideshowTimer.Enabled = !slideshowTimer.Enabled; //in c#, use ! instead of ~
                ViewState["slideshowTimer"] = slideshowTimer.Enabled;
            }
        }

        protected void toggleMode(object sender, EventArgs e)
        {
            if((bool)ViewState["seq_mode"] == true)
            {
                slideshowMode.Text = "Random";
                ViewState["seq_mode"] = false;
            }else if((bool)ViewState["seq_mode"] == false)
            {
                slideshowMode.Text = "Sequential";
                ViewState["seq_mode"] = true;
            }
        }

        protected void nextButton_Click(object sender, EventArgs e)
        {
            if ((bool)ViewState["seq_mode"] == true)
            {
                if ((int)ViewState["currentIndex"] == (storeImageArray.Length - 1))
                {
                    ViewState["currentIndex"] = 0;
                }
                else
                {
                    ViewState["currentIndex"] = (int)ViewState["currentIndex"] + 1;
                }
                slideshowImage.ImageUrl = storeImageArray[(int)ViewState["currentIndex"]]; //"~/part2/images/grass1.jpg";
                slideshowCaption.InnerHtml = storeCaptionArray[(int)ViewState["currentIndex"]];
                currentIndexValue.InnerHtml = String.Concat("Current Index is: ", ViewState["currentIndex"].ToString());
            }

        }

        protected void prevButton_Click(object sender, EventArgs e)
        {
            if((bool)ViewState["seq_mode"] == true)
            {
                if ((int)ViewState["currentIndex"] == 0)
                {
                    ViewState["currentIndex"] = storeImageArray.Length - 1; //19
                }
                else
                {
                    ViewState["currentIndex"] = (int)ViewState["currentIndex"] - 1;
                }
                slideshowImage.ImageUrl = storeImageArray[(int)ViewState["currentIndex"]]; //"~/part2/images/grass1.jpg";
                slideshowCaption.InnerHtml = storeCaptionArray[(int)ViewState["currentIndex"]];
                currentIndexValue.InnerHtml = String.Concat("Current Index is: ", ViewState["currentIndex"].ToString());
            }

        }
    }
}