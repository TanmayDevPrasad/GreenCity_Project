import TransportEntry from '../models/TransportEntry.js';

export const createTransportEntry = async (req, res) => {
  try {
    const {
      agencyName,
      transportType,
      from,
      to,
      departureTimes,
      frequency,
      fare,
      contactInfo,
    } = req.body;

    if (!agencyName || !transportType || !from || !to || !departureTimes || !fare) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (!Array.isArray(departureTimes) || departureTimes.length === 0) {
      return res.status(400).json({ message: 'departureTimes must be a non-empty array.' });
    }

    const newEntry = new TransportEntry({
      agencyName,
      transportType,
      from,
      to,
      departureTimes,
      frequency,
      fare,
      contactInfo,
    });

    const saved = await newEntry.save();
    res.status(201).json({ message: 'Transport option created successfully.', data: saved });
  } catch (error) {
    console.error('Error creating transport entry:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};

export const getAllAgencyTransports = async (req, res) => {
  try {
    const entries = await TransportEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching agency transports:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};
