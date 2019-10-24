using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wolven531WebsiteDotnet22.Models;

namespace wolven531WebsiteDotnet22.Services
{
    public interface IBookService
    {
        List<Book> GetAllBooks();

        Book GetBook(string id);

        Book Create(Book book);

        void Remove(Book bookIn);

        void Remove(string id);

        void Update(string id, Book bookIn);
    }
}
