import React from "react"
import { Link, graphql } from "gatsby";

import * as styles from "./quiz-panel.module.css";


const QuizPanel = ({ quiz }) => {
    const { name, slug, length, difficulty } = quiz;
    return (
        <div className={styles.container}>
            <h2 className={styles.name}>{name}</h2>
            {name}
            <Link to={"/quiz/" + slug} className={"test"}>
                Play
            </Link>
        </div>
    );
};


export default QuizPanel;