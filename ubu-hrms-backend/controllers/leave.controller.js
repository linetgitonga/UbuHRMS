const Leave = require('../models/Leave.model');

// Get leaves for employee
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.json(leaves);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Add leave
const addLeave = async (req, res) => {
  try {
    const newLeave = new Leave(req.body);
    await newLeave.save();
    res.json(newLeave);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update leave
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });
    res.json(leave);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete leave
const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Leave deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { getLeaves, addLeave, updateLeave, deleteLeave };