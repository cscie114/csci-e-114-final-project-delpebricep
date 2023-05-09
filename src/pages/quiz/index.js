import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import QuizPanel from "../../components/quiz-panel";


// This is a quiz's individual page
const QuizPage = ({ data }) => {
    const quizPanels = data.allQuiz.nodes.map((quiz, i) => {
        return <QuizPanel key={i} quiz={quiz} />;
    });

    
    return (
        <Layout>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: 0 }}>ALL QUIZZES</h1>
                <p style={{ marginTop: 8, marginBottom: 12 }}>
                    Every quiz here is different. Some are a breeze. Others will give you a hard time.
                </p>

                <div className="quiz-panels">
                    {quizPanels}
                </div>
            </div>
        </Layout>
    );
};

// Query every quiz we've created
export const query = graphql`
    query {
        allQuiz(sort: {date: ASC}) {
            nodes {
                quizId
                name
                date
                slug
                difficulty
                length
            }
        }
    }
`;

export const Head = () => {
    return <title>All Quizzes</title>;
};

export default QuizPage;