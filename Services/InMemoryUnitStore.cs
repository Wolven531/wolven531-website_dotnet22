using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public class InMemoryUnitStore : IUnitStore
    {
        private readonly JObject _unitMap;

        public InMemoryUnitStore(JObject prestoredUnitMap = null)
        {
            if (prestoredUnitMap != null)
            {
                _unitMap = prestoredUnitMap;
            }
            else
            {
                // TODO: strongly type the following structure
                _unitMap = JObject.Parse(File.ReadAllText(Path.Combine("Data", "UnitStore.json")));
            }
        }

        public JObject GetCompleteUnitInfo()
        {
            return _unitMap;
        }

        public JObject GetUnitCost(int unitId)
        {
            var idString = $"{unitId}";
            if (!_unitMap.ContainsKey(idString))
            {
                return new JObject
                {
                    ["Food"] = 0,
                    ["Stone"] = 0,
                    ["Wood"] = 0
                };
            }
            var unit = _unitMap.GetValue(idString, StringComparison.OrdinalIgnoreCase);

            return new JObject(unit["Cost"]);
        }

        public int GetUnitCount(int unitId)
        {
            throw new NotImplementedException();
        }

        public JObject GetUnitInfo(int unitId)
        {
            var idString = $"{unitId}";
            if (!_unitMap.ContainsKey(idString))
            {
                return new JObject
                {
                    ["Description"] = "Unknown"
                };
            }

            return (JObject)_unitMap[idString]["Info"];
        }
    }
}
