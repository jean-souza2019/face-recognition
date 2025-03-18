class FaceController {
  constructor(faceUseCase) {
    this.faceUseCase = faceUseCase;
    this.registerFace = this.registerFace.bind(this);
    this.verifyFace = this.verifyFace.bind(this);
  }

  async registerFace(req, res) {
    try {
      const { login, descriptor } = req.body;
      if (!login || !descriptor) {
        return res.status(400).json({ error: "login and descriptor are required" });
      }
      const faceData = await this.faceUseCase.registerFace(login, descriptor);
      res.status(201).json(faceData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifyFace(req, res) {
    try {
      const { login, descriptor } = req.body;
      if (!login || !descriptor) {
        return res.status(400).json({ error: "login and descriptor are required" });
      }
      const result = await this.faceUseCase.verifyFace({ login, descriptor });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FaceController;
