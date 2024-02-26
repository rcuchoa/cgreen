/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\ndocument.addEventListener('DOMContentLoaded', function() {\n    document.getElementById('formEnviarFoto').addEventListener('submit', function(event) {\n        event.preventDefault();\n        const photo = document.getElementById('inputEnviarFoto').value;\n        console.log('Enviar Foto: ', photo);\n        document.getElementById('divFoto').textContent = \"Foto enviada. Muito obrigado Carioca Green!\";\n    });\n\n    document.getElementById('formVerificarCredito').addEventListener('submit', function(event) {\n        event.preventDefault();\n        const address = document.getElementById('inputVerificarCredito').value;\n        console.log('Verifica Credito:', address);\n        document.getElementById('divCredito').textContent = \"Parabéns! Continue sendo um carioca consciente!\";\n    });\n\n    document.getElementById('formTransferirCredito').addEventListener('submit', function(event) {\n        event.preventDefault();\n        const address = document.getElementById('inputTransferirCredito').value;\n        console.log('Transferir Credito:', address);\n        document.getElementById('divTransferencia').textContent = \"Crédito enviado! Seu amigo deve estar feliz!\";\n    });\n\n    document.getElementById('formMinhasArvores').addEventListener('submit', function(event) {\n        event.preventDefault();\n        const address = document.getElementById('inputMinhasArvores').value;\n        console.log('Minhas Arvores:', address);\n        document.getElementById('divArvores').textContent = \"Parabéns! Continue sendo um carioca consciente!\";\n\n    });\n});\n\n\n\n\n\n//# sourceURL=webpack://hardhat-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;