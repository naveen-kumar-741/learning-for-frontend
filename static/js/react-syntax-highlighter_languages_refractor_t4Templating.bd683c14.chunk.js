"use strict";(self.webpackChunktypescript_sample=self.webpackChunktypescript_sample||[]).push([[2279],{921:e=>{function t(e){!function(e){function t(e,t,a){return{pattern:RegExp("<#"+e+"[\\s\\S]*?#>"),alias:"block",inside:{delimiter:{pattern:RegExp("^<#"+e+"|#>$"),alias:"important"},content:{pattern:/[\s\S]+/,inside:t,alias:a}}}}e.languages["t4-templating"]=Object.defineProperty({},"createT4",{value:function(a){var n=e.languages[a],s="language-"+a;return{block:{pattern:/<#[\s\S]+?#>/,inside:{directive:t("@",{"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,inside:{punctuation:/^=|^["']|["']$/}},keyword:/\b\w+(?=\s)/,"attr-name":/\b\w+/}),expression:t("=",n,s),"class-feature":t("\\+",n,s),standard:t("",n,s)}}}}})}(e)}e.exports=t,t.displayName="t4Templating",t.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_t4Templating.bd683c14.chunk.js.map