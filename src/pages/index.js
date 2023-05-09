import * as React from "react"
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import Layout from "../components/layout";
import QuizPanel from "../components/quiz-panel";

import "../styles.css";


// Home page
const IndexPage = ({ data }) => {

    const quizPanels = data.allQuiz.nodes.map((quiz, i) => {
        return <QuizPanel key={i} quiz={quiz} />;
    });

    return (
        <Layout>
            <div>

                <div className="home-intro">
                    <div>
                        <h1 style={{ marginTop: 0 }}>HOW MUCH DO YOU KNOW?</h1>
                        <p>
                            Here at <b>Quiz Land</b>, take on a collection of interactive, API-generated quizzes and demonstrate your knowledge on various topics.
                        </p>
                        <p>
                            Did exceptionally well and have a need to brag? Submit quiz scores to the leaderboards and compare your grades to other players around the world.
                        </p>
                    </div>
                    <div>
                        <StaticImage
                            src="../images/bitbudd_idea.png"
                            placeholder="blurred"
                            loading="eager"
                            width={800}
                            formats={["png"]}
                            alt="Bitbudd has an idea"
                        />
                    </div>
                </div>

                <p style={{ marginBottom: 8, textAlign: "center" }}>
                   Get started by <Link to="/quiz/">browsing our full collection of quizzes</Link> or choosing a newly-added quiz below.
                </p>
            </div>

            <hr />

            <div style={{ marginBottom: 32 }}>
                <h2 style={{ textAlign: "center", fontSize: "2em" }}><FontAwesomeIcon icon={faCircleExclamation} />&nbsp;THE LATEST QUIZZES</h2>
                <div className="quiz-panels">
                    {quizPanels}
                </div>

                <Link to="/quiz/" className="more-button">More Quizzes</Link>
            </div>
        </Layout>
    );
};

// Query the four most recent quizzes in the database.
// Recent as in ordered by date, descending
export const query = graphql`
    query {
        allQuiz(sort: {date: DESC}, limit: 4) {
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

export const Head = () => <title>Home Page</title>;
export default IndexPage;

