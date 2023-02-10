const express = require("express");
const router = express.Router();
const {
  getAllbooks,
  getAddBookPage,
  postBook,
  getSearchPage,
  getLoginPage,
  searchByIsbn,
  searchByAuthor,
  searchByTitle,
  getSignupPage,
  postSignupPage,
  postLoginPage,
  postLogout,
} = require("../conttrollers/shop");

router.get("/", getAllbooks);
router.route("/add-book").get(getAddBookPage).post(postBook);
router.route("/search").get(getSearchPage).post(searchByIsbn);
router.post("/searchbyauthor", searchByAuthor);
router.post("/searchbytitle", searchByTitle);
router.route('/login').get(getLoginPage).post(postLoginPage)
router.route("/signup").get(getSignupPage).post(postSignupPage);
router.post('/logout', postLogout)

module.exports = router;
