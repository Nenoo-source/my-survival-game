import { Scene, Label, Font, FontUnit, Color, Vector, Keys } from "excalibur";
import { getHighscore, saveHighscoreIfBetter } from "./highscore.js";

export class GameOverScene extends Scene {
    onInitialize(engine) {
        this.add(new Label({
            text: "GAME OVER",
            pos: new Vector(engine.halfDrawWidth - 150, engine.halfDrawHeight - 80),
            font: new Font({ family: "Arial", size: 48, unit: FontUnit.Px, color: Color.Red })
        }));

        this.scoreLabel = new Label({
            text: "",
            pos: new Vector(engine.halfDrawWidth - 150, engine.halfDrawHeight - 20),
            font: new Font({ family: "Arial", size: 28, unit: FontUnit.Px, color: Color.White })
        });
        this.add(this.scoreLabel);

        this.highscoreLabel = new Label({
            text: "",
            pos: new Vector(engine.halfDrawWidth - 150, engine.halfDrawHeight + 20),
            font: new Font({ family: "Arial", size: 28, unit: FontUnit.Px, color: Color.Yellow })
        });
        this.add(this.highscoreLabel);

        this.add(new Label({
            text: "Druk op SPACE om opnieuw te beginnen",
            pos: new Vector(engine.halfDrawWidth - 220, engine.halfDrawHeight + 70),
            font: new Font({ family: "Arial", size: 20, unit: FontUnit.Px, color: Color.White })
        }));

        // simpelste manier om alles weer vers te laten starten: pagina herladen
        engine.input.keyboard.on("press", (evt) => {
            if (evt.key === Keys.Space) location.reload();
        });
    }

    onActivate() {
        const score = this.engine.finalScore ?? 0;
        const isNewRecord = saveHighscoreIfBetter(score);
        this.scoreLabel.text = `Score: ${score}`;
        this.highscoreLabel.text = isNewRecord ? "Nieuwe highscore!" : `Highscore: ${getHighscore()}`;
    }
}
