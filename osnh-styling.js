/*
OSN HAX Styling
---------------
Various styling tweaks to the Oracle Social Network interface
*/
var stylingTweaks = [
    "div.GE0BIW3BBVC.GE0BIW3BGO > div.gwt-HTML {max-height:100px;overflow:auto;}",
    "div.GE0BIW3BFYC.GE0BIW3BIIC > div:first-child {height:auto !important;}",
    "div.GE0BIW3BFYC.GE0BIW3BBEC > div:first-child {height:auto !important;}",
    "div.GE0BIW3BEBC.GE0BIW3BC2B {position: fixed;top: 65px;right: 253px;background-color: white;overflow:auto;height:auto;bottom:10px;z-index:0;border-left:none !important;} ",
    "@media (max-width:1245px) {div.GE0BIW3BEBC.GE0BIW3BC2B {right:5px;}}",
    "div.GE0BIW3BP1B {background-color:white;z-index:1;border-right:1px solid #C5DBE7;}"
];

window.OSNH.injectCSS(stylingTweaks);
