import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    ignores: [
      "**/node_modules/",
      ".git/",
      "**/dist/",
      "**/.DS_Store/",
      "**/pnpm-lock.yaml",
      "**/.*.json",
      "**/*.d.ts",
      "**/*.md",
    ],
  },
  {
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
  },
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
      "unused-imports": pluginUnusedImports,
      import: fixupPluginRules(pluginImport),
    },
    rules: {
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-var": "error",
      "no-constant-condition": [
        "error",
        {
          checkLoops: false,
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "vue/multi-word-component-names": "off",
      "vue/no-deprecated-v-on-native-modifier": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/no-named-as-default": "off",
      "import/export": "off",
    },
  },
];
