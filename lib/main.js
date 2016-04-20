var assign = require('object-assign')
var path = require('path')
var BrowserWindow = require('browser-window')
var wargs = require('./args')
var v = (process.versions.electron || '').split('.').map(Number)

// retain global references, if not, window will be closed automatically when
// garbage collected
var _windows = {}

function _createWindow (options) {
  var opts = assign({
    show: false
  }, options)

  if (v[0] === 0 && v[1] >= 37) {
    opts.webPreferences = assign({
      preload: path.join(__dirname, 'renderer-preload')
    }, options.webPreferences)
  } else {
    opts.preload = path.join(__dirname, 'renderer-preload')
  }

  var window = new BrowserWindow(opts)
  _windows[window.id] = window

  return window
}

// should not need to be called directly, but just in case
// window.destroy() is ever called
function _unref () {
  delete _windows[this.id]
}

function _loadUrlWithArgs (httpOrFileUrl, args, callback) {
  if (typeof args === 'function') {
    callback = args
    args = null
  }

  var win = this
  win.webContents.once('did-finish-load', function () {
    callback.apply(this, arguments)
  })

  var url = wargs.urlWithArgs(httpOrFileUrl, args)

  // support versions of electron < 0.35.0 before loadUrl was deprecated
  var loadUrl = win.loadURL ? win.loadURL.bind(win) : win.loadUrl.bind(win)
  loadUrl(url)
}

function createWindow (options) {
  var window = _createWindow(options)
  window.unref = _unref.bind(window)
  window.once('close', window.unref)
  window._loadUrlWithArgs = _loadUrlWithArgs.bind(window)

  window.showUrl = function (httpOrFileUrl, args, callback) {
    if (typeof args === 'function') {
      callback = args
      args = null
    }

    window._loadUrlWithArgs(httpOrFileUrl, args, function () {
      window.show()
      callback && callback.apply(this, arguments)
    })
  }

  return window
}

module.exports = {
  createWindow: createWindow,
  windows: _windows,
  _createWindow: _createWindow,
  _loadUrlWithArgs: _loadUrlWithArgs,
  _unref: _unref
}
