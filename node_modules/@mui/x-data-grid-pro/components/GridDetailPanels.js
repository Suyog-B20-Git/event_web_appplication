"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridDetailPanels = GridDetailPanels;
var React = _interopRequireWildcard(require("react"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _useGridPrivateApiContext = require("../hooks/utils/useGridPrivateApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _detailPanel = require("../hooks/features/detailPanel");
var _GridDetailPanel = require("./GridDetailPanel");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = () => {
  const slots = {
    detailPanel: ['detailPanel']
  };
  return (0, _composeClasses.default)(slots, _xDataGrid.getDataGridUtilityClass, {});
};
function GridDetailPanels(props) {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  if (!rootProps.getDetailPanelContent) {
    return null;
  }
  return /*#__PURE__*/React.createElement(GridDetailPanelsImpl, props);
}
function GridDetailPanelsImpl({
  virtualScroller
}) {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const classes = useUtilityClasses();
  const {
    setPanels
  } = virtualScroller;
  const expandedRowIds = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowIdsSelector);
  const detailPanelsContent = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowsContentCacheSelector);
  const detailPanelsHeights = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowsHeightCacheSelector);
  const getDetailPanel = React.useCallback(rowId => {
    const content = detailPanelsContent[rowId];

    // Check if the id exists in the current page
    const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
    const exists = rowIndex !== undefined;
    if (! /*#__PURE__*/React.isValidElement(content) || !exists) {
      return null;
    }
    const hasAutoHeight = apiRef.current.detailPanelHasAutoHeight(rowId);
    const height = hasAutoHeight ? 'auto' : detailPanelsHeights[rowId];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridDetailPanel.GridDetailPanel, {
      rowId: rowId,
      height: height,
      className: classes.detailPanel,
      children: content
    }, `panel-${rowId}`);
  }, [apiRef, classes.detailPanel, detailPanelsHeights, detailPanelsContent]);
  React.useEffect(() => {
    if (expandedRowIds.length === 0) {
      setPanels(_internals.EMPTY_DETAIL_PANELS);
    } else {
      setPanels(new Map(expandedRowIds.map(rowId => [rowId, getDetailPanel(rowId)])));
    }
  }, [expandedRowIds, setPanels, getDetailPanel]);
  return null;
}