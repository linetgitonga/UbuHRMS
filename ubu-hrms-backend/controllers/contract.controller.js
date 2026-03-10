const Contract = require('../models/Contract.model');

// Get contracts for employee
const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ employeeId: req.params.employeeId });
    res.json(contracts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Add contract
const addContract = async (req, res) => {
  try {
    const newContract = new Contract(req.body);
    await newContract.save();
    res.json(newContract);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update contract
const updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contract) return res.status(404).json({ msg: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete contract
const deleteContract = async (req, res) => {
  try {
    await Contract.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contract deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { getContracts, addContract, updateContract, deleteContract };