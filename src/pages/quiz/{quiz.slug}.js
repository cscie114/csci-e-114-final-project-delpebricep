import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import QuizGame from "../../components/quiz-game/";


const QuizPage = ({ data }) => {
    const { quiz } = data;

    return (
        <Layout>
            <QuizGame data={quiz} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        quiz(slug: { eq: $slug }) {
            quizId
            name
            questions {
                category
                text
                answers {
                    text
                    isCorrect
                }
                isNiche
            }
            length
        }
    }
`;

export const Head = ({ data }) => {
    return <title>Quiz: {data.quiz.name}</title>;
};

export default QuizPage;