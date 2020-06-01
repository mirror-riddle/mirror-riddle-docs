# react-dom-render

## render

    function render (element, container, callback) {
      return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
    }

## legacyRenderSubtreeIntoContainer

DOMContainer.\_reactRootContainer.\_internalRoot = FiberRootNode;

DOMContainer.\_\_reactContainer\${randomKey} = FiberNode;

FiberRootNode.current = FiberNode;

FiberNode.stateNode = FiberRootNode;

    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
      var root = container._reactRootContainer;
      var fiberRoot;
      var executeCallback = function () {
        fiberRoot = root._internalRoot;

        if (typeof callback === 'function') {
          var originalCallback = callback;

          callback = function () {
            var instance = getPublicRootInstance(fiberRoot);
            // 如果传入的是一个组件<App />，则instance == null, 如果传入的是<div />, 则instance == <div />
            // 回调函数可以获取到相应的this值
            originalCallback.call(instance);
          };
        } // Initial mount should not be batched.
      };

      if (!root) {
        // Initial mount
        // root 是一个 ReactSyncRoot 实例
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
        executeCallback();
        unbatchedUpdates(function () {
          updateContainer(children, fiberRoot, parentComponent, callback);
        });
      } else {
        executeCallback();
        updateContainer(children, fiberRoot, parentComponent, callback);
      }

      return getPublicRootInstance(fiberRoot);
    }

## legacyCreateRootFromDOMContainer

DOMContainer.\_reactRootContainer = ReactSyncRoot

    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      // First clear any existing content.
      var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

      if (!shouldHydrate) {
        var rootSibling;

        while (rootSibling = container.lastChild) {
          container.removeChild(rootSibling);
        }
      }
      // LegacyRoot: 1
      return new ReactSyncRoot(container, LegacyRoot, shouldHydrate ? {
        hydrate: true
      } : undefined);
    }

### ReactSyncRoot

ReactSyncRoot.\_internalRoot = FiberRoot

    function ReactSyncRoot(container, tag, options) {
      this._internalRoot = createRootImpl(container, tag, options);
    }

### createRootImpl

    function createRootImpl(container, tag, options) {
      // Tag is either LegacyRoot or Concurrent Root
      var hydrate = options != null && options.hydrate === true;
      var hydrationCallbacks = options != null && options.hydrationOptions || null;
      var root = createContainer(container, tag, hydrate, hydrationCallbacks);
      // root is FiberRootNode, root.current is FiberNode, root.current.stateNode is FiberRootNode
      markContainerAsRoot(root.current, container);

      if (hydrate && tag !== LegacyRoot) {
        var doc = container.nodeType === DOCUMENT_NODE ? container : container.ownerDocument;
        eagerlyTrapReplayableEvents(doc);
      }

      return root;
    }

### createContainer

    function createContainer(container, tag, hydrate, hydrationCallbacks) {
      return createFiberRoot(container, tag, hydrate, hydrationCallbacks);
    }

#### createFiberRoot

FiberRootNode.current = FiberNode;

FiberNode.stateNode = FiberRootNode;

    function createFiberRoot(container, tag, hydrate, hydrationCallbacks) {
      var root = new FiberRootNode(container, tag, hydrate);

      if (enableSuspenseCallback) {
        root.hydrationCallbacks = hydrationCallbacks;
      } // Cyclic construction. This cheats the type system right now because
      // stateNode is any.

      var uninitializedFiber = createHostRootFiber(tag);
      root.current = uninitializedFiber;
      uninitializedFiber.stateNode = root;
      return root;
    }

#### FiberRootNode

    function FiberRootNode(containerInfo, tag, hydrate) {
      this.tag = tag;
      this.current = null;
      this.containerInfo = containerInfo;
      this.pendingChildren = null;
      this.pingCache = null;
      this.finishedExpirationTime = NoWork;
      this.finishedWork = null;
      this.timeoutHandle = noTimeout;
      this.context = null;
      this.pendingContext = null;
      this.hydrate = hydrate;
      this.callbackNode = null;
      this.callbackPriority = NoPriority;
      this.firstPendingTime = NoWork;
      this.firstSuspendedTime = NoWork;
      this.lastSuspendedTime = NoWork;
      this.nextKnownPendingLevel = NoWork;
      this.lastPingedTime = NoWork;
      this.lastExpiredTime = NoWork;

      if (enableSchedulerTracing) {
        this.interactionThreadID = tracing.unstable_getThreadID();
        this.memoizedInteractions = new Set();
        this.pendingInteractionMap = new Map();
      }

      if (enableSuspenseCallback) {
        this.hydrationCallbacks = null;
      }
    }

#### createHostFiberRoot

    function createHostRootFiber(tag) {
      var mode;

      if (tag === ConcurrentRoot) {
        mode = ConcurrentMode | BatchedMode | StrictMode;
      } else if (tag === BatchedRoot) {
        mode = BatchedMode | StrictMode;
      } else {
        mode = NoMode;
      }

      if (enableProfilerTimer && isDevToolsPresent) {
        // Always collect profile timings when DevTools are present.
        // This enables DevTools to start capturing timing at any point–
        // Without some nodes in the tree having empty base times.
        mode |= ProfileMode;
      }
      // HostRoot: 3 , mode: 0
      return createFiber(HostRoot, null, null, mode);
    }

#### createFiber

    var createFiber = function (tag, pendingProps, key, mode) {
      // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
      return new FiberNode(tag, pendingProps, key, mode);
    };

#### FiberNode

    function FiberNode(tag, pendingProps, key, mode) {
      // Instance
      this.tag = tag;
      this.key = key;
      this.elementType = null;
      this.type = null;
      this.stateNode = null; // Fiber

      this.return = null;
      this.child = null;
      this.sibling = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = pendingProps;
      this.memoizedProps = null;
      this.updateQueue = null;
      this.memoizedState = null;
      this.dependencies = null;
      this.mode = mode; // Effects

      this.effectTag = NoEffect;
      this.nextEffect = null;
      this.firstEffect = null;
      this.lastEffect = null;
      this.expirationTime = NoWork;
      this.childExpirationTime = NoWork;
      this.alternate = null;

      if (enableProfilerTimer) {
        // Note: The following is done to avoid a v8 performance cliff.
        //
        // Initializing the fields below to smis and later updating them with
        // double values will cause Fibers to end up having separate shapes.
        // This behavior/bug has something to do with Object.preventExtension().
        // Fortunately this only impacts DEV builds.
        // Unfortunately it makes React unusably slow for some applications.
        // To work around this, initialize the fields below with doubles.
        //
        // Learn more about this here:
        // https://github.com/facebook/react/issues/14365
        // https://bugs.chromium.org/p/v8/issues/detail?id=8538
        this.actualDuration = Number.NaN;
        this.actualStartTime = Number.NaN;
        this.selfBaseDuration = Number.NaN;
        this.treeBaseDuration = Number.NaN; // It's okay to replace the initial doubles with smis after initialization.
        // This won't trigger the performance cliff mentioned above,
        // and it simplifies other profiler code (including DevTools).

        this.actualDuration = 0;
        this.actualStartTime = -1;
        this.selfBaseDuration = 0;
        this.treeBaseDuration = 0;
      } // This is normally DEV-only except www when it adds listeners.
      // TODO: remove the User Timing integration in favor of Root Events.


      if (enableUserTimingAPI) {
        this._debugID = debugCounter++;
        this._debugIsCurrentlyTiming = false;
      }

      {
        this._debugSource = null;
        this._debugOwner = null;
        this._debugNeedsRemount = false;
        this._debugHookTypes = null;

        if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(this);
        }
      }
    } // This is a constructor function, rather than a POJO constructor, still
    // please ensure we do the following:
    // 1) Nobody should add any instance methods on this. Instance methods can be
    //    more difficult to predict when they get optimized and they are almost
    //    never inlined properly in static compilers.
    // 2) Nobody should rely on `instanceof Fiber` for type testing. We should
    //    always know when it is a fiber.
    // 3) We might want to experiment with using numeric keys since they are easier
    //    to optimize in a non-JIT environment.
    // 4) We can easily go from a constructor to a createFiber object literal if that
    //    is faster.
    // 5) It should be easy to port this to a C struct and keep a C implementation
    //    compatible.

---

### markContainerAsRoot

    function markContainerAsRoot(hostRoot, node) {
      node[internalContainerInstanceKey] = hostRoot;
    } // Given a DOM node, return the closest HostComponent or HostText fiber ancestor.
    // If the target node is part of a hydrated or not yet rendered subtree, then
    // this may also return a SuspenseComponent or HostRoot to indicate that.
    // Conceptually the HostRoot fiber is a child of the Container node. So if you
    // pass the Container node as the targetNode, you wiill not actually get the
    // HostRoot back. To get to the HostRoot, you need to pass a child of it.
    // The same thing applies to Suspense boundaries.

## getPublicRootInstance

    // container: FiberRootNode
    // if <App /> return null
    // if <div /> return <div />
    function getPublicRootInstance(container) {
      var containerFiber = container.current; // FiberNode

      if (!containerFiber.child) {
        return null;
      }

      switch (containerFiber.child.tag) {
        case HostComponent:
          return getPublicInstance(containerFiber.child.stateNode);

        default:
          return containerFiber.child.stateNode;
      }
    }
