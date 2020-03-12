class PublicationController {
  async store(req, res) {
    res.send("Hello World");
  }
}

module.exports = new PublicationController();
