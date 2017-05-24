/* global $ */

window.DataflowToolbar = function(diagram) {
  this.diagram = diagram;
  this.toggle_edges = true;
  this.$hide_links = $('#btn-hide-links');
  this.$hide_links.doit = true;
  this.$hide_links.diagram = diagram;
  this.$hide_links.on('click', function() {
    if (this.toggle_edges) {
      this.diagram.simplifyEdges();
      this.toggle_edges = false;
    } else {
      this.diagram.displayDiagram(this.diagram.algorithmId);
      this.toggle_edges = true;
    }
  }.bind(this));
};
