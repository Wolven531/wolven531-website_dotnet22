using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
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
                _unitMap = new JObject
                {
                    [0] = new JObject
                    {
                        ["Id"] = 0,
                        ["Name"] = "None",
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Info"] = new JObject()
                    },
                    [1] = new JObject
                    {
                        ["Id"] = 1,
                        ["Name"] = "Archer",
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Info"] = new JObject
                        {
                            ["Description"] = "A unit that adds decent attack, but not many hitpoints"
                        }
                    },
                    [2] = new JObject
                    {
                        ["Id"] = 2,
                        ["Name"] = "Clubman",
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Info"] = new JObject
                        {
                            ["Description"] = "A unit that adds a small but dependable amount of both attack and hitpoints"
                        }
                    }
                };
            }
        }

        public JObject getUnitCost(int unitId)
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

        public int getUnitCount(int unitId)
        {
            throw new NotImplementedException();
        }

        public JObject getUnitInfo(int unitId)
        {
            var idString = $"{unitId}";
            if (!_unitMap.ContainsKey(idString))
            {
                return new JObject
                {
                    ["Description"] = "Unknown"
                };
            }
            var unit = _unitMap.GetValue(idString, StringComparison.OrdinalIgnoreCase);

            return new JObject(unit["Info"]);
        }
    }
}
