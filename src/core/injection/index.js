'use strict';
const ipc = require('electron').ipcRenderer
const mods = require('../../mods')

ipc.on('init-injection', function(event, account) {
  window.$ = require('jquery');
  window.gmail = require('./gmail')(window.$)

  let tools = {
    // react to dom events
    mutations: initMutationTool(),
  }

  mods.initializeModComponents('injection', [account, tools]);
});

function initMutationTool() {
  let handlers = [];

  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  let observer = new MutationObserver(function(mutations) {
    handlers.forEach(function(handler) {
      mutations.forEach(function(mutation) {
        handler(mutation);
      });
    })
  })

  let config = {
    subtree: true,
    attributes: false,
    childList: true
  }

  observer.observe(document, config)

  return {
    listen: function(fn) {
      handlers.push(fn)
    }
  }
}


