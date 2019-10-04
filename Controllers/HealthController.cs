using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        private readonly IInfoService _infoService;

        public HealthController(IInfoService infoService)
        {
            _infoService = infoService;
        }

        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new JObject {
                ["healthy"] = true,
                ["startupTime"] = _infoService.GetFormattedStartTime()
            });
        }
    }
}
