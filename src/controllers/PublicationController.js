const Yup = require("yup");
const Publication = require("../models/Publications");

class PublicationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      author: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.string().required(),
      category: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const publication = await Publication.create(req.body);

    return res.status(201).json(publication);
  }

  async index(req, res) {
    try {
      const publications = await Publication.find({ deleted_at: null });

      return res.status(200).json(publications);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const publication = await Publication.findAndModify(
        {
          _id: req.params.id
        },
        { deleted_at: Date.now() }
      );

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new PublicationController();
