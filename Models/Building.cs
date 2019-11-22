using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Models
{
    public class Building
    {
        //[JsonProperty(PropertyName = "Cost")]
        public JObject Cost { get; set; }

        //[JsonProperty(PropertyName = "Id")]
        public int Id { get; set; }

        //[JsonProperty(PropertyName = "Info")]
        public JObject Info { get; set; }

        //[JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
    }
}
