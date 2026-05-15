const  Visit  = require('../../models/views-visit.model');
const axios = require('axios');

const logVisit = async (req, res, next) => {
  try {

    if (req.originalUrl === '/favicon.ico') {
        return next();
    }
    let infoData;
    const responsee = await axios.get(`http://ip-api.com/json/171.252.188.130`)
        .then(response => {
            infoData = response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    const visit = new Visit({
      ip: req.ip,
      page: req.originalUrl,
      Country: infoData.country,
      City: infoData.city
    });
    await visit.save();
    
  } catch (error) {
    console.error('Error logging visit:', error.message);
  }
  next();
};

module.exports = logVisit;
