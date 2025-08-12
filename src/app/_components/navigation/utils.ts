import { NavItem } from './types';

export const isParentActive = (item: NavItem, currentPath: string): boolean => {
  if (item.items) {
    return item.items.some((subItem) => subItem.href === currentPath);
  }
  return false;
};