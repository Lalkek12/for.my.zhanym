document.addEventListener('DOMContentLoaded', () => {
    // Секретное сердечко возле последней фотки
    const secretButton = document.querySelector('.secret-heart');
    const secretCard = document.querySelector('.secret-card');

    if (secretButton && secretCard) {
        secretButton.addEventListener('click', () => {
            secretCard.classList.toggle('show');
            secretButton.classList.toggle('open');
            secretButton.textContent = secretCard.classList.contains('show') ? '♥' : '♡';
        });
    }

    // Кнопка с котиком
    const catSecretBtn = document.getElementById('catSecretBtn');
    const catSecretCard = document.getElementById('catSecretCard');

    if (catSecretBtn && catSecretCard) {
        catSecretBtn.addEventListener('click', () => {
            catSecretCard.classList.toggle('show');

            const isOpen = catSecretCard.classList.contains('show');
            catSecretCard.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

            catSecretBtn.textContent = isOpen
                ? 'Мы не забылиии 🐾'
                : 'Тут сюрпризик)';
        });
    }

    // Музыка с сохранением времени между страницами
    const music = document.getElementById('loveMusic');
    const musicBtn = document.getElementById('musicBtn');
    const musicStatus = document.getElementById('musicStatus');
    const musicCard = document.querySelector('.music-card');

    if (music && musicBtn && musicStatus && musicCard) {
        const savedTime = localStorage.getItem('loveMusicTime');
        const wasPlaying = localStorage.getItem('loveMusicPlaying');

        music.volume = 0.55;

        if (savedTime && !Number.isNaN(Number(savedTime))) {
            music.currentTime = Number(savedTime);
        }

        if (wasPlaying === 'true') {
            music.play().then(() => {
                setMusicPlaying();
            }).catch(() => {
                setMusicPaused('нажми, чтобы продолжить');
            });
        }

        musicBtn.addEventListener('click', async () => {
            try {
                if (music.paused) {
                    await music.play();
                    localStorage.setItem('loveMusicPlaying', 'true');
                    setMusicPlaying();
                } else {
                    music.pause();
                    localStorage.setItem('loveMusicPlaying', 'false');
                    setMusicPaused('пауза');
                }
            } catch (error) {
                alert('Музыка не запустилась. Проверь путь: music/music.mp3');
                console.log(error);
            }
        });

        music.addEventListener('timeupdate', () => {
            localStorage.setItem('loveMusicTime', String(music.currentTime));
        });

        music.addEventListener('ended', () => {
            localStorage.setItem('loveMusicPlaying', 'false');
            localStorage.setItem('loveMusicTime', '0');
            setMusicPaused('трек закончился');
        });

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('loveMusicTime', String(music.currentTime));
            localStorage.setItem('loveMusicPlaying', music.paused ? 'false' : 'true');
        });

        function setMusicPlaying() {
            const icon = musicBtn.querySelector('.music-icon');

            musicBtn.classList.add('playing');
            musicCard.classList.add('playing');

            if (icon) {
                icon.textContent = '❚❚';
            }

            musicStatus.textContent = 'играет';
        }

        function setMusicPaused(text) {
            const icon = musicBtn.querySelector('.music-icon');

            musicBtn.classList.remove('playing');
            musicCard.classList.remove('playing');

            if (icon) {
                icon.textContent = '▶';
            }

            musicStatus.textContent = text;
        }
    }
});