module.exports=(()=>{var __webpack_modules__={295:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:true});function _interopDefault(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var n=_interopDefault(r(413));var o=_interopDefault(r(605));var s=_interopDefault(r(835));var i=_interopDefault(r(211));var u=_interopDefault(r(761));const c=n.Readable;const l=Symbol("buffer");const f=Symbol("type");class Blob{constructor(){this[f]="";const e=arguments[0];const t=arguments[1];const r=[];let n=0;if(e){const t=e;const o=Number(t.length);for(let e=0;e<o;e++){const o=t[e];let s;if(o instanceof Buffer){s=o}else if(ArrayBuffer.isView(o)){s=Buffer.from(o.buffer,o.byteOffset,o.byteLength)}else if(o instanceof ArrayBuffer){s=Buffer.from(o)}else if(o instanceof Blob){s=o[l]}else{s=Buffer.from(typeof o==="string"?o:String(o))}n+=s.length;r.push(s)}}this[l]=Buffer.concat(r);let o=t&&t.type!==undefined&&String(t.type).toLowerCase();if(o&&!/[^\u0020-\u007E]/.test(o)){this[f]=o}}get size(){return this[l].length}get type(){return this[f]}text(){return Promise.resolve(this[l].toString())}arrayBuffer(){const e=this[l];const t=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(t)}stream(){const e=new c;e._read=function(){};e.push(this[l]);e.push(null);return e}toString(){return"[object Blob]"}slice(){const e=this.size;const t=arguments[0];const r=arguments[1];let n,o;if(t===undefined){n=0}else if(t<0){n=Math.max(e+t,0)}else{n=Math.min(t,e)}if(r===undefined){o=e}else if(r<0){o=Math.max(e+r,0)}else{o=Math.min(r,e)}const s=Math.max(o-n,0);const i=this[l];const u=i.slice(n,n+s);const c=new Blob([],{type:arguments[2]});c[l]=u;return c}}Object.defineProperties(Blob.prototype,{size:{enumerable:true},type:{enumerable:true},slice:{enumerable:true}});Object.defineProperty(Blob.prototype,Symbol.toStringTag,{value:"Blob",writable:false,enumerable:false,configurable:true});function FetchError(e,t,r){Error.call(this,e);this.message=e;this.type=t;if(r){this.code=this.errno=r.code}Error.captureStackTrace(this,this.constructor)}FetchError.prototype=Object.create(Error.prototype);FetchError.prototype.constructor=FetchError;FetchError.prototype.name="FetchError";let a;try{a=r(432).convert}catch(e){}const d=Symbol("Body internals");const h=n.PassThrough;function Body(e){var t=this;var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},o=r.size;let s=o===undefined?0:o;var i=r.timeout;let u=i===undefined?0:i;if(e==null){e=null}else if(isURLSearchParams(e)){e=Buffer.from(e.toString())}else if(isBlob(e))   ;else if(Buffer.isBuffer(e))   ;else if(Object.prototype.toString.call(e)==="[object ArrayBuffer]"){e=Buffer.from(e)}else if(ArrayBuffer.isView(e)){e=Buffer.from(e.buffer,e.byteOffset,e.byteLength)}else if(e instanceof n)   ;else{e=Buffer.from(String(e))}this[d]={body:e,disturbed:false,error:null};this.size=s;this.timeout=u;if(e instanceof n){e.on("error",function(e){const r=e.name==="AbortError"?e:new FetchError(`Invalid response body while trying to fetch ${t.url}: ${e.message}`,"system",e);t[d].error=r})}}Body.prototype={get body(){return this[d].body},get bodyUsed(){return this[d].disturbed},arrayBuffer(){return consumeBody.call(this).then(function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)})},blob(){let e=this.headers&&this.headers.get("content-type")||"";return consumeBody.call(this).then(function(t){return Object.assign(new Blob([],{type:e.toLowerCase()}),{[l]:t})})},json(){var e=this;return consumeBody.call(this).then(function(t){try{return JSON.parse(t.toString())}catch(t){return Body.Promise.reject(new FetchError(`invalid json response body at ${e.url} reason: ${t.message}`,"invalid-json"))}})},text(){return consumeBody.call(this).then(function(e){return e.toString()})},buffer(){return consumeBody.call(this)},textConverted(){var e=this;return consumeBody.call(this).then(function(t){return convertBody(t,e.headers)})}};Object.defineProperties(Body.prototype,{body:{enumerable:true},bodyUsed:{enumerable:true},arrayBuffer:{enumerable:true},blob:{enumerable:true},json:{enumerable:true},text:{enumerable:true}});Body.mixIn=function(e){for(const t of Object.getOwnPropertyNames(Body.prototype)){if(!(t in e)){const r=Object.getOwnPropertyDescriptor(Body.prototype,t);Object.defineProperty(e,t,r)}}};function consumeBody(){var e=this;if(this[d].disturbed){return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`))}this[d].disturbed=true;if(this[d].error){return Body.Promise.reject(this[d].error)}let t=this.body;if(t===null){return Body.Promise.resolve(Buffer.alloc(0))}if(isBlob(t)){t=t.stream()}if(Buffer.isBuffer(t)){return Body.Promise.resolve(t)}if(!(t instanceof n)){return Body.Promise.resolve(Buffer.alloc(0))}let r=[];let o=0;let s=false;return new Body.Promise(function(n,i){let u;if(e.timeout){u=setTimeout(function(){s=true;i(new FetchError(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))},e.timeout)}t.on("error",function(t){if(t.name==="AbortError"){s=true;i(t)}else{i(new FetchError(`Invalid response body while trying to fetch ${e.url}: ${t.message}`,"system",t))}});t.on("data",function(t){if(s||t===null){return}if(e.size&&o+t.length>e.size){s=true;i(new FetchError(`content size at ${e.url} over limit: ${e.size}`,"max-size"));return}o+=t.length;r.push(t)});t.on("end",function(){if(s){return}clearTimeout(u);try{n(Buffer.concat(r,o))}catch(t){i(new FetchError(`Could not create Buffer from response body for ${e.url}: ${t.message}`,"system",t))}})})}function convertBody(e,t){if(typeof a!=="function"){throw new Error("The package `encoding` must be installed to use the textConverted() function")}const r=t.get("content-type");let n="utf-8";let o,s;if(r){o=/charset=([^;]*)/i.exec(r)}s=e.slice(0,1024).toString();if(!o&&s){o=/<meta.+?charset=(['"])(.+?)\1/i.exec(s)}if(!o&&s){o=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(s);if(!o){o=/<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(s);if(o){o.pop()}}if(o){o=/charset=(.*)/i.exec(o.pop())}}if(!o&&s){o=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(s)}if(o){n=o.pop();if(n==="gb2312"||n==="gbk"){n="gb18030"}}return a(e,"UTF-8",n).toString()}function isURLSearchParams(e){if(typeof e!=="object"||typeof e.append!=="function"||typeof e.delete!=="function"||typeof e.get!=="function"||typeof e.getAll!=="function"||typeof e.has!=="function"||typeof e.set!=="function"){return false}return e.constructor.name==="URLSearchParams"||Object.prototype.toString.call(e)==="[object URLSearchParams]"||typeof e.sort==="function"}function isBlob(e){return typeof e==="object"&&typeof e.arrayBuffer==="function"&&typeof e.type==="string"&&typeof e.stream==="function"&&typeof e.constructor==="function"&&typeof e.constructor.name==="string"&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function clone(e){let t,r;let o=e.body;if(e.bodyUsed){throw new Error("cannot clone body after it is used")}if(o instanceof n&&typeof o.getBoundary!=="function"){t=new h;r=new h;o.pipe(t);o.pipe(r);e[d].body=t;o=r}return o}function extractContentType(e){if(e===null){return null}else if(typeof e==="string"){return"text/plain;charset=UTF-8"}else if(isURLSearchParams(e)){return"application/x-www-form-urlencoded;charset=UTF-8"}else if(isBlob(e)){return e.type||null}else if(Buffer.isBuffer(e)){return null}else if(Object.prototype.toString.call(e)==="[object ArrayBuffer]"){return null}else if(ArrayBuffer.isView(e)){return null}else if(typeof e.getBoundary==="function"){return`multipart/form-data;boundary=${e.getBoundary()}`}else if(e instanceof n){return null}else{return"text/plain;charset=UTF-8"}}function getTotalBytes(e){const t=e.body;if(t===null){return 0}else if(isBlob(t)){return t.size}else if(Buffer.isBuffer(t)){return t.length}else if(t&&typeof t.getLengthSync==="function"){if(t._lengthRetrievers&&t._lengthRetrievers.length==0||t.hasKnownLength&&t.hasKnownLength()){return t.getLengthSync()}return null}else{return null}}function writeToStream(e,t){const r=t.body;if(r===null){e.end()}else if(isBlob(r)){r.stream().pipe(e)}else if(Buffer.isBuffer(r)){e.write(r);e.end()}else{r.pipe(e)}}Body.Promise=global.Promise;const y=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;const m=/[^\t\x20-\x7e\x80-\xff]/;function validateName(e){e=`${e}`;if(y.test(e)||e===""){throw new TypeError(`${e} is not a legal HTTP header name`)}}function validateValue(e){e=`${e}`;if(m.test(e)){throw new TypeError(`${e} is not a legal HTTP header value`)}}function find(e,t){t=t.toLowerCase();for(const r in e){if(r.toLowerCase()===t){return r}}return undefined}const p=Symbol("map");class Headers{constructor(){let e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:undefined;this[p]=Object.create(null);if(e instanceof Headers){const t=e.raw();const r=Object.keys(t);for(const e of r){for(const r of t[e]){this.append(e,r)}}return}if(e==null)   ;else if(typeof e==="object"){const t=e[Symbol.iterator];if(t!=null){if(typeof t!=="function"){throw new TypeError("Header pairs must be iterable")}const r=[];for(const t of e){if(typeof t!=="object"||typeof t[Symbol.iterator]!=="function"){throw new TypeError("Each header pair must be iterable")}r.push(Array.from(t))}for(const e of r){if(e.length!==2){throw new TypeError("Each header pair must be a name/value tuple")}this.append(e[0],e[1])}}else{for(const t of Object.keys(e)){const r=e[t];this.append(t,r)}}}else{throw new TypeError("Provided initializer must be an object")}}get(e){e=`${e}`;validateName(e);const t=find(this[p],e);if(t===undefined){return null}return this[p][t].join(", ")}forEach(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;let r=getHeaders(this);let n=0;while(n<r.length){var o=r[n];const s=o[0],i=o[1];e.call(t,i,s,this);r=getHeaders(this);n++}}set(e,t){e=`${e}`;t=`${t}`;validateName(e);validateValue(t);const r=find(this[p],e);this[p][r!==undefined?r:e]=[t]}append(e,t){e=`${e}`;t=`${t}`;validateName(e);validateValue(t);const r=find(this[p],e);if(r!==undefined){this[p][r].push(t)}else{this[p][e]=[t]}}has(e){e=`${e}`;validateName(e);return find(this[p],e)!==undefined}delete(e){e=`${e}`;validateName(e);const t=find(this[p],e);if(t!==undefined){delete this[p][t]}}raw(){return this[p]}keys(){return createHeadersIterator(this,"key")}values(){return createHeadersIterator(this,"value")}[Symbol.iterator](){return createHeadersIterator(this,"key+value")}}Headers.prototype.entries=Headers.prototype[Symbol.iterator];Object.defineProperty(Headers.prototype,Symbol.toStringTag,{value:"Headers",writable:false,enumerable:false,configurable:true});Object.defineProperties(Headers.prototype,{get:{enumerable:true},forEach:{enumerable:true},set:{enumerable:true},append:{enumerable:true},has:{enumerable:true},delete:{enumerable:true},keys:{enumerable:true},values:{enumerable:true},entries:{enumerable:true}});function getHeaders(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"key+value";const r=Object.keys(e[p]).sort();return r.map(t==="key"?function(e){return e.toLowerCase()}:t==="value"?function(t){return e[p][t].join(", ")}:function(t){return[t.toLowerCase(),e[p][t].join(", ")]})}const b=Symbol("internal");function createHeadersIterator(e,t){const r=Object.create(g);r[b]={target:e,kind:t,index:0};return r}const g=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==g){throw new TypeError("Value of `this` is not a HeadersIterator")}var e=this[b];const t=e.target,r=e.kind,n=e.index;const o=getHeaders(t,r);const s=o.length;if(n>=s){return{value:undefined,done:true}}this[b].index=n+1;return{value:o[n],done:false}}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));Object.defineProperty(g,Symbol.toStringTag,{value:"HeadersIterator",writable:false,enumerable:false,configurable:true});function exportNodeCompatibleHeaders(e){const t=Object.assign({__proto__:null},e[p]);const r=find(e[p],"Host");if(r!==undefined){t[r]=t[r][0]}return t}function createHeadersLenient(e){const t=new Headers;for(const r of Object.keys(e)){if(y.test(r)){continue}if(Array.isArray(e[r])){for(const n of e[r]){if(m.test(n)){continue}if(t[p][r]===undefined){t[p][r]=[n]}else{t[p][r].push(n)}}}else if(!m.test(e[r])){t[p][r]=[e[r]]}}return t}const w=Symbol("Response internals");const B=o.STATUS_CODES;class Response{constructor(){let e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};Body.call(this,e,t);const r=t.status||200;const n=new Headers(t.headers);if(e!=null&&!n.has("Content-Type")){const t=extractContentType(e);if(t){n.append("Content-Type",t)}}this[w]={url:t.url,status:r,statusText:t.statusText||B[r],headers:n,counter:t.counter}}get url(){return this[w].url||""}get status(){return this[w].status}get ok(){return this[w].status>=200&&this[w].status<300}get redirected(){return this[w].counter>0}get statusText(){return this[w].statusText}get headers(){return this[w].headers}clone(){return new Response(clone(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}Body.mixIn(Response.prototype);Object.defineProperties(Response.prototype,{url:{enumerable:true},status:{enumerable:true},ok:{enumerable:true},redirected:{enumerable:true},statusText:{enumerable:true},headers:{enumerable:true},clone:{enumerable:true}});Object.defineProperty(Response.prototype,Symbol.toStringTag,{value:"Response",writable:false,enumerable:false,configurable:true});const _=Symbol("Request internals");const T=s.parse;const E=s.format;const S="destroy"in n.Readable.prototype;function isRequest(e){return typeof e==="object"&&typeof e[_]==="object"}function isAbortSignal(e){const t=e&&typeof e==="object"&&Object.getPrototypeOf(e);return!!(t&&t.constructor.name==="AbortSignal")}class Request{constructor(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};let r;if(!isRequest(e)){if(e&&e.href){r=T(e.href)}else{r=T(`${e}`)}e={}}else{r=T(e.url)}let n=t.method||e.method||"GET";n=n.toUpperCase();if((t.body!=null||isRequest(e)&&e.body!==null)&&(n==="GET"||n==="HEAD")){throw new TypeError("Request with GET/HEAD method cannot have body")}let o=t.body!=null?t.body:isRequest(e)&&e.body!==null?clone(e):null;Body.call(this,o,{timeout:t.timeout||e.timeout||0,size:t.size||e.size||0});const s=new Headers(t.headers||e.headers||{});if(o!=null&&!s.has("Content-Type")){const e=extractContentType(o);if(e){s.append("Content-Type",e)}}let i=isRequest(e)?e.signal:null;if("signal"in t)i=t.signal;if(i!=null&&!isAbortSignal(i)){throw new TypeError("Expected signal to be an instanceof AbortSignal")}this[_]={method:n,redirect:t.redirect||e.redirect||"follow",headers:s,parsedURL:r,signal:i};this.follow=t.follow!==undefined?t.follow:e.follow!==undefined?e.follow:20;this.compress=t.compress!==undefined?t.compress:e.compress!==undefined?e.compress:true;this.counter=t.counter||e.counter||0;this.agent=t.agent||e.agent}get method(){return this[_].method}get url(){return E(this[_].parsedURL)}get headers(){return this[_].headers}get redirect(){return this[_].redirect}get signal(){return this[_].signal}clone(){return new Request(this)}}Body.mixIn(Request.prototype);Object.defineProperty(Request.prototype,Symbol.toStringTag,{value:"Request",writable:false,enumerable:false,configurable:true});Object.defineProperties(Request.prototype,{method:{enumerable:true},url:{enumerable:true},headers:{enumerable:true},redirect:{enumerable:true},clone:{enumerable:true},signal:{enumerable:true}});function getNodeRequestOptions(e){const t=e[_].parsedURL;const r=new Headers(e[_].headers);if(!r.has("Accept")){r.set("Accept","*/*")}if(!t.protocol||!t.hostname){throw new TypeError("Only absolute URLs are supported")}if(!/^https?:$/.test(t.protocol)){throw new TypeError("Only HTTP(S) protocols are supported")}if(e.signal&&e.body instanceof n.Readable&&!S){throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8")}let o=null;if(e.body==null&&/^(POST|PUT)$/i.test(e.method)){o="0"}if(e.body!=null){const t=getTotalBytes(e);if(typeof t==="number"){o=String(t)}}if(o){r.set("Content-Length",o)}if(!r.has("User-Agent")){r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)")}if(e.compress&&!r.has("Accept-Encoding")){r.set("Accept-Encoding","gzip,deflate")}let s=e.agent;if(typeof s==="function"){s=s(t)}if(!r.has("Connection")&&!s){r.set("Connection","close")}return Object.assign({},t,{method:e.method,headers:exportNodeCompatibleHeaders(r),agent:s})}function AbortError(e){Error.call(this,e);this.type="aborted";this.message=e;Error.captureStackTrace(this,this.constructor)}AbortError.prototype=Object.create(Error.prototype);AbortError.prototype.constructor=AbortError;AbortError.prototype.name="AbortError";const x=n.PassThrough;const j=s.resolve;function fetch(e,t){if(!fetch.Promise){throw new Error("native promise missing, set fetch.Promise to your favorite alternative")}Body.Promise=fetch.Promise;return new fetch.Promise(function(r,s){const c=new Request(e,t);const l=getNodeRequestOptions(c);const f=(l.protocol==="https:"?i:o).request;const a=c.signal;let d=null;const h=function abort(){let e=new AbortError("The user aborted a request.");s(e);if(c.body&&c.body instanceof n.Readable){c.body.destroy(e)}if(!d||!d.body)return;d.body.emit("error",e)};if(a&&a.aborted){h();return}const y=function abortAndFinalize(){h();finalize()};const m=f(l);let p;if(a){a.addEventListener("abort",y)}function finalize(){m.abort();if(a)a.removeEventListener("abort",y);clearTimeout(p)}if(c.timeout){m.once("socket",function(e){p=setTimeout(function(){s(new FetchError(`network timeout at: ${c.url}`,"request-timeout"));finalize()},c.timeout)})}m.on("error",function(e){s(new FetchError(`request to ${c.url} failed, reason: ${e.message}`,"system",e));finalize()});m.on("response",function(e){clearTimeout(p);const t=createHeadersLenient(e.headers);if(fetch.isRedirect(e.statusCode)){const n=t.get("Location");const o=n===null?null:j(c.url,n);switch(c.redirect){case"error":s(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${c.url}`,"no-redirect"));finalize();return;case"manual":if(o!==null){try{t.set("Location",o)}catch(e){s(e)}}break;case"follow":if(o===null){break}if(c.counter>=c.follow){s(new FetchError(`maximum redirect reached at: ${c.url}`,"max-redirect"));finalize();return}const n={headers:new Headers(c.headers),follow:c.follow,counter:c.counter+1,agent:c.agent,compress:c.compress,method:c.method,body:c.body,signal:c.signal,timeout:c.timeout,size:c.size};if(e.statusCode!==303&&c.body&&getTotalBytes(c)===null){s(new FetchError("Cannot follow redirect with body being a readable stream","unsupported-redirect"));finalize();return}if(e.statusCode===303||(e.statusCode===301||e.statusCode===302)&&c.method==="POST"){n.method="GET";n.body=undefined;n.headers.delete("content-length")}r(fetch(new Request(o,n)));finalize();return}}e.once("end",function(){if(a)a.removeEventListener("abort",y)});let n=e.pipe(new x);const o={url:c.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:c.size,timeout:c.timeout,counter:c.counter};const i=t.get("Content-Encoding");if(!c.compress||c.method==="HEAD"||i===null||e.statusCode===204||e.statusCode===304){d=new Response(n,o);r(d);return}const l={flush:u.Z_SYNC_FLUSH,finishFlush:u.Z_SYNC_FLUSH};if(i=="gzip"||i=="x-gzip"){n=n.pipe(u.createGunzip(l));d=new Response(n,o);r(d);return}if(i=="deflate"||i=="x-deflate"){const t=e.pipe(new x);t.once("data",function(e){if((e[0]&15)===8){n=n.pipe(u.createInflate())}else{n=n.pipe(u.createInflateRaw())}d=new Response(n,o);r(d)});return}if(i=="br"&&typeof u.createBrotliDecompress==="function"){n=n.pipe(u.createBrotliDecompress());d=new Response(n,o);r(d);return}d=new Response(n,o);r(d)});writeToStream(m,c)})}fetch.isRedirect=function(e){return e===301||e===302||e===303||e===307||e===308};fetch.Promise=global.Promise;e.exports=t=fetch;Object.defineProperty(t,"__esModule",{value:true});t.default=t;t.Headers=Headers;t.Request=Request;t.Response=Response;t.FetchError=FetchError},667:(e,t,r)=>{const n=r(585);const o=r(354);const s=r(747);const i=r(295);async function fetchReleases(e,t){const r=`query {\n        repository(owner:"${e}", name:"${t}") {\n          releases(first:100, orderBy: {field:CREATED_AT, direction:DESC}) {\n            nodes {\n              tag {\n                name\n              }\n              isPrerelease\n              releaseAssets(first:1, name:"rpi-imager.json") {\n                nodes {\n                  downloadUrl\n                }\n              }\n            }\n          }\n        }\n      }`;const n=await o.graphql(r);let s=null;let i=null;for(const e of n.repository.releases.nodes){if(s===null&&i===null&&e.isPrerelease){i=e}else if(s===null&&!e.isPrerelease){s=e}}return{stable:s,prerelease:i}}function rename(e,t){if(t!==null){e.description=e.name;e.name=t}return e}async function generate(e,t,r){const[n,o]=e;if(n===null||n.releaseAssets.nodes.length===0){return null}const s=rename(await i(n.releaseAssets.nodes[0].downloadUrl).then(e=>e.json()),t);const u={os_list:[s]};if(o!==null&&o.releaseAssets.nodes.length>0){const e=rename(await i(o.releaseAssets.nodes[0].downloadUrl).then(e=>e.json()),r);u.os_list.push(e)}return u}async function serialize(e,t){const r=JSON.stringify(e,null,2);n.info("rpi-imager.json:",r);s.writeFileSync(t,r)}async function run(){const e=n.getInput("owner",{required:true});const t=n.getInput("repo",{required:true});const r=n.getInput("output",{required:true});const o=n.getInput("nameStable")||null;const s=n.getInput("namePrerelease")||null;const i=await fetchReleases(e,t);const u=await generate(i,o,s);if(u!==null){await serialize(u,r)}}run()},585:module=>{module.exports=eval("require")("@actions/core")},354:module=>{module.exports=eval("require")("@actions/github")},432:module=>{module.exports=eval("require")("encoding")},747:e=>{"use strict";e.exports=require("fs")},605:e=>{"use strict";e.exports=require("http")},211:e=>{"use strict";e.exports=require("https")},413:e=>{"use strict";e.exports=require("stream")},835:e=>{"use strict";e.exports=require("url")},761:e=>{"use strict";e.exports=require("zlib")}};var __webpack_module_cache__={};function __nccwpck_require__(e){if(__webpack_module_cache__[e]){return __webpack_module_cache__[e].exports}var t=__webpack_module_cache__[e]={exports:{}};var r=true;try{__webpack_modules__[e](t,t.exports,__nccwpck_require__);r=false}finally{if(r)delete __webpack_module_cache__[e]}return t.exports}__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(667)})();