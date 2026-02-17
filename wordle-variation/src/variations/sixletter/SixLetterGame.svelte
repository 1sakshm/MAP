<script context="module" lang="ts">
	import {
		modeData,
		seededRandomInt,
		Stats,
		GameState,
		LetterStates,
		getWordNumber,
		createWordList,
	} from "../../utils";
	import Game from "../../components/Game.svelte";
	import { letterStates, mode } from "../../stores";
	import { GameMode } from "../../enums";
	import { Toaster } from "../../components/widgets";
	import wordList6 from "../../words_6";

	document.title = "Wordle+ | 6-Letter Word Game";

	const COLS = 6;
	const ROWS = 6;
	const words6 = createWordList(wordList6);
</script>

<script lang="ts">
	let stats: Stats;
	let word: string;
	let state: GameState;
	let toaster: Toaster;

	const hash = window.location.hash.slice(1).split("/");
	const modeVal: GameMode = !isNaN(GameMode[hash[0]])
		? GameMode[hash[0]]
		: +localStorage.getItem("six-mode") || modeData.default;
	mode.set(modeVal);
	if (!isNaN(+hash[1]) && +hash[1] < getWordNumber(modeVal)) {
		modeData.modes[modeVal].seed =
			(+hash[1] - 1) * modeData.modes[modeVal].unit + modeData.modes[modeVal].start;
		modeData.modes[modeVal].historical = true;
	}
	mode.subscribe((m) => {
		localStorage.setItem("six-mode", `${m}`);
		window.location.hash = GameMode[m];
		stats = new Stats(localStorage.getItem(`six-stats-${m}`) || m);
		word = words6.words[seededRandomInt(0, words6.words.length, modeData.modes[m].seed)];
		if (modeData.modes[m].historical) {
			state = new GameState(m, localStorage.getItem(`six-state-${m}-h`), COLS, ROWS);
		} else {
			state = new GameState(m, localStorage.getItem(`six-state-${m}`), COLS, ROWS);
		}
		letterStates.set(new LetterStates(state.board));
	});

	$: saveState(state);
	function saveState(state: GameState) {
		if (modeData.modes[$mode].historical) {
			localStorage.setItem(`six-state-${$mode}-h`, state.toString());
		} else {
			localStorage.setItem(`six-state-${$mode}`, state.toString());
		}
	}
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game cols={COLS} rows={ROWS} wordList={words6} {stats} bind:word {toaster} bind:game={state} />
{/if}
