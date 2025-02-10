import _extends from "@babel/runtime/helpers/esm/extends";
import { useGridAriaAttributes as useGridAriaAttributesCommunity } from '@mui/x-data-grid/internals';
import { useGridRootProps } from "./useGridRootProps.js";
export const useGridAriaAttributes = () => {
  const ariaAttributesCommunity = useGridAriaAttributesCommunity();
  const rootProps = useGridRootProps();
  const ariaAttributesPro = rootProps.treeData ? {
    role: 'treegrid'
  } : {};
  return _extends({}, ariaAttributesCommunity, ariaAttributesPro);
};