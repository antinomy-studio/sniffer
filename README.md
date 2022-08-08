sniffer.js
===

⚠️ This is a fork from @ayamflow's repository. https://github.com/ayamflow/sniffer
A browser sniffing util.

## Install

```
npm install @antinomy-studio/sniffer --save
```

## Usage

```
import sniffer from '@antinomy-studio/sniffer'

console.log(sniffer.isDesktop)

sniffer.addClasses(document.documentElement)
```

## Instance Methods

### addClasses(el)

Add dashed-case sniffing classes to the given element, i.e. `is-ios`, `is-firefox`.
* `el` - the element to add classes to.


### getInfos()

Return an object containing all the sniffing properties.

## Instance Properties

### isEdge
### isIE
### isIE11

### isDroid
### isDroidTablet
### isDroidPhone

### isIos
### isIpad

### isTablet
### isPhone
### isDevice `(isPhone && isTablet)`

### isDesktop
### isFirefox
### isSafari
### isOpera
### isChrome

## License
MIT.
