import * as React from "react"
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";


const IndexPage = ({ data }) => {

    const quizList = data.allQuiz.nodes.map((quiz, i) => {
        return <div key={i}><Link to={"/quiz/" + quiz.slug}>{quiz.name}</Link></div>;
    });

    return (
        <Layout pageTitle={null}>
            <div style={{ textAlign: "center" }}>
                <h2>TEST. YOUR. KNOWLEDGE.</h2>

                <StaticImage
                    src="../images/home_image.png"
                    placeholder="blurred"
                    loading="eager"
                    width={600}
                    formats={["png"]}
                    alt="Home Image"
                />

                <p>Welcome to <b>Gatsby Quiz Land</b>. Take on a collection of quizzes and show how much you know about various topics.</p>
                <p>Get started by selecting a quiz below.</p>
            </div>


            <div>
                {quizList}
            </div>

        </Layout>
    );
};

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

