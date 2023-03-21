const requireAuth = (req, res) => {
    const { user } = req.session;
    if(!user) {
        return res
            .status(401)
            .json({ message: 'Unauthorized '});
    }
}

module.exports = requireAuth;