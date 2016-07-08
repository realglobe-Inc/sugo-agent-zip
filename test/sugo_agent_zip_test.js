/**
 * Test case for sugoAgentZip.
 * Runs with mocha.
 */
'use strict'

const SugoAgentZip = require('../lib/sugo_agent_zip.js')
const assert = require('assert')
const sgServer = require('sg-server')
const { freeport } = sgServer
const co = require('co')

describe('sugo-agent-zip', function () {
  this.timeout(3000)
  let server, port
  before(() => co(function * () {
    port = yield freeport()
    server = sgServer({
      endpoints: {
        '/api/foo': {
          HEAD: (ctx) => {
            ctx.set('foo', 'This is foo')
            ctx.body = null
          }
        },
        '/download/:filename': require('sugo-endpoint-zip')(
          `${__dirname}/../misc/mocks`
        )
      }
    })

    yield server.listen(port)
  }))

  after(() => co(function * () {
    yield server.close()
  }))

  it('Sugo demo agent', () => co(function * () {
    let agent = new SugoAgentZip(`http://localhost:${port}/download`)
    assert.ok(agent)
    yield agent.download('mock-dir01', `${__dirname}/../tmp/testing-downloaded.zip`)
  }))
})

/* global describe, before, after, it */
