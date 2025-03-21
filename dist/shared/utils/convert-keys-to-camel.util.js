"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertKeysToCamel = void 0;
const toCamelCase = (str) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
const convertKeysToCamel = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(exports.convertKeysToCamel);
    }
    if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[toCamelCase(key)] = (0, exports.convertKeysToCamel)(value);
        }
        return newObj;
    }
    return obj;
};
exports.convertKeysToCamel = convertKeysToCamel;
//# sourceMappingURL=convert-keys-to-camel.util.js.map