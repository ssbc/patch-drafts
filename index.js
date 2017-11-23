const nest = require('depnest')
const merge = require('lodash.merge')

const STORAGE_KEY = 'patchDrafts'

const gives = nest({
  'drafts.sync.get': true,
  'drafts.sync.set': true,
  'drafts.sync.remove': true,
})

const create = (api) => {
  var _drafts

  return nest({
    'drafts.sync.get': getSync,
    'drafts.sync.set': setSync,
    'drafts.sync.remove': removeSync
  })

  function getSync (draftKey) {
    _initialise()
    return _drafts[_normaliseKey(draftKey)]
  }

  function setSync (draftKey, text) {
    _initialise()

    _drafts = merge({}, _drafts, {
      [_normaliseKey(draftKey)]: text
    })

   _save(_drafts)
  }

  function removeSync (draftKey) {
    _initialise()

    delete _drafts[_normaliseKey(draftKey)]

   _save(_drafts)
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

  function _normaliseKey (key) {
    if (typeof key === 'string') return key
    if (typeof key === 'object') return JSON.stringify(key) // This could also be a hash of the object?
  
    throw new Error ('patch-drafts keys need to be strings or objects')
  }
}

module.exports = {
  patchDrafts: {
    gives,
    create
  }
}
