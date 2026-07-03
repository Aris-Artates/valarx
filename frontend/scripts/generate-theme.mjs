#!/usr/bin/env node
/**
 * Generates app/theme.css from theme/theme.json.
 *
 * theme.json is the single source of truth for branding/design tokens.
 * This script emits:
 *   - a `:root` block with the raw user-facing variables (--primary, --accent, ...)
 *   - a Tailwind v4 `@theme inline` block mapping them to utility namespaces
 *     (--color-*, --font-*, --text-*, --radius-*, --shadow-*, --ease-*)
 *
 * Runs automatically via the `predev` / `prebuild` npm hooks.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const themePath = join(frontendRoot, "theme", "theme.json");
const outPath = join(frontendRoot, "app", "theme.css");

const theme = JSON.parse(readFileSync(themePath, "utf8"));

// "{token}" -> "var(--token)"
const resolve = (value) => String(value).replace(/\{([a-z0-9-]+)\}/gi, "var(--$1)");

// Tailwind class names for color tokens whose raw names would read badly as
// utilities (text-text, bg-background-deepest, ...).
const COLOR_UTILITY_ALIASES = {
  text: "ink",
  "text-on-accent": "on-accent",
  "background-deepest": "deepest",
};

const rootVars = [];
const themeVars = [];

for (const [name, value] of Object.entries(theme.colors)) {
  rootVars.push(`  --${name}: ${resolve(value)};`);
  const utility = COLOR_UTILITY_ALIASES[name] ?? name;
  themeVars.push(`  --color-${utility}: var(--${name});`);
}

for (const [name, value] of Object.entries(theme.typography.fonts)) {
  themeVars.push(`  --font-${name}: ${resolve(value)};`);
}

for (const [name, value] of Object.entries(theme.typography.scale)) {
  const [size, lineHeight] = String(value).split("/");
  themeVars.push(`  --text-${name}: ${size.trim()};`);
  if (lineHeight) themeVars.push(`  --text-${name}--line-height: ${lineHeight.trim()};`);
}

for (const [name, value] of Object.entries(theme.typography.eyebrow)) {
  rootVars.push(`  --eyebrow-${name}: ${resolve(value)};`);
}

for (const [name, value] of Object.entries(theme.radius)) {
  themeVars.push(`  --radius-${name}: ${resolve(value)};`);
}

for (const [name, value] of Object.entries(theme.shadows)) {
  themeVars.push(`  --shadow-${name}: ${resolve(value)};`);
}

for (const [name, value] of Object.entries(theme.motion.durations)) {
  rootVars.push(`  --duration-${name}: ${resolve(value)};`);
}

for (const [name, value] of Object.entries(theme.motion.easings)) {
  themeVars.push(`  --ease-${name}: ${resolve(value)};`);
}

const css = `/* GENERATED from theme/theme.json — do not edit by hand.
 * Regenerate with: node scripts/generate-theme.mjs
 * (runs automatically via the predev/prebuild npm hooks) */

:root {
${rootVars.join("\n")}
}

@theme inline {
${themeVars.join("\n")}
}
`;

writeFileSync(outPath, css);
console.log(`Generated ${outPath} from theme/theme.json`);
