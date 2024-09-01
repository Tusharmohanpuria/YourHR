const express = require('express');
const multer = require('multer');
const { getProfile, updateProfile, uploadResume } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/upload-resume', auth, upload.single('resume'), uploadResume);

module.exports = router;