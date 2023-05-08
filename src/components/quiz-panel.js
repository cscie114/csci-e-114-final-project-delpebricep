import React from "react"
import { Link } from "gatsby";

import * as styles from "./quiz-panel.module.css";


const QuizPanel = ({ quiz }) => {
    const { name, date, slug, length, difficulty } = quiz;

    return (
        <Link to={"/quiz/" + slug} className={styles.container}>
            <h2>{name}</h2>
            <div className={styles.info}>
                <p>{ difficulty }</p>
                <p>{ length } Questions</p>
                <p><small>Date Added: {date}</small></p>
            </div>
        </Link>
    );
};


export default QuizPanel;