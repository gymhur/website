import { client } from '../lib/sanity/client';

test('sanity client has projectId configured', () => {
  expect(client.config().projectId).toBeDefined();
});

test('sanity client has dataset configured', () => {
  expect(client.config().dataset).toBeDefined();
});
