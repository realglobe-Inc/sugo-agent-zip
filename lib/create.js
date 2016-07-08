/**
 * Create an instance
 * @function create
 * @returns {SugoAgentZip}
 */
'use strict'

const SugoAgentZip = require('./sugo_agent_zip')

/** @lends create */
function create (...args) {
  return new SugoAgentZip(...args)
}

module.exports = create
