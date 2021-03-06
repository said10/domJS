/**
* $dom library (v0.0.1) copyright 2017 Said Bensamdi
* Licensed under the MIT License.
* http://www.domjs.com
*
* Copyright 2017 Said Bensamdi
* Licensed under the MIT License
* https://github.com/julienw/said10
*/ 
/**
* JS library to manipulate the DOM in an easy and efficient way
*/ 
(function(window) {
    'use strict';
    File.prototype.convertToBase64 = function(callback){
        var FR= new FileReader();
        FR.onload = function(e) {
             callback(e.target.result);
        };       
        FR.readAsDataURL(this);
    };
    /**
	 * Return the first Element within the document that matches the specified selector
	 * @get
	 * @param {selector} String - The selector
	 */
    Element.prototype.get = function(selector) {
      return document.querySelector(selector);
    };
    /**
	 * Returns All Elements within the document that matches the specified selector
	 * @getAll
	 * @param {selector} String - The selector
	 */
    Element.prototype.getAll = function(selector) {
      return document.querySelectorAll(selector);
    };
    /**
	 * Returns the DOM node's parent Element,
	 * @getParent
	 */
    Element.prototype.getParent = function() {
      return this.parentElement;
    };
    /**
	 * add a node to the end of the list of children of a Element
	 * @appendTo
     * @param {child} String / DOM Node's - Children to add
	 */
    Element.prototype.appendTo = function(child) {
        var wrapper= document.createElement('div');
        if (typeof child === "string") {
          wrapper.innerHTML= child;
          this.append(wrapper.firstChild);
        }
        else {
          wrapper.appendChild(child.element.cloneNode(true));
          wrapper.innerHTML = wrapper.innerHTML;
          this.append(wrapper.firstChild);
        }
        return this;
    };
    /**
	 * removes the Element from the DOM
	 * @remove
	 */
    Element.prototype.remove = function() {
        var parent = this.getParent();
        parent.removeChild(this);
    };
    /**
	 * sets or gets the HTML syntax describing the element's descendants
	 * @html
     * @param {html} String - The code HTML to set in Element
	 */
    Element.prototype.html = function(html) {
        if (typeof html === "undefined") {
            return this.innerHTML;
        }
        else {
            this.innerHTML = html;
        }
    };
    /**
	 * Return the first Element within the Element that matches the specified selector
	 * @find
     * @param {selector} String - The selector
	 */
    Element.prototype.find = function(selector) {
      return this.querySelector(selector);
    };
    /**
	 * Return All Elements within the Element that matches the specified selector
	 * @find
     * @param {selector} String - The selector
	 */
    Element.prototype.findAll = function(selector) {
      return this.querySelectorAll(selector);
    };
    /**
	 * get the value of an attribute on the specified element
	 * @attr
     * @param {attr} String - The attribute
	 */
    Element.prototype.attr = function(attr) {
      return this.getAttribute(attr);
    };
    /**
	 * set the value of an attribute on the specified element
	 * @attr
     * @param {attr} String - The attribute
     * @param {value} String - The value of attribute
	 */
    Element.prototype.setAttr = function(attr, value) {
      Element.setAttribute(attr, value);
    };
    /**
	 * inserts a set of Node or DOMString objects in the children list of this ChildNode's parent,  just before this ChildNode.
	 * @before
     * @param {elem} String / DOMString - The attribute
	 */
    Element.prototype.before = function(elem) {
        var wrapper= document.createElement('div');
        var parent =  this.getParent();
         var element_result;
        if (typeof elem === "string") {
            wrapper.innerHTML= elem;
            element_result = wrapper.firstChild;
            parent.insertBefore(element_result, this);   
        }
        else {
          wrapper.appendChild(elem.cloneNode(true));
          wrapper.innerHTML = wrapper.innerHTML;
          element_result = wrapper.firstChild;
          parent.insertBefore(element_result, this);  
        }
    };
    /**
	 * inserts a set of Node or DOMString objects in the children list of this ChildNode's parent,  just after this ChildNode.
	 * @before
     * @param {elem} String / DOMString - specified Elements
	 */
    Element.prototype.after = function(elem) {
        var wrapper= document.createElement('div');
        var parent =  this.getParent();
        var element_result;
        if (typeof elem === "string") {
            wrapper.innerHTML= elem;
            element_result = wrapper.firstChild;
            parent.insertBefore(element_result, this.nextSibling);   
        }
        else {
          wrapper.appendChild(elem.cloneNode(true));
          wrapper.innerHTML = wrapper.innerHTML;
          element_result = wrapper.firstChild;
          parent.insertBefore(element_result, this.nextSibling);  
        }
    };
    /**
	 * Adds the specified class(es) to Element
	 * @addClass
     * @param {classes} String - class(es)
	 */
    Element.prototype.addClass = function(classes) {
        if (this.classList) {
            var space = " ";
            if(this.classList.length === 0) {
                space = "";
            }
            this.classList += space+classes;
        }
        else if (!this.hasClass(classes)) {
            this.className += " " + classes;
        }
    };
    /**
	 * Remove the specified class(es) to Element
	 * @removeClass
     * @param {classes} String - class(es)
	 */
    Element.prototype.removeClass = function(classes) {
        var array_classes = [];
        if (this.classList) {
           array_classes = this.classList;
           this.classList = this.utils_removeClass(array_classes, classes);
        }
        else {
            array_classes = this.className.split(" ");
            this.classList = this.utils_removeClass(array_classes, classes);
        }
    };
    Element.prototype.utils_removeClass = function(array, classes) {
        var new_classes = "";
        for (var i = 0; i < array.length; i++) {
            var classe = array[i];
            if ( classes.search(classe) === -1 ) {
                new_classes += classe+ " ";
            }
        }
        new_classes = new_classes.substring(0, new_classes.length-1);
        return new_classes;
    };
     /**
	 * Determine whether any of the matched elements are assigned the given classe.
	 * @hasClass
     * @param {classe} String - classe
	 */
    Element.prototype.hasClass = function(classe) {
        var result = true;
         if (this.classList) {
             var classes = this.classList.value;
             var search = classes.search(classe);
             if(search === -1) {
                 result = false;
             }
         }
        else {
            var reg = new RegExp('(\\s|^)' + classe + '(\\s|$)');
            var match = this.className.match(reg);
            if (match === null) {
                result = false;
            }
        }
        return result;
    };
    /**
	 * Attach an event handler function for one event to the selected elements.
	 * @on
     * @param {type} String - Type of event : click, load, keypress, ...
     * @param {callback} Function - The callback of event handler
	 */
    Element.prototype.on = function(type, callback) {
        var self = this;
        this.addEventListener(type, function( event ) {
            callback.call(self, event);
        });
        return this;
    };
    /**
	 * remove an event handler for one event to the selected elements.
	 * @off
     * @param {type} String - Type of event : click, load, keypress, ...
     * @param {callback} Function - The callback of event handler removed
	 */
    Element.prototype.off = function(type, callback) {
        var self = this;
        this.removeEventListener(type, function( event ) {
            callback.call(self, event);
        });
        return this;
    };
    NodeList.prototype.on = function(type, callback) {
        var l = this.length;
        for (var i = 0; i < l; i++) {
            var element = this[i];
            element.on(type, callback);
        }
        return this;
    };
    NodeList.prototype.off = function(type, callback) {
        var l = this.length;
        for (var i = 0; i < l; i++) {
            var element = this[i];
            element.off(type, callback);
        }
        return this;
    };
     /**
	 * Encode a set of form elements as a multiple format for submission.
	 * @serialize
     * @param {type} String - Type of format : string, array, object
	 */
    Element.prototype.serialize = function(type) {
        var selectors = 'input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="date"], input[type="tel"], input[type="checkbox"], input[type="datetime-local"], '+
        'input[type="hidden"], input[type="month"], input[type="radio"], input[type="range"], input[type="search"], input[type="time"], input[type="url"], input[type="week"], textarea, select';
        var inputs_list = this.findAll(selectors);
        var l_inputs = inputs_list.length;
        var result_string = "";
        var result_array = [];
        var result_object = {};
        var result = null;
        for (var i = 0; i < l_inputs; i++) {
            var input = inputs_list[i];
            var name = input.attr("name");
            var type_input = input.attr("type");
            var value = input.value;
            var disabled = input.attr("disabled");
            var select_multiple = input.attr("multiple");
            if (typeof name !== "undefined" && name !== null && disabled === null) {
                if (type_input === "checkbox") {
                    value = input.checked;
                }
                if (type_input === "radio") {
                    if (input.checked) {
                        var input_string = name+"="+value+"&";
                        result_string += input_string;
                        result_array.push({ name : name, value : value });
                        result_object[name] = value;
                    }
                }
                else {
                    if(select_multiple !== null) {
                        var values_options = [];
                        for (var j=input.options.length-1; j>=0; j--) {
                            if(input.options[j].selected) {
                                values_options.push(input.options[j].value);
                            }
                        }
                        value = values_options;
                    }
                    var input_string_normal = name+"="+value+"&";
                    result_string += input_string_normal;
                    result_array.push({ name : name, value : value });
                    result_object[name] = value;
                }
            }
        }
        result_string = result_string.substring(0, result_string.length-1);
        switch(type) {
            case "string" : 
                result = result_string;
            break;
            case "array" : 
                result = result_array;
            break;
            case "object" : 
                result = result_object;
            break;
            default : 
                result = result_string;
            break;
        }
        return result;
    };
    /**
	 * Get the current value of the inputs elements
	 * @val
	 */
    Element.prototype.val = function() {
        return this.value;
    };
     /**
	 * Get the Element in NodeList by index
	 * @eq
	 */
    Element.prototype.eq = function() {
        return this;
    };
    NodeList.prototype.eq = function(index) {
        return this[index];
    };
    /**
	 * Get the first Element in NodeList
	 * @first
	 */
    NodeList.prototype.first = function() {
        return this[0];
    };
     /**
	 * Get the last Element in NodeList
	 * @last
	 */
    NodeList.prototype.last = function() {
        var l = this.length;
        return this[l-1];
    };
     /**
	 * set one or more CSS properties for matched element.
	 * @css
     * @param {object_css} Object - Object of propreties and values of CSS : {color : 'red'}
	 */
    Element.prototype.css = function(object_css) {
        if (dom.is_object(object_css)) {
            for (var proprety in object_css) {
                if (!object_css.hasOwnProperty(proprety)) {
                    continue;
                }
                var value_proprety = object_css[proprety];
                this.style[proprety] = value_proprety;
            }
        }
    };
    /**
	 * Show Element DOM
	 * @show
	 */
    Element.prototype.show = function() {
        if (this.tagName === "A" || this.tagName === "SPAN" || this.tagName === "STRONG" || this.tagName === "IMG" || this.tagName === "EM" ||this.tagName === "BUTTON" || this.tagName === "INPUT" || this.tagName === "LABEL" || this.tagName === "SELECT" || this.tagName === "TEXTAREA") {
                this.css({ "display" : "inline-block" });
        }
        else {
            this.css({ "display" : "block" });
        } 
    };
    /**
	 * Hide Element DOM
	 * @hide
	 */
    Element.prototype.hide = function() {
        this.css({ "display" : "hide" });
    };
    NodeList.prototype.css = function(object_css) {
        var l = this.length;
        for (var i = 0; i < l; i++) {
            var element = this[i];
            element.css(object_css);
        }
        return this;
    };
    /**
	 * Get the current coordinates of the element (top, left, width, height)
	 * @offset
	 */
    Element.prototype.offset = function() {
        var offset_element = this.getBoundingClientRect();
        var object_offset = { top : offset_element.top, left : offset_element.left, width : offset_element.width, height : offset_element.height };
        return object_offset;
    };
    /**
	 * Insert content to the beginning of Element
	 * @prependTo
     * @param {child} String / DOMString - specified Chiilds
	 */
    Element.prototype.prependTo = function(child) {
        var wrapper= document.createElement('div');
        if (typeof child === "string") {
          wrapper.innerHTML= child;
          this.prepend(wrapper.firstChild);
        }
        else {
          wrapper.appendChild(child.element.cloneNode(true));
          wrapper.innerHTML = wrapper.innerHTML;
          this.prepend(wrapper.firstChild);
        }
    };
    /**
	 * get the first parent element that matches the selector
	 * @closestTo
     * @param {selector} String - Selector of parent
	 */
    Element.prototype.closestTo = function(selector) {
        return this.closest(selector); 
    };
    /**
	 * Check if arguments matched with the style CSS of Element and return true/false  .
	 * @isCss
     * @param {proprety} String - the Proprety checked : color=red
	 */
    Element.prototype.isCss = function(proprety) {
        var css_element = window.getComputedStyle(this, null);
        var split_proprety = proprety.split("=");
        var proprety_temp = split_proprety[0];
        var value_temp = split_proprety[1];
        var result = false;
        if (css_element[proprety_temp] === value_temp) {
            result = true;
        }
        return result;
    };
    /**
	 * get the next Element of this DOMNode
	 * @next
	 */
    Element.prototype.next = function() {
        return this.nextElementSibling;
    };
    /**
	 * get the prev Element of this DOMNode
	 * @prev
	 */
    Element.prototype.prev = function() {
        return this.previousElementSibling;
    };
    /**
	 * Wrap an HTML structure around each element in the set of matched elements.
	 * @prev
     * @param {html} String - the HTML of wrapper
	 */
    Element.prototype.wrap = function(html) {
        var wrapper = document.createElement("div");
        wrapper.innerHTML= html;
        wrapper = wrapper.firstChild;
        this.parentNode.insertBefore(wrapper, this);
        this.parentNode.removeChild(this);
        wrapper.appendChild(this);
    };
    NodeList.prototype.wrap = function(html) {
        var l = this.length;
        var add = false;
        var wrapper = document.createElement("div");
        wrapper.innerHTML= html;
        wrapper = wrapper.firstChild;
        for (var i = 0; i < l; i++) {
            var element = this[i];
            if (!add) {
                element.parentNode.insertBefore(wrapper, element);
                add = true;
            }
            element.parentNode.removeChild(element);
            wrapper.appendChild(element);
        }
    };
    class Base64 {
        constructor() { }
        convert(input, callback) {
          var selectedFile = input.files[0];
          selectedFile.convertToBase64(function(base64){
              callback.call(input, base64);
          });
        }
    }
    /**
	 * get Base64 of file uploaded by the user in input File
	 * @convertBase64
     * @param {callback} Function - the callback after the processing base64 is complete
	 */
    Element.prototype.convertBase64 = function(callback) {
        this.on("change", function() {
            var base64 = new Base64();
            base64.convert(this, callback);
        });    
    };
    var dom = Element.prototype;
    class Ajax {
        constructor() {}
        execute(params) {
            var bustCache = '?' + new Date().getTime();
            var request;
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
             } 
            else {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            request.onreadystatechange = function(event) {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200 || this.status === 201) {
                         var response = this.response;
                        if (typeof this.response === "string") {
                            try {
                               response = JSON.parse(this.response);         // null
                            }
                            catch (e) {
                            // console.log(e);
                            }
                        }
                    params.success.call(this, response, this.status, event, this);
                    } 
                    else {
                        params.error.call(this, this.status, this.statusText, event, this);
                    }
                }
            }; 
            var mime_type = params.mimeType || 'application/json';
            request.overrideMimeType(mime_type);
            var url_send = params.url;
            if (typeof params.cache !== "undefined" && params.cache === true) {
                url_send = params.url +  bustCache;
            }
            var async = params.async;
            if (typeof async === "undefined" || async === true) {
                async = true;
                request.responseType = params.dataType || 'json';
            }
            request.open(params.type, url_send, async);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Accept', 'application/json, text/javascript');
            //xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
            var headers = params.headers;
            if (typeof headers !== "undefined" && dom.is_object(headers)) {
                for (var header in headers) {
                    if (!headers.hasOwnProperty(header)) {
                        continue;
                    }
                    var value = headers[header];
                    request.setRequestHeader(header, value);
                }
            }
            var data = null;
            if (typeof params.data !== "undefined") {
                if ( params.type === "post" || params.type === "put") {
                    data = params.data;
                }
            }
            request.send(data);
        }
    }
     /**
	 * Execute the requests HTTP to server by AJAX methode
	 * @ajax
     * @param {params} Object - the params of AJAX request : type, url, success, error, cache, headers, data, asyncn mimeType
	 */
    dom.ajax = function(params) {
        var ajax = new Ajax();
        ajax.execute(params);
    };
    class Load {
        constructor() { }
        execute(callback) {
          window.addEventListener("load", function(event) {
            if (typeof callback !== "undefined") {
              callback.call(dom, event);
            }
          });
        }
    }
    /**
	 * The load event occurs when DOM Object has been loaded
	 * @load
     * @param {callback} Function - the callback of event load handler
	 */
    dom.load = function(callback) {
        var load_fn = new Load();
        load_fn.execute(callback);
    };
    dom.is_array = function(array) {
      return Array.isArray(array);
    };
    dom.is_object = function(object) {
        var result = false;
      if( !this.is_array(object) && object instanceof Object ) {
          result = true;
      }
      return result;
    };
    window.$dom = window.dom = dom;
})(this);