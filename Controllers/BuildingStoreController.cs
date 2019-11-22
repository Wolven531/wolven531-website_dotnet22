using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using wolven531WebsiteDotnet22.Models;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/buildings")]
    public class BuildingStoreController : ControllerBase
    {
        private readonly IBuildingStore _buildingStore;

        public BuildingStoreController(IBuildingStore buildingStore)
        {
            _buildingStore = buildingStore;
        }

        // GET api/buildings/info
        [HttpGet("info")]
        public IEnumerable<Building> GetCompleteBuildingInfo()
        {
            var buildingMap = _buildingStore.GetCompleteBuildingInfo();
            var buildings = new List<Building>();

            foreach (var buildingJson in buildingMap)
            {
                var building = buildingJson.Value.ToObject<Building>();
                buildings.Add(building);
            }

            return buildings;
        }

        // GET api/buildings/cost/2
        [HttpGet("cost/{id}")]
        public JObject GetBuildingCost(int id)
        {
            return _buildingStore.GetBuildingCost(id);
        }

        // GET api/buildings/info/2
        [HttpGet("info/{id}")]
        public JObject GetBuildingInfo(int id)
        {
            return _buildingStore.GetBuildingInfo(id);
        }
    }
}
