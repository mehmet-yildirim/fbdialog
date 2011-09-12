/**
 * fbDialog
 * This is a replication of Facebook's own popup dialog component with PHP backend.
 * Original code retrieved from Facebook
 * Why jQuery needed? Because for my company's project, I had to rewrite Facebook's Dialog component with jQuery way as I can do.
 * @copyright (c) Mehmet Yıldırım <myildirim2007@gmail.com> and Facebook, Inc.
 * @requires jQuery
*/

/**
 * Helper function and objects that need to be init'ed first.
 * Most of them are retrieved from Facebook's own js files.
 */
window.onloadhooks = window.onloadhooks || [];
window.onloadRegister = window.onloadRegister ||
function (a) {
    onloadhooks.push(a);
};
window.onafterloadhooks = window.onafterloadhooks || [];
window.onafterloadRegister = window.onafterloadRegister ||
function (a) {
    onafterloadhooks.push(a);
};

function onbeforeunloadRegister(a, b) {
    if (b === undefined) b = _include_quickling_events_default();
    b ? _addHook('onbeforeleavehooks', a) : _addHook('onbeforeunloadhooks', a);
}
function onunloadRegister(a) {
    _addHook('onunloadhooks', a);
}
function onleaveRegister(a) {
    _addHook('onleavehooks', a);
}
function _addHook(b, a) {
    window[b] = (window[b] || []).concat(a);
}
function removeHook(a) {
    window[a] = [];
}

function bagofholding(){}
function bagof(a){return function(){return a;};}

function eval_global(c) {
    if ('string' != typeof (c)) {
        throw new Error('JS sent to eval_global is not a string.  Only strings ' + 'are permitted.');
    } else if ('' == c) return;
    var d = document.createElement('script');
    d.type = 'text/javascript';
    try {
        d.appendChild(document.createTextNode(c));
    } catch (a) {
        d.text = c;
    }
    var b = (document.getElementsByTagName("head")[0] || document.documentElement);
    b.appendChild(d);
    b.removeChild(d);
}

function bind(c, b) {
    var a = Array.prototype.slice.call(arguments, 2);
    return function () {
        var e = c || (this == window ? false : this),
            d = a.concat(Array.prototype.slice.call(arguments));
        if (typeof (b) == "string") {
            if (e[b]) return e[b].apply(e, d);
        } else return b.apply(e, d);
    };
}
function chain(d, e) {
    var b, a = [];
    for (var c = 0; c < arguments.length; c++) a.push(arguments[c]);
    b = function (event) {
        event = event || window.event;
        for (var f = 0; f < a.length; f++) if (a[f] && a[f].apply(this, arguments) === false) {
            return false;
        } else if (event && event.cancelBubble) return true;
        return true;
    };
    return b;
}

function hasArrayNature(a) {
    return ( !! a && (typeof a == 'object' || typeof a == 'function') && ('length' in a) && !('setInterval' in a) && (Object.prototype.toString.call(a) === "[object Array]" || ('callee' in a) || ('item' in a)));
}
function $A(b) {
    if (!hasArrayNature(b)) return [b];
    if (b.item) {
        var a = b.length,
            c = new Array(a);
        while (a--) c[a] = b[a];
        return c;
    }
    return Array.prototype.slice.call(b);
}

function object(b) {
    var a = new Function();
    a.prototype = b;
    return new a();
}
function is_scalar(a) {
    return (/string|number|boolean/).test(typeof a);
}
function keys(c) {
    var b = [];
    for (var a in c) b.push(a);
    return b;
}
function values(b) {
    var c = [];
    for (var a in b) c.push(b[a]);
    return c;
}
function count(c) {
    var a = 0;
    for (var b in c) a++;
    return a;
}
function are_equal(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}
function merge() {
    var b = {};
    for (var a = 0; a < arguments.length; a++) copy_properties(b, arguments[a]);
    return b;
}

function coalesce() {
    for (var a = 0; a < arguments.length; ++a) if (arguments[a] != null) return arguments[a];
    return null;
}

function is_empty(b) {
    if (b instanceof Array) {
        return b.length == 0;
    } else if (b instanceof Object) {
        for (var a in b) return false;
        return true;
    } else return !b;
}

function htmlspecialchars(a) {
    if (typeof (a) == 'undefined' || a === null || !a.toString) return '';
    if (a === false) {
        return '0';
    } else if (a === true) return '1';
    return a.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function htmlize(a) {
    return htmlspecialchars(a).replace(/\n/g, '<br />');
}
function escape_js_quotes(a) {
    if (typeof (a) == 'undefined' || !a.toString) return '';
    return a.toString().replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\x22').replace(/'/g, '\\\'').replace(/</g, '\\x3c').replace(/>/g, '\\x3e').replace(/&/g, '\\x26');
}

if (!window.async_callback) window.async_callback = function (a, b) {
    return a;
};

function invoke_callbacks(b, d) {
    if (b) for (var c = 0; c < b.length; c++) try {
        (new Function(b[c])).apply(d);
    } catch (a) {}
}

Object.from = function (c, e) {
    var d = {};
    var b = hasArrayNature(e);
    if (typeof e == 'undefined') e = true;
    for (var a = c.length; a--;) d[c[a]] = b ? e[a] : e;
    return d;
};

// copy_properties() and add_properties() work similar as $.extend
function copy_properties(b, c) {
    b = b || {};
    c = c || {};
    for (var a in c) b[a] = c[a];
    if (c.hasOwnProperty && c.hasOwnProperty('toString') && (typeof c.toString != 'undefined') && (b.toString !== c.toString)) b.toString = c.toString;
    return b;
}
function add_properties(a, b) {
    return copy_properties(window[a] || (window[a] = {}), b);
}

/**
 * Array prototype extension
 */
!function () {
	
    function a(b) {
        return function () {
            if (this === window) throw new TypeError();
            return b.apply(this, arguments);
        };
    }
    copy_properties(Array.prototype, {
        map: function (c, b) {
            if (this === window || typeof c != 'function') throw new TypeError();
            var d;
            var e = this.length;
            var f = new Array(e);
            for (d = 0; d < e; ++d) if (d in this) f[d] = c.call(b, this[d], d, this);
            return f;
        },
        forEach: function (c, b) {
            this.map(c, b);
            return this;
        },
        filter: function (c, b) {
            c = c ||
            function (h) {
                return h;
            };
            if (this === window || typeof c != 'function') throw new TypeError();
            var d, g, e = this.length,
                f = [];
            for (d = 0; d < e; ++d) if (d in this) {
                g = this[d];
                if (c.call(b, g, d, this)) f.push(g);
            }
            return f;
        },
        every: function (d, c) {
            var b = this.filter(function () {
                return 1;
            });
            return (this.filter(d, c).length == b.length);
        },
        some: function (c, b) {
            return (this.filter(c, b).length > 0);
        },
        reduce: null,
        reduceRight: null,
        sort: a(Array.prototype.sort),
        reverse: a(Array.prototype.reverse),
        concat: a(Array.prototype.concat),
        slice: a(Array.prototype.slice),
        indexOf: a(Array.prototype.indexOf ||
        function (d, b) {
            var c = this.length;
            b |= 0;
            if (b < 0) b += c;
            for (; b < c; b++) if (b in this && this[b] === d) return b;
            return -1;
        }),
        contains: function (b) {
            return this.indexOf(b) != -1;
        },
        remove: function (c) {
            var b = this.indexOf(c);
            if (b != -1) this.splice(b, 1);
        }
    });
    Array.prototype.each = Array.prototype.forEach;
    Array.prototype.clone = Array.prototype.slice;
}();

/**
 * Function prototype extension
 */
Function.prototype.mixin = function () {
    var a = [this.prototype].concat(Array.prototype.slice.call(arguments));
    Function.mixin.apply(null, a);
};

Function.prototype.bind = function (b) {
    var a = [b, this].concat(Array.prototype.slice.call(arguments, 1));
    return bind.apply(null, a);
};
Function.prototype.curry = Function.prototype.bind.bind(null, null);
Function.prototype.shield = function (b) {
    if (typeof this != 'function') throw new TypeException();
    var a = this.bind.apply(this, $A(arguments));
    return function () {
        return a();
    };
};
Function.prototype.defer = function (b, a) {
    if (typeof this != 'function') throw new TypeError();
    b = b || 0;
    return setTimeout(this, b, a);
};
Function.prototype.recur = function (b, a) {
    if (typeof this != 'function') throw new TypeError();
    return setInterval(this, b, a);
};

/*
 * User agent object
 * I prefered to use this instead of $.support, because I think it's more easy to work with.
 */
var ua = {
    ie: function () {
        return ua._populate() || this._ie;
    },
    firefox: function () {
        return ua._populate() || this._firefox;
    },
    opera: function () {
        return ua._populate() || this._opera;
    },
    safari: function () {
        return ua._populate() || this._safari;
    },
    chrome: function () {
        return ua._populate() || this._chrome;
    },
    windows: function () {
        return ua._populate() || this._windows;
    },
    osx: function () {
        return ua._populate() || this._osx;
    },
    linux: function () {
        return ua._populate() || this._linux;
    },
    iphone: function () {
        return ua._populate() || this._iphone;
    },
    _populated: false,
    _populate: function () {
        if (ua._populated) return;
        ua._populated = true;
        var a = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/.exec(navigator.userAgent);
        var c = /(Mac OS X)|(Windows)|(Linux)/.exec(navigator.userAgent);
        var b = /\b(iPhone|iP[ao]d)/.exec(navigator.userAgent);
        if (a) {
            ua._ie = a[1] ? parseFloat(a[1]) : NaN;
            if (ua._ie >= 8 && !window.HTMLCollection) ua._ie = 7;
            ua._firefox = a[2] ? parseFloat(a[2]) : NaN;
            ua._opera = a[3] ? parseFloat(a[3]) : NaN;
            ua._safari = a[4] ? parseFloat(a[4]) : NaN;
            if (ua._safari) {
                a = /(?:Chrome\/(\d+\.\d+))/.exec(navigator.userAgent);
                ua._chrome = a && a[1] ? parseFloat(a[1]) : NaN;
            } else ua._chrome = NaN;
        } else ua._ie = ua._firefox = ua._opera = ua._chrome = ua._safari = NaN;
        if (c) {
            ua._osx = !! c[1];
            ua._windows = !! c[2];
            ua._linux = !! c[3];
        } else ua._osx = ua._windows = ua._linux = false;
        ua._iphone = b;
    }
};

/**
 * Arbiter object
 * see this good explanation at http://en.wikipedia.org/wiki/Arbiter_(electronics)
 */

function Arbiter() {
    copy_properties(this, {
        _listeners: [],
        _events: {},
        _callbacks: {},
        _last_id: 1,
        _listen: {},
        _index: {}
    });
    copy_properties(this, Arbiter);
}

copy_properties(Arbiter, {
    SUBSCRIBE_NEW: 'new',
    SUBSCRIBE_ALL: 'all',
    BEHAVIOR_EVENT: 'event',
    BEHAVIOR_PERSISTENT: 'persistent',
    BEHAVIOR_STATE: 'state',
    BOOTLOAD: 'bootload',
    FUNCTION_EXTENSION: 'function_ext',
    subscribe: function (k, b, i) {
        if (!k || k.length == 0) return null;
        k = $A(k);
        var a = Arbiter._getInstance(this);
        a._listeners.push({
            callback: b,
            types: k
        });
        var h = a._listeners.length - 1;
        for (var d = 0; d < k.length; d++) if (a._index[k[d]]) {
            a._index[k[d]].push(h);
        } else a._index[k[d]] = [h];
        i = i || Arbiter.SUBSCRIBE_ALL;
        if (i == Arbiter.SUBSCRIBE_ALL) {
            var c, j, g;
            for (var e = 0; e < k.length; e++) {
                j = k[e];
                if (j in a._events) for (var f = 0; f < a._events[j].length; f++) {
                    c = a._events[j][f];
                    g = b.apply(null, [j, c]);
                    if (g === false) {
                        a._events[j].splice(f, 1);
                        f--;
                    }
                }
            }
        }
        return {
            subscriberID: h
        };
    },
    unsubscribe: function (e) {
        var a = Arbiter._getInstance(this);
        var c = a._listeners[e.subscriberID];
        if (!c) return;
        for (var d = 0; d < c.types.length; d++) {
            var f = c.types[d];
            if (a._index[f]) for (var b = 0; b < a._index[f].length; b++) if (a._index[f][b] == e.subscriberID) {
                a._index[f].splice(b, 1);
                if (a._index[f].length == 0) delete a._index[f];
                break;
            }
        }
        delete a._listeners[e.subscriberID];
    },
    inform: function (j, c, b) {
        var m = hasArrayNature(j);
        var l = $A(j);
        var a = Arbiter._getInstance(this);
        var i = {};
        b = b || Arbiter.BEHAVIOR_EVENT;
        for (var e = 0; e < l.length; e++) {
            var j = l[e],
                d = null;
            if (b == Arbiter.BEHAVIOR_PERSISTENT) {
                d = a._events.length;
                if (!(j in a._events)) a._events[j] = [];
                a._events[j].push(c);
                a._events[j]._stateful = false;
            } else if (b == Arbiter.BEHAVIOR_STATE) {
                d = 0;
                a._events[j] = [c];
                a._events[j]._stateful = true;
            } else if (j in a._events) a._events[j]._stateful = false;
            var h;
            if (a._index[j]) {
                var k = $A(a._index[j]);
                for (var f = 0; f < k.length; f++) {
                    var g = a._listeners[k[f]];
                    if (g) {
                        h = g.callback.apply(null, [j, c]);
                        if (h === false) {
                            if (d !== null) a._events[j].splice(d, 1);
                            break;
                        }
                    }
                }
            }
            a._updateCallbacks(j, c);
            i[j] = h;
        }
        return m ? i : i[l[0]];
    },
    query: function (b) {
        var a = Arbiter._getInstance(this);
        if (!(b in a._events)) return null;
        if (a._events[b].length) return a._events[b][0];
        return null;
    },
    _instance: null,
    _getInstance: function (a) {
        if (a instanceof Arbiter) return a;
        if (!Arbiter._instance) Arbiter._instance = new Arbiter();
        return Arbiter._instance;
    },
    registerCallback: function (b, d) {
        var h, c = 0,
            a = Arbiter._getInstance(this),
            g = false;
        if (typeof b == 'function') {
            h = a._last_id;
            a._last_id++;
            g = true;
        } else {
            if (!a._callbacks[b]) return null;
            h = b;
        }
        if (hasArrayNature(d)) {
            var i = {};
            for (var f = 0; f < d.length; f++) i[d[f]] = 1;
            d = i;
        }
        for (var j in d) {
            try {
                if (a.query(j)) continue;
            } catch (e) {}
            c += d[j];
            if (a._listen[j] === undefined) a._listen[j] = {};
            a._listen[j][h] = (a._listen[j][h] || 0) + d[j];
        }
        
        if (c == 0 && g) {
            b();
            return null;
        }
        if (!g) {
            a._callbacks[h].depnum += c;
        } else a._callbacks[h] = {
            callback: async_callback(b, 'arbiter'),
            depnum: c
        };
        return h;
    },
    _updateCallbacks: function (d, c) {
        if (c === null || !this._listen[d]) return;
        for (var b in this._listen[d]) {
            this._listen[d][b]--;
            if (this._listen[d][b] <= 0) delete this._listen[d][b];
            this._callbacks[b].depnum--;
            if (this._callbacks[b].depnum <= 0) {
                var a = this._callbacks[b].callback;
                delete this._callbacks[b];
                a();
            }
        }
    }
});

/**
 * Bootloader object
 * This object will handler resource mapping, async js and css loading and so on.
 * This can be used standalone as seen on facebook source code, or with AsyncRequest() response.
 */
var Bootloader = window.Bootloader || {
	configurePage: function (b) {
        var h = {};
        var g = Bootloader.resolveResources(b);
        for (var c = 0; c < g.length; c++) {
            h[g[c].src] = g[c];
            Bootloader.requested(g[c].name);
            Bootloader._startCSSPoll(g[c].name);
        }
        var e = document.getElementsByTagName('link');
        for (var c = 0; c < e.length; ++c) {
            if (e[c].rel != 'stylesheet') continue;
            for (var d in h) if (e[c].href.indexOf(d) !== -1) {
                var f = h[d].name;
                Bootloader._cssLinkMap[f] = {
                    link: e[c]
                };
                if (h[d].permanent) Bootloader._permanent[f] = true;
                delete h[d];
                break;
            }
        }
    },
	loadComponents: function(d, b){
		d = $A(d);
        var g = [];
        for (var e = 0; e < d.length; ++e) {
            if (!d[e]) continue;
            var c = Bootloader._componentMap[d[e]];
            if ( !! c) for (var f = 0; f < c.length; ++f) g.push(c[f]);
        }
        return Bootloader.loadResources(g, b);
	},
	loadResources: function(h, b, g, k){
		var c;
		h = Bootloader.resolveResources($A(h));
		if(g) {
			var e = {};
			for (c = 0; c < h.length; ++c) e[h[c].name] = true;
            for (var d in Bootloader._requested) if (!(d in Bootloader._permanent) && !(d in e) && !(d in Bootloader._earlyResources)) Bootloader._unloadResource(d);
            Bootloader._earlyResources = {};
		}
		
		var l = [];
        var f = [];
        for (var c = 0; c < h.length; ++c) {
            var i = h[c];
            if (i.permanent) Bootloader._permanent[i.name] = true;
            var j = Arbiter.BOOTLOAD + '/' + i.name;
            if (Arbiter.query(i) !== null) continue;
            if (!i.nonblocking) f.push(j);
            if (!Bootloader._requested[i.name]) {
            	Bootloader.requested(i.name);
                l.push(i);
            }
        }
        
        if(b) b = Arbiter.registerCallback(b, f);
        for (var c = 0; c < l.length; ++c) Bootloader.requestResource(l[c].type, l[c].src, l[c].name);
        return b;
	},
	
	requestResource: function (k, h, f){
		var c = Bootloader.getHardpoint();
		if (k == 'js'){
			var g = document.createElement('script');
			g.src = h;
			g.type = 'text/javascript';
			g.async = true;
			var b = function(){
				Bootloader.done([f]);
			};
			g.onload = g.onerror = b;
			g.onreadystatechange = function(){
				if(this.readyState in {
					loaded: 1,
					complete: 1
				}) b();
			};
			
			c.appendChild(g);
		}else if(k == 'css'){
			if(document.createStyleSheet){
				var i = Bootloader._styleTags, j = -1;
				for (var d = 0; d < i.length; d++) if (i[d].imports.length < 25) {
                    j = d;
                    break;
                }
                if (j == -1) {
                    i.push(document.createStyleSheet());
                    j = i.length - 1;
                }
                i[j].addImport(h);
                this._cssLinkMap[f] = {
                    tagIdx: j,
                    href: h
                };
			}else{
				var e = document.createElement('link');
                e.rel = "stylesheet";
                e.type = "text/css";
                e.media = "all";
                e.href = h;
                Bootloader._cssLinkMap[f] = {
                    link: e
                };
                c.appendChild(e);
			}
			Bootloader._startCSSPoll(f);
		}
	},
	_activeCSSPolls: {},
    _expireTime: null,
    _runCSSPolls: function(){
    	var g = (+new Date());
    	if(g >= Bootloader._expireTime){
    		var d = [];
    		for (var f in Bootloader._activeCSSPolls) d.push(f);
    		Bootloader._activeCSSPolls = {};
    	} else {
    		var e = Bootloader._CSS_EXPECTED_HEIGHT;
            var b;
            var d = [];
            for (var f in Bootloader._activeCSSPolls) {
                var c = Bootloader._activeCSSPolls[f];
                var h = c.offsetHeight == e || c.currentStyle && c.currentStyle.height == e + 'px' || window.getComputedStyle && (b = document.defaultView.getComputedStyle(c, null)) && b.getPropertyValue('height') == e + 'px';
                if (h) {
                    d.push(f);
                    c.parentNode.removeChild(c);
                    delete Bootloader._activeCSSPolls[f];
                }
            }
            if (!is_empty(d)) {
            	Bootloader._expireTime = g + Bootloader._CSS_POLL_EXPIRATION;
            }
    	}
    	return is_empty(Bootloader._activeCSSPolls);
    },
	_startCSSPoll: function(d){
		var c = 'bootloader_' + d.replace(/[^a-z0-9]/ig, '_');
        var b = bagofholding;
        (function () {
            var e = document.createElement('div');
            e.id = c;
            document.body.appendChild(e);
            Bootloader._expireTime = (+new Date()) + Bootloader._CSS_POLL_EXPIRATION;
            var g = is_empty(Bootloader._activeCSSPolls);
            Bootloader._activeCSSPolls[d] = e;
            if (g) var f = setInterval(function () {
                if (Bootloader._runCSSPolls()) f && clearInterval(f);
            }, 20, false);
        }).deferUntil(function () {
            return document.body;
        }, 5000, false, b.curry("Still no DOM"));
	},
	
	done: function(f, e){
		Bootloader.requested(f);
		if(!e){
			var c = {sender: this};
			Arbiter.inform(Arbiter.BOOTLOAD, c, Arbiter.BEHAVIOR_EVENT);
		}
		for(var b = 0; b < f.length; ++b){
			var d = f[b];
			Arbiter.inform(Arbiter.BOOTLOAD + '/' + d, true, Arbiter.BEHAVIOR_STATE);
		}
	},
	
	requested: function(c){
		c = $A(c);
		for (var b = 0; b < c.length; ++b) Bootloader._requested[c[b]] = true;
	},
	
	_unloadResource: function (e) {
            if (e in Bootloader._cssLinkMap) {
                var c = Bootloader._cssLinkMap[e],
                    d = c.link;
                if (d) {
                    d.parentNode.removeChild(d);
                } else {
                    var f = Bootloader._styleTags[c.tagIdx];
                    for (var b = 0; b < f.imports.length; b++) if (f.imports[b].href == c.href) {
                        f.removeImport(b);
                        break;
                    }
                }
                delete Bootloader._cssLinkMap[e];
                delete Bootloader._requested[e];
                Arbiter.inform(Arbiter.BOOTLOAD + '/' + d, null, Arbiter.BEHAVIOR_STATE);
            }
        },
	
	enableBootload: function (b) {
        for (var c in b) if (!Bootloader._componentMap[c]) Bootloader._componentMap[c] = b[c];
    },
	
	getHardpoint: function(){
		if(!Bootloader._hardpoint){
			var c, b = document.getElementsByTagName('head');
			if(b.length){
				c = b[0];
			}else c = document.body;
			Bootloader._hardpoint = c;
		}
		return Bootloader._hardpoint;
	},
	
	setResourceMap: function (c) {
        if (!c) return;
        for (var b in c) {
            if (!c[b].name) c[b].name = b;
            Bootloader._resources[b] = c[b];
        }
    },
	
    resolveResources: function (e, b) {
        if (!e) return;
        var d = new Array(e.length);
        for (var c = 0; c < e.length; ++c) if (!e[c].type && e[c] in Bootloader._resources) {
            d[c] = Bootloader._resources[e[c]];
            if (b && (b in d[c])) d[c] = d[c][b];
        } else d[c] = e[c];
        return d;
    },
    
    loadEarlyResources: function (d) {
    	var b;
    	Bootloader.setResourceMap(d);
        var c = [];
        for (var b in d) c.push(Bootloader._resources[b]);
        Bootloader.loadResources(c);
        for (var b in d) {
            var e = Bootloader._resources[b];
            if (!e.permanent) Bootloader._earlyResources[e.name] = e;
        }
    },
    isDisplayJS: function (a) {
        return Bootloader._resources[a].displayjs;
    },
	_requested: {},
    _permanent: {},
    _componentMap: {},
    _cssLinkMap: {},
    _styleTags: [],
    _hardpoint: null,
    _resources: {},
    _earlyResources: {},
    _CSS_POLL_EXPIRATION: 5000,
    _CSS_EXPECTED_HEIGHT: 42
};

/**
 * JSCC - JavaScript command code - i guess :)
 * This will map objects or functions with an index (Facebook uses md5'ed keys) via init() method
 * and with get(index), that object can be re-usable.
 * For example, there is a Foo object with a bar() method.
 * 
 * JSCC.init("bla","function(){return new Foo()}");
 * 
 * When required you can get this object with (like onload)
 * JSCC.get("bla").bar();
 * 
 * This is works like a charm when you get JS file asyncronously and you need some JS action on fbDialog with AJAX content.
 * 
 */
JSCC = window.JSCC ||
function () {
    var a = {},
        b = {};
    return {
        get: function (c) {
            if (c in a) {
                b[c] = a[c]();
                delete a[c];
                return b[c];
            } else return b[c];
        },
        init: function (c) {
            copy_properties(a, c);
        }
    };
}();

/**
 * Form object
 * It's needed to get form element of fbDialog content and serialize it to post with AsyncRequest mainly
 * but I kept that as is.
 */
add_properties('Form', {
	
	getInputs: function (a) {
        a = a || document;
        var b = $(a);
        var i = b.find('input, select, textarea, button');
        return i;
    },
	
	getElements: function (a) {
		var c = Form.getInputs(a);
        var b = a.tagName == 'FORM' ? a.elements : c;
        return b;
    },
    
	serialize: function (b, c){
		var a = {};
		var q = Form.getElements(b);
		for(i = 0;i < q.length; ++i){
			var d = q[i];
			if (d.name && !d.disabled && d.type != 'submit') if (!d.type || ((d.type == 'radio' || d.type == 'checkbox') && d.checked) || d.type == 'text' || d.type == 'password' || d.type == 'hidden' || d.tagName == 'TEXTAREA') {
				Form._serializeHelper(a, d.name, d.value);
			} else if (d.tagName == 'SELECT') for (var e = 0, f = d.options.length; e < f; ++e) {
	            var g = d.options[e];
	            if (g.selected) Form._serializeHelper(a, d.name, g.value);
	        }
			
		}
		
		return a; //Form._serializeFix(a);
	},
	
	_serializeHelper: function (a, d, e) {
        var c = /([^\]]+)\[([^\]]*)\](.*)/.exec(d);
        if (c) {
            a[c[1]] = a[c[1]] || {};
            if (c[2] == '') {
                var b = 0;
                while (a[c[1]][b] != undefined) b++;
            } else b = c[2];
            if (c[3] == '') {
                a[c[1]][b] = e;
            } else Form._serializeHelper(a[c[1]], b.concat(c[3]), e);
        } else a[d] = e;
    },
    
    _serializeFix: function (a) {
        var e = [];
        for (var b in a) {
            if (a instanceof Object) a[b] = Form._serializeFix(a[b]);
            e.push(b);
        }
        var d = 0,
            c = true;
        e.sort().each(function (g) {
            if (g != d++) c = false;
        });
        if (c) {
            var f = {};
            e.each(function (g) {
                f[g] = a[g];
            });
            return f;
        } else return a;
    },
    
	post: function (d, b, c){
		var a = document.createElement('form');
		a.action = d.toString();
		a.method = 'POST';
		a.style.display = 'none';
		if (c) a.target = c;
		if ($('post_form_id')) b.post_form_id = $('post_form_id').val();
		b.next = htmlspecialchars(document.location.href);
		Form.createHiddenInputs(b, a);
		$("body").append(a);
		a.submit();
		return false;
	},
	
	createHiddenInputs: function (g, a, d, f){
		d = d || {};
		var c;
		var h = URI.implodeQuery(g, '', false);
		var i = h.split('&');
	    for (var b = 0; b < i.length; b++) if (i[b]) {
	        var j = i[b].split('=');
	        var e = j[0];
	        var k = j[1];
	        if (e === undefined || k === undefined) continue;
	        k = URI.decodeComponent(k);
	        if (d[e] && f) {
	            d[e].value = k;
	        } else {
	            c = $('<input/>', {
	                type: 'hidden',
	                name: e,
	                value: k
	            });
	            d[e] = c;
	            $(a).append(c);
	        }
	    }
	    return d;
	},
});

/**
 * URI object
 */
function goURI(b){
	if(window.location.href == b){
		window.location.reload();
	} else window.location.href = b;
}

function URI(a){
	if(a === window) return;
	if(this === window) return new URI(a || window.location.href);
	this.parse(a || '');
}

$.extend(URI, {
	getRequestURI: function(a, b){
		return new URI(window.location.href);
	},
	
	getMostRecentURI: function(){
		return new URI(window.location.href);
	},
	
	expression: /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/,
    arrayQueryExpression: /^(\w+)((?:\[\w*\])+)=?(.*)/,
    
    explodeQuery: function(g){
    	if(!g) return;
    	var h = {};
    	g = g.replace(/%5B/ig, '[').replace(/%5D/ig, ']');
    	g = g.split('&');
    	for (var b = 0, d = g.length; b < d; b++) {
            var e = g[b].match(URI.arrayQueryExpression);
            if (!e) {
                var j = g[b].split('=');
                h[URI.decodeComponent(j[0])] = j[1] === undefined ? null : URI.decodeComponent(j[1]);
            } else {
                var c = e[2].split(/\]\[|\[|\]/).slice(0, -1);
                var f = e[1];
                var k = URI.decodeComponent(e[3] || '');
                c[0] = f;
                var i = h;
                for (var a = 0; a < c.length - 1; a++) if (c[a]) {
                    if (i[c[a]] === undefined) if (c[a + 1] && !c[a + 1].match(/\d+$/)) {
                        i[c[a]] = {};
                    } else i[c[a]] = [];
                    i = i[c[a]];
                } else {
                    if (c[a + 1] && !c[a + 1].match(/\d+$/)) {
                        i.push({});
                    } else i.push([]);
                    i = i[i.length - 1];
                }
                if (i instanceof Array && c[c.length - 1] == '') {
                    i.push(k);
                } else i[c[c.length - 1]] = k;
            }
        }
        return h;
    },
    
    implodeQuery: function (f, e, a) {
        e = e || '';
 
        if (a === undefined) a = true;
        var g = [];
        if (f === null || f === undefined) {
            g.push(a ? URI.encodeComponent(e) : e);
        } else if (f instanceof Array) {
        	var r;
            for (var c = 0; c < f.length; ++c) try {
                if (f[c] !== undefined){
                	if (e){
                		r = e + '[' + c + ']';
                	}else{
                		r = c;
                	}
                	g.push(URI.implodeQuery(f[c], r));
                }
            } catch (b) {}
        } else if (typeof (f) == 'object') {
        	var r;
            if (URI.isNode(f)) {
                g.push('{node}');
            } else for (var d in f)
            	try {
            		if (f[d] !== undefined){
            			if(e){
            				r = e + '[' + d + ']';
            			}else{
            				r = d;
            			}
            			g.push(URI.implodeQuery(f[d], r));
            		}
            	} catch (b) {}
        } else if (a) {
            g.push(URI.encodeComponent(e) + '=' + URI.encodeComponent(f));
        } else g.push(e + '=' + f);
        return g.join('&');
    },
    encodeComponent: function (d) {
    	/*
    	 * As I implemented Facebook's own code, I got bracket issues on IE 8 and below.
    	 * This is a dirty fix but works good.
    	 */
    	d = window.encodeURIComponent(d);
    	d = d.replace('%5B','[');
    	d = d.replace('%5D',']');
    	
    	return d;
    },
    decodeComponent: function (a) {
        return window.decodeURIComponent(a.replace(/\+/g, ' '));
    },
    /*
     * This is originally part of DOM object
     */
    isNode: function (d, e) {
        if (typeof (Node) == 'undefined') Node = null;
        try {
            if (!d || !((Node != undefined && d instanceof Node) || d.nodeName)) return false;
        } catch (a) {
            return false;
        }
        if (typeof (e) !== 'undefined') {
            e = $A(e).map(function (g) {
                return (g + '').toUpperCase();
            });
            var c, f;
            try {
                c = new String(d.nodeName).toUpperCase();
                f = d.nodeType;
            } catch (a) {
                return false;
            }
            for (var b = 0; b < e.length; b++) try {
                if (c == e[b] || f == e[b]) return true;
            } catch (a) {}
            return false;
        }
        return true;
    },
    
    NODE_TYPES: {
        ELEMENT: 1,
        ATTRIBUTE: 2,
        TEXT: 3,
        CDATA_SECTION: 4,
        ENTITY_REFERENCE: 5,
        ENTITY: 6,
        PROCESSING_INSTRUCTION: 7,
        COMMENT: 8,
        DOCUMENT: 9,
        DOCUMENT_TYPE: 10,
        DOCUMENT_FRAGMENT: 11,
        NOTATION_NODE: 12
    },
});

$.extend(URI.prototype, {
	parse: function (b) {
        var a = b.toString().match(URI.expression);
        $.extend(this, {
            protocol: a[3] || '',
            domain: a[4] || '',
            port: a[6] || '',
            path: a[7] || '',
            query_s: a[9] || '',
            fragment: a[11] || ''
        });
        return this;
    },
    setProtocol: function (a) {
        this.protocol = a;
        return this;
    },
    getProtocol: function () {
        return this.protocol;
    },
    setQueryData: function (a) {
        this.query_s = URI.implodeQuery(a);
        return this;
    },
    addQueryData: function (a) {
        return this.setQueryData(copy_properties(this.getQueryData(), a));
    },
    removeQueryData: function (b) {
        if (!(b instanceof Array)) b = [b];
        var d = this.getQueryData();
        for (var a = 0, c = b.length; a < c; ++a) delete d[b[a]];
        return this.setQueryData(d);
    },
    getQueryData: function () {
        return URI.explodeQuery(this.query_s);
    },
    setFragment: function (a) {
        this.fragment = a;
        return this;
    },
    getFragment: function () {
        return this.fragment;
    },
    setDomain: function (a) {
        this.domain = a;
        return this;
    },
    getDomain: function () {
        return this.domain;
    },
    setPort: function (a) {
        this.port = a;
        return this;
    },
    getPort: function () {
        return this.port;
    },
    setPath: function (a) {
        this.path = a;
        return this;
    },
    getPath: function () {
        return this.path.replace(/^\/+/, '/');
    },
    URItoString: function () {
        var a = '';
        this.protocol && (a += this.protocol + '://');
        this.domain && (a += this.domain);
        this.port && (a += ':' + this.port);
        if (this.domain && !this.path) a += '/';
        this.path && (a += this.path);
        this.query_s && (a += '?' + this.query_s);
        this.fragment && (a += '#' + this.fragment);
        return a;
    },
    valueOf: function () {
        return this.toString();
    },
    getUnqualifiedURI: function () {
        return new URI(this).setProtocol(null).setDomain(null).setPort(null);
    },
    getQualifiedURI: function () {
        var b = new URI(this);
        if (!b.getDomain()) {
            var a = URI();
            b.setProtocol(a.getProtocol()).setDomain(a.getDomain()).setPort(a.getPort());
        }
        return b;
    },
    isSameOrigin: function (a) {
        var b = a || window.location.href;
        if (!(b instanceof URI)) b = new URI(b.toString());
        if (this.getProtocol() && this.getProtocol() != b.getProtocol()) return false;
        if (this.getDomain() && this.getDomain() != b.getDomain()) return false;
        return true;
    },
    
    go: function(a){
    	if (window.location.href == b) {
            window.location.reload();
        } else window.location.href = b;
    },
    
    setSubdomain: function (b) {
        var c = new URI(this).getQualifiedURI();
        var a = c.getDomain().split('.');
        if (a.length <= 2) {
            a.unshift(b);
        } else a[0] = b;
        return c.setDomain(a.join('.'));
    },
    getSubdomain: function () {
        if (!this.getDomain()) return '';
        var a = this.getDomain().split('.');
        if (a.length <= 2) {
            return '';
        } else return a[0];
    },
    setSecure: function (a) {
        return this.setProtocol(a ? 'https' : 'http');
    },
    isSecure: function () {
        return this.getProtocol() == 'https';
    }
});

/**
 * AsyncRequest object (slighty modified)
 */
function AsyncRequest(uri, options){
	
	var replayResponses = bind(this,function(){
		if(is_empty(this._asyncResponses)) return;
		this.setNewSerial();
		for (var ii = 0; ii < this._asyncResponses.length; ++ii) {
            var r = this._asyncResponses[ii];
            this.invokeResponseHandler(r, true);
        }
	});
	var dispatchErrorResponse = bind(this,function(asyncResponse, isTransport){
		try{
			var async_error = asyncResponse.getError();
			if(async_error === 1010) return;
			if (async_error == 1357008 || async_error == 1357007 || async_error == 1442002 || async_error == 1357001) {
                var is_confirmation = false;
                if (async_error == 1357008 || async_error == 1357007) is_confirmation = true;
                var payload = asyncResponse.getPayload();
                this._displayServerDialog(payload.__dialog, is_confirmation);
			} else if(this.initialHandler(asyncResponse) !== false){
				clearTimeout(this.timer);
				try{
					if(isTransport){
						this.transportErrorHandler(asyncResponse);
					}else this.errorHandler(asyncResponse);
				} catch(exception){
					this.finallyHandler(asyncResponse);
					throw exception;
				}
			}
		}catch(ex){}
	});
	var invokeResponseHandler = bind(this,function(interp, is_replay){
		if (typeof (interp.redirect) != 'undefined') {
            (function () {
                this.setURI(interp.redirect).send();
            }).bind(this).defer();
            return;
        }
		
		if (this.handler || this.errorHandler || this.transportErrorHandler) if (typeof (interp.asyncResponse) != 'undefined') {
			var r = interp.asyncResponse;
            r.setReplay( !! is_replay);
            if (!this.isRelevant()) {
                invokeErrorHandler(1010);
                return;
            }
            if(r.inlinejs) eval_global(r.inlinejs);
            if (r.getError() && !r.getErrorIsWarning()) {
            	var fn = dispatchErrorResponse;
            } else {
            	var fn = dispatchResponse;
                if (this._replayable && !is_replay && !r.dontReplay) {
                    this._asyncResponses = this._asyncResponses || [];
                    this._asyncResponses.push(interp);
                }
            }   
            Bootloader.setResourceMap(r.resource_map);
            if(r.bootloadable) Bootloader.enableBootload(r.bootloadable);
            fn = fn.shield(null, r);
            fn = fn.bind(fn);
            var is_transitional = false;
            if (this.preBootloadHandler) is_transitional = this.preBootloadHandler(r);
            
            r.css = r.css || [];
            r.js = r.js || [];
            Bootloader.loadResources(r.css.concat(r.js), fn, is_transitional, this.getURI());

		} else if (typeof (interp.transportError) != 'undefined') {
            invokeErrorHandler(1012);
        } else invokeErrorHandler(1007);
	});

	var interpretResponse = bind(this,function (response) {
        if (response.redirect) return {
            redirect: response.redirect
        };
        var r = new AsyncResponse(this);
        if (response.__ar != 1) {
            r.payload = response;
        } else {
            $.extend(r, response);
        }
        return {
            asyncResponse: r
        };
    });

    var handleResponse = bind(this,function (response) {
        var asyncResponse = this.interpretResponse(response);
        this.invokeResponseHandler(asyncResponse);
    });

    var invokeErrorHandler = bind(this,function(explicitError){
		var r = new AsyncResponse(this);
		var err;
		try{
			err = explicitError || this.transport.status || 1004;
		}catch(ex){
			err = 1005;
		}
		if(this._requestAborted) err = 1011;
		try{
			if(this.responseText == '') err = 1002;
		}catch(e){}
		if(this.transportErrorHandler){
			var desc, summary;
			var silent = true;
			if(false === navigator.onLine){
				summary = "No network connection";
				desc = "Your browser seems on offline mode. Please check the network connections of your computer or your browser settings and try again later.";
				err = 1006;
			}else if(err >= 300 && err <= 399){
				summary = "Redirection";
				desc = "Your request has been redirected to third party sites. Please contant to your ISP or refresh your browser.";
				redir_url = this.transport.getResponseHeader("Location");
				if(redir_url) setTimeout(document.location.href=redir_url,5000);
				silent = true;
			} else{
				summary = "Oops!";
				desc = "Oops! We have a problem. We're still working on it, please try again later.";
			}
			!this.getOption('suppressErrorAlerts');
			$.extend(r, {
				error: err,
				errorSummary: summary,
				errorDescription: desc,
				silentError: silent
			});
			
			dispatchErrorResponse(r, true);
		}
	});


	var _interpretTransportResponse = bind(this,function(){
		if(this.getOption('suppressEvaluation')){
			var r = new AsyncResponse(this, this.transport);
			return {
				asyncResponse: r
			};
		}
		var shield = "for(;;);";
		var shieldlen = shield.length;
		var text = this.transport.responseText;
		if(text.length <= shieldlen){
			return {
				transportError: 'async response is too short ' + this.getURI()
			};
		}
	
		var offset = 0;
		while(text.charAt(offset) == " " || text.charAt(offset) == "\n") offset++;
		offset && text.substring(offset, offset + shieldlen) == shield;
        var safeResponse = text.substring(offset + shieldlen);
        try {
            var response = eval('(' + safeResponse + ')');
        } catch (exception) {
            return {
                transportError: 'async eval() failure ' + this.getURI()
            };
        }
        return this.interpretResponse(response);
	});
	
	
	
	var dispatchResponse = bind(this,function(asyncResponse){
		try{
			if(this._isPrefetch){
				this._isPrefetch = false;
				return;
			}
			
			if(!this.isRelevant()){
				invokeErrorHandler(1010);
				return;
			}
			
			if(this.initialHandler(asyncResponse) !== false){
				clearTimeout(this.timer);
				asyncResponse.jscc && invoke_callbacks([asyncResponse.jscc]);
				if(this.handler) try{
					var suppress_onload = this.handler(asyncResponse);
				} catch(exception){
					asyncResponse.is_last && this.finallyHandler(asyncResponse);
					throw exception;
				}
				
				asyncResponse.is_last && this.finallyHandler(asyncResponse);
				if (suppress_onload !== AsyncRequest.suppressOnloadToken) {
					var onload = asyncResponse.onload;
					if (onload) for (var ii = 0; ii < onload.length; ii++) try {
	                    (new Function(onload[ii])).apply(this);
	                } catch (exception) {}
	                var onafterload = asyncResponse.onafterload;
	                if (onafterload) for (var ii = 0; ii < onafterload.length; ii++) try {
	                	(new Function(onafterload[ii])).apply(this);
	                } catch (exception) {}
				}
			}
			
		}catch(exception) {}
	});

	var onStateChange = bind(this,function(){
		try{
			if(this.transport.readyState == 4){
				
				if(this.transport.status >= 200 && this.transport.status < 300){
					invokeResponseHandler(_interpretTransportResponse());
				} else if(this.transport.status in {
					0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1
				} && this.remainingRetries > 0){
					--this.remainingRetries;
					delete this.transport;
					this.send(true);
					return;
				} else invokeErrorHandler();
				if(this.getOption('asynchronous') !== false) delete this.transport
			}
		}catch(exception){
			delete this.transport;
			if(this.remainingRetries > 0){
				--this.remainingRetries;
				this.send(true);
			}else{
				invokeErrorHandler(1007);
			}
		}
	});
	$.extend(this, {
		onstatechange: onStateChange,
        replayResponses: replayResponses,
        invokeResponseHandler: invokeResponseHandler,
        interpretResponse: interpretResponse,
        handleResponse: handleResponse,
        transport: null,
        method: 'POST',
        uri: '',
        timeout: null,
        timer: null,
        initialHandler: bagofholding,
        handler: null,
        errorHandler: null,
        transportErrorHandler: null,
        timeoutHandler: null,
        finallyHandler: bagofholding,
        serverDialogCancelHandler: bagofholding,
        relativeTo: null,
        statusElement: null,
        statusClass: '',
        data: {},
        context: {},
        readOnly: false,
        remainingRetries: 0,
        option: $.extend({
            asynchronous: true,
            suppressCacheInvalidation: false,
            suppressErrorHandlerWarning: false,
            suppressEvaluation: false,
            suppressErrorAlerts: false,
            retries: 0,
            jsonp: false,
            bundle: false,
            useIframeTransport: false,
            handleErrorAfterUnload: false
        },options),
        _replayable: undefined,
        _replayKey: '',
        _isPrefetch: false
	});
	
	this.errorHandler = AsyncResponse.defaultErrorHandler;
    this.transportErrorHandler = this.errorHandler;
    if (uri != undefined) this.setURI(uri);
    return this;
}

$.extend(AsyncRequest,{
	bootstrap: function(c, b, d){
		var e = 'GET';
		var f = true;
		var a = {};
		if(d || (b && b.rel == 'async-post')){
			e = 'POST';
			f = false;
			if(c){
				c = URI(c);
				a = c.getQueryData();
				c.setQueryData({});
			}
		}
		
		new AsyncRequest(c).setReadOnly(f).setMethod(e).setData(a).setNectarModuleDataSafe(b).setRelativeTo(b).send();
		return false; 
	},
	
	post: function (b, a) {
        new AsyncRequest(b).setReadOnly(false).setMethod('POST').setData(a).send();
        return false;
    },
    clearCache: function () {
        AsyncRequest._reqsCache = {};
    },
    getLastId: function () {
        return AsyncRequest._last_id;
    },
	
	_hasBundledRequest: function(){
		return AsyncRequest._allBundledRequests.length > 0;
	},
	
	stashBundledRequest: function(){
		var a = AsyncRequest._allBundledRequests;
		AsyncRequest._allBundledRequests = [];
		return a;
	},
	
	setBundledRequestProperties: function(b){
		var c = null;
		if (b.stashedRequests) AsyncRequest._allBundledRequests = AsyncRequest._allBundledRequests.concat(b.stashedRequests);
        if (!AsyncRequest._hasBundledRequest()) {
            var a = b.callback;
            a && a();
        } else {
            $.extend(AsyncRequest._bundledRequestProperties, b);
            if (b.start_immediately) c = AsyncRequest._sendBundledRequests();
        }
        return c;
	},
	
	_bundleRequest: function(b){
		if (b.getOption('jsonp') || b.getOption('useIframeTransport')) {
            b.setOption('bundle', false);
            return false;
        } else if (!b.getOption('asynchronous')) {
            b.setOption('bundle', false);
            return false;
        }
        var a = b.uri.getPath();
        if (!AsyncRequest._bundleTimer) AsyncRequest._bundleTimer = setTimeout(function () {
            AsyncRequest._sendBundledRequests();
        }, 0);
        AsyncRequest._allBundledRequests.push([a, b]);
        return true;
	},
	
	_sendBundledRequests: function () {
        clearTimeout(AsyncRequest._bundleTimer);
        AsyncRequest._bundleTimer = null;
        var a = AsyncRequest._allBundledRequests;
        AsyncRequest._allBundledRequests = [];
        var e = {};
        $.extend(e, AsyncRequest._bundledRequestProperties);
        AsyncRequest._bundledRequestProperties = {};
        if (is_empty(e) && a.length == 1) {
            var g = a[0][1];
            g.setOption('bundle', false).send();
            return g;
        }
        var d = function () {
                e.callback && e.callback();
            };
        if (a.length === 0) {
            d();
            return null;
        }
        var b = [];
        for (var c = 0; c < a.length; c++) b.push([a[c][0], URI.implodeQuery(a[c][1].data)]);
        var f = {
            data: b
        };
        if (e.extra_data) $.extend(f, e.extra_data);
        var g = new AsyncRequest();
        g.setURI('/ajax/proxy').setData(f).setMethod('POST').setInitialHandler(e.onInitialResponse || bagof(true)).setAllowCrossPageTransition(true).setHandler(function (l) {
            var k = l.getPayload();
            var n = k.responses;
            if (n.length != a.length) {
                return;
            } else for (var i = 0; i < a.length; i++) {
                var j = a[i][0];
                var m = a[i][1];
                m.id = this.id;
                if (n[i][0] != j) {
                    m.invokeResponseHandler({
                        transportError: 'order failure on bundle request ' + j
                    });
                    continue;
                }
                var h = m.interpretResponse(n[i][1]);
                m.invokeResponseHandler(h);
            }
        }).setTransportErrorHandler(function (m) {
            var k = [];
            var i = {
                transportError: m.errorDescription
            };
            for (var h = 0; h < a.length; h++) {
                var j = a[h][0];
                var l = a[h][1];
                k.push(j);
                l.id = this.id;
                l.invokeResponseHandler(i);
            }
        }).setFinallyHandler(function (h) {
            d();
        }).send();
        return g;
    },
    
    _JSONPReceivers: {},
    _allBundledRequests: [],
    _bundledRequestProperties: {},
    _bundleTimer: null,
    suppressOnloadToken: {},
    _last_id: 2,
    _id_threshold: 2,
    _reqsCache: {},
    _inflight: [],
    _inflightAdd: bagofholding,
    _inflightPurge: bagofholding,
    _inflightEnable: function () {
        if (ua.ie()) {
            $.extend(AsyncRequest, {
                _inflightAdd: function (a) {
                    this._inflight.push(a);
                },
                _inflightPurge: function () {
                    AsyncRequest._inflight = AsyncRequest._inflight.filter(function (a) {
                        return a.transport && a.transport.readyState < 4;
                    });
                }
            });
            onunloadRegister(function () {
                AsyncRequest._inflight.each(function (a) {
                    if (a.transport && a.transport.readyState < 4) {
                        a.transport.abort();
                        delete a.transport;
                    }
                });
            });
        }
    }
});

$.extend(AsyncRequest.prototype,{
	setMethod: function(a){
		this.method = a.toString().toUpperCase();
		return this;
	},
	
	getMethod: function(){
		return this.method;
	},
	
	setURI: function (a) {
        var b = URI(a);
        this.uri = b;
        return this;
    },
    getURI: function () {
        return this.uri.toString();
    },
	
	setData: function(a){
		this.data = a;
		return this;
	},
	
	getData: function () {
        return this.data;
    },
    
    setContextData: function (b, c, a) {
        a = a === undefined ? true : a;
        if (a) this.context['_log_' + b] = c;
        return this;
    },
    
    setInitialHandler: function (a) {
        this.initialHandler = a;
        return this;
    },
    setHandler: function (a) {
        if (!(typeof (a) != 'function')) this.handler = a;
        return this;
    },
    getHandler: function () {
        return this.handler;
    },
    setErrorHandler: function (a) {
        if (!(typeof (a) != 'function')) this.errorHandler = a;
        return this;
    },
    setTransportErrorHandler: function (a) {
        this.transportErrorHandler = a;
        return this;
    },
    getErrorHandler: function () {
        return this.errorHandler;
    },
    getTransportErrorHandler: function () {
        return this.transportErrorHandler;
    },
    setTimeoutHandler: function (b, a) {
        if (!(typeof (a) != 'function')) {
            this.timeout = b;
            this.timeoutHandler = a;
        }
        return this;
    },
    
    resetTimeout: function (a) {
        if (!(this.timeoutHandler === null)) if (a === null) {
            this.timeout = null;
            clearTimeout(this.timer);
            this.timer = null;
        } else {
            this.timeout = a;
            clearTimeout(this.timer);
            this.timer = this._handleTimeout.bind(this).defer(this.timeout);
        }
        return this;
    },
    _handleTimeout: function () {
        this.abandon();
        this.timeoutHandler(this);
    },
    setNewSerial: function () {
        this.id = ++AsyncRequest._last_id;
        return this;
    },
    setFinallyHandler: function (a) {
        this.finallyHandler = a;
        return this;
    },
    setServerDialogCancelHandler: function (a) {
        this.serverDialogCancelHandler = a;
        return this;
    },
    setPreBootloadHandler: function (a) {
        this.preBootloadHandler = a;
        return this;
    },
    setReadOnly: function (a) {
        if (!(typeof (a) != 'boolean')) this.readOnly = a;
        return this;
    },
    getReadOnly: function () {
        return this.readOnly;
    },
    setRelativeTo: function (a) {
        this.relativeTo = a;
        return this;
    },
    getRelativeTo: function () {
        return this.relativeTo;
    },
    setStatusClass: function (a) {
        this.statusClass = a;
        return this;
    },
    setStatusElement: function (a) {
        this.statusElement = a;
        return this;
    },
    getStatusElement: function () {
        return $(this.statusElement);
    },
    
    isRelevant: function(){
    	return true;
    },
    
    addStatusIndicator: function(){
    	var a = this.getStatusElement();
    	if(a){
    		$(a).addClass('async_saving').addClass(this.statusClass);
    	}
    },
    
    clearStatusIndicator: function(){
    	var a = this.getStatusElement();
    	if(a){
    		$(a).removeClass('async_saving').removeClass(this.statusClass);
    	}
    },
    
    setReplayable: function (b, a) {
        this._replayable = b;
        this._replayKey = a || '';
        return this;
    },
    setOption: function (a, b) {
        if (typeof (this.option[a]) != 'undefined') this.option[a] = b;
        return this;
    },
    getOption: function (a) {
        typeof (this.option[a]) == 'undefined';
        return this.option[a];
    },
    abort: function () {
        if (this.transport) {
            var a = this.getTransportErrorHandler();
            this.setOption('suppressErrorAlerts', true);
            this.setTransportErrorHandler(bagofholding);
            this._requestAborted = 1;
            this.transport.abort();
            this.setTransportErrorHandler(a);
        }
    },
    abandon: function () {
        clearTimeout(this.timer);
        this.setOption('suppressErrorAlerts', true).setHandler(bagofholding).setErrorHandler(bagofholding).setTransportErrorHandler(bagofholding);
        if (this.transport) {
            this._requestAborted = 1;
            this.transport.abort();
        }
    },
    setNectarActionData: function (a) {
        if (this.data.nctr === undefined) this.data.nctr = {};
        this.data.nctr._ia = 1;
        if (a) {
            if (this.data.nctr._as === undefined) this.data.nctr._as = {};
            $.extend(this.data.nctr._as, a);
        }
        return this;
    },
    setNectarData: function (a) {
        if (a) {
            if (this.data.nctr === undefined) this.data.nctr = {};
            $.extend(this.data.nctr, a);
        }
        return this;
    },
    setNectarModuleDataSafe: function (a) {
        if (this.setNectarModuleData) this.setNectarModuleData(a);
        return this;
    },
    setNectarImpressionIdSafe: function () {
        if (this.setNectarImpressionId) this.setNectarImpressionId();
        return this;
    },
    setPrefetch: function (a) {
        this._isPrefetch = a;
        this.setAllowCrossPageTransition(true);
        return this;
    },
    setAllowCrossPageTransition: function (a) {
        this._allowCrossPageTransition = !! a;
        return this;
    },
	send: function(c){
		
		c = c || false;
		if(!this.uri) return false;
		if (this.getOption('jsonp') && this.method != 'GET') this.setMethod('GET');
        if (this.getOption('useIframeTransport') && this.method != 'GET') this.setMethod('GET'); 
        this.timeoutHandler !== null && (this.getOption('jsonp') || this.getOption('useIframeTransport'));
        
        this._replayable = (!this.getReadOnly() && this._replayable !== false) || this._replayable;
        if (!this.getReadOnly() && this.method == 'POST' && this.data.post_form_id_source === undefined) this.data.post_form_id_source = 'AsyncRequest';
        if (this.getOption('bundle') && AsyncRequest._bundleRequest(this)) return true;
        
        this.finallyHandler = async_callback(this.finallyHandler, 'final');
        
        var h, d, v;
        if (this.method == 'GET') {
        	v = this.data;
            h = this.uri.addQueryData(v).URItoString();
            d = '';
        } else {
        	v = this.data;
            h = this.uri.URItoString();
            d = URI.implodeQuery(v);
        }
        
		var g = null;
		try{
			g = new XMLHttpRequest();
		} catch(b) {}
		if(!g) try{
			g = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(b) {}
		if(!g) try{
			g = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(b) {}
		if(!g) return false;
		g.onreadystatechange = this.onstatechange;
		
		this.transport = g;
		try{
			this.transport.open(this.method, h, this.getOption('asynchronous'));
		}catch (a) {
			return false;
		}
		this.transport.setRequestHeader('X-Requested-With','XMLHttpRequest');
		if (this.method == 'POST') this.transport.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.addStatusIndicator();
		this.transport.send(d);
		if(this.timeout != null) this.resetTimeout(this.timeout);
		AsyncRequest._inflightAdd(this);
		return true;
	},
	
	_displayServerDialog: function (c, b) {
        var a = new Dialog(c);
        if (b) a.setHandler(this._displayConfirmationHandler.bind(this, a));
        a.setCancelHandler(function () {
            this.serverDialogCancelHandler.apply(this, arguments);
            this.finallyHandler.apply(this, arguments);
        }.bind(this)).setCloseHandler(this.finallyHandler.bind(this)).show();
    },
    _displayConfirmationHandler: function (a) {
        this.data.confirmed = 1;
        $.extend(this.data, a.getFormData());
        this.send();
    }
});

/**
 * AsyncResponse object
 * Internally used by AsyncRequest to get response of its request and handle that.
 */
function AsyncResponse(b, a){
	$.extend(this,{
		error: 0,
		errorSummary: null,
		errorDescription: null,
		onload: null,
		replay: false,
		payload: a || null,
		request: b || null,
		silentError: false,
		is_last: true
	});
	
	return this;
}

$.extend(AsyncResponse, {
	defaultErrorHandler: function(b){
		try{
			if(!b.silentError){
				AsyncResponse.verboseErrorHandler(b);
			} else b.logErrorByGroup('silent', 10);
		}catch(a){
			alert(b);
		}
	},
	
	verboseErrorHandler: function(b){
		try{
			var summary = b.getErrorSummary();
			var desc = b.getErrorDescription();
			b.logErrorByGroup('popup',10);
			if(b.silentError && desc == '') desc = "Oops! We have a problem. Please try again later.";
			
		}catch(a){
			alert(b);
		}
	}
});

$.extend(AsyncResponse.prototype, {
	getRequest: function(){
		return this.request;
	},
	
	getPayload: function(){
		return this.payload;
	},
	
	getError: function(){
		return this.error;
	},
	
	getErrorSummary: function(){
		return this.errorSummary;
	},
	
	setErrorSummary: function(b){
		b = (b === undefined ? null: b);
		this.errorSummary = b;
		return this;
	},
	
	getErrorDescription: function(){
		return this.errorDescription;
	},
	
	getErrorIsWarning: function(){
		return this.errorIsWarning;
	},
	
	setReplay: function(a){
		a = (a === undefined ? true: a);
		this.replay = !! a;
		return this;
	},
	
	isReplay: function() {
		return this.replay;
	},
	
	logError: function(a, c){
		
	},
	
	logErrorByGroup: function(b, a){
		if(Math.floor(Math.random() * a) === 0)
			if (this.error == 1357010 || this.error < 15000) {
	            this.logError('async_error_oops_' + b);
	        } else this.logError('async_error_logic_' + b);
	}
});

/**
 * fbDialog object
 */
function fbDialog(options){
	this._show_loading = true;
	this._loading_was_shown = false;
	this.loadingText = "Loading...";
	this.autoFocus = true;
	this.fadeEnabled = true;
	this.onloadHandlers = [];
	this._top = 150;
	this.uniqueID = 'dialog_' + fbDialog.globalCount++;
	this._content = null;
	this._obj = null;
	this._popup = null;
	this._overlay = null;
	this._loading_content = null;
	this._shim = null;
	
	if(options) this._setFromModel(options);
}

$.extend(fbDialog, {
	_default_buttons: {
		OK: {name: 'ok', label: 'OK'},
		CANCEL: {name: 'cancel', label: 'Cancel', className: 'inputaux'},
		CLOSE: {name: 'close', label: 'Close'},
		SAVE: {name: 'save', label: 'Save'},
		SUBMIT: {name: 'submit', label: 'Submit'},
		CONFIRM: {name: 'confirm', label: 'Confirm'},
		DELETE: {name: 'delete', label: 'Delete'},
		NEXT: {name: 'next', label: 'Next'}
	},
	globalCount: 0,
	_bottoms: [0],
	bottomMax: 0,
	updateBottomMax: function(){
		fbDialog.bottomMax = Math.max.apply(Math, fbDialog._bottoms);
	}
});

$.extend(fbDialog, {
	OK_AND_CANCEL: [fbDialog._default_buttons.OK, fbDialog._default_buttons.CANCEL],
	STANDARD_BUTTONS: [fbDialog._default_buttons.OK, fbDialog._default_buttons.CANCEL, fbDialog._default_buttons.CLOSE, fbDialog._default_buttons.SUBMIT, fbDialog._default_buttons.SAVE, fbDialog._default_buttons.CONFIRM, fbDialog._default_buttons.DELETE, fbDialog._default_buttons.NEXT],
	useCSSBorders: CSS.supportsBorderRadius() || ua.ie <= 6,
	sizeWidth: {
		WIDE: 555,
		STANDARD: 455
	},
	haloWidth: 10,
	borderWidth: 1,
	paddingWidth: 10,
	modality: {
		DARK: 'dark',
		WHITE: 'white',
	},
	dialogStack: null,
	
	_basicMutator: function(a){
		return function(b){
			this[a] = b;
			this._updateDirty();
			return this;
		};
	},
	
	newButton: function(name, label, className, handler){
		var a = {
			name: name,
			label: label,
		};
		if(className) a.className = className;
		if(handler) a.handler = handler;
		return a;
	},
	
	getCurrent: function(){
		var a = fbDialog.dialogStack;
		if(!a || !a.length) return null;
		return a[a.length - 1];
	},
	
	bootstrap: function(i, a, f, d, e, c){
		a = a || {};
		$.extend(a, new URI(i).getQueryData());
		d = d || (f ? 'GET' : 'POST');
		var g;
		g = new AsyncRequest().setReadOnly(!!f).setMethod(d).setRelativeTo(c);
		var b = new fbDialog(e).setAsync(g.setURI(i).setData(a), false);
		b.show();
		return false;
	},
	
	_findButton: function(l, n){
		if(l)
			for(var b = 0; b < l.length; ++b)
				if(l[b].name == n) return l[b];
		return null;
	},
	
	_tearDown: function(){
		fbDialog._hideAll();
		fbDialog.dialogStack = null;
	},
	
	_hideAll: function(){
		if(fbDialog.dialogStack !== null && fbDialog.dialogStack.length){
			var b = fbDialog.dialogStack.clone();
			fbDialog.dialogStack = null;
			for(var c = b.length - 1; c = 0; c--) b[c].hide();
		}
	},
	
	_escape: function(){
		var d = fbDialog.getCurrent();
		if(!d) return true;
		var e = d._semi_modal;
		var b = d._buttons;
		if(!b && !e) return true;
		if(e && !b){
			d.hide();
			return false;
		}
		
		var a;
		var c = fbDialog._findButton(b, 'cancel');
		if(c._cancelHandler){
			d.cancel();
			return false;
		}else if(c){
			a = c;
		}else if(b.length == 1){
			a = b[0];
		}else return true;
		
		d._handleButton(a);
		return false;
	},
	
	call_or_eval: function(obj, func, args){
		if(!func) return undefined;
		args = args || {};
		if(typeof func == 'string'){
			var params = keys(args).join(', ');
			func = eval('({f: function(' + params + '){' + func + '}})').f;
		}
		
		return func.apply(obj, values(args));
	}
});


copy_properties(Dialog.prototype, {
	show: function(a){
		if(a){
			if(this._overlay) $(this._overlay).css('display','');
			if(this.fadeEnabled) $(this._obj).css('opacity', 1);
			$(this._obj).css('display','');
		}else this._updateDirty();
		this._showing = true;
		return this;
	},
	
	showLoading: function(){
		var b = $("<div/>").addClass('dialog_loading').html(this.loadingText);
		this._renderDialog(b);
		this._loading_was_shown = true;
		return this;
	},
	
	cancel: function(){
		if(this._cancelHandler || this._cancelHandler !== false) this.hide();
	},
	
	getRoot: function(){
		return $("div.dialog_body:first");
	},
	
	getButtonElement: function(name){
		if(typeof name == 'string') name = fbDialog._findButton(this._buttons, name);
		if(!a || !name.name) return null;
		var b = $(this._popup).find('input');
		var c = function(d){
			return d.name == name.name;
		};
		
		return b.filter(c)[0] || null;
	},
	
	getContentNode: function(){
		return $(this._content).find('div.dialog_content');
	},
	
	getFormData: function(){
		return Form.serialize(this.getContentNode());
	},
	
	setShowing: function(){
		this.show();
		return this;
	},
	
	setHiding: function(){
		this.hide();
		return this;
	},
	
	setTitle: fbDialog._basicMutator('_title'),
    setBody: fbDialog._basicMutator('_body'),
    setSummary: fbDialog._basicMutator('_summary'),
    setExtraData: fbDialog._basicMutator('_extra_data'),
    setReturnData: fbDialog._basicMutator('_return_data'),
    setShowLoading: fbDialog._basicMutator('_show_loading'),
    setImmediateRendering: function(a){
    	this._immediate_rendering = a;
    	return this;
    },
    
    setAutoHide: function(a){
    	if(a){
    		if(this._showing){
    			this.timeoutAutoHide = setTimeout(this.hide.shield(this), a);
    		}else this._autohide = a;
    	}else{
    		this._autohide = null;
    		if(this.timeoutAutoHide){
    			clearTimeout(this.timeoutAutoHide);
    			this.timeoutAutoHide = null;
    		}
    	}
    	
    	return this;
    },
    
    setButtons: function(a){
    	var c;
    	if(!(a instanceof Array)){
    		c = $A(arguments);
    	}else c = a;
    	
    	for(var d = 0; d < c.length; ++d){
    		if(typeof c[d] == 'string'){
    			var b = fbDialog._findButton(fbDialog.STANDARD_BUTTONS, c[d]);
    			c[d] = b;
    		}
    	this._buttons = c;
    	this._updateButtons();
    	return this;
    },
    
    setButtonsMessage: fbDialog._basicMutator('_buttons_message');
    
    setClickButtonOnEnter: function (b, a) {
        this._clickButtonOnEnter = a;
        this._clickButtonOnEnterInputName = b;
        return this;
    },
    setStackable: function (b, a) {
        this._is_stackable = b;
        this._shown_while_stacked = b && a;
        return this;
    },
    setHandler: function (a) {
        this._handler = a;
        return this;
    },
    setCancelHandler: function (a) {
        this._cancelHandler = Dialog.call_or_eval.bind(null, this, a);
        return this;
    },
    setCloseHandler: function (a) {
        this._closeHandler = Dialog.call_or_eval.bind(null, this, a);
        return this;
    },
    
    clearHandler: function(){
    	return this.setHandler(null);
    },
    
    setPostURI: function(b, a){
    	if(a === undefined) a = true;
    	if(a){
    		this.setHandler(this._submitForm.bind(this, 'POST', b));
    	}else this.setHandler(function(){
    		Form.post(b, this.getFormData());
    		this.hide();
    	}.bind(this));
    	return this;
    },
    
    setGetURI: function(a){
    	this.setHandler(this._submitForm.bind(this, 'GET', a));
    	return this;
    },
    
    setModal: function(a, b){
    	if(a === undefined) a = true;
    	if(a && b)
    		switch(b){
    			case fbDialog.modality.DARK:
    				this._modal_class = 'dark';
    				break;
    			case fbDialog.modality.WHITE:
    				this._modal_class = 'white';
    				break;
    			
    		}
    	this._modal = a;
    	return this;
    },
    
    setSemiModal: function(a){
    	if(a === undefined) a = true;
    	if(a) this.setModal(true, fbDialog.modality.DARK);
    	this._semi_modal = a;
    	return this;
    },
    
    setWidefbDialog: fbDialog._basicMutator('_wide_fbDialog'),
    setContentWidth: fbDialog._basicMutator('_content_width'),
    setSecure: fbDialog._basicMutator('_secure'),
    setClassName: fbDialog._basicMutator('_class_name'),
    setFadeEnabled: fbDialog._basicMutator('_fade_enabled'),
    setFooter: fbDialog._basicMutator('_footer'),
    setAutoFocus: fbDialog._basicMutator('_auto_focus'),
    setTop: fbDialog._basicMutator('_top'),
    
    setAsyncURL: function(a){
    	return this.setAsync(new AsyncRequest(a));
    },
    
    setAsync: function(a,f){
    	var c = function(j){
    		this._async_request = null;
    		var i = j.getPayload();
    		
    		var g = i;
    		var h = function(){
    			if(typeof g == 'string'){
    				this.setBody(g);
    			}else this._setFromModel(g);
    			
    			this._update(true);
    		}.bind(this);
    		
    		if(f){
    			g = i.dialog;
    			Bootloader.setResourceMap(l.resource_map);
    			Bootloader.loadResources(l.css, k);
    		}else h();
    	}.bind(this);
    	
    	var b = a.getData();
    	b.__d = 1;
    	a.setData(b);
    	var d = bind(this, 'hide');
    	var e;
    	if(f){
    		a.setFirstResponseHandler(c);
    		e = a.getAsyncRequest();
    	}else{
    		a.setHandler(chain(a.getHandler, c));
    		e = a;
    	}
    	e.setErrorHandler(chain(d, getErrorHandler)).setTransportErrorHandler(chain(d, e.getTransportErrorHandler()));
    	a.send();
    	this._async_request = e;
    	this._updateDirty();
    	return this;
    },
    
    onloadRegister: function(a){
    	$A(a).forEach(function(b){
    		if(typeof b == 'string') b = new Function(b);
    		this.onloadHandlers.push(b.bind(this));
    	}.bind(this));
    	return this;
    },
    
    _updateDirty: function(){
    	if(!this._is_dirty){
    		this._is_dirty = true;
    		if(this._immediate_rendering){
    			this._update();
    		}else bind(this, 'update', false).defer();
    	}
    },
    
    _update: function(d){
    	if(!this._is_dirty && d !== true) return;
    	this._is_dirty = false;
    	if(!this._showing) return;
    	if(this._autohide && !this._async_request && !this.timeoutAutoHide) this.timeoutAutoHide = setTimeout(bind(this, 'hide'), this._autohide);
    	if(!this._async_request || !this._show_loading){
    		if(this._loading_was_shown == true){
    			this._hide(true);
    			this._loading_was_shown = false;
    		}
    		
    		var b = [];
    		if(summary)
    			b.push($("<div/>").addClass('fbdialog_summary').append(this._summary));
    		
    		b.push($("<div/>").addClass('fbdialog_body').append(this._body));
    		
    		var a = this._getButtonContent();
    		if(a.length){
    			var n = $("<div/>").addClass('fbdialog_buttons clearfix');
    			for(var l = 0; l < a.length; l++){
    				n.append(a[l]);
    			}
    		}
    		
    		b.push(n);
    		
    		if(this._footer)
    			b.push($("<div/>").addClass('fbdialog_footer').append(this._footer));
    		
    		var z = $("<div/>").addClass('fbdialog_content');
    		b.each(function(f){
    			$(z).append(f);
    		});
    		
    		b = z;
    		
    		if(this._title){
    			var g = $("<span/>").append(this._title);
    			var h = $("<h2/>", {
    					id: 'fbtitle_' + this.uniqueID
    				}).addClass('fbdialog_title').append(g);
    			b = [h, b];
    		}else b = [b];
    		
    		this._renderDialog(b);
    		
    		if(!a.length) $(this.getRoot()).addClass("noFooter");
    		
    		for(var f = 0; f < this.onloadHandlers.length; f++)
    			try{
    				this.onloadHandlers[f]();
    			}catch(e){}
    		
    		this.onloadHandlers = [];
    	}else this._showLoading();
    	
    	var c = 2 * fbDialog.borderWidth;
    	if(fbDialog.useCSSBorders) c += 2 * fbDialog.haloWidth;
    	
    	if(this._content_width) {
    		c += this._content_width;
    		c += 2 * fbDialog.paddingWidth;
    	}else if(this._wide_dialog) {
    		c += fbDialog.sizeWidth.WIDE;
    	}else c += fbDialog.sizeWidth.STANDARD;
    	
    	$(this._popup).css("width", c + "px");
    },
    
    _updateButtons: function(){
    	if(!this._showing) return;
    	var b = this._getButtonContent();
    	var c = null;
    	
    	if(!this.getRoot()) this._buildDialog();
    	if(!b.length) $(this._obj).addClass("noFooter");
    	
    	if(b.length){
    		c = $("<div/>").addClass("fbdialog_buttons clearfix");
    		b.each(function(g){
    			$(c).append(g);
    		});
    	}
    	
    	var d = $(this._content).find($("div.fbdialog_buttons:first")) || null;
    	
    	if(!d){
    		if(!c) return;
    		var a = this.getBody();
    		if(a) $(c).insertAfter($(a));
    	}else if(c){
    		$(d).replaceWith($(c));
    	}else $(d).remove();
    },
    
    _getButtonContent: function(){
    	var b = [];
    	if((this._buttons && this._buttons.length > 0) || this._buttons_message) {
    		if(this._buttons_message) b.push($("<div/>").addClass('fbdialog_buttons_msg').append(this._buttons_message));
    		
    		if(this._buttons)
    			for(var e = 0; e < this._buttons.length; e++){
	    			var a = this._buttons[e];
	    			var $$ = this;
	    			var c = $("<input/>",{
	    				type: 'button',
	    				name: a.name || '',
	    				value: a.label
	    			}).bind('click',function(){
	    				
	    				$$._handleButton($(this).attr("name") || null);
	    			});
	    			
	    			var d = $("<label/>").addClass('uiButton uiButtonLarge uiButtonConfirm').append(c);
	    			if(a.className){
	    				d.addClass(a.className);
	    				if(d.hasClass('inputaux')){
	    					d.removeClass('inputaux').removeClass('uiButtonConfirm');
	    				}
	    			}
	    			b.push(d);
	    		}
    	}
    	
    	return b;
    },
    
    _submitForm: function (d, e, b) {
        var c = this.getFormData();
        if (b) c[b.name] = b.label;
        if (this._extra_data) $.extend(c, this._extra_data);
        var a = new AsyncRequest().setURI(e).setData(c).setMethod(d).setReadOnly(d == 'GET');
        this.setAsync(a);
        return false;
    },
    
    _renderDialog: function(b){
    	onleaveRegister(Dialog._tearDown);
    	if(!this._obj) 
    		this._buildDialog();
    	
    	if(!this.content) 
    		this._buildDialogContent);
		
		if(this._class_name)
			$(this._obj).addClass(this._class_name);
		
		$(this._content).empty();
		if(typeof b == "string"){
			$(this._content).html(b);
		}else if(b instanceof Array){
			var z = this;
			b.each(function(g){
				$(z._content).append(g);
			});
			
			this._content = z._content;
		}else {
			$(this._content).append(b);
		}
		
		this._showDialog();
		
		if(this._auto_focus) 
			setTimeout($(this._content).find("input:not(input[type=hidden):first")).focus(), 300);
		
		var os = $(this._content).offset();
		var a = $(this._content).height() + os.top;
		fbDialog._bottoms.push(a);
		this._bottom = a;
		fbDialog.updateBottomMax();
		
		return this;
    },
    
    _buildDialog: function(){
    	this._obj = $("<div/>", {tabIndex: 0}).addClass('fb_generic_dialog');
    	
    	$(this.obj).css("display","none");
    	$("body").append(this._obj);
    	
    	if(!this._popup) this._popup = $("<div/>").addClass("fb_generic_dialog_popup").css("left","").css("top","");
    	
    	$(this._obj).append(this._popup);
    	if(ua.ie() < 7 && !this._shim){
    		this._shim = new IframeShim(this._popup);
    	}
    	
    	this._buildDialogContent();
    },
    
    _buildDialogContent: function(){
    	$(this._obj).addClass("fbpop_dialog");
    	var a;
    	if(Dialog.useCSSBorders) {
    	    a = '<div class="fbpop_container_advanced">' + '<div class="fbpop_content" id="fbpop_content"></div>' + '</div>';
        } else a = '<div class="fbpop_container">' + '<div class="fbpop_verticalslab"></div>' + '<div class="fbpop_horizontalslab"></div>' + '<div class="fbpop_topleft"></div>' + '<div class="fbpop_topright"></div>' + '<div class="fbpop_bottomright"></div>' + '<div class="fbpop_bottomleft"></div>' + '<div class="fbpop_content fbpop_content_old" id="fbpop_content"></div>' + '</div>';
    	
    	$(this._popup).html(a);
    	this._content = $(this._popup).find("div.pop_content");
    	this._frame = this._content;
    },
    
    _buildOverlay: function(){
    	this._overlay = $("<div/>", {id: "fb_generic_dialog_overlay"});
    	var e = this;
    	if(this._modal_class) $(this._overlay).addClass(this._modal_class);
    	if(this._semi_modal){
    		$(this._overlay).click(function(){e.hide()});
    	}
    	
    	if(ua.ie() > 7) $(this._overlay).css("height", $(document).height() + "px");
    	$("body").append(this._overlay);
    },
    
    _showDialog: function(){
    	if(this._modal){
    		if(this._overlay){
    			$(this._overlay).css("display","");
    		}else this._buildOverlay();
    	}
    	
    	if(this._obj && $(this._obj).css("display")){
    		$(this._obj).css("visibility","hidden").css("display","");
    		this._resetDialogPosition();
    		$(this._obj).css("visibility","");
    		this._obj.dialog = this;
    	}else this._resetDialogPosition();
    	clearInterval(this.active_hiding);
    	this.active_hiding = setInterval(this._activeResize.bind(this), 500);
    	if(!fbDialog.dialogStack) fbDialog.dialogStack = [];
    	var c = fbDialog.dialogStack;
    	if(c.length){
    		var a = c[c.length - 1];
    		if (a != this && (!a._is_stackable || (a._show_loading && a._loading_was_shown))) a._hide();
            for (var b = c.length - 1; b >= 0; b--) if (c[b] == this) {
                c.splice(b, 1);
            } else if (!c[b]._shown_while_stacked) c[b]._hide(true);
    	}
    	
    	c.push(this);
    	return this;
    },
    
    _updateShim: function(){
    	return this._shim && this._shim.show();
    },
    
    _resetDialogPosition: function() {
    	if(!this.popup) return;
    	this._resetDialogObj();
    	this._updateShim();
    },
    
    _activeResize: function() {
    	if (this.last_offset_height != $(this._content).height()) {
            this.last_offset_height = $(this._content).height();
            this._updateShim();
        }
    },
    
    _resetDialogObj: function(){
    	var a = $(this._popup).find("div.fbpop_content");
    	var d = $(window).scrollTop();
    	var f = 20;
    	var g = $(window).height();
    	var b = $(a).height() + f;
    	var e = d + this._top + 'px';
    	if (this._top + b > g) {
            var c = Math.max(g - b, 0);
            e = ((c / 2) + d) + 'px';
        }
    	$(this._popup).css("top",e);
    },
    
    _fadeOut: function(b){
    	if(!this._popup) return;
    	try{
    		var $$ = this;
    		$(this._obj).fadeOut('fast',function(){
    			$$._hide();
    		});
    	}catch(e){
    		this._hide(b);
    	}
    },
    
    _hide: function(d){
    	if(this._obj) $(this._obj).css("display","none");
    	if(this._overlay)
    		if(d){
    			$(this._overlay).css("display","none");
    		}else{
    			$(this._overlay).remove();
    			this._overlay = null;
    		}
    	
    	if(this.timeout){
    		clearTimeout(this.timeout);
    		this.timeout = null;
    	}
    	try{
    	if(this._hidden_objects.length){
    		for (var b = 0, c = this._hidden_objects.length; b < c; b++) $(this._hidden_objects[b]).css('visibility','');
            this._hidden_objects = [];
    	}
    	}catch(ex){};
    	
    	clearInterval(this.active_hiding);
    	if(this._bottom){
    		var a = fbDialog._bottoms;
    		a.splice(a.indexOf(this._bottom),1);
    		fbDialog.updateBottomMax();
    	}
    	
    	if(d) return;
    	this.destroy();
    	
    },
    
    destroy: function(){
    	if (fbDialog.dialogStack && fbDialog.dialogStack.length) {
            var b = fbDialog.dialogStack;
            for (var a = b.length - 1; a >= 0; a--) if (b[a] == this) b.splice(a, 1);
            if (b.length) b[b.length - 1]._showDialog();
        }
    	
    	if(this._obj){
    		$(this._obj).remove();
    		this._obj = null;
    	}
    	
    	if(this.closeHandler) this.closeHandler({
    		return_data: this._return_data
    	});
    },
    
    _handleButton: function(a){
    	if(typeof a == 'string') a = fbDialog._findButton(this._buttons, a);
    	var b = Dialog.call_or_eval(a, a.handler);
    	if(b === false) return;
    	if(a.name == 'cancel'){
    		this.cancel();
    	}else if(fbDialog.call_or_eval(this, this._handler, {
    		button: a
    	}) !== false) this.hide();
    },
    
    _updateBottom: function(){
    	var a = $(this._content).height() + $(this._content).top();
    	fbDialog._bottoms[fbDialog._bottoms.length - 1] = a;
    	fbDialog._updateBottomMax();
    },
    
    _setFromModel: function(c){
    	var a = {};
    	$.extend(a,c);
    	if(a.immediateRendering){
    		this.setImmediateRendering(a.immediateRendering);
    		delete a.immediateRendering;
    	}
    	
    	for(var d in a){
    		if(d == "onloadRegister") {
    			this.onloadRegister(a[d]);
    			continue;
    		}
    		
    		var b = this["set" + d.substr(0, 1).toUpperCase() + d.substr(1)];
    		b.apply(this, $A(a[d]));
    	}
    }
});

/**
 * Helper functions and objects
 */

