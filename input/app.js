'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Component = require('substance/ui/Component');
var Configurator = require('substance/util/Configurator');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var InputPackage = require('./input/InputPackage');

var fixture = require('./fixture');
var configurator = new Configurator(ProseEditorPackage);
configurator.import(InputPackage);

function App() {
  App.super.apply(this, arguments);

  var doc = configurator.createArticle(fixture);
  var documentSession = new DocumentSession(doc);

  this.documentSession = documentSession;
}

App.Prototype = function() {
  this.render = function($$) {
    var el = $$('div').addClass('app');
    var editor = $$(ProseEditor, {
      configurator: configurator,
      documentSession: this.documentSession
    });
    el.append(editor);
    return el;
  };
};

Component.extend(App);

window.onload = function() {
  Component.mount(App, 'body');
};