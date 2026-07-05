import { ScreenElement, Actor, Label, Font, FontUnit, Color, Vector } from "excalibur";
 
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
 
        // Healthbar direct onder de Score.
        this.healthBarBackground = new Actor({
            x: 20, y: 50,
            width: 160, height: 16,
            color: Color.DarkGray,
            anchor: new Vector(0, 0)
        });
        this.addChild(this.healthBarBackground);
 
        this.healthBar = new Actor({
            x: 20, y: 50,
            width: 160, height: 16,
            color: Color.Green,
            anchor: new Vector(0, 0)
        });
        this.addChild(this.healthBar);
 
        this.ammoLabel = new Label({
            text: "Ammo: 30",
            pos: new Vector(20, 85),
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
 
    updateHealth(health, maxHealth) {
        this.healthBar.scale = new Vector(Math.max(health, 0) / maxHealth, 1);
    }
}