const HIGHSCORE_KEY = "zombieSurvivalHighscore";

export function getHighscore() {
    const stored = localStorage.getItem(HIGHSCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
}

// slaat de score op als het een nieuw record is, geeft true terug zo ja
export function saveHighscoreIfBetter(score) {
    const current = getHighscore();
    if (score > current) {
        localStorage.setItem(HIGHSCORE_KEY, score.toString());
        return true;
    }
    return false;
}
