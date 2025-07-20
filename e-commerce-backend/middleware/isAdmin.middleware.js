module.exports = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); //allowed
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};
