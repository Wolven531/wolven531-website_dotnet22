using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    interface IUnitStore
    {
        JObject getUnitCost(int unitId);

        int getUnitCount(int unitId);

        JObject getUnitInfo(int unitId);
    }
}
