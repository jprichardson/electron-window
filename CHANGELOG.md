0.6.3 / 2016-04-06
------------------
- remove v37 deprecation errors. [#9][#9]

0.6.2 / 2015-12-11
------------------
- Bug in closing window. See: https://github.com/jprichardson/electron-window/issues/5 https://github.com/jprichardson/electron-window/pull/7

0.6.1 / 2015-12-11
------------------
- use `loadURL` if available instead of `loadUrl`. See: https://github.com/jprichardson/electron-window/pull/6#issuecomment-163826265

0.6.0 / 2015-08-27
------------------
- added support for data uris. See: https://github.com/jprichardson/electron-window/pull/2

0.5.0 / 2015-07-15
------------------
- upgraded to `is-electron-renderer@2.0` (Electron removed `global` for non-node integration)

0.4.3 / 2015-07-13
------------------
- regression: `showUrl()` without window arguments wouldn't actually show window

0.4.2 / 2015-07-10
------------------
- made callback optional in `showUrl()`

0.4.1 / 2015-07-10
------------------
- bug fix: wrong `this context`

0.4.0 / 2015-07-09
------------------
- Removed passing defaults of `resizable: false` and `frame: true`.
- refactored, added tests

0.3.0 / 2015-05-27
------------------
- `showUrl()`: actually display window when contents loaded

0.2.1 / 2015-05-22
------------------
- fixed package.json main path bug

0.2.0 / 2015-05-22
------------------
- changed so `window.__args__` would be available right away
- changed examples
- exposed `parseArgs()` for renderer scripts

0.1.1 / 2015-05-22
------------------
- fix `package.json` Github repo

0.1.0 / 2015-05-22
------------------
- initial release


<!--- Remove 0.37 deprecation warnings -->
[#9]: https://github.com/jprichardson/electron-window/pull/9
<!--- Deprecated Url methods in favor of URL (following Electron convention) -->
[#8]: https://github.com/jprichardson/electron-window/issues/8
<!--- Remove window reference on `close` instead of `closed` -->
[#7]: https://github.com/jprichardson/electron-window/pull/7
<!--- Change win.loadUrl to win.loadURL -->
[#6]: https://github.com/jprichardson/electron-window/pull/6
<!--- Error message when closing window -->
[#5]: https://github.com/jprichardson/electron-window/issues/5
<!--- loadUrl deprecation in BrowserWindow -->
[#4]: https://github.com/jprichardson/electron-window/issues/4
<!--- added `showUrl` `show` arg -->
[#3]: https://github.com/jprichardson/electron-window/pull/3
<!--- added datauri case and test -->
[#2]: https://github.com/jprichardson/electron-window/pull/2
<!--- BrowserWindow Methods? -->
[#1]: https://github.com/jprichardson/electron-window/issues/1
