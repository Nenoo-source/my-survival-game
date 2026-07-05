import { ScreenElement, Label, Font, FontUnit, Color, Vector } from "excalibur";

// ScreenElement i.p.v. Actor -> blijft vast op het scherm staan,
// ook als de camera de speler over een grote map volgt.
export class UI extends ScreenElement {
    onInitialize() {
        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(20, 20),
            font: new Font({ family: "Arial", size: 24, unit: FontUnit.Px, color: Color.White })
        });
        this.addChild(this.scoreLabel);

        this.ammoLabel = new Label({
            text: "Ammo: 30",
            pos: new Vector(20, 50),
            font: new Font({ family: "Arial", size: 24, unit: FontUnit.Px, color: Color.White })
        });
        this.addChild(this.ammoLabel);
    }

    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
    }

    updateAmmo(ammo) {
        this.ammoLabel.text = `Ammo: ${ammo}`;
    }
}
