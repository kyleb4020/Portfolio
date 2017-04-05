using kbartholomew_portfolio.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace kbartholomew_portfolio.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            EmailModel model = new EmailModel();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            EmailModel model = new EmailModel();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Contact(EmailModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var body = "<p>Email From: <bold>{0}</bold>({1})</p><p>Message:</p><p>{2}</p><p>{3}</p>";
                    var from = "MyPortfolio<kylecoder@gmail.com>";
                    var defaultBody = "This is a message from your portfolio site.  The name and the email of the contacting person is above.";
                    var email = new MailMessage(from,
                ConfigurationManager.AppSettings["emailto"])
                    {
                        Subject = "Portfolio Contact Email",
                        Body = string.Format(body, model.FromName, model.FromEmail, defaultBody,
                             model.Body),
                        IsBodyHtml = true
                    };
                    var svc = new PersonalEmail();
                    await svc.SendAsync(email);
                    //return RedirectToAction("Sent");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    await Task.FromResult(0);
                }
            }
            return RedirectToAction("Index");
        }
    }
}