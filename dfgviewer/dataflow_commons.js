
var DataFlowColors = {
  fill: 'white',
  text: '#000000',
  textLight: '#C6C6C5',
  activityLight: '#D6D6D7',
  activity: '#BDBDBF',
  algorithmLight: '#BDBDBF',
  algorithm: '#222222',
  loopLight: '#BDBDBF',
  loop: '#222222',
  inputLight: '#83D6E1',
  input: '#00AAC0',
  condition: '#95C11F',
  conditionLight: '#CCE194',
  conditionAlt: '#F9C100',
  conditionAltLight: '#FCE080',
  output: '#A11876',
  outputLight: '#CF88B8',
  link: '#D0D0D0',
  linkAccent: '#666666',
  linkLight: '#EDEDED'
};

var DataFlowCollapsedSizes = {
  activityWidth: 10,
  activityHeight: 10,
  algorithmWidth: 10,
  algorithmHeight: 10,
  loopWidth: 21,
  loopHeight: 21,
  conditionWidth: 14,
  conditionHeight: 17,
  conditionAltWidth: 14,
  conditionAltHeight: 17,
  inputWidth: 14,
  inputHeight: 10,
  outputWidth: 14,
  outputHeight: 10
};

var DataFlowStrokeSizes = {
  link: 6,
  outerBorder: 4,
  innerBorder: 4
};

var DataFlowMargins = {
  layoutColumnSpacing: 20,
  innerBorder: new go.Margin(-DataFlowStrokeSizes.innerBorder),
  nodeText: new go.Margin(18, 20),
  groupPadding: new go.Margin(20, 40, 80, 40)
};

var DataFlowSizes = function () {
  // From the UX spec
  var a = (20 - 10) / (149 - 59);
  var b = 10 - 59 * a;
  return {
    maxBoxWidth: 160,
    maxToolTipWidth: 230,
    layerSpacing: 60,
    pointyWidth: function (width, height) {
      if (width < 40) return height / 2; // Special case for small figures
      // return height * a + b
      // FIXME: avoid too deep "pointy" sides because of this GoJS problem:
      // https://forum.nwoods.com/t/get-the-desired-result-with-definefiguregenerator-auto-panel-geom-spot1-spot2/8204
      // TODO: respect the UX spec which prescribes constant slope
      return Math.min(height * a + b, 30);
    }
  };
}();

var DataFlowFonts = {
  node: '400 15px Open Sans',
  data: '600 15px Open Sans'
};

var DataFlowToolTip = {
  leftOfPointy: 30,
  pointyHeight: 15,
  pointyWidth: 16
};

/**
 * Custom IOCA shape definitions, according the Feb. 2017 guidelines.
 *  - Shape.parameter1 can be used to get the inner (default: NaN)
 *    or outer (value: 1) shape paths.
 */
!function () {
  // http://gojs.net/latest/intro/shapes.html

  function pointyOuterOffset (hh, pw, oo) {
    if (pw === 0 || hh === 0) return oo;
    var phi = Math.atan2(hh, Math.abs(pw));
    return oo / Math.cos(Math.PI / 4 - phi);
  }

  function pointyCornerOuterOffset (hh, pw, oo) {
    if (pw === 0 || hh === 0) return oo;
    var phi = Math.atan2(hh, -pw);
    return oo / Math.tan(phi / 2);
  }

  /**
   * @param  {-1|0|1} pointyLeft
   * @param  {-1|0|1} pointyRight
   * @return {function}
   */
  function getFigureGenerator (pointyLeft, pointyRight) {
    return function (shape, w, h) {
      var hh = h / 2; // Half-height
      var pw = DataFlowSizes.pointyWidth(w, h);
      var l_pw = pointyLeft * pw, r_pw = pointyRight * pw;
      var l_pcw = 0, l_pmw = 0, r_pcw = 0, r_pmw = 0;
      if (pointyLeft === -1) { l_pcw = pw; }
      if (pointyLeft === 1) { l_pmw = pw; }
      if (pointyRight === 1) { r_pcw = - pw; }
      if (pointyRight === -1) { r_pmw = - pw; }
      var oo = 0, l_pcoo = 0, l_poo = 0, r_pcoo = 0, r_poo = 0; // outerOffset, pointyOuterOffset, pointyCornerOuterOffset
      if (shape && shape.parameter1 === 1) {
        oo = (DataFlowStrokeSizes.innerBorder + DataFlowStrokeSizes.outerBorder) / 2;
        l_poo = pointyOuterOffset(hh, -l_pw, oo);
        l_pcoo = pointyCornerOuterOffset(hh, -l_pw, oo);
        r_poo = pointyOuterOffset(hh, r_pw, oo);
        r_pcoo = pointyCornerOuterOffset(hh, r_pw, oo);
      }
      var path = new go.PathFigure(w + r_pcw + r_pcoo, 0 - oo);
      path.add(new go.PathSegment(go.PathSegment.Line, w + r_pmw + r_poo, hh));
      path.add(new go.PathSegment(go.PathSegment.Line, w + r_pcw + r_pcoo, h + oo));
      path.add(new go.PathSegment(go.PathSegment.Line, l_pcw - l_pcoo, h + oo));
      path.add(new go.PathSegment(go.PathSegment.Line, l_pmw - l_poo, hh));
      path.add(new go.PathSegment(go.PathSegment.Line, l_pcw - l_pcoo, 0 - oo).close());
      var geo = new go.Geometry();
      geo.add(path);
      if (shape && shape.parameter1 === 1) {
        geo.spot1 = new go.Spot(0, 0, 0, 0);
        geo.spot2 = new go.Spot(1, 1, 0, 0);
      } else {
        geo.spot1 = new go.Spot(0, 0, pointyLeft ? pw - 5 : 0, 0); // 5 = 20 - 15
        geo.spot2 = new go.Spot(1, 1, pointyRight ? -pw + 5 : 0, 0);
      }
      return geo;
    };
  }

  go.Shape.defineFigureGenerator('Condition2', getFigureGenerator(-1, 1));
  go.Shape.defineFigureGenerator('Input2', getFigureGenerator(1, 0));
  go.Shape.defineFigureGenerator('Output2', getFigureGenerator(0, 1));
  var activityFigureGenerator = getFigureGenerator(0, 0);
  go.Shape.defineFigureGenerator('Activity2', activityFigureGenerator);

  // The Loop shape is rectangular when expanded and round when collapsed
  go.Shape.defineFigureGenerator('Loop2', function (shape, w, h) {
    if (w > 50 || h > 50) return activityFigureGenerator(shape, w, h);
    var path = new go.PathFigure(w, h / 2);
    path.add(new go.PathSegment(go.PathSegment.Arc, 0, 360, w / 2, h / 2, w / 2, h / 2).close());
    var geo = new go.Geometry();
    geo.add(path);
    geo.spot1 = new go.Spot(0, 0, 0, 0);
    geo.spot2 = new go.Spot(1, 1, 0, 0);
    return geo;
  });

  go.Shape.defineFigureGenerator('ToolTip', function (shape, w, h) {
    var ph = DataFlowToolTip.pointyHeight;
    var pw = DataFlowToolTip.pointyWidth;
    var lp = DataFlowToolTip.leftOfPointy;
    var path = new go.PathFigure(0, ph);
    path.add(new go.PathSegment(go.PathSegment.Line, lp, ph));
    path.add(new go.PathSegment(go.PathSegment.Line, lp + pw / 2, 0));
    path.add(new go.PathSegment(go.PathSegment.Line, lp + pw, ph));
    path.add(new go.PathSegment(go.PathSegment.Line, w, ph));
    path.add(new go.PathSegment(go.PathSegment.Line, w, h));
    path.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var geo = new go.Geometry();
    geo.add(path);
    geo.spot1 = new go.Spot(0, 0, 0, ph);
    geo.spot2 = new go.Spot(1, 1, 0, 0);
    return geo;
  });
}();

// Copy-pasted and adapted from the front-end; TODO: merge with front
var LOWER_RANGE = 'a-z';
var UPPER_RANGE = 'A-Z';
var WORDS_REGEX = RegExp([
  '[' + UPPER_RANGE + '][' + LOWER_RANGE + ']+',
  '[' + LOWER_RANGE + ']+',
  '[' + UPPER_RANGE + ']+(?![' + LOWER_RANGE + '])',
  '\\d+',
  '.'
].join('|'), 'g');
