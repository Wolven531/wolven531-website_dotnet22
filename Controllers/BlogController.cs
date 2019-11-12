using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace wolven531WebsiteDotnet22.Controllers
{
    public class BlogController : Controller
    {
        // GET: Blog
        public ActionResult Index()
        {
            return View();
        }

        //// GET: Blog/Details/5
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}
    }
}
