const express = require("express");
const router = express.Router();
const {
  getAllbooks,
  getAddBookPage,
  postBook,
  getSearchPage,
  getLoginPage,
} = require("../conttrollers/shop");

router.get("/", getAllbooks);
router.route("/add-book").get(getAddBookPage).post(postBook);
router.get("/search", getSearchPage);
router.get("/login", getLoginPage);

module.exports = router;
