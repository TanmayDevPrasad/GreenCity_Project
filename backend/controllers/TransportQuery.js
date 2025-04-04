import TransportQuery from '../models/TransportQuery.js';
import TransportEntry from '../models/TransportEntry.js';

// Check transport availability and optionally log the user query
export const checkTransportAvailability = async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ message: 'Both "from" and "to" fields are required.' });
    }

    // Save the user query (optional)
    const newQuery = new TransportQuery({ from, to });
    await newQuery.save();

    // Search for matching transport entries
    const results = await TransportEntry.find({ from, to });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No transport options found for the given route.' });
    }

    res.status(200).json({ message: 'Transport options found.', data: results });
  } catch (error) {
    console.error('Error checking transport availability:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};
