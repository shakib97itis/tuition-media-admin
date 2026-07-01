import { NavLink } from "react-router-dom";
import type { JSX } from "react";
import type { TPath } from "../types/path";

type TSidebarMenu = {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: TSidebarMenu[];
};

export const navigationGenerator = (
  navigationPath: TPath[],
  role: string,
): TSidebarMenu[] => {
  return navigationPath.reduce((acc: TSidebarMenu[], route: TPath) => {
    // CASE 1: Parent with no children (Single level link)
    if (route.path && route.name) {
      acc.push({
        key: `${role}/${route.path}`,
        label: <NavLink to={`/${role}/${route.path}`}>{route.name}</NavLink>,
        icon: route.icon,
      });
    }

    // CASE 2: Parent with sub-menus
    if (route.name && route.children) {
      acc.push({
        key: `${role}/${route.name}`,
        label: route.name,
        icon: route.icon,
        children: route.children.map((child, index) => {
          // Level 2 Sub-menu (Has nested Grandchildren)
          if (child.name && child.children) {
            return {
              key: `${role}/${route.name}/${child.name.toLowerCase() + index}`,
              label: child.name,
              icon: child.icon,
              children: child.children.map((grandChild) => ({
                key: `${role}/${grandChild.path}`,
                label: (
                  <NavLink to={`/${role}/${grandChild.path}`}>
                    {grandChild.name}
                  </NavLink>
                ),
                icon: grandChild.icon,
              })),
            };
          }

          // Level 2 Standard Link
          return {
            key: `${role}/${child.path}`,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
            icon: child.icon,
          };
        }),
      });
    }

    return acc;
  }, []);
};
