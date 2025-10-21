import type { Rule } from "unocss";

export default [
  [/(border|bd)-collapse/, () => ({ "border-collapse": "collapse" })]
] as Rule[];
