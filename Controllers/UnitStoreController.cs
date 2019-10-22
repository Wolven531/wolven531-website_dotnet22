using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/units")]
    public class UnitStoreController : ControllerBase
    {
        private readonly IUnitStore _unitStore;

        public UnitStoreController(IUnitStore unitStore)
        {
            _unitStore = unitStore;
        }

        // GET api/units/cost/2
        [HttpGet("cost/{id}")]
        public JObject GetUnitCost(int id)
        {
            return _unitStore.getUnitCost(id);
        }

        // GET api/units/info/2
        [HttpGet("info/{id}")]
        public JObject GetUnitInfo(int id)
        {
            return _unitStore.getUnitInfo(id);
        }
    }
}
