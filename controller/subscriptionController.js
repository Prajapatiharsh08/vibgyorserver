const Subscription = require('../model/subscriptionModel');

// Add new subscription
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    // Check for duplicate
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Already subscribed' });
    }

    const newSub = new Subscription({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all subscribers (admin panel)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete subscription (admin panel)
exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
