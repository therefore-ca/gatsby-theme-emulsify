import React from "react"

import Layout from "../components/Templates/layout"
import SEO from "../components/Templates/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="whatever"></div>
  </Layout>
)

export default IndexPage
