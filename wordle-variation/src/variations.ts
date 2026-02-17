import type { SvelteComponent } from "svelte";
import ClassicGame from "./variations/classic/ClassicGame.svelte";
import SixLetterGame from "./variations/sixletter/SixLetterGame.svelte";
import BlitzGame from "./variations/blitz/BlitzGame.svelte";

export interface Variation {
  id: string;
  name: string;
  description: string;
  icon: string; // SVG path data
  component: typeof SvelteComponent;
}

export const variations: Variation[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Guess the 5-letter word",
    icon: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z",
    component: ClassicGame,
  },
  {
    id: "sixletter",
    name: "Six",
    description: "Guess the 6-letter word",
    icon: "M3 3h5v5H3V3zm7 0h5v5h-5V3zm7 0h4v5h-4V3zM3 10h5v5H3v-5zm7 0h5v5h-5v-5zm7 0h4v5h-4v-5z",
    component: SixLetterGame,
  },
  {
    id: "blitz",
    name: "Blitz",
    description: "15 seconds per guess!",
    icon: "M13 2L4 14h7l-2 8 9-12h-7l2-8z",
    component: BlitzGame,
  },
];
