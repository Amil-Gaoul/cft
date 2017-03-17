var browserSync = require('browser-sync');

browserSync({
	server: "app",
	files: ["app/*.html", "app/*.css", "app/*.js", "app/api/*.json"]
});