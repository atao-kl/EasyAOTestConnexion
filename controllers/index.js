const router = require('express').Router();

const noteRoutes = require('./notesController');
const userRoutes = require('./usersController');
const authRoutes = require('./authController');

router.use('/api/notes', noteRoutes);
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);


module.exports = router;
