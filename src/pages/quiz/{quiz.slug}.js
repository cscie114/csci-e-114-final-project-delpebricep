import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import QuizGame from "../../components/quiz-game/";
import { shuffle } from "../../utils";


// A quiz's individual page
const QuizPage = ({ data }) => {
    const { quiz } = data;
    quiz.questions = shuffle(quiz.questions);

    return (
        <Layout>
            <QuizGame quiz={quiz} />
        </Layout>
    );
};

// Query for the quiz via its slug in the URL
export const query = graphql`
    query($slug: String!) {
        quiz(slug: { eq: $slug }) {
            quizId
            name
            difficulty
            description
            questions {
                category {
                    categoryId
                    name
                }
                text
                answers {
                    text
                    isCorrect
                }
                isNiche
            }
            length
            music {
                publicURL
            }
        }
    }
`;

export const Head = ({ data }) => {
    return <title>{data.quiz.name}</title>;
};

export default QuizPage;