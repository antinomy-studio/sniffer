const dashify = (str, options) => {
  if (typeof str !== 'string') throw new TypeError('expected a string')
  return str.trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, m => /[À-ž]/.test(m) ? m : '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, m => options && options.condense ? '-' : m)
    .toLowerCase()
}

// Keep an eye on the browser compatibility and support of User-Agent Client-Hints API (anticipated to replace the userAgent)
// https://web.dev/user-agent-client-hints/#javascript-api
// https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API#browser_compatibility

class Sniffer {
  constructor () {
    let ua = navigator.userAgent.toLowerCase()
    let av = navigator.appVersion.toLowerCase() // deprecated
    let uad = navigator.userAgentData

    // 1. define browser
    const { isFirefox, isSafari, isOpera, isIE11, isIE, isEdge, isChrome, isChromium, browserVersion } = this.defineBrowser(ua, av, uad)
    // 2. define operating system
    // 3. define device + define device characteristics
    const { isWindowsPhone, isDroidPhone, isDroidTablet, isIpad, isTablet, isPhone, isDevice, isTouch, isDroid, isIos, isIPadOS } = this.defineDeviceAndOS(ua, av, uad)

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
      isChromium: isChromium,
      version: browserVersion,
    }

    Object.keys(this.infos).forEach((info) => {
      Object.defineProperty(this, info, {
        get: function () {
          return this.infos[info]
        }
      })
    })

    Object.freeze(this)
  }

  defineBrowser (ua, av, uad) {
    let isFirefox = false
    let isSafari = false
    let isOpera = false
    let isIE11 = false
    let isIE = false
    let isEdge = false
    let isChromium = false
    let isChrome = false
    let browserVersion = null
    if(uad){ // if uad is defined, use this to be able to define the browsers + their version
      uad.brands.map(({ brand, version }) => {
        switch (brand) {
          case 'Google Chrome':
            isChrome = true
            browserVersion = version
            break;
          case 'Chromium':
              isChromium = true
              browserVersion = version
              break;
          case 'Opera':
            isOpera = true
            browserVersion = version
            break;
          case 'Mozilla FireFox':
            isFirefox = true
            browserVersion = version
            break;
          case 'Safari':
            isSafari = true
            browserVersion = version
            break;
          case 'Microsoft Edge':
            isEdge = true
            browserVersion = version
            break;
          default:
            break;
        }
      })
    } else {
      isFirefox = ua.indexOf('firefox') > -1;
      isSafari = !!ua.match(/version\/[\d\.]+.*safari/);
      isOpera = ua.indexOf('opr') > -1;
      isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
      isIE = av.indexOf('msie') > -1 || isIE11 || av.indexOf('edge') > -1;
      isEdge = ua.indexOf('edge') > -1 || /Edge\/\d./i.test(ua);
      isChrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() == 'google inc.' && !isOpera && !isEdge;
    }

    return { isFirefox, isSafari, isOpera, isIE11, isIE, isEdge, isChrome, isChromium, browserVersion }
  }

  defineDeviceAndOS (ua, av, uad) {
    let isWindowsPhone = /windows phone|iemobile|wpdesktop/.test(ua)
    let isIos = !isWindowsPhone && (/ip(hone|od|ad)/i).test(ua) && !window.MSStream
    let isDroidPhone = !isWindowsPhone && /android.*mobile/.test(ua)
    let isDroidTablet = !isWindowsPhone && !isDroidPhone && (/android/i).test(ua)
    let isIpad = !isWindowsPhone && (/ipad/i).test(ua) && isIos
    let isTablet = isDroidTablet || isIpad
    let isPhone = isDroidPhone || (isIos && !isIpad) || isWindowsPhone
    let isDevice = isPhone || isTablet
    let isTouch = 'ontouchstart' in document.documentElement
    let isDroid = isDroidPhone || isDroidTablet
    let isIPadOS = (navigator.userAgent.match(/(iPad)/) /* iOS pre 13 */ || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) /* iPad OS 13 */)

    return {
      isWindowsPhone,
      isDroidPhone,
      isDroidTablet,
      isIpad,
      isTablet,
      isPhone,
      isDevice,
      isTouch,
      isDroid,
      isIos,
      isIPadOS
    }
  }

  addClasses(el) {
    Object.keys(this.infos).forEach((info) => {
      if (info === 'version') return
      if (this.infos[info]) el.classList.add(dashify(info))
    }, this)
  }

  getInfos() {
    return clone(this.infos)
  }
}

const clone = (source) => {
  return JSON.parse(JSON.stringify(source));
}

const sniffer = typeof navigator !== 'undefined' ? new Sniffer() : {}

export default sniffer
