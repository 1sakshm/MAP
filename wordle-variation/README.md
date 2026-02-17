# Wordle Variations

A multi-variation Wordle game built on top of [MikhaD's Wordle+](https://github.com/MikhaD/wordle). Full credit to [MikhaD](https://github.com/MikhaD) for the original Wordle+ project — this version extends it with a variation system that lets you switch between different Wordle game types.

## What's different

- **Sidebar navigation** to switch between game variations
- **Classic (5-letter)** — the original Wordle+ experience, unchanged
- **Six Letter** — Wordle with 6-letter words
- **Variation registry** — adding a new game type is as simple as creating a component and adding one entry to `src/variations.ts`

All original Wordle+ features (daily/hourly/infinite modes, hard mode, stats, sharing, historical games, etc.) work within each variation. Each variation maintains its own separate stats and game state.

## How to add a new variation

1. Create your variation component in `src/variations/<name>/`
2. Add an entry to the `variations` array in `src/variations.ts`

That's it.

## Running locally

```bash
npm install
npm run dev
```

## Credits

Original Wordle+ by [MikhaD](https://github.com/MikhaD/wordle), licensed under GPL-3.0.
