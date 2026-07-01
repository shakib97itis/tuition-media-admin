import type { ReactNode } from "react";
import type { TPath } from "../types/path";

type TRoute = {
  path: string;
  element: ReactNode;
};

export const routesGenerator = (routesPath: TPath[]): TRoute[] => {
  return routesPath.reduce((acc: TRoute[], route) => {
    // CASE 1: Top-level route configuration
    if (route.path && route.element) {
      acc.push({
        path: route.path,
        element: route.element,
      });
    }

    // CASE 2: Process Child route groups
    if (route.children) {
      route.children.forEach((child) => {
        // Level 2 direct path
        if (child.path && child.element) {
          acc.push({
            path: child.path,
            element: child.element,
          });
        }

        // Level 3 Grandchild direct path
        if (child.children) {
          child.children.forEach((grandChild) => {
            if (grandChild.path && grandChild.element) {
              acc.push({
                path: grandChild.path,
                element: grandChild.element,
              });
            }
          });
        }
      });
    }

    return acc;
  }, []);
};
