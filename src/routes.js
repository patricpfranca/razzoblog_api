const express = require("express");
const PublicationController = require("./controllers/PublicationController");

const routes = express.Router();

routes.get("/publication", PublicationController.index);
routes.post("/publication", PublicationController.store);
routes.delete("/publication/:id", PublicationController.delete);
routes.put("/publication/:id", PublicationController.update);

module.exports = routes;
