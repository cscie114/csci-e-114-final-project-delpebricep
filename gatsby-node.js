const { fetchExternalQuestions } = require("./src/utils");


exports.onCreateNode = async ({ actions, node, createNodeId, createContentDigest }) => {
    if (node.internal.type !== "QuizDataJson") {
        return;
    }

    const { createNode } = actions;

    const { quizId, name, slug, difficulty, apiParams } = node;

    let questions = await fetchExternalQuestions(apiParams);

    createNode({
        id: createNodeId(`quiz-${quizId}`),
        quizId,
        name,
        slug,
        difficulty,
        questions,
        length: questions.length,

        parent: node.id,
        children: [],
        internal: {
            type: 'quiz',
            contentDigest: createContentDigest(node)
        }
    });

};



exports.onCreateWebpackConfig = ({ loaders, actions, getConfig }) => {
    // Source: https://stackoverflow.com/questions/68162448/how-to-use-a-custom-webpack-loader-in-gatsby-js
    const config = getConfig();

    config.module.rules.find(
        (rule) =>
            rule.test &&
            rule.test.toString() ===
            "/\\.(mp4|webm|ogv|wav|mp3|m4a|aac|oga|flac)$/"
    ).test = /\.(mp4|webm|ogv|mp3|m4a|aac|oga|flac)$/;

    config.module.rules.push({
        test: /\.ogg$/,
        use: [loaders.url()]
    });

    config.module.rules.push({
        test: /\.wav$/,
        use: [
            {
                ...loaders.url(),
                options: {
                    ...loaders.url().options,
                    limit: false
                }
            }
        ]
    });

    actions.replaceWebpackConfig(config);
}