(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * @description:
   * @param {HTMLDivElement}
   * @param {string}
   * @param {object}
   * @return:
   */
  function createElement(tag, attrs) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return {
      tag: tag,
      attrs: attrs,
      children: children
    };
  } // 此处研究下 vnode 结构

  /**
   * @description: Trans virtual dom to the real dom
   * @param {object} vnode object
   * @param {HTMLDivElement} container object
   * @return: HTMLDivElement
   */


  function _render(vnode, container) {
    // 如果是文本的话则认为参数是一个文本节点
    if (typeof vnode === 'string') {
      var textNode = document.createTextNode(vnode);
      return container.appendChild(textNode);
    }

    var dom = document.createElement(vnode.tag); // 属性存在时，设置dom的属性节点

    if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(function (key) {
        var value = vnode.attrs[key];
        setAttribute(dom, key, value); // 设置属性
      });
    }

    vnode.children.forEach(function (child) {
      return _render(child, dom);
    }); // 递归渲染子节点

    return container.appendChild(dom); // 将渲染结果挂载到真正的DOM上
  }
  /**
   * @description:
   * @param {HTMLDivElement}
   * @param {string}
   * @param {string}
   * @return:
   */


  function setAttribute(dom, name, value) {
    // 如果属性名是className，则改回class
    if (name === 'className') name = 'class'; // 如果属性名是onXXX，则是一个事件监听方法

    if (/on\w+/.test(name)) {
      name = name.toLowerCase();
      dom[name] = value || ''; // 如果属性名是style，则更新style对象
    } else if (name === 'style') {
      if (!value || typeof value === 'string') {
        dom.style.cssText = value || '';
      } else if (value && _typeof(value) === 'object') {
        for (var _name in value) {
          // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
          dom.style[_name] = typeof value[_name] === 'number' ? value[_name] + 'px' : value[_name];
        }
      } // 普通属性则直接更新属性

    } else {
      if (name in dom) {
        dom[name] = value || '';
      }

      if (value) {
        dom.setAttribute(name, value);
      } else {
        dom.removeAttribute(name);
      }
    }
  } // 将上文定义的createElement方法放到对象React中


  var React = {
    createElement: createElement
  };
  var ReactDOM = {
    render: function render(vnode, container) {
      console.log(11111); // container.innerHTML = ''

      return _render(vnode, container);
    }
  };
  ReactDOM.render(React.createElement("h1", null, "Hello, world!"), document.getElementById('root'));

}));
