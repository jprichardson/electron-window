var assert = require('assert')
var path = require('path')
var url = require('url')

// only run in main process
if (global.constructor.name !== 'Window')
  var BrowserWindow = require('browser-window')

// retain global references, if not, window will be closed automatically when
// garbage collected
var _windows = {}

function createWindow (options) {
  var window = new BrowserWindow(extend({
    show: false,
    resizable: false,
    frame: true,
    preload: __filename
  }, options))

  _windows[window.id] = window

  // should not need to be called, but just in case
  // window.destroy() is ever called
  window.unref = function () {
    delete _windows[window.id]
  }

  window.once('closed', function () {
    window.unref()
  })

  window.showUrl = function (httpOrFileUrl, args, callback) {
    if (typeof args === 'function') {
      callback = args
      args = null
    }
    assert.strictEqual(typeof args, 'object', 'args must be an object')
    // stringify the args
    args = args ? encodeURIComponent(JSON.stringify(args)) : ''

    window.webContents.once('did-finish-load', callback)

    if (httpOrFileUrl.indexOf('http') === 0) {
      var urlData = url.parse(httpOrFileUrl)
      var httpUrl = url.format(extend(urlData, {
        hash: urlData.hash || args ? args : undefined
      }))
      window.loadUrl(httpUrl)
    } else { // presumably a file url
      var fileUrl = url.format({
        protocol: 'file',
        pathname: path.resolve(httpOrFileUrl),
        slashes: true,
        hash: args ? args : undefined
      })

      window.loadUrl(fileUrl)
      window.show()
    }
  }

  return window
}

function extend (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key]
  })
  return target
}

// executed in context of window renderer
function parseArgs () {
  if (!window.location.hash) {
    window.__args__ = {}
  } else {
    var hash = window.location.hash.slice(1)
    window.__args__ = Object.freeze(JSON.parse(decodeURIComponent(hash)))
  }
}

// fired from 'preload' in context of window renderer
if (global.constructor.name === 'Window') {
  parseArgs()
}

module.exports = {
  createWindow: createWindow, // only call from main process
  parseArgs: parseArgs // only call from renderer process
}
