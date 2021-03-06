﻿using System;
using System.Collections.Generic;
using System.IO;
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
            ViewData["Title"] = "Development Blog";

            var req = HttpContext.Request;
            var basePath = $"{req.Scheme}://{req.Host}";
            ViewBag.BasePath = basePath;

            return View();
        }

        // GET: Blog/Details/5
        public ActionResult Details(int id)
        {
            var blogEntryPath = Path.Combine("Data", "Blog", $"{id}.html");

            var req = HttpContext.Request;
            var basePath = $"{req.Scheme}://{req.Host}";
            ViewBag.BasePath = basePath;

            if (System.IO.File.Exists(blogEntryPath))
            {
                var entryHtml = System.IO.File.ReadAllText(blogEntryPath);
                ViewBag.EntryHtml = entryHtml;
            }

            ViewData["Title"] = $"Blog Entry #{id}";

            return View();
        }
    }
}
