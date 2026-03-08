export const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve) => {
        const animationName = `${prefix}${animation}`;
        const node = typeof element === 'string' ? document.querySelector(element) : element;

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

export const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const shuffleOptions = (options, correctIdx) => {
    const indexedOptions = options.map((opt, i) => ({ text: opt, isCorrect: i === correctIdx }));
    const shuffled = shuffleArray(indexedOptions);
    const newOptions = shuffled.map(o => o.text);
    const newCorrectIdx = shuffled.findIndex(o => o.isCorrect);
    return { options: newOptions, correctIdx: newCorrectIdx };
};
