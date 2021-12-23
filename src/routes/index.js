const express = require("express");

const { register, login, checkAuth } = require("../controllers/auth");

const { uploadFile } = require("../middleware/uploadFile");

const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  addItem,
  getBarang,
  getBarangId,
  editBarang,
  deleteBarang,
} = require("../controllers/barang");

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

router.post("/add-item", auth, uploadFile("image"), addItem);
router.get("/get-item", auth, getBarang);
router.get("/detail-item/:id", auth, getBarangId);
router.patch("/edit-item/:id", auth, uploadFile("image"), editBarang);
router.delete("/delete-item/:id", auth, deleteBarang);

module.exports = router;
