/**
 * @jest-environment node
 */
import { POST } from '../../app/api/contact/route';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}));

test('returns 400 if required fields missing', async () => {
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name: 'John' }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test('returns 200 on valid submission', async () => {
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'John',
      email: 'john@example.com',
      message: 'I want custom leggings',
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
});
