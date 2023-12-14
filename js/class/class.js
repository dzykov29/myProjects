// Запустить таймер
// Поставить на паузу
// Сбросить таймер

export default class TimerDisplay {
    constructor(seconds) {
        if (typeof seconds !== 'number' || seconds < 1) {
            throw new TypeError('Кол-во секунд должно быть числом больше 1');
        }
        this.startTime = seconds;
        this.currentTime = seconds;
    }

    set currentTime(time) {
        this._currentTime = time;
        if (this.displayElement)
        this.displayElement.textContent = time;
    }

    get currentTime() {
        return this._currentTime;
    }

    get elapsedTime() {
        return this.startTime - this.currentTime;
    }

    start() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    pause() {
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.currentTime = this.startTime;
    }

    tick() {
        if (this.currentTime <= 0) {
            this.currentTime = 0;
            this.pause();
            return;
        }
        --this.currentTime;
    }

    getComponentElement() {
        if (this.rootElement) return this.rootElement;
        const root = document.createElement('div');
        const currentTimeDisplay = document.createElement('div');
        const startBtn = document.createElement('button');
        const pauseBtn = document.createElement('button');
        const resetBtn = document.createElement('button');
        root.classList.add('timer-display');
        currentTimeDisplay.classList.add('timer-display__current');
        startBtn.classList.add('timer-display__start');
        pauseBtn.classList.add('timer-display__pause');
        resetBtn.classList.add('timer-display__reset');
        root.append(currentTimeDisplay);
        root.append(startBtn);
        root.append(pauseBtn);
        root.append(resetBtn);
        startBtn.textContent = 'Старт';
        pauseBtn.textContent = 'Пауза';
        resetBtn.textContent = 'Сброс';

        startBtn.addEventListener('click', () => this.start());
        pauseBtn.addEventListener('click', () => this.pause());
        resetBtn.addEventListener('click', () => this.reset());

        this.rootElement = root;
        this.displayElement = currentTimeDisplay;
        this.displayElement.textContent = this.currentTime;

        return root;
    }
}
