"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHeaderFilterMenuContainer = GridHeaderFilterMenuContainer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGrid = require("@mui/x-data-grid");
var _utils = require("@mui/utils");
var _internals = require("@mui/x-data-grid/internals");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["operators", "item", "field", "buttonRef", "headerFilterMenuRef", "disabled"];
const sx = {
  width: 22,
  height: 22,
  margin: 'auto 0 10px 5px'
};
function GridHeaderFilterMenuContainer(props) {
  const {
      operators,
      item,
      field,
      buttonRef,
      headerFilterMenuRef,
      disabled = false
    } = props,
    others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const buttonId = (0, _utils.unstable_useId)();
  const menuId = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const apiRef = (0, _xDataGrid.useGridApiContext)();
  const menuOpenField = (0, _xDataGrid.useGridSelector)(apiRef, _internals.gridHeaderFilteringMenuSelector);
  const open = Boolean(menuOpenField === field && headerFilterMenuRef.current);
  const handleClick = event => {
    headerFilterMenuRef.current = event.currentTarget;
    apiRef.current.showHeaderFilterMenu(field);
  };
  if (!rootProps.slots.headerFilterMenu) {
    return null;
  }
  const label = apiRef.current.getLocaleText('filterPanelOperator');
  const labelString = label ? String(label) : undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseIconButton, (0, _extends2.default)({
      id: buttonId,
      ref: buttonRef,
      "aria-label": labelString,
      title: labelString,
      "aria-controls": menuId,
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "true",
      tabIndex: -1,
      size: "small",
      onClick: handleClick,
      sx: sx,
      disabled: disabled
    }, rootProps.slotProps?.baseIconButton, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.openFilterButtonIcon, {
        fontSize: "small"
      })
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.headerFilterMenu, (0, _extends2.default)({
      field: field,
      open: open,
      item: item,
      target: headerFilterMenuRef.current,
      operators: operators,
      labelledBy: buttonId,
      id: menuId
    }, others))]
  });
}
process.env.NODE_ENV !== "production" ? GridHeaderFilterMenuContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  applyFilterChanges: _propTypes.default.func.isRequired,
  buttonRef: _utils.refType,
  disabled: _propTypes.default.bool,
  field: _propTypes.default.string.isRequired,
  headerFilterMenuRef: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired,
  operators: _propTypes.default.arrayOf(_propTypes.default.shape({
    getApplyFilterFn: _propTypes.default.func.isRequired,
    getValueAsString: _propTypes.default.func,
    headerLabel: _propTypes.default.string,
    InputComponent: _propTypes.default.elementType,
    InputComponentProps: _propTypes.default.object,
    label: _propTypes.default.string,
    requiresFilterValue: _propTypes.default.bool,
    value: _propTypes.default.string.isRequired
  })).isRequired
} : void 0;