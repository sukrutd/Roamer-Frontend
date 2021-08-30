export const isFunction = (_function) => _function instanceof Function;

// Function that removes specific particular key-value pairs from
// the inputObject and return a new object without modifying the inputObject
export const removeFromObjectByKey = (inputObject, keysToRemove) => {
    return Object.keys(inputObject)
        .filter((key) => !keysToRemove.includes(key))
        .reduce((object, key) => {
            object[key] = inputObject[key];
            return object;
        }, {});
};
