using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public interface IUnitStore
    {
        JObject GetCompleteUnitInfo();

        JObject GetUnitCost(int unitId);

        int GetUnitCount(int unitId);

        JObject GetUnitInfo(int unitId);
    }
}
