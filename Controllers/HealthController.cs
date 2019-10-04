using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new JObject { ["healthy"] = true });
        }
    }
}
