'use strict'

const sugoAgentZip = require('sugo-agent-zip')
const co = require('co')

co(function * () {
  let agent = sugoAgentZip('/foo/bar')

  // Check if server available
  {
    let ok = yield agent.knock() // Send HTTP HEAD request.
    /* ... */
  }
}).catch((err) => console.error(err))
