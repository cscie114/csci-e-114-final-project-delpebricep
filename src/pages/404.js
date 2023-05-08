import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";


const NotFoundPage = () => {
    return (
        <Layout>
            <div className="not-found">
                <h1>404</h1>
                <p>Page Not Found</p>
                <Link to="/">Go back to the home page</Link>.
            </div>
        </Layout>
    );
};

export const Head = () => <title>Page Not Found</title>;

export default NotFoundPage;

