# Patch-drafts

A module for storing and retreiving drafts of messages in patch-* family apps. Drafts are persisted to localStorage.

You'll need to understand [depject](https://github.com/depject/depject) (a module for a different way of managing dependency injection), and for hte example below, [depnest](https://github.com/depject/depnest) - a lazy way to write nested objects quickly.

## API

`drafts.sync.get` _(key)_ - fetch the draft stored under `key`
`drafts.sync.set` _(key, text)_ - set/ save some draft text under `key`
`drafts.sync.remove` _(key)_ - delete a draft set under `key`

Note `key` can be a String or a Object

