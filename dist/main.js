(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["compartilhador"] = factory();
	else
		root["compartilhador"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compartilhador/indexCompartilhador.ts":
/*!***************************************************!*\
  !*** ./src/compartilhador/indexCompartilhador.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeKitPublic": () => (/* binding */ makeKitPublic),
/* harmony export */   "getAllPublicKits": () => (/* binding */ getAllPublicKits)
/* harmony export */ });
/* harmony import */ var _config_api_jsonbin_kits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/api_jsonbin/kits */ "./src/config/api_jsonbin/kits.ts");

async function makeKitPublic(element, kits) {
    const customKits = JSON.parse(kits);
    const arraySelecionado = customKits.filter((kit) => {
        return kit.id == element.id;
    });
    const kitSelecionado = JSON.parse(JSON.stringify(arraySelecionado[0]));
    return await (0,_config_api_jsonbin_kits__WEBPACK_IMPORTED_MODULE_0__.addKit)(kitSelecionado);
}
async function getAllPublicKits() {
    const kitIds = await (0,_config_api_jsonbin_kits__WEBPACK_IMPORTED_MODULE_0__.getAll)();
    let kits = [];
    for (let id of kitIds) {
        const kit = await (0,_config_api_jsonbin_kits__WEBPACK_IMPORTED_MODULE_0__.getKitById)(id.record);
        kits.push(kit.record);
    }
    return kits;
}



/***/ }),

/***/ "./src/config/api_jsonbin/kits.ts":
/*!****************************************!*\
  !*** ./src/config/api_jsonbin/kits.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addKit": () => (/* binding */ addKit),
/* harmony export */   "getAll": () => (/* binding */ getAll),
/* harmony export */   "getKitById": () => (/* binding */ getKitById)
/* harmony export */ });
const API_URL = "https://api.jsonbin.io/v3";
const API_KEY = "$2b$10$2./HmBJ7uiLYgqD2cym/zeLh3XZ3qFjYFD7WH5I12nyGToK8K6tLa";
const COLLECTION_ID = "60496eda7ffeba41c075536a";
async function addKit(kit) {
    const JSONkit = JSON.stringify(kit);
    const response = await fetch(`${API_URL}/b`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": `${API_KEY}`,
            "X-Collection-Id": `${COLLECTION_ID}`,
        },
        body: `${JSONkit}`,
    });
    return await response.json();
}
async function getAll() {
    const response = await fetch(`${API_URL}/c/${COLLECTION_ID}/bins/1`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": `${API_KEY}`,
        },
    });
    return await response.json();
}
async function getKitById(kitId) {
    const response = await fetch(`${API_URL}/b/${kitId}/`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": `${API_KEY}`,
        },
    });
    return await response.json();
}



/***/ }),

/***/ "./src/config/api_strateegia/auth.ts":
/*!*******************************************!*\
  !*** ./src/config/api_strateegia/auth.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auth": () => (/* binding */ auth)
/* harmony export */ });
const API_URL = 'https://api.strateegia.digital/users/v1/auth/signin';
async function auth(username, password) {
    const base64Login = btoa(`${username}:${password}`);
    const response = await fetch(API_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Login}`
        }
    });
    const data = await response.json();
    return data.access_token;
}



/***/ }),

/***/ "./src/config/api_strateegia/kits.ts":
/*!*******************************************!*\
  !*** ./src/config/api_strateegia/kits.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAll": () => (/* binding */ getAll),
/* harmony export */   "getById": () => (/* binding */ getById),
/* harmony export */   "addKitToUser": () => (/* binding */ addKitToUser)
/* harmony export */ });
const API_URL = 'https://api.strateegia.digital/kits/v1/kit';
async function getAll(token) {
    const response = await fetch(`${API_URL}?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
async function getById(token, kit_id) {
    const response = await fetch(`${API_URL}/${kit_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
async function addKitToUser(token, kit) {
    const JSONkit = JSON.stringify(kit);
    const response = await fetch(`${API_URL}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: `${JSONkit}`
    });
    return await response.json();
}



/***/ }),

/***/ "./src/strateegia/indexLogin.ts":
/*!**************************************!*\
  !*** ./src/strateegia/indexLogin.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* binding */ login)
/* harmony export */ });
/* harmony import */ var _config_api_strateegia_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/api_strateegia/auth */ "./src/config/api_strateegia/auth.ts");

async function login(username, password) {
    return await (0,_config_api_strateegia_auth__WEBPACK_IMPORTED_MODULE_0__.auth)(username, password);
}



/***/ }),

/***/ "./src/strateegia/indexStrateegia.ts":
/*!*******************************************!*\
  !*** ./src/strateegia/indexStrateegia.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMyKits": () => (/* binding */ getMyKits),
/* harmony export */   "importKitToStrateegia": () => (/* binding */ importKitToStrateegia)
/* harmony export */ });
/* harmony import */ var _config_api_strateegia_kits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/api_strateegia/kits */ "./src/config/api_strateegia/kits.ts");

async function getMyKits(token) {
    const kits = await (0,_config_api_strateegia_kits__WEBPACK_IMPORTED_MODULE_0__.getAll)(token);
    const isCustom = (kit) => kit.tier === 'CUSTOM';
    const customKits = kits.content.filter(isCustom);
    return await customKits;
}
async function importKitToStrateegia(token, element) {
    const kit = await (0,_config_api_strateegia_kits__WEBPACK_IMPORTED_MODULE_0__.getById)(token, element.id);
    console.log('kit...');
    console.log(kit);
    return await (0,_config_api_strateegia_kits__WEBPACK_IMPORTED_MODULE_0__.addKitToUser)(token, kit);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* reexport safe */ _strateegia_indexLogin__WEBPACK_IMPORTED_MODULE_0__.login),
/* harmony export */   "getMyKits": () => (/* reexport safe */ _strateegia_indexStrateegia__WEBPACK_IMPORTED_MODULE_1__.getMyKits),
/* harmony export */   "makeKitPublic": () => (/* reexport safe */ _compartilhador_indexCompartilhador__WEBPACK_IMPORTED_MODULE_2__.makeKitPublic),
/* harmony export */   "getAllPublicKits": () => (/* reexport safe */ _compartilhador_indexCompartilhador__WEBPACK_IMPORTED_MODULE_2__.getAllPublicKits),
/* harmony export */   "importKitToStrateegia": () => (/* reexport safe */ _strateegia_indexStrateegia__WEBPACK_IMPORTED_MODULE_1__.importKitToStrateegia)
/* harmony export */ });
/* harmony import */ var _strateegia_indexLogin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strateegia/indexLogin */ "./src/strateegia/indexLogin.ts");
/* harmony import */ var _strateegia_indexStrateegia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strateegia/indexStrateegia */ "./src/strateegia/indexStrateegia.ts");
/* harmony import */ var _compartilhador_indexCompartilhador__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compartilhador/indexCompartilhador */ "./src/compartilhador/indexCompartilhador.ts");





})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vY29tcGFydGlsaGFkb3IvLi9zcmMvY29tcGFydGlsaGFkb3IvaW5kZXhDb21wYXJ0aWxoYWRvci50cyIsIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci8uL3NyYy9jb25maWcvYXBpX2pzb25iaW4va2l0cy50cyIsIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci8uL3NyYy9jb25maWcvYXBpX3N0cmF0ZWVnaWEvYXV0aC50cyIsIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci8uL3NyYy9jb25maWcvYXBpX3N0cmF0ZWVnaWEva2l0cy50cyIsIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci8uL3NyYy9zdHJhdGVlZ2lhL2luZGV4TG9naW4udHMiLCJ3ZWJwYWNrOi8vY29tcGFydGlsaGFkb3IvLi9zcmMvc3RyYXRlZWdpYS9pbmRleFN0cmF0ZWVnaWEudHMiLCJ3ZWJwYWNrOi8vY29tcGFydGlsaGFkb3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcGFydGlsaGFkb3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvbXBhcnRpbGhhZG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29tcGFydGlsaGFkb3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jb21wYXJ0aWxoYWRvci8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7OztBQ1Z3RTtBQUV4RSxLQUFLLFVBQVUsYUFBYSxDQUFDLE9BQW9CLEVBQUUsSUFBUztJ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Q0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQixPQUFPLE1BQU0seUVBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUUwQzs7Ozs7OztVQ3RCM0M7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmdEO0FBQ2dDO0FBQ087QUFFSiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY29tcGFydGlsaGFkb3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY29tcGFydGlsaGFkb3JcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgeyBhZGRLaXQsIGdldEFsbCwgZ2V0S2l0QnlJZCB9IGZyb20gXCIuLi9jb25maWcvYXBpX2pzb25iaW4va2l0c1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFrZUtpdFB1YmxpYyhlbGVtZW50OiBIVE1MRWxlbWVudCwga2l0czogYW55KXsgICAgICAgIFxyXG4gICAgY29uc3QgY3VzdG9tS2l0cyA9IEpTT04ucGFyc2Uoa2l0cyk7XHJcblxyXG4gICAgY29uc3QgYXJyYXlTZWxlY2lvbmFkbyA9IGN1c3RvbUtpdHMuZmlsdGVyKChraXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBraXQuaWQgPT0gZWxlbWVudC5pZDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGtpdFNlbGVjaW9uYWRvID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcnJheVNlbGVjaW9uYWRvWzBdKSk7XHJcbiAgICBcclxuICAgIHJldHVybiBhd2FpdCBhZGRLaXQoa2l0U2VsZWNpb25hZG8pOyAgICBcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsUHVibGljS2l0cygpe1xyXG4gICAgY29uc3Qga2l0SWRzID0gYXdhaXQgZ2V0QWxsKCk7XHJcbiAgICBsZXQga2l0czogYW55W10gPSBbXTtcclxuICAgIGZvciAobGV0IGlkIG9mIGtpdElkcykge1xyXG4gICAgICAgIGNvbnN0IGtpdCA9IGF3YWl0IGdldEtpdEJ5SWQoaWQucmVjb3JkKTtcclxuICAgICAgICBraXRzLnB1c2goa2l0LnJlY29yZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ga2l0cztcclxufVxyXG5cclxuZXhwb3J0IHttYWtlS2l0UHVibGljLCBnZXRBbGxQdWJsaWNLaXRzfSIsImNvbnN0IEFQSV9VUkwgPSBcImh0dHBzOi8vYXBpLmpzb25iaW4uaW8vdjNcIjtcclxuY29uc3QgQVBJX0tFWSA9IFwiJDJiJDEwJDIuL0htQko3dWlMWWdxRDJjeW0vemVMaDNYWjNxRmpZRkQ3V0g1STEybnlHVG9LOEs2dExhXCI7XHJcbmNvbnN0IENPTExFQ1RJT05fSUQgPSBcIjYwNDk2ZWRhN2ZmZWJhNDFjMDc1NTM2YVwiO1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZEtpdChraXQ6IGFueSkge1xyXG4gIGNvbnN0IEpTT05raXQgPSBKU09OLnN0cmluZ2lmeShraXQpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYmAsIHtcclxuICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICBcIlgtTWFzdGVyLUtleVwiOiBgJHtBUElfS0VZfWAsXHJcbiAgICAgIFwiWC1Db2xsZWN0aW9uLUlkXCI6IGAke0NPTExFQ1RJT05fSUR9YCxcclxuICAgIH0sXHJcbiAgICBib2R5OiBgJHtKU09Oa2l0fWAsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEFsbCgpIHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSV9VUkx9L2MvJHtDT0xMRUNUSU9OX0lEfS9iaW5zLzFgLCB7XHJcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICBcIlgtTWFzdGVyLUtleVwiOiBgJHtBUElfS0VZfWAsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRLaXRCeUlkKGtpdElkOiBzdHJpbmcpe1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYi8ke2tpdElkfS9gLCB7XHJcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICBcIlgtTWFzdGVyLUtleVwiOiBgJHtBUElfS0VZfWAsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRLaXQsIGdldEFsbCwgZ2V0S2l0QnlJZCB9O1xyXG4iLCJjb25zdCBBUElfVVJMID0gJ2h0dHBzOi8vYXBpLnN0cmF0ZWVnaWEuZGlnaXRhbC91c2Vycy92MS9hdXRoL3NpZ25pbic7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhdXRoKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpe1xyXG4gICAgY29uc3QgYmFzZTY0TG9naW4gPSBidG9hKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApOyAgICBcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkwsIHtcclxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFxyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCYXNpYyAke2Jhc2U2NExvZ2lufWBcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbjsgICAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBhdXRoIH0iLCJjb25zdCBBUElfVVJMID0gJ2h0dHBzOi8vYXBpLnN0cmF0ZWVnaWEuZGlnaXRhbC9raXRzL3YxL2tpdCc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRBbGwodG9rZW46IHN0cmluZyl7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfT9zaXplPTUwMDBgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFxyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YTsgICAgXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEJ5SWQodG9rZW46IHN0cmluZywga2l0X2lkOiBzdHJpbmcpe1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vJHtraXRfaWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7ICAgIFxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhZGRLaXRUb1VzZXIodG9rZW46c3RyaW5nLCBraXQ6IGFueSkge1xyXG4gICAgY29uc3QgSlNPTmtpdCA9IEpTT04uc3RyaW5naWZ5KGtpdCk7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfWAsIHtcclxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IGAke0pTT05raXR9YFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldEFsbCwgZ2V0QnlJZCwgYWRkS2l0VG9Vc2VyIH0iLCJpbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4uL2NvbmZpZy9hcGlfc3RyYXRlZWdpYS9hdXRoXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKXsgICAgXHJcbiAgICByZXR1cm4gYXdhaXQgYXV0aCh1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG59XHJcblxyXG5leHBvcnQgeyBsb2dpbiB9IiwiaW1wb3J0IHsgZ2V0QWxsLCBhZGRLaXRUb1VzZXIsIGdldEJ5SWQgfSBmcm9tIFwiLi4vY29uZmlnL2FwaV9zdHJhdGVlZ2lhL2tpdHNcIjtcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRNeUtpdHModG9rZW46IHN0cmluZyl7XHJcbiAgICBjb25zdCBraXRzID0gYXdhaXQgZ2V0QWxsKHRva2VuKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBjb25zdCBpc0N1c3RvbSA9IChraXQ6IGFueSkgPT4ga2l0LnRpZXIgPT09ICdDVVNUT00nO1xyXG4gICAgXHJcbiAgICBjb25zdCBjdXN0b21LaXRzID0ga2l0cy5jb250ZW50LmZpbHRlcihpc0N1c3RvbSk7XHJcbiAgICBcclxuICAgIHJldHVybiBhd2FpdCBjdXN0b21LaXRzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbXBvcnRLaXRUb1N0cmF0ZWVnaWEodG9rZW46IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGtpdCA9IGF3YWl0IGdldEJ5SWQodG9rZW4sIGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc29sZS5sb2coJ2tpdC4uLicpO1xyXG4gICAgY29uc29sZS5sb2coa2l0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGF3YWl0IGFkZEtpdFRvVXNlcih0b2tlbiwga2l0KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZ2V0TXlLaXRzLCBpbXBvcnRLaXRUb1N0cmF0ZWVnaWEgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvZ2luIH0gZnJvbSBcIi4vc3RyYXRlZWdpYS9pbmRleExvZ2luXCI7XHJcbmltcG9ydCB7IGdldE15S2l0cywgaW1wb3J0S2l0VG9TdHJhdGVlZ2lhIH0gZnJvbSBcIi4vc3RyYXRlZWdpYS9pbmRleFN0cmF0ZWVnaWFcIjtcclxuaW1wb3J0IHsgbWFrZUtpdFB1YmxpYywgZ2V0QWxsUHVibGljS2l0cyB9IGZyb20gXCIuL2NvbXBhcnRpbGhhZG9yL2luZGV4Q29tcGFydGlsaGFkb3JcIjtcclxuXHJcbmV4cG9ydCB7IGxvZ2luLCBnZXRNeUtpdHMsIG1ha2VLaXRQdWJsaWMsIGdldEFsbFB1YmxpY0tpdHMsIGltcG9ydEtpdFRvU3RyYXRlZWdpYSB9Il0sInNvdXJjZVJvb3QiOiIifQ==