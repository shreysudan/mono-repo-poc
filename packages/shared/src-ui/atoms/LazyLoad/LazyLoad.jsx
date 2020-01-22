import React, { Component } from 'react';
import { throttle, debounce } from 'lodash';
import { findDOMNode } from 'react-dom';
import { number, node, func, bool } from 'prop-types';

/**
 * An universal supported HOC to lazy load wrapped components when they appear in view port to improve
 * user experience.
 *
 * @author
 */
class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.domNode = null;
        const { waitValue, useDebounce, useEvent } = this.props;
        this.state = {
            inView: false,
            isIntersectionObserverAvailable:
                !useEvent && this.isIntersectionObserverSupported(),
        };
        this.inViewport = !useDebounce
            ? throttle(this.inViewport, waitValue)
            : debounce(this.inViewport, waitValue);
    }

    componentDidMount = () => {
        const { isIntersectionObserverAvailable } = this.state;
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
    };

    componentWillReceiveProps(nextProps) {
        const { locationChange, waitValue, useDebounce } = this.props;
        /* istanbul ignore next */
        if (!this.inView && nextProps.locationChange && !locationChange) {
            this.inViewport();
        }

        if (!this.inView && nextProps.waitValue !== waitValue) {
            this.inViewport = !useDebounce
                ? throttle(this.inViewport, waitValue)
                : debounce(this.inViewport, waitValue);
        }
    }

    componentWillUnmount = () => {
        if (this.state.isIntersectionObserverAvailable) {
            this.observer.disconnect();
            /* istanbul ignore next */
            this.domNode = null;
        } else {
            this.destroy();
            this.inViewport.cancel();
        }
    };

    isIntersectionObserverSupported = () =>
        typeof window !== 'undefined' && 'IntersectionObserver' in window;

    createObserver = () => {
        /* istanbul ignore next */
        this.domNode = findDOMNode(this);
        // Options
        const options = {
            root: null, // Page as root
            rootMargin: '40px',
            threshold: 0,
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this), // callback
            options
        );
        this.observer.observe(this.domNode);
    };

    handleObserver = entries => {
        entries.forEach(entry => {
            const { isIntersecting } = entry;

            if (isIntersecting) {
                this.setState({
                    inView: true,
                });
                this.observer.disconnect();
            }
        });
    };

    destroy = () => {
        clearTimeout(this.inViewportTimeout);

        /* istanbul ignore next */
        window.removeEventListener('resize', this.inViewport);
        window.removeEventListener('scroll', this.inViewport);

        /* istanbul ignore next */
        this.domNode = null;
    };

    init = () => {
        /* istanbul ignore next */
        this.domNode = findDOMNode(this);
        /* istanbul ignore next */
        window.addEventListener('resize', this.inViewport);
        /* istanbul ignore next */
        window.addEventListener('scroll', this.inViewport);
        if (this.props.shouldCallbackonInit) {
            this.inViewport(true);
        }
    };

    /* istanbul ignore next */
    inViewport = (shouldCallbackonInit = false) => {
        if (this.props.disable || !this.domNode) {
            return;
        }
        const y = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const viewTop = y;
        const viewBot = viewTop + windowHeight;
        const nodeTop = this.domNode.getBoundingClientRect().top + y;
        const nodeBot = nodeTop + this.domNode.offsetHeight;
        // When in view, be agreesive to when going out of view.
        const offset = !this.inView ? this.props.threshold : 0;
        const isInView = () =>
            nodeBot >= viewTop - offset && nodeTop <= viewBot + offset;
        const getViewPortParams = inView => ({
            inView,
            viewTop,
            offset,
            nodeTop,
            nodeBot,
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
    };

    compoentDidUpdate = prevProps => {
        if (prevProps.disable !== this.props.disable) {
            this.inView = false;
        }
    };

    get inView() {
        return this.state.inView;
    }

    set inView(val) {
        this.setState(() => ({ inView: val }));
    }

    render = () => {
        const { children, placeholder } = this.props;

        if (this.inView) {
            // only display when inView
            return children;
        }
        return placeholder;
    };
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
    useEvent: bool,
};

LazyLoad.defaultProps = {
    threshold: 0,
    placeholder: <div />,
    onInViewPortChange: () => { },
    shouldCallbackonInit: false,
    useDebounce: false,
    useEvent: false,
    waitValue: 80,
};

export default LazyLoad;
