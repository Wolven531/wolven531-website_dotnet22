using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public class InMemoryBuildingStore : IBuildingStore
    {
        private readonly JObject _buildingMap;

        public InMemoryBuildingStore(JObject prestoredBuildingMap = null)
        {
            if (prestoredBuildingMap != null)
            {
                _buildingMap = prestoredBuildingMap;
            }
            else
            {
                // TODO: strongly type the following structure
                _buildingMap = JObject.Parse(File.ReadAllText(Path.Combine("Data", "BuildingStore.json")));
            }
        }

        public JObject GetCompleteBuildingInfo()
        {
            return _buildingMap;
        }

        public JObject GetBuildingCost(int buildingId)
        {
            var idString = $"{buildingId}";
            if (!_buildingMap.ContainsKey(idString))
            {
                return new JObject
                {
                    ["Food"] = 0,
                    ["Stone"] = 0,
                    ["Wood"] = 0
                };
            }
            var building = _buildingMap.GetValue(idString, StringComparison.OrdinalIgnoreCase);

            return new JObject(building["Cost"]);
        }

        public int GetBuildingCount(int buildingId)
        {
            throw new NotImplementedException();
        }

        public JObject GetBuildingInfo(int buildingId)
        {
            var idString = $"{buildingId}";
            if (!_buildingMap.ContainsKey(idString))
            {
                return new JObject
                {
                    ["Description"] = "Unknown"
                };
            }

            return (JObject)_buildingMap[idString]["Info"];
        }
    }
}
