var assert = require('assert')
var EventEmitter = require('events').EventEmitter
var proxyquire = require('proxyquire')
// var stubo = require('stubo')

/* global describe it */

describe('main', function () {
  describe('_createWindow()', function () {
    it('should should create the window with options and set global window references', function () {
      function BrowserWindow (options) { this.id = 5; this._captureOptions = options }
      var stubs = {
        electron: {
          BrowserWindow: BrowserWindow
        }
      }
      stubs.electron['@noCallThru'] = true
      var main = proxyquire('../main', stubs)

      var win = main._createWindow({frame: 'something'})
      assert(win instanceof BrowserWindow)
      assert.strictEqual(main.windows['5'], win)
      assert.strictEqual(win._captureOptions.frame, 'something')
    })
  })

  describe('_loadURLWithArgs()', function () {
    it('should load url and callback when finished', function (done) {
      var stubs = { electron: { BrowserWindow: {} } }
      stubs.electron['@noCallThru'] = true
      var main = proxyquire('../main', stubs)

      var win = {
        webContents: new EventEmitter(),
        loadURL: function () {
          this.webContents.emit('did-finish-load')
        }
      }

      var fn = main._loadURLWithArgs.bind(win)
      fn('http://somesite.com', {}, function () {
        done()
      })
    })
  })

  describe('_unref()', function () {
    it('should delete global reference', function () {
      var stubs = { electron: { BrowserWindow: {} } }
      stubs.electron['@noCallThru'] = true
      var main = proxyquire('../main', stubs)

      var win = {id: 3}
      main.windows[win.id] = win
      assert.strictEqual(main.windows[3], win)
      assert.strictEqual(Object.keys(main.windows).length, 1)

      main._unref.call(win)
      assert.strictEqual(main.windows[3], undefined)
      assert.strictEqual(Object.keys(main.windows).length, 0)
    })
  })
})
