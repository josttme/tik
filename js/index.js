let newArrayVideos = [];
let todasPagesVideos = [];
let page = 0;
let videosText = '';
let elemento;
const mainContainerTiktok = document.getElementById(
	'mainContainerTiktok'
);

let observador = new IntersectionObserver(
	entradas => {
		entradas.forEach(entradas => {
			if (entradas.isIntersecting) {
				page++;
				cargarPeliculas();
				console.log(page);
			}
		});
	},
	{
		rootMargin: '0px 0px 0px 0px',
		threshold: 1.0,
	}
);
const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(
			`https://tiktokclone-2e68a-default-rtdb.firebaseio.com/initilState.json`
		);
		if (respuesta.status === 200) {
			const datos = await respuesta.json();
			datos.motivation.forEach(video =>
				newArrayVideos.push(video.video)
			);

			if (page === 0) {
				mezclarVideos(newArrayVideos);
				todasPagesVideos = newArrayVideos.chunk(3);
				/* 	console.log(newArrayVideos);
				console.log(todasPagesVideos); */
			}
			elemento = document.createElement('div');
			console.log(mainContainerTiktok.childElementCount);

			todasPagesVideos[page].forEach(function numerosAleatorios(video) {
				elemento.innerHTML += `
      <div class="main-container_tiktok_content">

      <video class="videos" loop playsinline>
      <source src="${video}">
      </video>
      </div>
      `;
			});

			mainContainerTiktok.insertAdjacentElement('beforeend', elemento);

			const videosPantalla = document.getElementById(
				mainContainerTiktok
			);

			const videosEnPantalla = document.querySelectorAll(
				'.main-container_tiktok .main-container_tiktok_content'
			);
			console.log(videosEnPantalla);
			let video = videosEnPantalla.length;
			console.log(video);
			ultimoVideo = videosEnPantalla[videosEnPantalla.length - 1];
			console.log(ultimoVideo);
			observador.observe(ultimoVideo);
		} else if (respuesta.status === 401) {
			console.log('Pusiste la llave mal');
		} else if (respuesta.status === 404) {
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}
	} catch (error) {
		console.log(error);
	}
};
cargarPeliculas();
function mezclarVideos(videos) {
	let i, j, k;
	for (i = videos.length; i; i--) {
		j = Math.floor(Math.random() * i);
		k = videos[i - 1];
		videos[i - 1] = videos[j];
		videos[j] = k;
	}
}
Object.defineProperty(Array.prototype, 'chunk', {
	value: function (chunkSize) {
		let temporal = [];

		for (let i = 0; i < this.length; i += chunkSize) {
			temporal.push(this.slice(i, i + chunkSize));
		}

		return temporal;
	},
});

containervideos.addEventListener('load', videoScroll);
containervideos.addEventListener('scroll', videoScroll);

function videoScroll() {
	if (document.querySelectorAll('video').length > 0) {
		var windowHeight = window.innerHeight,
			videoEl = document.querySelectorAll('video');
		for (var i = 0; i < videoEl.length; i++) {
			var thisVideoEl = videoEl[i],
				videoHeight = thisVideoEl.clientHeight,
				videoClientRect = thisVideoEl.getBoundingClientRect().top;

			if (
				videoClientRect <= windowHeight - videoHeight * 0.5 &&
				videoClientRect >= 0 - videoHeight * 0.5
			) {
				thisVideoEl.play();
			} else {
				thisVideoEl.pause();
				thisVideoEl.currentTime = 0;
			}
		}
	}
	const v = document.querySelectorAll('video');

	function MediaPlayer(config) {
		this.media = config.el;
	}
	MediaPlayer.prototype.play = function () {
		this.media.play();
	};
	MediaPlayer.prototype.pause = function () {
		this.media.pause();
	};
	MediaPlayer.prototype.togglePlay = function () {
		if (this.media.paused) {
			this.play();
		} else {
			this.pause();
		}
	};
	const player = new MediaPlayer({ el: v });
	v.forEach(element =>
		element.addEventListener('click', function () {
			element.pause();
		})
	);
}
