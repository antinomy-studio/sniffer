"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babelCore = require("babel-core");

var _dashify = require("dashify");

var _dashify2 = _interopRequireDefault(_dashify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Keep an eye on the browser compatibility and support of User-Agent Client-Hints API (anticipated to replace the userAgent)
// https://web.dev/user-agent-client-hints/#javascript-api
// User agent Client Hints aims to provide this information in a more privacy-preserving way by enforcing a model where the server requests a set of information. The browser decides what to return.
// This approach means that a user-agent could provide settings that allow a user to hide some of the information that could fingerprint them from such requests.
// https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API#browser_compatibility

var Sniffer = function () {
  function Sniffer() {
    _classCallCheck(this, Sniffer);

    var ua = navigator.userAgent.toLowerCase();
    var av = navigator.appVersion.toLowerCase(); // deprecated
    var uad = navigator.userAgentData;

    // 1. define browser

    var _defineBrowser = this.defineBrowser(ua, av, uad),
        isFirefox = _defineBrowser.isFirefox,
        isSafari = _defineBrowser.isSafari,
        isOpera = _defineBrowser.isOpera,
        isIE11 = _defineBrowser.isIE11,
        isIE = _defineBrowser.isIE,
        isEdge = _defineBrowser.isEdge,
        isChrome = _defineBrowser.isChrome,
        isChromium = _defineBrowser.isChromium,
        browserVersion = _defineBrowser.browserVersion;
    // 2. define operating system
    // 3. define device + define device characteristics


    var _defineDeviceAndOS = this.defineDeviceAndOS(ua, av, uad),
        isWindowsPhone = _defineDeviceAndOS.isWindowsPhone,
        isDroidPhone = _defineDeviceAndOS.isDroidPhone,
        isDroidTablet = _defineDeviceAndOS.isDroidTablet,
        isIpad = _defineDeviceAndOS.isIpad,
        isTablet = _defineDeviceAndOS.isTablet,
        isPhone = _defineDeviceAndOS.isPhone,
        isDevice = _defineDeviceAndOS.isDevice,
        isTouch = _defineDeviceAndOS.isTouch,
        isDroid = _defineDeviceAndOS.isDroid,
        isIos = _defineDeviceAndOS.isIos,
        isIPadOS = _defineDeviceAndOS.isIPadOS;

    this.infos = {
      isDroid: isDroid,
      isDroidPhone: isDroidPhone,
      isDroidTablet: isDroidTablet,
      isWindowsPhone: isWindowsPhone,
      isIos: isIos,
      isIpad: isIpad,
      isDevice: isDevice,
      isEdge: isEdge,
      isIE: isIE,
      isIE11: isIE11,
      isPhone: isPhone,
      isTablet: isTablet,
      isFirefox: isFirefox,
      isSafari: isSafari,
      isOpera: isOpera,
      isChrome: isChrome,
      isDesktop: !isPhone && !isTablet,
      isTouch: isTouch,
      isIPadOS: isIPadOS,
      isisChromium: isChromium,
      version: browserVersion
    };

    Object.keys(this.infos).forEach(function (info) {
      Object.defineProperty(this, info, {
        get: function get() {
          return this.infos[info];
        }
      });
    }, this);

    Object.freeze(this);
  }

  _createClass(Sniffer, [{
    key: "defineBrowser",
    value: function defineBrowser(ua, av, uad) {
      var isFirefox = false;
      var isSafari = false;
      var isOpera = false;
      var isIE11 = false;
      var isIE = false;
      var isEdge = false;
      var isChromium = false;
      var isChrome = false;
      var browserVersion = null;
      if (uad) {
        // if uad is defined, use this to be able to define the browsers + their version
        uad.brands.map(function (_ref) {
          var brand = _ref.brand,
              version = _ref.version;

          switch (brand) {
            case 'Google Chrome':
              isChrome = true;
              browserVersion = version;
              break;
            case 'Chromium':
              isChromium = true;
              browserVersion = version;
              break;
            case 'Opera':
              isOpera = true;
              browserVersion = version;
              break;
            case 'Mozilla FireFox':
              isFirefox = true;
              browserVersion = version;
              break;
            case 'Safari':
              isSafari = true;
              browserVersion = version;
              break;
            case 'Microsoft Edge':
              isEdge = true;
              browserVersion = version;
              break;
            default:
              break;
          }
        });
      } else {
        isFirefox = ua.indexOf('firefox') > -1;
        isSafari = !!ua.match(/version\/[\d\.]+.*safari/);
        isOpera = ua.indexOf('opr') > -1;
        isIE11 = !window.ActiveXObject && "ActiveXObject" in window;
        isIE = av.indexOf('msie') > -1 || isIE11 || av.indexOf('edge') > -1;
        isEdge = ua.indexOf('edge') > -1 || /Edge\/\d./i.test(ua);
        isChrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() == 'google inc.' && !isOpera && !isEdge;
      }

      return { isFirefox: isFirefox, isSafari: isSafari, isOpera: isOpera, isIE11: isIE11, isIE: isIE, isEdge: isEdge, isChrome: isChrome, isChromium: isChromium, browserVersion: browserVersion };
    }
  }, {
    key: "defineDeviceAndOS",
    value: function defineDeviceAndOS(ua, av, uad) {
      console.log(uad);
      var isIos = !isWindowsPhone && /ip(hone|od|ad)/i.test(ua) && !window.MSStream;
      var isWindowsPhone = /windows phone|iemobile|wpdesktop/.test(ua);
      var isDroidPhone = !isWindowsPhone && /android.*mobile/.test(ua);
      var isDroidTablet = !isWindowsPhone && !isDroidPhone && /android/i.test(ua);
      var isIpad = !isWindowsPhone && /ipad/i.test(ua) && isIos;
      var isTablet = isDroidTablet || isIpad;
      var isPhone = isDroidPhone || isIos && !isIpad || isWindowsPhone;
      var isDevice = isPhone || isTablet;
      var isTouch = 'ontouchstart' in document.documentElement;
      var isDroid = isDroidPhone || isDroidTablet;
      var isIPadOS = navigator.userAgent.match(/(iPad)/) /* iOS pre 13 */ || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 /* iPad OS 13 */;

      // if(uad){ // uad doesn't work on that many mobile operators yet/ not (yet) the best option for the check  - supported: Chrome Android, Opera Android, Samsung Internet
      // uad = isMobile && usefull to detect which model of device is being used !
      // if supported on iOS devices - then perhaps we can check the isMobile bool + model name (?) - if contains iPhone or iPad

      // if(navigator.userAgentData){ // if undefined use fallback ua and av
      //   navigator.userAgentData.getHighEntropyValues(
      //     ["model",
      //     "platform",
      //     "platformVersion",
      //     "fullVersionList"])
      //     .then(res => {
      //       // console.log(Object.values(res.brands))
      //       // update all variables here  - using useragent data
      //       this.uad = res
      //     })
      // }
      // }

      return { isWindowsPhone: isWindowsPhone, isDroidPhone: isDroidPhone, isDroidTablet: isDroidTablet, isIpad: isIpad, isTablet: isTablet, isPhone: isPhone, isDevice: isDevice, isTouch: isTouch, isDroid: isDroid, isIos: isIos, isIPadOS: isIPadOS };
    }
  }, {
    key: "addClasses",
    value: function addClasses(el) {
      Object.keys(this.infos).forEach(function (info) {
        if (this.infos[info]) addClass(el, (0, _dashify2.default)(info));
      }, this);
    }
  }, {
    key: "getInfos",
    value: function getInfos() {
      return clone(this.infos);
    }
  }]);

  return Sniffer;
}();

// Sniffer.addClasses = function(el) {
//   Object.keys(this.infos).forEach(function(info) {
//       if (this.infos[info]) addClass(el, dashify(info));
//   }, this);
// };

// Sniffer.getInfos = function() {
//   return clone(this.infos);
// };


// const addClass = (el, className) => {
//   if (el.addClass) el.addClass(className);
//   else if (el.classList) el.classList.add(className);
//   else el.className += ' ' + className;
// }

// const clone = (source) => {
//   return JSON.parse(JSON.stringify(source));
// }

var sniffer = typeof navigator !== 'undefined' ? new Sniffer() : '';
exports.default = sniffer;