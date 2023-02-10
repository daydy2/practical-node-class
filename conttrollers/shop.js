const Book = require("../models/book");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getAllbooks = (req, res, next) => {
  
  Book.find()
    .then((book) => {
      res.render("shop/book", {
        prods: book ? book : [],
        pageTitle: "Books Collection",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      throw new Error(err)
    });
};

exports.getAddBookPage = (req, res, next) => {
  res.render("shop/add-book", {
    pageTitle: "Add Books",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getSearchPage = (req, res, next) => {
  res.render("shop/search", {
    pageTitle: "Search",
    prods: [],
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.getSignupPage = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.postLoginPage = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            // req.sesssion.user = user;
            return res.redirect("/");
          }
          return res.render("auth/login", {
            pageTitle: "Login",
            isAuthenticated: req.session.isLoggedIn
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSignupPage = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.password;

  if (confirmPassword !== password) {
    return res.redirect("/login");
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const newUser = new User({
        email: email,
        password: hashedPassword,
      });
      return newUser.save();
    })
    .then((result) => {
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.isLoggedIn = false;
  res.redirect("/login");
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

exports.searchByIsbn = (req, res, next) => {
  const isbn = req.body.isbn;

  Book.find({ isbn: isbn })
    .then((result) => {
      res.render("shop/search", {
        pageTitle: "Search Result - ISBN",
        prods: result,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.searchByAuthor = (req, res, next) => {
  const author = req.body.author;

  Book.find({ author: author })
    .then((result) => {
      res.render("shop/search", {
        pageTitle: "Search Result - AUTHOR",
        prods: result,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.searchByTitle = (req, res, next) => {
  const sample = req.body.title;

  Book.find({ title: title })
    .then((result) => {
      res.render("shop/search", {
        pageTitle: "Search Result - TITLE",
        prods: result,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditBook = (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.redirect("/");
      }
      res.render("admin/edit-book", {
        pageTitle: "Edit Book",
        book: book,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
