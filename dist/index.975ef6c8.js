// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"56pmF":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//  Connect to a blockchain network on Metamask
parcelHelpers.export(exports, "connectToDesiredBlockchainNetwork", ()=>connectToDesiredBlockchainNetwork);
//Connect to Blockchain and initialize all Smart Contracts
parcelHelpers.export(exports, "initBlockchain", ()=>initBlockchain);
parcelHelpers.export(exports, "getConnectedAccount", ()=>getConnectedAccount);
// Send ETH to account
parcelHelpers.export(exports, "sendEther", ()=>sendEther);
// Register a tree and mint all tokens
parcelHelpers.export(exports, "registerTree", ()=>registerTree);
// Create child contracts
parcelHelpers.export(exports, "createChildContracts", ()=>createChildContracts);
// Transfer IPTU credits
parcelHelpers.export(exports, "transferCredits", ()=>transferCredits);
// Get number of trees owned by an address
parcelHelpers.export(exports, "getTrees", ()=>getTrees);
// Get number of IPTU credits owned by an address
parcelHelpers.export(exports, "getCredits", ()=>getCredits);
// Get the address of the CariocaGreenTreeToken contract created by CariocaRioSC
parcelHelpers.export(exports, "getCariocaGreenTreeTokenAddress", ()=>getCariocaGreenTreeTokenAddress);
// Get the address of the RioIPTUToken contract created by CariocaRioSC
parcelHelpers.export(exports, "getRioIPTUTokenAddress", ()=>getRioIPTUTokenAddress);
// Get the balance of the CariocaGreenTreeToken contract
parcelHelpers.export(exports, "getCariocaGreenTreeTokenBalance", ()=>getCariocaGreenTreeTokenBalance);
// Get the addres of the RioIPTUToken contract
parcelHelpers.export(exports, "getRioIPTUTokenBalance", ()=>getRioIPTUTokenBalance);
var _ethers6111Js = require("./ethers@6.11.1.js");
//***************************** GLOBAL VARIABLES USED IN ALL MODULES *****************************/
let addresses = {};
let networkName = "";
let chainID = 0;
let ownerAddress = "";
let user1Address = "";
let user2Address = "";
let contract_address_RioIPTUToken = "";
let contract_address_CariocaGreenTreeToken = "";
let contract_address_CariocaGreenSC = "";
const abi_url_RioIPTUToken = "http://localhost:3000/assets/RioIPTUToken.json";
const abi_url_CariocaGreenTreeToken = "http://localhost:3000/assets/CariocaGreenTreeToken.json";
const abi_url_CariocaGreenSC = "http://localhost:3000/assets/CariocaGreenSC.json";
let contract_RioIPTUToken;
let contract_CariocaGreenTreeToken;
let contract_CariocaGreenSC;
let provider = {};
let signer = {};
//***************************** ETHER MISC FUNCTIONS *****************************/
function delay(milliseconds) {
    const start = Date.now();
    while(Date.now() - start < milliseconds);
}
async function connectToMetamask() {
    try {
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        provider = new (0, _ethers6111Js.ethers).BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        console.log("DEBUG: SUCCESS: PROVIDER/SIGNER CREATED: ", provider, signer);
    } catch (error) {
        console.log("DEBUG: ERROR: PROVIDER NOT CREATED ", error);
    }
}
// Read addresses for blockchain users and contracts from json file
async function fetchAddresses() {
    return fetch("http://localhost:3000/assets/addresses.json").then((_addressesJson)=>{
        return _addressesJson.json();
    }).then((addresses)=>{
        networkName = addresses["networkName"];
        chainID = addresses["chainID"];
        ownerAddress = addresses["ownerAddress"];
        user1Address = addresses["user1Address"];
        user2Address = addresses["user2Address"];
        contract_address_CariocaGreenSC = addresses["contract_address_CariocaGreenSC"];
        contract_address_RioIPTUToken = addresses["contract_address_RioIPTUToken"];
        contract_address_CariocaGreenTreeToken = addresses["contract_address_CariocaGreenTreeToken"];
        console.log("DEBUG: SUCCESS: ADDRESSES FETCHED: ", addresses);
    }).catch((error)=>{
        console.log("DEBUG: ERROR: ADDRESSES NOT FETCHED: ", error);
    });
}
// Get all addresses for blockchain users and contracts
async function getContractAddresses() {
    return new Promise((resolve, reject)=>{
        Promise.all([
            getRioIPTUTokenAddress(),
            getCariocaGreenTreeTokenAddress()
        ]).then(([_contract_address_RioIPTUToken, _contract_address_CariocaGreenTreeToken])=>{
            contract_address_RioIPTUToken = _contract_address_RioIPTUToken;
            contract_address_CariocaGreenTreeToken = _contract_address_CariocaGreenTreeToken;
            console.log("DEBUG: SUCCESS: getContractAddresses(): ", contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
            resolve((contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken));
        }).catch((error)=>{
            console.log("DEBUG: ERROR: getContractAddresses(): ", error);
            reject("NOT OK");
        });
    });
}
// Read Smart Contract ABI from file
async function fetchABI(_url) {
    try {
        const response = await fetch(_url);
        if (!response.ok) throw new Error("DEBUG: ERROR: COULD NOT FETCH ABI FILE: NETWORK ERROR");
        const data = await response.json();
        return data["abi"];
    } catch (error) {
        console.error("DEBUG: ERROR: COULD NOT PARSE ABI FILE:", error);
        throw error;
    }
}
// Initialize Smart Contract CariocaGreenSC
async function initContractCariocaGreenSC() {
    const _abi = await fetchABI(abi_url_CariocaGreenSC);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_CariocaGreenSC, abi_url_CariocaGreenSC, _abi, signer);
    const _contract = new (0, _ethers6111Js.ethers).Contract(contract_address_CariocaGreenSC, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: CariocaGreenSC : ", _contract);
        return _contract;
    } else throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: CariocaGreenSC`);
}
// Initialize Smart Contract RioIPTUToken
async function initContractRioIPTUToken() {
    const _abi = await fetchABI(abi_url_RioIPTUToken);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_RioIPTUToken, abi_url_RioIPTUToken, _abi, signer);
    const _contract = new (0, _ethers6111Js.ethers).Contract(contract_address_RioIPTUToken, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: RioIPTUToken : ", _contract);
        return _contract;
    } else throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: RioIPTUToken`);
}
// Initialize Smart Contract CariocaGreenTreeToken
async function initContractCariocaGreenTreeToken() {
    const _abi = await fetchABI(abi_url_CariocaGreenTreeToken);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_CariocaGreenTreeToken, abi_url_CariocaGreenTreeToken, _abi, signer);
    const _contract = new (0, _ethers6111Js.ethers).Contract(contract_address_CariocaGreenTreeToken, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: CariocaGreenTreeToken : ", _contract);
        return _contract;
    } else throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: CariocaGreenTreeToken`);
}
//  Switch blockchain network on Metamask
async function switchNetwork(_chainId) {
    const customNetwork = {
        chainId: `0x${_chainId.toString(16)}`
    };
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                customNetwork
            ]
        });
        console.log("DEBUG: SUCCESS: NETWORK SWITCHED: ");
    } catch (error) {
        console.error("DEBUG: ERROR: NETWORK NOT SWITCHED: ", error);
    }
}
async function connectToDesiredBlockchainNetwork(_desiredNetworkName, _chainID) {
    console.log(`DEBUG: connectToDesiredBlockchainNetwork: `, _desiredNetworkName, _chainID);
    await provider.getNetwork().then((_network)=>{
        return _network.name;
    }).then((_networkName)=>{
        if (_networkName.toLowerCase() !== _desiredNetworkName.toLowerCase()) {
            console.log(`DEBUG: METAMASK IS CONNECTED TO NETWORK ${_networkName}.`);
            console.log(`DEBUG: SWITCHING TO NETWORK ${_desiredNetworkName}.`);
            switchNetwork(_chainID);
        } else console.log(`DEBUG: METAMASK IS CONNECTED TO NETWORK ${_desiredNetworkName}.`);
    }).catch((_error)=>{
        console.log("DEBUG: ERROR: COULD NOT GET METAMASK NETWORK", _error);
    });
}
async function initBlockchain() {
    try {
        await connectToMetamask();
        console.log("DEBUG: (1) : connectToMetamask : ", provider, signer);
        await fetchAddresses();
        console.log("DEBUG: (2) : fetchAddresses : ", addresses);
        await connectToDesiredBlockchainNetwork(networkName, chainID);
        console.log("DEBUG: (3) : connectToDesiredBlockchainNetwork : ", networkName, chainID);
        contract_CariocaGreenSC = await initContractCariocaGreenSC();
        console.log("DEBUG: (4): initContractCariocaGreenSC : ", contract_CariocaGreenSC);
        //await createChildContracts();
        //console.log("DEBUG: (5) : createChildContracts : ");
        await getContractAddresses();
        console.log("DEBUG: (6) : getContractAddresses : ", contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
        contract_RioIPTUToken = await initContractRioIPTUToken();
        console.log("DEBUG: (7): initContractRioIPTUToken : ", contract_RioIPTUToken);
        contract_CariocaGreenTreeToken = await initContractCariocaGreenTreeToken();
        console.log("DEBUG: (8): initContractCariocaGreenTreeToken : ", contract_CariocaGreenTreeToken);
    } catch (error) {
        console.log("DEBUG: ERROR: CONTRACTS NOT CREATED: ", error);
    }
}
async function getConnectedAccount() {
    // Check if MetaMask is installed and enabled
    if (window.ethereum) try {
        // Request access to the user's accounts
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        // Get the current active account
        const currentAccount = accounts[0];
        console.log("DEBUG: SUCCESS: CONNECTED ACCOUNT: ", currentAccount);
        return currentAccount;
    } catch (error) {
        console.error("DEBUG: ERROR: COULD NOT GET CONNECTED ACCOUNT:", error);
        return null;
    }
    else {
        console.error("DEBUG: ERROR: METAMASK NOT INSTALLED:");
        return null;
    }
}
//***************************** CONTRACTS FUNCTIONS *****************************/
// Get the address of the connected Ethereum account
async function getAddress() {
    const _address = await signer.getAddress();
    return _address;
}
// Get the ETH balance of the connected account
async function getEtherBalance(_address) {
    try {
        //const _address = await getAddress();
        const _balance = await provider.getBalance(_address);
        return _balance;
    } catch (error) {
        console.error("DEBUG: ERROR: getEtherBalance():", error);
        return null;
    }
}
async function sendEther(_to, _value) {
    console.log("DEBUG: sendEther(_to, _value): ", _value);
    // Setup transaction parameters
    const _transaction = {
        to: _to,
        value: (0, _ethers6111Js.ethers).utils.parseEther(_value)
    };
    // Setup transaction parameters
    const signedTransaction = signer.sendTransaction(_transaction).then((_result)=>{
        console.log("DEBUG: SUCCESS: sendEther(_to, _value): ", _result);
    }).catch((_error)=>{
        console.log("DEBUG: ERROR: sendEther(_to, _value): ", _error);
    });
}
// Generic contract call function
async function callContract(_contract, _function, _param) {
    // Check if MetaMask is installed
    if (window.ethereum) try {
        // Request user permission to access their MetaMask account
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        // Call a contract function
        const result = await _contract[_function](_param); // Use bracket notation
        console.log("Result:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
    else console.error("MetaMask not found");
}
async function registerTree(_address) {
    console.log("DEBUG: (1) : registerTree(_address): ", _address);
    return new Promise((resolve, reject)=>{
        console.log("DEBUG: (2) : registerTree(_address): ", _address, signer, contract_CariocaGreenSC);
        contract_CariocaGreenSC.registerTree(_address).then(()=>{
            console.log("DEBUG: (3) SUCCESS: registerTree(_address): ");
            resolve("OK");
        }).catch((_error)=>{
            console.log("DEBUG: (3) ERROR: registerTree(_address): ", _error);
            reject(new Error("Contract call registerTree error!"));
        });
    });
}
async function createChildContracts() {
    console.log("DEBUG: (1) : createChildContracts(): ");
    return new Promise((resolve, reject)=>{
        console.log("DEBUG: (2) : createChildContracts(): ", signer, contract_CariocaGreenSC);
        contract_CariocaGreenSC.createChildContracts().then(()=>{
            console.log("DEBUG: (3) SUCCESS: createChildContracts(): ");
            resolve("OK");
        }).catch((_error)=>{
            console.log("DEBUG: (3) ERROR: createChildContracts(): ", _error);
            reject(new Error("Contract call createChildContracts error!"));
        });
    });
}
async function transferCredits(_to, _amount) {
    console.log("DEBUG: transferCredits(_to, _amount): ", _to, _amount);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.connect(signer).transferCredits(_to, _amount).then(()=>{
            console.log("DEBUG: SUCCESS: transferCredits(_address): ");
            resolve("OK");
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: transferCredits(_address): ", _error);
            reject(new Error("Contract call transferCredits error!"));
        });
    });
}
async function getTrees(_address) {
    console.log("DEBUG: getTrees(_address): ", _address);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getTrees(_address).then((_result)=>{
            console.log("DEBUG: SUCCESS: getTrees(_address): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getTrees(_address): ", _error);
            reject(new Error("Contract call getTrees error!"));
        });
    });
}
async function getCredits(_address) {
    console.log("DEBUG: getCredits(_address): ", _address);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getCredits(_address).then((_result)=>{
            console.log("DEBUG: SUCCESS: getCredits(_address): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getCredits(_address): ", _error);
            reject(new Error("Contract call getCredits error!"));
        });
    });
}
async function getCariocaGreenTreeTokenAddress() {
    console.log("DEBUG: getCariocaGreenTreeTokenAddress(): ", contract_CariocaGreenSC);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getCariocaGreenTreeTokenAddress().then((_result)=>{
            console.log("DEBUG: SUCCESS: getCariocaGreenTreeTokenAddress(): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getCariocaGreenTreeTokenAddress(): ", _error);
            reject("Contract call getCariocaGreenTreeTokenAddress error!");
        });
    });
}
async function getRioIPTUTokenAddress() {
    console.log("DEBUG: getRioIPTUTokenAddress(): ", contract_CariocaGreenSC);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getRioIPTUTokenAddress().then((_result)=>{
            console.log("DEBUG: SUCCESS: getRioIPTUTokenAddress(): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getRioIPTUTokenAddress(): ", _error);
            reject("Contract call getRioIPTUTokenAddress error!");
        });
    });
}
async function getCariocaGreenTreeTokenBalance() {
    console.log("DEBUG: getCariocaGreenTreeTokenBalance(): ", contract_CariocaGreenSC);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getCariocaGreenTreeTokenBalance().then((_result)=>{
            console.log("DEBUG: SUCCESS: getCariocaGreenTreeTokenBalance(): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getCariocaGreenTreeTokenBalance(): ", _error);
            reject("Contract call getCariocaGreenTreeTokenBalance error!");
        });
    });
}
async function getRioIPTUTokenBalance() {
    console.log("DEBUG: getRioIPTUTokenBalance(): ", contract_CariocaGreenSC);
    return new Promise((resolve, reject)=>{
        contract_CariocaGreenSC.getRioIPTUTokenBalance().then((_result)=>{
            console.log("DEBUG: SUCCESS: getRioIPTUTokenBalance(): ", _result);
            resolve(_result);
        }).catch((_error)=>{
            console.log("DEBUG: ERROR: getRioIPTUTokenBalance(): ", _error);
            reject("Contract call getRioIPTUTokenBalance error!");
        });
    });
}
//***************************** CALLBACK FUNCTIONS *****************************/
//-- Connect to Metamask --//
document.getElementById("connectMetamask").addEventListener("click", async function(event) {
    event.preventDefault();
    if (window.ethereum) {
        console.log("DEBUG: connectMetamask: ", networkName, chainID, provider, signer);
        await initBlockchain(); // Initialize Blockchain network
        console.log("DEBUG: CONTRACTS ADDRESSES:", contract_address_CariocaGreenSC, contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
        document.getElementById("connectOutput").textContent = `Conectado \xe0 Metamask! Network: ${networkName} ChainID: ${chainID})!`;
    } else document.getElementById("connectOutput").textContent = "Metamask n\xe3o instalado!";
});
//-- Group 1 --//
document.getElementById("button1").addEventListener("click", async function(event) {
    event.preventDefault();
    let input1_1 = document.getElementById("input1_1").value;
    if (!input1_1) input1_1 = await getConnectedAccount();
    if (!input1_1) input1_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO1: ", input1_1);
    await registerTree(input1_1).then((_value)=>{
        document.getElementById("output1").textContent = `\xc1rvore registrada com sucesso! (HASH: ${_value})`;
    }).catch((_error)=>{
        document.getElementById("output1").textContent = `Erro no registro de \xe1rvore plantada! (Cidad\xe3o: ${_error})`;
    });
});
//-- Group 2 --//
document.getElementById("button2").addEventListener("click", async function(event) {
    event.preventDefault();
    let input2_1 = document.getElementById("input2_1").value;
    if (!input2_1) input2_1 = await getConnectedAccount();
    if (!input2_1) input2_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO2:", input2_1);
    await getTrees(input2_1).then((_value)=>{
        document.getElementById("output2").textContent = `N\xfamero total de \xe1rvores plantadas: ${_value}`;
    }).catch((_error)=>{
        document.getElementById("output2").textContent = `Erro na leitura do n\xfamero total de \xe1rvores plantadas!`;
    });
});
//-- Group 3 --//
document.getElementById("button3").addEventListener("click", async function(event) {
    event.preventDefault();
    let input3_1 = document.getElementById("input3_1").value;
    if (!input3_1) input3_1 = await getConnectedAccount();
    if (!input3_1) input3_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO3:", input3_1);
    await getCredits(input3_1).then((_value)=>{
        document.getElementById("output3").textContent = `N\xfamero total de cr\xe9ditos de IPTU: ${_value}`;
    }).catch((_error)=>{
        document.getElementById("output3").textContent = `Erro na leitura do n\xfamero total de cr\xe9ditos de IPTU!`;
    });
});
//-- Group 4 --//
document.getElementById("button4").addEventListener("click", async function(event) {
    event.preventDefault();
    let input4_1 = document.getElementById("input4_1").value;
    let input4_2 = document.getElementById("input4_2").value;
    if (!input4_1) input4_1 = await getConnectedAccount();
    if (!input4_1) input4_1 = ownerAddress;
    if (!input4_2) input4_2 = 0;
    console.log("DEBUG: CALLBACK_GRUPO4:", input4_1, input4_2);
    await transferCredits(input4_1, input4_2).then((_value)=>{
        document.getElementById("output4").textContent = `Transfer\xeancia de ${input4_2} cr\xe9ditos realizada com sucesso`;
    }).catch((_error)=>{
        document.getElementById("output4").textContent = `Erro na transfer\xeancia de cr\xe9ditos de IPTU`;
    });
});
//-- Group 5 --//
document.getElementById("button5").addEventListener("click", async function(event) {
    event.preventDefault();
    let input5_1 = document.getElementById("input5_1").value;
    console.log("DEBUG: CALLBACK_GRUPO5:", input5_1);
    if (!input5_1) input5_1 = await getConnectedAccount();
    if (!input5_1) input5_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO5:", input5_1);
    await getEtherBalance(input5_1).then((_value)=>{
        document.getElementById("output5").textContent = `Saldo de ETH: ${_value}`;
    }).catch((_error)=>{
        document.getElementById("output5").textContent = `Erro na leitura do saldo de ETH!`;
    });
});
//-- Group 6 --//
document.getElementById("button6").addEventListener("click", async function(event) {
    event.preventDefault();
    let input6_1 = document.getElementById("input6_1").value;
    if (!input6_1) input6_1 = await getConnectedAccount();
    if (!input6_1) input6_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO6:", input6_1, contract_CariocaGreenSC);
    await getCariocaGreenTreeTokenBalance(contract_CariocaGreenSC, input6_1).then((_value)=>{
        document.getElementById("output6").textContent = `Saldo de tokens CGT: ${_value}`;
    }).catch((_error)=>{
        document.getElementById("output6").textContent = `Erro na leitura de tokens CGT!`;
    });
});
//-- Group 7 --//
document.getElementById("button7").addEventListener("click", async function(event) {
    event.preventDefault();
    let input7_1 = document.getElementById("input7_1").value;
    if (!input7_1) input7_1 = await getConnectedAccount();
    if (!input7_1) input7_1 = ownerAddress;
    console.log("DEBUG: CALLBACK_GRUPO7:", input7_1, contract_CariocaGreenSC);
    await getRioIPTUTokenBalance(contract_CariocaGreenSC, input7_1).then((_value)=>{
        document.getElementById("output7").textContent = `Saldo de tokens RIPTU: ${_value}`;
    }).catch((_error)=>{
        document.getElementById("output7").textContent = `Erro na leitura de tokens RIPTU!`;
    });
});
//-- Test Metamask --//
document.getElementById("testConnection").addEventListener("click", async function(event) {
    event.preventDefault();
    if (window.ethereum) {
        console.log("DEBUG: TEST CONNECTION: ", chainID, provider, contract_CariocaGreenSC);
        const testContract = contract_CariocaGreenSC;
        //const testContractName = await testContract.contractName();
        const testFunction = "getTrees";
        const resultTestConnection = await callContract(testContract, testFunction);
        console.log("DEBUG: TEST CONNECTION:", resultTestConnection);
        document.getElementById("testConnectionOutput").textContent = `Contrato: ${testContract} | Fun\xe7\xe3o: ${testFunction} | Resultado: ${resultTestConnection}`;
    } else document.getElementById("testConnectionOutput").textContent = "CONTRACT FUNCTION CALL FAILURE";
});

},{"./ethers@6.11.1.js":"5O8oI","@parcel/transformer-js/src/esmodule-helpers.js":"l0W41"}]},["56pmF","8lqZg"], "8lqZg", "parcelRequire5329")

//# sourceMappingURL=index.975ef6c8.js.map
