/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: "Gatsby Quiz Land",
		description: "Partake in a selection of trivia quizzes and test your knowledge.",
		author: "Pascal Delpe-Brice",
		info: "Final Project for CSCI E-114: Web Application Development With Jamstack",
		siteUrl: "https://quizland.netlify.app",
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: 'data',
				path: `${__dirname}/data`,
				ignore: [`**/\.*`]
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: 'audio',
				path: `${__dirname}/src/audio`,
				ignore: [`**/\.*`]
			}
		},
		`gatsby-transformer-remark`
	]
};
