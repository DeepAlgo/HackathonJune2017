/* global $ loadFile */

window.DataflowSelector = function () {
  function DataflowSelector (id) {
    this.elem = document.getElementById(id);

    loadFile('entrypoints.js', function (entrypoints) {
      render.call(this, entrypoints);
    }.bind(this), function (error) {
      alert('Could not load entrypoints' + error);
    });
  }

  DataflowSelector.prototype.onGraphSelected = function (callback) {
    this.onGraphSelected = callback;
    this.onGraphSelected(getKeyFromUrl());
  };

  function render (entrypoints) {
    $.widget('ui.autocomplete', $.ui.autocomplete, {
      _renderItem: function (ul, item) {
        return $('<li>')
          .attr('title', item.methodName)
          .append('[' + item.graphId + '] ')
          .append(item.title ? $('<b>').append(item.title) : item.methodName)
          .appendTo(ul);
      }
    });

    this.select = document.createElement('input');
    this.select.id = 'autocomplete';
    var div = document.createElement('div');
    div.appendChild(this.select);
    this.elem.appendChild(div);
    $(this.select).autocomplete({
      source: entrypoints.map(function (e) {
        return $.extend({
          label: '[' + e.graphId + '] ' + (e.title || '') + (e.methodName || ''),
          value: '[' + e.graphId + '] ' + (e.title || e.methodName)
        }, e);
      }).sort(function (a, b) { return a.value.localeCompare(b.value); }),
      minLength: 0,
      select: function (event, ui) {
        if (this.onGraphSelected) this.onGraphSelected(ui.item.graphId);
      }.bind(this)
    });
    $(this.select).focus(function () {
      $(this.select).autocomplete('search');
    }.bind(this));
  }

  function getKeyFromUrl () {
    return decodeURI(window.location.search.slice(1));
  }

  return DataflowSelector;
}();
