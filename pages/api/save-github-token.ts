import { NextApiRequest, NextApiResponse } from 'next';
import redis from '@lib/redis';

export default async function saveGithubToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const body = req.body;

  if (!body.token || !body.id) {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Invalid parameters'
      }
    });
  }

  if (!redis) {
    throw new Error('Redis must be set up');
  }

  const ticketNumber = await redis.hget(`id:${body.id}`, 'ticketNumber');
  if (!ticketNumber) {
    return res.status(404).json({ code: 'invalid_id', message: 'The registration does not exist' });
  }

  const [username, name] = await redis.hmget(`github-user:${body.token}`, 'login', 'name');
  if (!username) {
    return res.status(400).json({ code: 'invalid_token', message: 'Invalid or expired token' });
  }

  const key = `id:${body.id}`;
  const userKey = `user:${username}`;

  await redis
    .multi()
    .hsetnx(key, 'username', username)
    .hsetnx(key, 'name', name || '')
    // Also save username → data pair
    .hsetnx(userKey, 'name', name || '')
    .hsetnx(userKey, 'ticketNumber', ticketNumber)
    .exec();

  res.json({ username, name });
}
