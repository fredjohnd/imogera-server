const Incident = require('../models/incident');

const fetchIncidentsForObject = async (data) => {

}

const addIncident = async (data) => {

  try {
    const incident = new Incident(data);
    await incident.save();
    return incident;

  } catch (error) {
    throw error;
  }
}


module.exports = {
  fetchIncidentsForObject,
  addIncident
};
