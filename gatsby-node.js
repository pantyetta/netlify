const path = require(`path`)
const { node } = require("prop-types")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`)
    const result = await graphql(`
      query {
        allContentfulTestTypeaaaa {
          nodes {
            contentful_id
            title
          }
        }
      }
    `)
    result.data.allContentfulTestTypeaaaa.nodes.forEach(node => {
      createPage({
        path: `testType/${node.contentful_id}`,
        component: blogPostTemplate,
        context: {
          title: node.title,
        },
      })
    })
  }