import _extends from "@babel/runtime/helpers/esm/extends";
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid/internals';
import { GridProColumnMenu } from "../components/GridProColumnMenu.js";
import { GridColumnHeaders } from "../components/GridColumnHeaders.js";
import { GridHeaderFilterMenu } from "../components/headerFiltering/GridHeaderFilterMenu.js";
import { GridHeaderFilterCell } from "../components/headerFiltering/GridHeaderFilterCell.js";
import { GridDetailPanels } from "../components/GridDetailPanels.js";
import { GridPinnedRows } from "../components/GridPinnedRows.js";
import materialSlots from "../material/index.js";
export const DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS = _extends({}, DATA_GRID_DEFAULT_SLOTS_COMPONENTS, materialSlots, {
  columnMenu: GridProColumnMenu,
  columnHeaders: GridColumnHeaders,
  detailPanels: GridDetailPanels,
  headerFilterCell: GridHeaderFilterCell,
  headerFilterMenu: GridHeaderFilterMenu,
  pinnedRows: GridPinnedRows
});