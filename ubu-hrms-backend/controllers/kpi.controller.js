const KPI = require('../models/KPI.model');

// Get all KPIs for employee
const getKPIs = async (req, res) => {
  try {
    const kpis = await KPI.find({ employeeId: req.params.employeeId });
    res.json(kpis);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Add KPI
const addKPI = async (req, res) => {
  try {
    const newKPI = new KPI(req.body);
    await newKPI.save();
    res.json(newKPI);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update KPI
const updateKPI = async (req, res) => {
  try {
    const kpi = await KPI.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!kpi) return res.status(404).json({ msg: 'KPI not found' });
    res.json(kpi);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete KPI
const deleteKPI = async (req, res) => {
  try {
    await KPI.findByIdAndDelete(req.params.id);
    res.json({ msg: 'KPI deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { getKPIs, addKPI, updateKPI, deleteKPI };