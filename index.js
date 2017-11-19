const nest = require('depnest')
const { Value, computed } = require('mutant')
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
    return get(_drafts(), msgKey)
  }

  function setSync (msgKey, text) {
    _initialise()

    const updatedDrafts = merge({}, _drafts(), {
      [msgKey]: text
    })
    _drafts.set(updatedDrafts)
  }

  function _initialise () {
    if (_drafts) return

    const settings = localStorage[STORAGE_KEY]
      ? JSON.parse(localStorage[STORAGE_KEY])
      : {}
    _drafts = Value(settings)

    // initialise a listener to persist on changes
    _drafts(_save)
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
