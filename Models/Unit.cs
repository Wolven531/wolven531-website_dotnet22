using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Models
{
    public class Unit
    {
        public JObject Cost { get; set; }

        public int Id { get; set; }

        public JObject Info { get; set; }

        public string Name { get; set; }
    }
}
