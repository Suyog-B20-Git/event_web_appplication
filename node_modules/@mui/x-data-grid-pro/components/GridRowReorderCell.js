"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowReorderCell = GridRowReorderCell;
exports.renderRowReorderCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    isDraggable,
    classes
  } = ownerState;
  const slots = {
    root: ['rowReorderCell', isDraggable && 'rowReorderCell--draggable'],
    placeholder: ['rowReorderCellPlaceholder']
  };
  return (0, _composeClasses.default)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};
function GridRowReorderCell(params) {
  const apiRef = (0, _xDataGrid.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const sortModel = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridSortModelSelector);
  const treeDepth = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridRowMaximumTreeDepthSelector);
  const editRowsState = (0, _xDataGrid.useGridSelector)(apiRef, _internals.gridEditRowsStateSelector);
  // eslint-disable-next-line no-underscore-dangle
  const cellValue = params.row.__reorder__ || params.id;

  // TODO: remove sortModel and treeDepth checks once row reorder is compatible
  const isDraggable = React.useMemo(() => !!rootProps.rowReordering && !sortModel.length && treeDepth === 1 && Object.keys(editRowsState).length === 0, [rootProps.rowReordering, sortModel, treeDepth, editRowsState]);
  const ownerState = {
    isDraggable,
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // Ignore portal
    if ((0, _internals.isEventTargetInPortal)(event)) {
      return;
    }

    // The row might have been deleted
    if (!apiRef.current.getRow(params.id)) {
      return;
    }
    apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(params.id), event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, params.id]);
  const draggableEventHandlers = isDraggable ? {
    onDragStart: publish('rowDragStart'),
    onDragOver: publish('rowDragOver'),
    onDragEnd: publish('rowDragEnd')
  } : null;
  if (params.rowNode.type === 'footer') {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    className: classes.root,
    draggable: isDraggable
  }, draggableEventHandlers, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.rowReorderIcon, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: classes.placeholder,
      children: cellValue
    })]
  }));
}
process.env.NODE_ENV !== "production" ? GridRowReorderCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   */
  api: _propTypes.default.object.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: _propTypes.default.oneOf(['edit', 'view']).isRequired,
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: _propTypes.default.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: _propTypes.default.string.isRequired,
  /**
   * A ref allowing to set imperative focus.
   * It can be passed to the element that should receive focus.
   * @ignore - do not document.
   */
  focusElementRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape({
      focus: _propTypes.default.func.isRequired
    })
  })]),
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: _propTypes.default.any,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: _propTypes.default.bool.isRequired,
  /**
   * The grid row id.
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  /**
   * If true, the cell is editable.
   */
  isEditable: _propTypes.default.bool,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: _propTypes.default.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: _propTypes.default.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: _propTypes.default.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: _propTypes.default.any
} : void 0;
const renderRowReorderCell = params => {
  if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridRowReorderCell, (0, _extends2.default)({}, params));
};
exports.renderRowReorderCell = renderRowReorderCell;