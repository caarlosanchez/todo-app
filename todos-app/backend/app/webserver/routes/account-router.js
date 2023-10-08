"use strict";
const multer = require("multer");

const { Router } = require("express");
const {
  createAccount,
} = require("../controllers/account/addaccount-controller");
const {
  createAccountAvatar,
} = require("../controllers/account/addaccount-avatar-controller");
const {
  updateAccount,
} = require("../controllers/account/update-account-controller");
const {
  checkAccountSession,
} = require("../controllers/account/check-account-controller");

// Debemos tener creada carpeta 'uploads'
const dir =
  "/Users/Anita/Desktop/hack-a-boss/7-react/todos-app/frontend/public";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      // Nombre asignado a los archivos subidos desde el fronted
      file.originalname
    );
  },
});

const toUpload = multer({ storage: storage }).single("file");

const accountRouter = Router();

accountRouter.post("/", createAccount);

accountRouter.post("/avatar", toUpload, createAccountAvatar);

accountRouter.put("/", checkAccountSession, toUpload, updateAccount);

module.exports = { accountRouter };
