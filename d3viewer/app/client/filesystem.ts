
/* -------------------------------------------- */
// some utilities here
/* -------------------------------------------- */

// load a local file
// @param:filename the path of the file relative to index.html directory
// @param:callback(data) when the file is loaded this callback is
// called if passed as an argument. If some json data are to be provided
// put them into a javascript variable name data:
//    for instance in myjson.json : data={"key":"value"};
// this data will be passed to the callback, the rest of the javascript file
// will be interpreted as normal
// @param:errcallback(filename) when the load fails for some reason this callback is
// called if passed as an argument
var filePool: any[] = [];
var pmutex = false;
var myThread: number | null = null;
var MAX_FILE_POOL = 128;
var POOL_ADD_TIME = 10;
var POOL_DEL_TIME = 50;

function consumeFile(fileref) {
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function popFile(fileref) {
  document.getElementsByTagName("head")[0].removeChild(fileref);
}

function poolCb() {
  if (pmutex)
    return;

  pmutex = true;
  for (let i = 0; i < MAX_FILE_POOL; i++) {
    var fileref = filePool.pop();
    if (fileref == undefined || fileref == null) {
      if (myThread) window.clearInterval(myThread);
      myThread = null;
      break;
    }
    consumeFile(fileref);
  }
  pmutex = false;
}
function pullFiles() {
  // copy the file pool
  var cpyFilePool: any[] = filePool.slice();
  filePool = [];
  var pullThread = window.setInterval(function () {
    var fileRef = cpyFilePool.pop();
    if (fileRef == undefined || fileRef == null) {
      window.clearInterval(pullThread);
      return;
    }
    consumeFile(fileRef);

  }, 1);
}
var timeElapsed: number | null = null;
function pushFile(fileref) {
  if (timeElapsed) {
    window.clearTimeout(timeElapsed);
  }
  filePool.push(fileref);
  timeElapsed = window.setTimeout(function () {
    // it's been 5 ms that pushFile has not been called
    // start pull
    pullFiles();
  }, 5)
}

export function loadFile(filename, callback, errcallback, cbowner = window) {
  var args = Array.prototype.slice.call(arguments);
  //    $jit.id('inner-details').innerHTML = "loading " + filename;
  if (filename == null || filename == undefined) {
    if (errcallback != undefined) {
      errcallback.apply(cbowner, [filename].concat(args.slice(4, args.length)));
    }
  }
  var fileref = document.createElement('script')
  fileref.type = "text/javascript";
  fileref.src = filename + '?' + Math.random() * 10000;
  pushFile(fileref);
  fileref.onload = function () {

    if (callback != undefined) {
      callback.apply(cbowner, [window['data']].concat(args.slice(4, args.length)));
    }
    popFile(fileref);
    return;
  }
  fileref.onerror = function () {
    if (errcallback != undefined) {
      errcallback.apply(cbowner, [fileref.src].concat(args.slice(4, args.length)));
    }
    document.getElementsByTagName("head")[0].removeChild(fileref);
  }
}
