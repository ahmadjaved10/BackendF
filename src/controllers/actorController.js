const Actor = require('../models/actorModel');

// Create a new actor
exports.createActor = async (req, res) => {
  try {
    const newActor = new Actor(req.body);
    await newActor.save();
    res.status(201).json(newActor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create actor' });
  }
};

// Get all actors
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json(actors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve actors' });
  }
};

// Get actor by ID
exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.status(200).json(actor);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving actor' });
  }
};

// Update actor details
exports.updateActor = async (req, res) => {
  try {
    const updatedActor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedActor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update actor' });
  }
};

// Delete actor
exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.status(200).json({ message: 'Actor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete actor' });
  }
};
