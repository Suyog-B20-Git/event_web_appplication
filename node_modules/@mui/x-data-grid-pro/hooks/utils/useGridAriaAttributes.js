"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridAriaAttributes = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-data-grid/internals");
var _useGridRootProps = require("./useGridRootProps");
const useGridAriaAttributes = () => {
  const ariaAttributesCommunity = (0, _internals.useGridAriaAttributes)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ariaAttributesPro = rootProps.treeData ? {
    role: 'treegrid'
  } : {};
  return (0, _extends2.default)({}, ariaAttributesCommunity, ariaAttributesPro);
};
exports.useGridAriaAttributes = useGridAriaAttributes;