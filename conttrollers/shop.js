const Book = require("../models/book");
const User = require("../models/user");

exports.getAllbooks = (req, res, next) => {
  Book.find()
    .then((book) => {
      res.render("shop/book", {
        prods: book ? book : [],
        pageTitle: "Books Collection",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddBookPage = (req, res, next) => {
  res.render("shop/add-book", {
    pageTitle: "Add Books",
  });
};

exports.getSearchPage = (req, res, next) => {
  res.render("shop/search", {
    pageTitle: "Search",
  });
};
exports.getLoginPage = (req, res, next) => {
  res.render("shop/login", {
    pageTitle: "Login",
  });
};
exports.postLoginPage = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  User.find({ email: email }).then((result) => {
    res.redirect("/book");
  });
};
exports.postBook = (req, res, next) => {
  const author = req.body.author;
  const review = req.body.review;
  const isbn = req.body.isbn;
  const title = req.body.title;
  console.log(author);
  console.log(title);
  console.log(isbn);
  console.log(review);

  const newbook = new Book({
    isbn: isbn,
    author: author,
    title: title,
    review: review,
  });

  newbook
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.searchByIsbn = (req, res, next) => {
//   const isbn = req.body.isbn;

//   Book.findOne({ isbn: isbn })
//     .then((result) => {
//       res.render("shop/shop", {
//         prods: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.searchByAuthor = (req, res, next) => {
//   const author = req.body.author;

//   Book.findOne({ author: author })
//     .then((result) => {
//       res.render("shop/shop", {
//         prods: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.searchByTitle = (req, res, next) => {
//   const title = req.body.title;

//   Book.findOne({ title: title })
//     .then((result) => {
//       res.render("shop/shop", {
//         prods: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.searchByReview = (req, res, next) => {
//   const review = req.body.review;

//   Book.findOne({ review: review })
//     .then((result) => {
//       res.render("shop/shop", {
//         prods: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
