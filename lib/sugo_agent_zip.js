/**
 * Client for sugo-endpoint-zip
 * @class SugoAgentZip
 */
'use strict'

const { SugoAgentBase } = require('sugo-agent-base')
const co = require('co')
const fs = require('fs')
const path = require('path')
const { unzip } = require('azip')
const { mkdirpAsync, statAsync } = require('asfs')

/** @lends SugoAgentZip */
class SugoAgentZip extends SugoAgentBase {
  constructor (url, options = {}) {
    super(url, options)
  }

  /**
   * Download zip file and save to local
   * @param {string} resourceName - Name of zip resource.
   * @param {string} savePath - Filename to save
   * @param {Object} [options={}]
   */
  download (resourceName, savePath, options = {}) {
    const s = this
    let { request } = s
    return co(function * () {
      yield mkdirpAsync(path.dirname(savePath))
      let writeStream = fs.createWriteStream(savePath)
      yield request.get(s.resolve(resourceName), {}, {
        pipe: writeStream
      })
      let { size } = yield statAsync(savePath)
      return { size }
    })
  }
}

module.exports = SugoAgentZip
