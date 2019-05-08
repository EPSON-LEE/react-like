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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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
      dom[name.toLowerCase()] = value || ''; // 如果属性名是style，则更新style对象
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
  }

  function createComponent(component, props) {
    var inst;

    if (component.prototype && component.prototype.render) {
      inst = new component(props);
    } else {
      inst = new Component(props);
      inst.constructor = component;

      inst.render = function () {
        return this.constructor(props);
      };
    }

    return inst;
  }

  function setComponentProps(component, props) {
    if (!component.base) {
      if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
      component.componentWillReceiveProps(props);
    }

    component.props = props;
    renderComponent(component);
  }

  function renderComponent(component) {
    var base;
    var renderer = component.render();

    if (component.base && component.componentWillUpdate) {
      component.componentWillUpdate();
    }

    base = _render(renderer);

    if (component.base) {
      if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
      component.componentDidMount();
    }

    if (component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild(base, component.base);
    } // component.base保存的是组件的dom对象


    component.base = base;
    base._component = component;
  }

  function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
    if (typeof vnode === 'number') vnode = String(vnode);

    if (typeof vnode === 'string') {
      var textNode = document.createTextNode(vnode);
      return textNode;
    }

    if (typeof vnode.tag === 'function') {
      var component = createComponent(vnode.tag, vnode.attrs);
      setComponentProps(component, vnode.attrs);
      return component.base;
    }

    var dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(function (key) {
        var value = vnode.attrs[key];
        setAttribute(dom, key, value);
      });
    }

    if (vnode.children) {
      vnode.children.forEach(function (child) {
        return render(child, dom);
      });
    }

    return dom;
  }

  function render(vnode, container) {
    return container.appendChild(_render(vnode));
  }

  var Component =
  /*#__PURE__*/
  function () {
    function Component() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Component);

      this.isReactComponent = true;
      this.state = {};
      this.props = props;
    }

    _createClass(Component, [{
      key: "setState",
      value: function setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
      }
    }]);

    return Component;
  }();

  function createElement(tag, attrs) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return {
      tag: tag,
      attrs: attrs,
      children: children
    };
  }

  var React = {
    Component: Component,
    createElement: createElement
  };

  var ReactDOM = {
    render: render,
    renderComponent: renderComponent
  };

  var Counter =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Counter, _React$Component);

    function Counter(props) {
      var _this;

      _classCallCheck(this, Counter);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this, props));
      _this.state = {
        num: 0
      };
      return _this;
    }

    _createClass(Counter, [{
      key: "componentWillUpdate",
      value: function componentWillUpdate() {
        console.log('update');
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        console.log('mount');
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        console.log('unmount');
      }
    }, {
      key: "onClick",
      value: function onClick() {
        this.setState({
          num: this.state.num + 1
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement("div", {
          onClick: function onClick() {
            return _this2.onClick();
          }
        }, React.createElement("h1", null, "number: ", this.state.num), React.createElement("button", null, "add"));
      }
    }]);

    return Counter;
  }(React.Component);

  ReactDOM.render(React.createElement(Counter, null), document.getElementById('root'));

}));
