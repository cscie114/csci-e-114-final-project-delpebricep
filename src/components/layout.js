import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Footer from './footer';

import * as styles from "./layout.module.css";


// This component is the site's layout. Used on every page.
const Layout = ({ children }) => {

    return (
        <div>
            <header className={styles.header}>
                {/* SITE ICON (links to the home page) */}
                <Link to="/">
                    <StaticImage 
                        src="../images/icon.png" 
                        alt="Gatsby Quiz Land icon" 
                        title="Gatsby Quiz Land"
                        layout="fixed"
                        width={100}
                    />
                </Link>

                {/* NAVBAR */}
                <div className={styles.navbar}>
                    {/* SITE TITLE */}
                    <div className={styles.title}>Gatsby Quiz Land</div>

                    {/* NAVIGATION LINKS */}
                    <nav>
                        <ul className={styles.navLinks}>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* MAIN PAGE BODY AND FOOTER */}
            <main>
                {/* Render the component's children. */}
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;