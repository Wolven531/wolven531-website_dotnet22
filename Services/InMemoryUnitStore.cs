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
                    ["0"] = new JObject
                    {
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Id"] = 0,
                        ["Info"] = new JObject
                        {
                            ["Description"] = "None"
                        },
                        ["Name"] = "None"
                    },
                    ["1"] = new JObject
                    {
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 100,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Id"] = 1,
                        ["Info"] = new JObject
                        {
                            ["Description"] = "A non-military unit that may be tasked with gathering a resource"
                        },
                        ["Name"] = "Villager"
                    },
                    ["2"] = new JObject
                    {
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Id"] = 2,
                        ["Info"] = new JObject
                        {
                            ["Description"] = "A unit that adds decent attack, but not many hitpoints"
                        },
                        ["Name"] = "Archer"
                    },
                    ["3"] = new JObject
                    {
                        ["Cost"] = new JObject
                        {
                            ["Food"] = 0,
                            ["Stone"] = 0,
                            ["Wood"] = 0
                        },
                        ["Id"] = 2,
                        ["Info"] = new JObject
                        {
                            ["Description"] = "A unit that adds a small but dependable amount of both attack and hitpoints"
                        },
                        ["Name"] = "Clubman"
                    }
                };
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
