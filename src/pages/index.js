import React from "react"
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import QuizPanel from "../components/quiz-panel";

import "../styles.css";


// Home page
const IndexPage = ({ data }) => {

    const quizList = data.allQuiz.nodes.map((quiz, i) => {
        return <QuizPanel key={i} quiz={quiz} />;
    });

    return (
        <Layout>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ marginTop: 0 }}>HOW MUCH DO YOU KNOW?</h2>

                <StaticImage
                    src="../images/home_image.png"
                    placeholder="blurred"
                    loading="eager"
                    width={600}
                    formats={["png"]}
                    alt="Home Image"
                />

                <p>
                    Here at <b>Quiz Land</b>, take on a collection of API-generated quizzes and demonstrate your knowledge on about various topics.
                    <br />
                    Every quiz here is different. Some are a breeze. Others will give you a hard time.
                    <br />
                    Did exceptionally well and have a need to brag? Submit quiz scores to the leaderboards and compare your grades to other users on this site around the world.
                </p>
                <p>What are you waiting for? Choose a quiz below and get started.</p>
            </div>

            <hr />

            <div>
                <h2>QUIZZES</h2>
                {quizList}
            </div>

        </Layout>
    );
};

// Query every quiz in the database
export const query = graphql`
    query {
        allQuiz {
            nodes {
                quizId
                name
                slug
                difficulty
                length
            }
        }
    }
`;

export const Head = () => <title>Home Page</title>;
export default IndexPage;

