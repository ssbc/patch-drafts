const nest = require('depnest')
const get = require('lodash.get')
const merge = require('lodash.merge')

const STORAGE_KEY = 'patchDrafts'

const gives = nest({
  'drafts.sync.get': true,
  'drafts.sync.set': true,
})

const create = (api) => {
  var _drafts

  return nest({
    'drafts.sync.get': getSync,
    'drafts.sync.set': setSync,
  })

  function getSync (msgKey) {
    _initialise()
    var d = get(_drafts, msgKey)
    if (typeof d === "undefined") return ""
    return  d
  }

  function setSync (msgKey, text) {
    _initialise()

    _drafts = merge({}, _drafts, {
      [msgKey]: text
    })
  }

  function _initialise () {
    if (_drafts) return

    const drafts = localStorage[STORAGE_KEY]
      ? JSON.parse(localStorage[STORAGE_KEY])
      : {}
    _drafts = drafts
  }

  function _save (newDrafts) {
    localStorage[STORAGE_KEY]= JSON.stringify(newDrafts)
  }
}

module.exports = {
  patchDrafts: {
    gives,
    create
  }
}
