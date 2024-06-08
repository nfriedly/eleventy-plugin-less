const less = require("less");
const path = require("node:path");

less.logger.addListener({
    debug: function(msg) {
        console.debug(msg)
    },
    info: function(msg) {
        console.info(msg)
    },
    warn: function(msg) {
        console.warn(msg)
    },
    error: function(msg) {
        console.error(msg)
    }
});

module.exports = function (eleventyConfig) {
	eleventyConfig.addTemplateFormats("less");

	eleventyConfig.addExtension("less", {
		outputFileExtension: "css",

		// `compile` is called once per .less file in the input directory
		compile: async function (inputContent, inputPath) {

            // todo: consider skipping files that start with _

            // https://lesscss.org/usage/#programmatic-usage
            let result = await less.render(inputContent, {
                filename: inputPath,
                paths: [
                    path.parse(inputPath).dir || '.',
                    this.config.dir.includes
                ],
                relativeUrls: true,
                // todo: check env var and disable in production builds
                sourceMap: {sourceMapFileInline: true}
            });

            // let eleventy know to update this file when it's imports change
            this.addDependencies(inputPath, result.imports);

			// This is the render function, `data` is the full data cascade
			return async (data) => {
				return result.css;
			};
		},
	});
};