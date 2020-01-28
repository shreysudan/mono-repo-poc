function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { throttle, debounce } from "lodash";
import { findDOMNode } from "react-dom";
import { number, node, func, bool } from "prop-types";
/**
 * An universal supported HOC to lazy load wrapped components when they appear in view port to improve
 * user experience.
 *
 * @author
 */

var LazyLoad =
/*#__PURE__*/
function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad(props) {
    var _this;

    _classCallCheck(this, LazyLoad);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LazyLoad).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var isIntersectionObserverAvailable = _this.state.isIntersectionObserverAvailable;

      if (isIntersectionObserverAvailable) {
        _this.createObserver();
      } else {
        _this.init();
      }
      /* istanbul ignore else  */


      if (_this.inView) {
        _this.inView = false;
      }

      if (!isIntersectionObserverAvailable) {
        // Delay calling to prevent a react cascading update, since this method is calling setState
        _this.inViewportTimeout = setTimeout(function () {
          return _this.inViewport();
        }, 300);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.state.isIntersectionObserverAvailable) {
        _this.observer.disconnect();
        /* istanbul ignore next */


        _this.domNode = null;
      } else {
        _this.destroy();

        _this.inViewport.cancel();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isIntersectionObserverSupported", function () {
      return typeof window !== "undefined" && "IntersectionObserver" in window;
    });

    _defineProperty(_assertThisInitialized(_this), "createObserver", function () {
      /* istanbul ignore next */
      _this.domNode = findDOMNode(_assertThisInitialized(_this)); // Options

      var options = {
        root: null,
        // Page as root
        rootMargin: "40px",
        threshold: 0
      };
      _this.observer = new IntersectionObserver(_this.handleObserver.bind(_assertThisInitialized(_this)), // callback
      options);

      _this.observer.observe(_this.domNode);
    });

    _defineProperty(_assertThisInitialized(_this), "handleObserver", function (entries) {
      entries.forEach(function (entry) {
        var isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          _this.setState({
            inView: true
          });

          _this.observer.disconnect();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "destroy", function () {
      clearTimeout(_this.inViewportTimeout);
      /* istanbul ignore next */

      window.removeEventListener("resize", _this.inViewport);
      window.removeEventListener("scroll", _this.inViewport);
      /* istanbul ignore next */

      _this.domNode = null;
    });

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      /* istanbul ignore next */
      _this.domNode = findDOMNode(_assertThisInitialized(_this));
      /* istanbul ignore next */

      window.addEventListener("resize", _this.inViewport);
      /* istanbul ignore next */

      window.addEventListener("scroll", _this.inViewport);

      if (_this.props.shouldCallbackonInit) {
        _this.inViewport(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "inViewport", function () {
      var shouldCallbackonInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (_this.props.disable || !_this.domNode) {
        return;
      }

      var y = window.scrollY || window.pageYOffset;
      var windowHeight = window.innerHeight;
      var viewTop = y;
      var viewBot = viewTop + windowHeight;
      var nodeTop = _this.domNode.getBoundingClientRect().top + y;
      var nodeBot = nodeTop + _this.domNode.offsetHeight; // When in view, be agreesive to when going out of view.

      var offset = !_this.inView ? _this.props.threshold : 0;

      var isInView = function isInView() {
        return nodeBot >= viewTop - offset && nodeTop <= viewBot + offset;
      };

      var getViewPortParams = function getViewPortParams(inView) {
        return {
          inView: inView,
          viewTop: viewTop,
          offset: offset,
          nodeTop: nodeTop,
          nodeBot: nodeBot
        };
      };

      var inView = isInView();

      if (!_this.inView && inView) {
        _this.inView = true;

        _this.props.onInViewPortChange(getViewPortParams(true));

        if (!_this.props.repeatOnInView) {
          _this.destroy();
        }
      } else if (_this.inView && !inView) {
        _this.inView = false;

        _this.props.onInViewPortChange(getViewPortParams(false));
      } else if (shouldCallbackonInit) {
        _this.inView = inView;

        _this.props.onInViewPortChange(getViewPortParams(inView));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "compoentDidUpdate", function (prevProps) {
      if (prevProps.disable !== _this.props.disable) {
        _this.inView = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          placeholder = _this$props.placeholder;

      if (_this.inView) {
        // only display when inView
        return children;
      }

      return placeholder;
    });

    _this.domNode = null;
    var _this$props2 = _this.props,
        waitValue = _this$props2.waitValue,
        useDebounce = _this$props2.useDebounce,
        useEvent = _this$props2.useEvent;
    _this.state = {
      inView: false,
      isIntersectionObserverAvailable: !useEvent && _this.isIntersectionObserverSupported()
    };
    _this.inViewport = !useDebounce ? throttle(_this.inViewport, waitValue) : debounce(_this.inViewport, waitValue);
    return _this;
  }

  _createClass(LazyLoad, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props3 = this.props,
          locationChange = _this$props3.locationChange,
          waitValue = _this$props3.waitValue,
          useDebounce = _this$props3.useDebounce;
      /* istanbul ignore next */

      if (!this.inView && nextProps.locationChange && !locationChange) {
        this.inViewport();
      }

      if (!this.inView && nextProps.waitValue !== waitValue) {
        this.inViewport = !useDebounce ? throttle(this.inViewport, waitValue) : debounce(this.inViewport, waitValue);
      }
    }
  }, {
    key: "inView",
    get: function get() {
      return this.state.inView;
    },
    set: function set(val) {
      this.setState(function () {
        return {
          inView: val
        };
      });
    }
  }]);

  return LazyLoad;
}(Component);
/**
 * @param {node} children the children to render when in view.
 * @param {number} threshold Threshold is the percentage value of the screen height that will act as a threshold. Positive values make images load sooner, negative values make images load later.
 * @param {node} placeholder Place holder node to display until ready to render
 * @param {func} onInViewPortChange when a component is lazy loaded
 * @param {bool} repeatOnInView Repeats callbacks on viewport changes rather just firing the first time.
 * @param {bool} disable Disables in view checking.
 */


LazyLoad.propTypes = {
  children: node.isRequired,
  placeholder: node,
  threshold: number,
  onInViewPortChange: func,
  repeatOnInView: bool,
  disable: bool,
  shouldCallbackonInit: bool,
  locationChange: bool,
  waitValue: number,
  useDebounce: bool,
  useEvent: bool
};
LazyLoad.defaultProps = {
  threshold: 0,
  placeholder: React.createElement("div", null),
  onInViewPortChange: function onInViewPortChange() {},
  shouldCallbackonInit: false,
  useDebounce: false,
  useEvent: false,
  waitValue: 80
};
export default LazyLoad;