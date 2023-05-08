import * as React from 'react';
import { Link } from 'gatsby';
import Footer from './footer';

import * as styles from "./layout.module.css";


// This component is the site's layout. Used on every page.
const Layout = ({ children }) => {
    return (
        <div className={styles.siteWrapper}>
            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.title}>QUIZ LAND</div>
                <div className={styles.subtitle}>TEST YOUR KNOWLEDGE!</div>
            </header>

            {/* NAVBAR */}
            <nav className={styles.navbar}>
                <Link to="/">Home</Link>
                <Link to="/quiz/">Quizzes</Link>
                <Link to="/about">About</Link>
            </nav>

            {/* MAIN PAGE BODY AND FOOTER */}
            <main>
                {/* Render the component's children. */}
                {children}
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Layout;