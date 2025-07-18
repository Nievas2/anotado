module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Disables the rule
    // or to change it to a warning instead of an error:
    // "@typescript-eslint/no-explicit-any": "warn",
  },
}
