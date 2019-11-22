using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public interface IBuildingStore
    {
        JObject GetCompleteBuildingInfo();

        JObject GetBuildingCost(int buildingId);

        int GetBuildingCount(int buildingId);

        JObject GetBuildingInfo(int buildingId);
    }
}
