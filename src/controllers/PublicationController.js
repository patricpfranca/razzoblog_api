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
    let query = { deleted_at: null };

    if (req.query) {
      for (const key in req.query) {
        query = { [key]: new RegExp(req.query[key], "i") };
      }
    }

    try {
      const publications = await Publication.find(query);

      return res.status(200).json(publications);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const publication = await Publication.findByIdAndUpdate(
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

  async update(req, res) {
    try {
      const publication = await Publication.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      return res.status(200).json(publication);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new PublicationController();
