const Publication = require("../models/Publications");

class PublicationController {
  async store(req, res) {
    const publication = await Publication.create(req.body);

    return res.status(201).json(publication);
  }

  async index(req, res) {
    const publications = await Publication.find({ deleted_at: null });

    return res.status(200).json(publications);
  }

  async delete(req, res) {
    const publication = await Publication.findAndModify(
      {
        _id: req.params.id
      },
      { deleted_at: Date.now() }
    );

    return res.status(200).json();
  }
}

module.exports = new PublicationController();
