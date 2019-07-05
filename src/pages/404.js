import React from "react"

import Layout from "../components/Templates/layout.js"
import SEO from "../components/Templates/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>PAGE NOT FOUND</h1>
    <p>This page doesn&#39;t exist.</p>
  </Layout>
)

export default NotFoundPage
