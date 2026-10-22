const { test } = require('node:test')
const assert = require('node:assert/strict')
const { registerSubscriber } = require('../.test-build/waitlist.js')

test('normalizes the email before saving it', async () => {
  const saved = []
  const result = await registerSubscriber('  Alice@Example.COM  ', async email => {
    saved.push(email)
    return { success: true }
  })
  assert.deepEqual(saved, ['alice@example.com'])
  assert.deepEqual(result, { success: true })
})

test('rejects malformed, oversized and non-string values without contacting storage', async () => {
  for (const email of ['', 'a@', '@example.com', 'a b@example.com', null, 42, {}, 'a'.repeat(250) + '@example.com']) {
    const result = await registerSubscriber(email, async () => assert.fail('storage must not be called'))
    assert.equal(result.success, false)
    assert.match(result.message, /valide/)
  }
})

test('handles database outages without leaking internal errors', async () => {
  const result = await registerSubscriber('alice@example.com', async () => {
    throw new Error('secret database connection information')
  })
  assert.equal(result.success, false)
  assert.match(result.message, /réessayer/)
  assert.doesNotMatch(result.message, /secret/)
})

test('preserves a storage failure result', async () => {
  const failure = { success: false, message: 'Unavailable' }
  assert.deepEqual(await registerSubscriber('alice@example.com', async () => failure), failure)
})
