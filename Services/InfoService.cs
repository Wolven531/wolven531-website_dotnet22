using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Services
{
    public class InfoService : IInfoService
    {
        private int numberUniqueHits;
        private string startupTime;

        public InfoService()
        {
            numberUniqueHits = 0;

            var startTime = DateTime.UtcNow;
            startupTime = $"{startTime.ToLongDateString()} {startTime.ToLongTimeString()}";
        }

        public void AddUniquePageHit()
        {
            numberUniqueHits++;
        }

        public string GetFormattedStartTime()
        {
            return startupTime;
        }

        public int GetUniquePageHits()
        {
            return numberUniqueHits;
        }
    }
}
