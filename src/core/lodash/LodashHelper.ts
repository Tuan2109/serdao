import type { PropertyPath } from "lodash";
import defaultTo from "lodash/defaultTo";
import get from "lodash/get";
import isArray from "lodash/isArray";

export const safeGetArray = <T>(object: unknown, path: PropertyPath, defaultValue: T[]): T[] => {
    const value = get(object, path);
    const valueToReturn = defaultTo(value, defaultValue);
    if (isArray(valueToReturn)) {
        return valueToReturn;
    }
    return defaultValue;
};
