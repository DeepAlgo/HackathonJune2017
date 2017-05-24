
// Draw rounded corners on non-orthogonal links (normal routing)
function DataFlowLink () {
  go.Link.apply(this, arguments);
  this.fromEndSegmentLength = 25;
  this.toEndSegmentLength = 25;
  this.corner = 20;
  this.routing = go.Link.Normal;
}
go.Diagram.inherit(DataFlowLink, go.Link);

DataFlowLink.prototype.makeGeometry = function () {
  if (this.points.length < 4) {
    if (go.Link.makeGeometry == undefined) {
      return new go.Geometry();
    }
    return go.Link.makeGeometry.apply(this, arguments);
  }
  var s = 2; // smoothness
  var corner = this.corner;
  var points = this.points.toArray();
  var pos = this.routeBounds;
  var fig = new go.PathFigure(points[0].x - pos.x, points[0].y - pos.y, false);
  var p0 = points[0], p1 = points[1], p2;
  if (p0.distanceSquaredPoint(p1) >= corner * corner) {
    var dir01 = p1.copy().subtract(p0).normalize().scale(corner, corner);
    p0 = p1.copy().subtract(dir01);
    fig.add(new go.PathSegment(go.PathSegment.Line, p0.x - pos.x, p0.y - pos.y));
  }
  for (var i = 1; i < points.length - 1; i++) {
    p1 = points[i];
    p2 = points[i + 1];
    var dir12 = p2.copy().subtract(p1).normalize().scale(corner, corner);
    var localP2, nextP0;
    if (i == points.length - 2) {
      nextP0 = p2;
      if (p1.distanceSquaredPoint(p2) >= corner * corner) {
        localP2 = p1.copy().add(dir12);
      } else {
        localP2 = p2;
      }
    } else {
      if (p1.distanceSquaredPoint(p2) >= 4 * corner * corner) {
        localP2 = p1.copy().add(dir12);
        nextP0 = p2.copy().subtract(dir12);
      } else {
        localP2 = nextP0 = new go.Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      }
    }
    fig.add(new go.PathSegment(go.PathSegment.Bezier,
      localP2.x - pos.x, localP2.y - pos.y,
      (p0.x + s * p1.x) / (1 + s) - pos.x, (p0.y + s * p1.y) / (1 + s) - pos.y,
      (s * p1.x + localP2.x) / (1 + s) - pos.x, (s * p1.y + localP2.y) / (1 + s) - pos.y
    ));
    if (localP2 != nextP0) {
      fig.add(new go.PathSegment(go.PathSegment.Line, nextP0.x - pos.x, nextP0.y - pos.y));
    }
    p0 = nextP0;
  }
  return new go.Geometry().add(fig);
};
