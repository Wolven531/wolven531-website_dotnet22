//using MongoDB.Driver;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using wolven531WebsiteDotnet22.Models;

//namespace wolven531WebsiteDotnet22.Services
//{
//    public class BookService : IBookService
//    {
//        private readonly IMongoCollection<Book> _books;

//        public BookService(IBookstoreDatabaseSettings settings)
//        {
//            var client = new MongoClient(settings.ConnectionString);
//            var database = client.GetDatabase(settings.DatabaseName);

//            _books = database.GetCollection<Book>(settings.BooksCollectionName);
//        }

//        public List<Book> GetAllBooks() =>
//            _books.Find(book => true).ToList();

//        public Book GetBook(string id) =>
//            _books.Find<Book>(book => book.Id == id).FirstOrDefault();

//        public Book Create(Book book)
//        {
//            _books.InsertOne(book);
//            return book;
//        }

//        public void Update(string id, Book bookIn) =>
//            _books.ReplaceOne(book => book.Id == id, bookIn);

//        public void Remove(Book bookIn) =>
//            _books.DeleteOne(book => book.Id == bookIn.Id);

//        public void Remove(string id) =>
//            _books.DeleteOne(book => book.Id == id);
//    }
//}
