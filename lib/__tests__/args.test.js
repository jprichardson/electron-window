var assert = require('assert')
var args = require('../args')

/* global describe it */

describe('args', function () {
  describe('encode()', function () {
    it('should hash encode object', function () {
      var obj = {name: 'jp'}
      var str = args.encode(obj)
      assert.strictEqual(str, '%7B%22name%22%3A%22jp%22%7D')

      str = args.encode(null)
      assert.strictEqual(str, '')
    })
  })

  describe('urlWithArgs()', function () {
    describe('> when url', function () {
      it('should create a url with encoded args in hash', function () {
        var url = args.urlWithArgs('http://google.com', {doThat: 'ok'})
        assert.strictEqual(url, 'http://google.com/#%7B%22doThat%22%3A%22ok%22%7D')

        url = args.urlWithArgs('http://google.com')
        assert.strictEqual(url, 'http://google.com/')
      })
    })

    describe('> when file', function () {
      it('should create a url with encoded args in hash', function () {
        var url = args.urlWithArgs('/tmp/index.html', {doThat: 'ok'})
        assert.strictEqual(url, 'file:///tmp/index.html#%7B%22doThat%22%3A%22ok%22%7D')

        url = args.urlWithArgs('/tmp/index.html')
        assert.strictEqual(url, 'file:///tmp/index.html')
      })
      it('should not change a full file url with protocol', function () {
        var url = args.urlWithArgs('file:///tmp/index.html', {doThat: 'ok'})
        assert.strictEqual(url, 'file:///tmp/index.html#%7B%22doThat%22%3A%22ok%22%7D')

        url = args.urlWithArgs('file:///tmp/index.html')
        assert.strictEqual(url, 'file:///tmp/index.html')
      })
    })

    describe('> when data uri', function () {
      it('should create a url with encoded args in hash', function () {
        var uri = 'data:text/plain;charset=utf-8;base64,dGhpcyBpcyBhIHRlc3QK'
        var url = args.urlWithArgs(uri, {doThat: 'ok'})
        assert.strictEqual(url, uri + '#%7B%22doThat%22%3A%22ok%22%7D')

        url = args.urlWithArgs(uri)
        assert.strictEqual(url, uri)
      })
    })
  })
})
