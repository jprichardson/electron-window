var assert = require('assert')
var proxyquire = require('proxyquire')
// var stubo = require('stubo')

/* global describe it */

describe('main', function () {
  describe('_createWindow()', function () {
    it('should should create the window with options and set global window references', function () {
      function BrowserWindow (options) { this.id = 5; this._captureOptions = options }
      var stubs = {
        'browser-window': BrowserWindow
      }
      stubs['browser-window']['@noCallThru'] = true
      var main = proxyquire('../main', stubs)

      var win = main._createWindow({frame: 'something'})
      assert(win instanceof BrowserWindow)
      assert.strictEqual(main.windows['5'], win)
      assert.strictEqual(win._captureOptions.frame, 'something')
    })
  })

  describe('_unref()', function () {
    it('should delete global reference', function () {
      var stubs = {'browser-window': {}}
      stubs['browser-window']['@noCallThru'] = true
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
