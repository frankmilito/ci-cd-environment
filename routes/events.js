import { Router } from 'express';

import { getDb } from '../data/database.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const db = getDb()
    const allEvents = await db.collection('events').find().toArray();
    res.json({ events: allEvents });
  } catch (error) {
    console.error('failed to fetch events', error)
  }
});

router.post('/', async (req, res) => {
  try {
    const db = getDb()
    const eventData = req.body;
    const result = await db.collection('events').insertOne({ ...eventData });
    res.status(201).json({
      message: 'Event created.',
      event: { ...eventData, id: result.insertedId },
    });
  } catch (error) {
    console.error('failed to post event', error)
  }
});

export default router;
