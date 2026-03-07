export const gameState = {
    user: {
        name: '',
        email: '',
        enrollNo: '',
        regNo: '',
        department: '',
        year: '',
        section: ''
    },
    level: 0, // 0: Login, 1: Level 1, 2: Level 2, 3: Level 3, 4: Results
    gameMode: 'campaign', // 'campaign' or 'quiz'
    scores: {
        l1: 0,
        l2: 0,
        l3: 0,
    },
    startTime: null,
    totalTime: 0,
    keys: {
        l1: 'SEO_MASTER_77',
        l2: 'VAULT_SECRET_99',
    },
    inventory: [],
    hasSubmitted: false, // Prevents duplicate Google Sheet entries
};

export const updateState = (updates, silent = false) => {
    Object.assign(gameState, updates);
    if (!silent) render();
};

let renderCallback = () => { };
export const setRenderCallback = (cb) => {
    renderCallback = cb;
};

const render = () => {
    renderCallback(gameState);
};
