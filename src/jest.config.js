module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Transpile TypeScript files with Babel
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Ensure Jest recognizes these extensions
  testEnvironment: "jsdom",
};
