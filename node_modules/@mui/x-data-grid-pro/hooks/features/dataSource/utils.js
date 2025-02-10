"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runIfServerMode = exports.RequestStatus = exports.NestedDataManager = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
const MAX_CONCURRENT_REQUESTS = Infinity;
const runIfServerMode = (modeProp, fn) => () => {
  if (modeProp === 'server') {
    fn();
  }
};
exports.runIfServerMode = runIfServerMode;
let RequestStatus = exports.RequestStatus = /*#__PURE__*/function (RequestStatus) {
  RequestStatus[RequestStatus["QUEUED"] = 0] = "QUEUED";
  RequestStatus[RequestStatus["PENDING"] = 1] = "PENDING";
  RequestStatus[RequestStatus["SETTLED"] = 2] = "SETTLED";
  RequestStatus[RequestStatus["UNKNOWN"] = 3] = "UNKNOWN";
  return RequestStatus;
}({});
/**
 * Fetches row children from the server with option to limit the number of concurrent requests
 * Determines the status of a request based on the enum `RequestStatus`
 * Uses `GridRowId` to uniquely identify a request
 */
class NestedDataManager {
  constructor(privateApiRef, maxConcurrentRequests = MAX_CONCURRENT_REQUESTS) {
    this.pendingRequests = new Set();
    this.queuedRequests = new Set();
    this.settledRequests = new Set();
    this.api = void 0;
    this.maxConcurrentRequests = void 0;
    this.processQueue = async () => {
      if (this.queuedRequests.size === 0 || this.pendingRequests.size >= this.maxConcurrentRequests) {
        return;
      }
      const loopLength = Math.min(this.maxConcurrentRequests - this.pendingRequests.size, this.queuedRequests.size);
      if (loopLength === 0) {
        return;
      }
      const fetchQueue = Array.from(this.queuedRequests);
      for (let i = 0; i < loopLength; i += 1) {
        const id = fetchQueue[i];
        this.queuedRequests.delete(id);
        this.pendingRequests.add(id);
        this.api.fetchRowChildren(id);
      }
    };
    this.queue = async ids => {
      const loadingIds = {};
      ids.forEach(id => {
        this.queuedRequests.add(id);
        loadingIds[id] = true;
      });
      this.api.setState(state => (0, _extends2.default)({}, state, {
        dataSource: (0, _extends2.default)({}, state.dataSource, {
          loading: (0, _extends2.default)({}, state.dataSource.loading, loadingIds)
        })
      }));
      this.processQueue();
    };
    this.setRequestSettled = id => {
      this.pendingRequests.delete(id);
      this.settledRequests.add(id);
      this.processQueue();
    };
    this.clear = () => {
      this.queuedRequests.clear();
      Array.from(this.pendingRequests).forEach(id => this.clearPendingRequest(id));
    };
    this.clearPendingRequest = id => {
      this.api.unstable_dataSource.setChildrenLoading(id, false);
      this.pendingRequests.delete(id);
      this.processQueue();
    };
    this.getRequestStatus = id => {
      if (this.pendingRequests.has(id)) {
        return RequestStatus.PENDING;
      }
      if (this.queuedRequests.has(id)) {
        return RequestStatus.QUEUED;
      }
      if (this.settledRequests.has(id)) {
        return RequestStatus.SETTLED;
      }
      return RequestStatus.UNKNOWN;
    };
    this.getActiveRequestsCount = () => this.pendingRequests.size + this.queuedRequests.size;
    this.api = privateApiRef.current;
    this.maxConcurrentRequests = maxConcurrentRequests;
  }
}
exports.NestedDataManager = NestedDataManager;