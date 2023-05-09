import * as React from "react";
import Layout from "../components/layout";


const AboutPage = () => {
    return (
        <Layout>
            <div className="credits">
                <h1 style={{ margin: 0 }}>ABOUT THIS SITE</h1>

                <h2>Author</h2>
                <p>This site was created by Pascal Delpe-Brice, as his final project for CSCI E-114, Web Application Development with Jamstack, Harvard Extension School.</p>

                <h2>Credits</h2>
                <h3>Music</h3>
                <ul>
                    <li><strong><a href="https://www.apmmusic.com/">APM Music</a></strong><ul>
                        <li><strong>&quot;Bowler Hats&quot;</strong>, by David Farnon</li>
                        <li><strong>&quot;&#39;Er Indoors&quot;</strong>, by Johnny Hawksworth</li>
                        <li><strong>&quot;Happy Tune&quot;</strong>, by Dieter Reith from <em>Good Ol&#39; Hammond Organ</em></li>
                        <li><strong>&quot;Quiz Organ (A)&quot;</strong>, by Curtis Schwartz</li>
                        <li><strong>&quot;Quiz Organ (B)&quot;</strong>, by Curtis Schwartz</li>
                        <li><strong>&quot;Quiz Organ (C)&quot;</strong>, by Curtis Schwartz</li>
                        <li><strong>&quot;Ramblin&#39; Man From Gramblin&#39;&quot;</strong>, by Sam Spence</li>
                        <li><strong>&quot;Scene Ending&quot;</strong>, by Dieter Reith from <em>Good Ol&#39; Hammond Organ</em></li>
                    </ul>
                    </li>
                    <li><strong><a href="https://incompetech.com/">Incompetech</a></strong><ul>
                        <li><strong>&quot;Acid Jazz&quot;</strong>, by Kevin MacLeod</li>
                        <li><strong>&quot;Off to Osaka&quot;</strong>, by Kevin MacLeod</li>
                    </ul>
                    </li>
                    <li><strong>In-Game Music</strong> from <em>Ms. Pac-Man: Quest for the Golden Maze</em>, by Composer Unknown (2001, Infogrames)</li>
                    <li><strong><a href="https://search.upright-music.pl/">Upright Music</a></strong><ul>
                        <li><strong>&quot;Carnival Time&quot;</strong>, by Brent Barkman, Carl Lenox, Peter Coulman, and Thomas David Thorney</li>
                    </ul>
                    </li>
                </ul>

                <h3>Sound Effects</h3>
                <ul>
                    <li><strong><a href="https://www.freesound.org">Freesound</a></strong><ul>
                        <li>adriann</li>
                        <li>xtrgamr</li>
                    </ul>
                    </li>
                    <li><strong><a href="https://mixkit.co/">Mixkit.co</a></strong></li>
                </ul>

                <h3>Others</h3>
                <ul>
                    <li>&quot;Ubuntu&quot; and &quot;Source Code Pro&quot; fonts were acquired from <a href="https://fonts.google.com/">Google Fonts</a>.</li>
                    <li>As stated before, all trivia data was provided via <a href="https://the-trivia-api.com/">The Trivia API</a>.</li>
                </ul>
            </div>
        </Layout>
    );
};

export const Head = () => <title>About</title>;

export default AboutPage;

