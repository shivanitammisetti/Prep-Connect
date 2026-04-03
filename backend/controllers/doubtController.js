const Doubt = require('../models/Doubt');

exports.createDoubt = async (req, res) => {
  const { title, description } = req.body;
  try {
    const doubt = await Doubt.create({
      title,
      description,
      student: req.user.id
    });
    res.status(201).json(doubt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.answerDoubt = async (req, res) => {
  const { text } = req.body;
  try {
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ message: 'Doubt not found' });

    doubt.answers.push({
      alumni: req.user.id,
      text
    });

    await doubt.save();
    res.json(doubt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};