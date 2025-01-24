const fs = require('fs');

function transformCSS(cssOriginal) {
	let cssTransform = cssOriginal.replace(/\.uk2-font__([\w\d-]+)\s*{([^}]*)}/g, '@mixin uk2-font__$1() {$2}');
	return cssTransform;
}

fs.readFile('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.css', 'utf8', function(err, cssOriginal) {
	if (err) {
		console.error("Error reading the file:", err);
		return;
	}
	let cssTransform = transformCSS(cssOriginal);

	fs.writeFile('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.mixins.scss', cssTransform, 'utf8', function(err) {
		if (err) {
			console.error("Error writing the file :", err);
		} else {
			console.log("Mixins and SCSS file generated !");
		}
	});

  if (fs.existsSync('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.css')) {
    fs.unlinkSync('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.css');
    console.log("Temporal file uk2-font.css cleaned !");
  }

  if (fs.existsSync('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.css.map')) {
    fs.unlinkSync('projects/uikit-v2-lib/src/styles/uk2-common/uk2-font/uk2-font.css.map');
    console.log("Temporal file uk2-font.css.map cleaned !");
  }
});

