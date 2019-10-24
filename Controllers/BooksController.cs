using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using wolven531WebsiteDotnet22.Models;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet(Name = "GetAllBooks")]
        public ActionResult<List<Book>> GetAllBooks() =>
            _bookService.GetAllBooks();

        [HttpGet("{id:length(24)}", Name = "GetBook")]
        public ActionResult<Book> GetBook(string id)
        {
            var book = _bookService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost(Name = "CreateBook")]
        public ActionResult<Book> Create(Book book)
        {
            _bookService.Create(book);

            return CreatedAtRoute("GetBook", new { id = book.Id.ToString() }, book);
        }

        [HttpPut("{id:length(24)}", Name = "UpdateBook")]
        public IActionResult Update(string id, Book bookIn)
        {
            var book = _bookService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            _bookService.Update(id, bookIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}", Name = "DeleteBook")]
        public IActionResult Delete(string id)
        {
            var book = _bookService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            _bookService.Remove(book.Id);

            return NoContent();
        }
    }
}