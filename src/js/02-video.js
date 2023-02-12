console.clear();

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'time';

player.on('timeupdate', throttle(onPlay, 1800));

function onPlay({ seconds }) {
	localStorage.setItem(STORAGE_KEY, seconds);
}

player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
