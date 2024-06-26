const less = require("less");
const path = require("node:path");

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
            // eslint-disable-next-line no-unused-vars
			return async (data) => {
				return result.css;
			};
		},
	});
};