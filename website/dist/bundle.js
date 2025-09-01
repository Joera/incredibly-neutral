/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _verify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./verify.js */ \"./src/verify.js\");\n \n\n\nwindow.addEventListener('load', function() {\n    const params = new URLSearchParams(location.search);\n    \n    // Get all params as an object\n    const allParams = Object.fromEntries(params);\n    console.log(allParams);\n    \n    // Or get individual params\n    const uid = params.get('uid');\n    if (uid) {\n        // Do something with the parameter\n       (0,_verify_js__WEBPACK_IMPORTED_MODULE_0__.verify)()\n    }\n});\n\n\n\n\n//# sourceURL=webpack://website/./src/index.js?\n}");

/***/ }),

/***/ "./src/verify.js":
/*!***********************!*\
  !*** ./src/verify.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   verify: () => (/* binding */ verify)\n/* harmony export */ });\nconst parseCombined = (combinedString) => {\n  // Code is always first 8 characters (4 bytes = 8 hex chars)\n  const code = combinedString.substring(0, 8);\n  // Signature is the rest (should be 132 chars for Ethereum signatures)\n  const signature = combinedString.substring(8);\n  \n  return { code, signature };\n};\n\nconst verify = (combinedString, expectedAddress) => {\n  try {\n    const { code, signature } = parseCombined(combinedString);\n    \n    // Recreate the message hash\n    const messageHash = ethers.keccak256(ethers.solidityPacked(['string'], [code]));\n    \n    // Recover the signer's address\n    const recoveredAddress = ethers.verifyMessage(getBytes(messageHash), signature);\n    \n    // Check if it matches expected address\n    const isValid = recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();\n    \n    return {\n      valid: isValid,\n      code: code,\n      signature: signature,\n      recoveredAddress: recoveredAddress,\n      expectedAddress: expectedAddress\n    };\n    \n  } catch(error) {\n    return {\n      valid: false,\n      error: error.message\n    };\n  }\n};\n\n//# sourceURL=webpack://website/./src/verify.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;