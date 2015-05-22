// fired from 'preload' in context of window renderer
if (global.constructor.name === 'Window') {
  require('./renderer').parseArgs()
}
