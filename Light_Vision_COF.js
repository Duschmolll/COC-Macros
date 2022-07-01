// A macro for the Foundry virtual tabletop that lets a user configure their token's vision and lighting settings. 

let applyChanges = false;
new Dialog({
  title: `Token Vision Configuration`,
  content: `
    <form>
      <div class="form-group">
        <label>Vision Type:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">No Change</option>
          <option value="dim0">Self</option>
          <option value="dim3">Darkvision (3 m)</option>
          <option value="dim6">Darkvision (6 m)</option>
          <option value="dim12">Darkvision (12 m)</option>
          <option value="dim24">Darkvision (24 m)</option>
          <option value="dim48">Darkvision (48 m)</option>
          <option value="dim96">Darkvision (96 m)</option>
          <option value="bright120">OverPowered (120 m Bright)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Light Source:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">No Change</option>
          <option value="none">None</option>
          <option value="lamptorch">Lampe Torche</option>
          <option value="torch">Torch</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      let updates = [];
      for (let token of canvas.tokens.controlled) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        let lightAnimation = token.data.light.animation;
        let lightAlpha = token.data.light.alpha;
        let lightColor = token.data.light.color;
        const colorFire = "#f8c377";
        const colorWhite = "#ffffff";
        const colorMoonGlow = "#f4f1c9";
        // Get Vision Type Values
        switch (visionType) {
          case "dim0":
            dimSight = 1;
            brightSight = 0;
            break;
          case "dim3":
            dimSight = 3;
            brightSight = 0;
            break;
          case "dim6":
            dimSight = 6;
            brightSight = 0;
            break;
          case "dim12":
            dimSight = 12;
            brightSight = 0;
            break;
          case "dim24":
            dimSight = 24;
            brightSight = 0;
            break;
          case "dim48":
            dimSight = 48;
            brightSight = 0;
            break;
          case "dim96":
            dimSight = 96;
            brightSight = 0;
            break;
          case "bright120":
            dimSight = 0;
            brightSight = 120;
            break;
          case "nochange":
          default:
            dimSight = token.data.dimSight;
            brightSight = token.data.brightSight;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            lightAnimation = { type: "none" };
            break;
          case "lamptorch":
            dimLight = 12;
            brightLight = 6;
            lockRotation = false;
            lightAngle = 60;
            lightAnimation = { type: "none", speed: 2, intensity: 2 };
            lightColor = colorWhite;
            lightAlpha = 0.15;
            break;
          case "torch":
            dimLight = 8;
            brightLight = 6;
            lightAnimation = { type: "torch", speed: 2, intensity: 2 };
            lightColor = colorFire;
            lightAlpha = 0.6;
            break;
          case "nochange":
          default:
            dimLight = token.data.light.dim;
            brightLight = token.data.light.bright;
            lightAngle = token.data.light.angle;
            lockRotation = token.data.lockRotation;
            lightAnimation = token.data.light.animation;
            lightAlpha = token.data.light.alpha;
            lightColor = token.data.light.color;
        }
        // Update Token
        updates.push({
          _id: token.id,
          vision: true,
          dimSight: dimSight,
          brightSight: brightSight,
          "light.dim": dimLight,
          "light.bright": brightLight,
          "light.angle": lightAngle,
          lockRotation: lockRotation,
          "light.animation": lightAnimation,
          "light.alpha": lightAlpha,
          "light.color": lightColor
        });
      }
      canvas.scene.updateEmbeddedDocuments("Token", updates);
    }
  }
}).render(true);