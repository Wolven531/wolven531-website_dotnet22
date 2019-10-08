using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        private readonly IInfoService _infoService;
        private readonly ILogger<InfoController> _logger;

        public InfoController(IInfoService infoService, ILogger<InfoController> logger)
        {
            _infoService = infoService;
            _logger = logger;
        }

        // POST: api/Info
        [HttpPost]
        public IActionResult Post()
        {
            _logger.LogDebug("[ POST | InfoController ] Adding unique page hit...");
            _infoService.AddUniquePageHit();

            return Ok();
        }
    }
}
