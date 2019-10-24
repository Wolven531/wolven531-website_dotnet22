using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wolven531WebsiteDotnet22.Models
{
    public interface IBookstoreDatabaseSettings
    {
        string BooksCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
