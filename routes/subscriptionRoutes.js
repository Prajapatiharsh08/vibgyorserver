const express = require('express');
const router = express.Router();
const {
    subscribe,
    getAllSubscribers,
    deleteSubscription,
} = require('../controller/subscriptionController');

router.post('/subscribe', subscribe);
router.get('/subscribers', getAllSubscribers);
router.delete('/unsubscribe/:id', deleteSubscription);

module.exports = router;
