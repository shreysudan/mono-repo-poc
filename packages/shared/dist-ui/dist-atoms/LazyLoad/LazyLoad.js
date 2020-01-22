"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactDom = require("react-dom");

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An universal supported HOC to lazy load wrapped components when they appear in view port to improve
 * user experience.
 *
 * @author
 */
class LazyLoad extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      const {
        isIntersectionObserverAvailable
      } = this.state;

      if (isIntersectionObserverAvailable) {
        this.createObserver();
      } else {
        this.init();
      }
      /* istanbul ignore else  */


      if (this.inView) {
        this.inView = false;
      }

      if (!isIntersectionObserverAvailable) {
        // Delay calling to prevent a react cascading update, since this method is calling setState
        this.inViewportTimeout = setTimeout(() => this.inViewport(), 300);
      }
    });

    _defineProperty(this, "componentWillUnmount", () => {
      if (this.state.isIntersectionObserverAvailable) {
        this.observer.disconnect();
        /* istanbul ignore next */

        this.domNode = null;
      } else {
        this.destroy();
        this.inViewport.cancel();
      }
    });

    _defineProperty(this, "isIntersectionObserverSupported", () => typeof window !== "undefined" && "IntersectionObserver" in window);

    _defineProperty(this, "createObserver", () => {
      /* istanbul ignore next */
      this.domNode = (0, _reactDom.findDOMNode)(this); // Options

      const options = {
        root: null,
        // Page as root
        rootMargin: "40px",
        threshold: 0
      };
      this.observer = new IntersectionObserver(this.handleObserver.bind(this), // callback
      options);
      this.observer.observe(this.domNode);
    });

    _defineProperty(this, "handleObserver", entries => {
      entries.forEach(entry => {
        const {
          isIntersecting
        } = entry;

        if (isIntersecting) {
          this.setState({
            inView: true
          });
          this.observer.disconnect();
        }
      });
    });

    _defineProperty(this, "destroy", () => {
      clearTimeout(this.inViewportTimeout);
      /* istanbul ignore next */

      window.removeEventListener("resize", this.inViewport);
      window.removeEventListener("scroll", this.inViewport);
      /* istanbul ignore next */

      this.domNode = null;
    });

    _defineProperty(this, "init", () => {
      /* istanbul ignore next */
      this.domNode = (0, _reactDom.findDOMNode)(this);
      /* istanbul ignore next */

      window.addEventListener("resize", this.inViewport);
      /* istanbul ignore next */

      window.addEventListener("scroll", this.inViewport);

      if (this.props.shouldCallbackonInit) {
        this.inViewport(true);
      }
    });

    _defineProperty(this, "inViewport", (shouldCallbackonInit = false) => {
      if (this.props.disable || !this.domNode) {
        return;
      }

      const y = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const viewTop = y;
      const viewBot = viewTop + windowHeight;
      const nodeTop = this.domNode.getBoundingClientRect().top + y;
      const nodeBot = nodeTop + this.domNode.offsetHeight; // When in view, be agreesive to when going out of view.

      const offset = !this.inView ? this.props.threshold : 0;

      const isInView = () => nodeBot >= viewTop - offset && nodeTop <= viewBot + offset;

      const getViewPortParams = inView => ({
        inView,
        viewTop,
        offset,
        nodeTop,
        nodeBot
      });

      const inView = isInView();

      if (!this.inView && inView) {
        this.inView = true;
        this.props.onInViewPortChange(getViewPortParams(true));

        if (!this.props.repeatOnInView) {
          this.destroy();
        }
      } else if (this.inView && !inView) {
        this.inView = false;
        this.props.onInViewPortChange(getViewPortParams(false));
      } else if (shouldCallbackonInit) {
        this.inView = inView;
        this.props.onInViewPortChange(getViewPortParams(inView));
      }
    });

    _defineProperty(this, "compoentDidUpdate", prevProps => {
      if (prevProps.disable !== this.props.disable) {
        this.inView = false;
      }
    });

    _defineProperty(this, "render", () => {
      const {
        children,
        placeholder
      } = this.props;

      if (this.inView) {
        // only display when inView
        return children;
      }

      return placeholder;
    });

    this.domNode = null;
    const {
      waitValue,
      useDebounce,
      useEvent
    } = this.props;
    this.state = {
      inView: false,
      isIntersectionObserverAvailable: !useEvent && this.isIntersectionObserverSupported()
    };
    this.inViewport = !useDebounce ? (0, _lodash.throttle)(this.inViewport, waitValue) : (0, _lodash.debounce)(this.inViewport, waitValue);
  }

  componentWillReceiveProps(nextProps) {
    const {
      locationChange,
      waitValue,
      useDebounce
    } = this.props;
    /* istanbul ignore next */

    if (!this.inView && nextProps.locationChange && !locationChange) {
      this.inViewport();
    }

    if (!this.inView && nextProps.waitValue !== waitValue) {
      this.inViewport = !useDebounce ? (0, _lodash.throttle)(this.inViewport, waitValue) : (0, _lodash.debounce)(this.inViewport, waitValue);
    }
  }

  get inView() {
    return this.state.inView;
  }

  set inView(val) {
    this.setState(() => ({
      inView: val
    }));
  }

}
/**
 * @param {node} children the children to render when in view.
 * @param {number} threshold Threshold is the percentage value of the screen height that will act as a threshold. Positive values make images load sooner, negative values make images load later.
 * @param {node} placeholder Place holder node to display until ready to render
 * @param {func} onInViewPortChange when a component is lazy loaded
 * @param {bool} repeatOnInView Repeats callbacks on viewport changes rather just firing the first time.
 * @param {bool} disable Disables in view checking.
 */


LazyLoad.propTypes = {
  children: _propTypes.node.isRequired,
  placeholder: _propTypes.node,
  threshold: _propTypes.number,
  onInViewPortChange: _propTypes.func,
  repeatOnInView: _propTypes.bool,
  disable: _propTypes.bool,
  shouldCallbackonInit: _propTypes.bool,
  locationChange: _propTypes.bool,
  waitValue: _propTypes.number,
  useDebounce: _propTypes.bool,
  useEvent: _propTypes.bool
};
LazyLoad.defaultProps = {
  threshold: 0,
  placeholder: _react.default.createElement("div", null),
  onInViewPortChange: () => {},
  shouldCallbackonInit: false,
  useDebounce: false,
  useEvent: false,
  waitValue: 80
};
var _default = LazyLoad;
exports.default = _default;