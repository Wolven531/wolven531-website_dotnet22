using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public class InfoService : IInfoService
    {
        private string startupTime;

        public InfoService()
        {
            var startTime = DateTime.UtcNow;
            startupTime = $"{startTime.ToLongDateString()} {startTime.ToLongTimeString()}";
        }

        public string GetFormattedStartTime()
        {
            return startupTime;
        }
    }
}
