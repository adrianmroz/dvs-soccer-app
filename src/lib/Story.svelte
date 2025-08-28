<script>
	import { fade } from 'svelte/transition';
	export let step = 1;

	const stories = [
		'Real Madrid is the most successful club in the 21st century and this is largely due to its squad profile.',
		'Player age is certainly one of the key parameters.',
		"But it can only be intepreted correctly by knowing that players' playing time contribution.",
		"It is clear now that Real Madrid uses a combination of experienced and younger players, but the team's backbone are more experienced players",
		"But this still doesn't paint the complete picture as this team has also displayed great response to pressure, especially in the Champions League, and this is probably due to the fact that the team's most used players have played many seasons together.",
		"Which is also visible from a very high mean players' stay at the club."
	];
</script>

{#key step}
	<p in:fade={{ duration: 300 }}>
		{stories[step - 1]}
	</p>
{/key}
