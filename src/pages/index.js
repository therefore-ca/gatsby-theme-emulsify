import React from "react"

import Layout from "../components/Templates/layout"
import SEO from "../components/Templates/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  </Layout>
)

export default IndexPage
