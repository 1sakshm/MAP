<script context="module" lang="ts">
	import {
		modeData,
		seededRandomInt,
		Stats,
		GameState,
		LetterStates,
		getWordNumber,
		words,
	} from "../../utils";
	import Game from "../../components/Game.svelte";
	import { letterStates, mode } from "../../stores";
	import { GameMode } from "../../enums";
	import { Toaster } from "../../components/widgets";

	document.title = "Wordle+ | Speed Wordle (Blitz)";
</script>

<script lang="ts">
	let stats: Stats;
	let word: string;
	let state: GameState;
	let toaster: Toaster;

	const hash = window.location.hash.slice(1).split("/");
	const modeVal: GameMode = !isNaN(GameMode[hash[0]])
		? GameMode[hash[0]]
		: +localStorage.getItem("blitz-mode") || modeData.default;
	mode.set(modeVal);
	if (!isNaN(+hash[1]) && +hash[1] < getWordNumber(modeVal)) {
		modeData.modes[modeVal].seed =
			(+hash[1] - 1) * modeData.modes[modeVal].unit + modeData.modes[modeVal].start;
		modeData.modes[modeVal].historical = true;
	}
	mode.subscribe((m) => {
		localStorage.setItem("blitz-mode", `${m}`);
		window.location.hash = GameMode[m];
		stats = new Stats(localStorage.getItem(`blitz-stats-${m}`) || m);
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[m].seed)];
		if (modeData.modes[m].historical) {
			state = new GameState(m, localStorage.getItem(`blitz-state-${m}-h`));
		} else {
			state = new GameState(m, localStorage.getItem(`blitz-state-${m}`));
		}
		letterStates.set(new LetterStates(state.board));
	});

	$: saveState(state);
	function saveState(state: GameState) {
		if (modeData.modes[$mode].historical) {
			localStorage.setItem(`blitz-state-${$mode}-h`, state.toString());
		} else {
			localStorage.setItem(`blitz-state-${$mode}`, state.toString());
		}
	}
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game statsKey="blitz-stats" blitzMode={true} blitzSeconds={15} {stats} bind:word {toaster} bind:game={state} />
{/if}
