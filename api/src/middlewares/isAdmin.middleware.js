const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ Error: "Action not allowed" });
  }
  next();
};

module.exports = isAdmin;
