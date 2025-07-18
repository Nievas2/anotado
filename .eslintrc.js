// .eslintrc.js
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // <-- desactiva el error por usar any
  },
}
