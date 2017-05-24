/* global $ _ loadFile CommonUI */

/**
 * Goal: provide data for all scenarios that involve the graph back-end.
 * All functions return a Promise that will be resolved with the requested data.
 */
function DataflowClient () {
}

!function () {
  /**
   * Load the whole graph for an algorithm.
   * @deprecated Use loadPartialGraph to avoid having the whole graph in memory
   * @param  {String} algorithmId
   * @param  {String} groupId
   * @return {Promise<{nodes: Array<NodeData>, links: Array<LinkData>}>}
   */
  DataflowClient.prototype.loadFullGraph = function (algorithmId, groupId) {
    var deferred = $.Deferred();
    var value = 'data/' + algorithmId + '.js';
    var nodes = [];
    var links = [];
    CommonUI.display_loading(); // TODO: remove dependency on UI from here
    loadFile(
      value,
      function (data) {
        _.each(data.nodeList, function (node) {
          if (groupId) {
            node.key = groupId + '/' + node.key;
            node.group = groupId;
          }
          nodes.push(node);
        });
        _.each(data.linkList, function(edge){
          var link = {};
          link.from = edge.from.nodeIdInCurrentGraph;
          link.to = edge.to.nodeIdInCurrentGraph;
          links.push(link);
        });
        CommonUI.hide_loading(); // TODO: remove dependency on UI from here
        deferred.resolve([{nodes: nodes, links: links}]);
      }.bind(this),
      function () {
        deferred.reject('Loading error');
      }
    );
    return deferred.promise();
  };
}();
