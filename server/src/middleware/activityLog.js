//server/src/middleware/activityLog.js

const ActivityLog = require('../models/ActivityLog');

const logActivity = (action) => async (req, res, next) => {
  if (req.user) {
    await ActivityLog.create({
      user: req.user._id,
      action,
      details: req.body,
      timestamp: new Date(),
    });
  }
  next();
};

module.exports = logActivity;