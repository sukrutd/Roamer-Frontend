export const isFunction = (_function) => _function instanceof Function;

// Function that removes a particular key-value pair from the inputObject
// and return a new object without modifying the inputObject
export const removeFromObjectByKey = (inputObject, keyToRemove) => {
    return Object.keys(inputObject)
        .filter((key) => key !== keyToRemove)
        .reduce((object, key) => {
            object[key] = inputObject[key];
            return object;
        }, {});
};
