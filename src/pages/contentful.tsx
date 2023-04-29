import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"

export const content = graphql`
    query {
        allContentfulTestTypeaaaa {
            nodes {
                id
                title
                contentsRich {
                raw
                }
                thumbnail {
                title
                url
                description
                }
            }
        }
    }
`

const ContentfulPage: React.FC<PageProps> = ({ data }) => {
    return (
        <main>
            {data.allContentfulTestTypeaaaa.nodes.map(node => (
                <h1>{node.title}</h1>
            ))}
        </main>
    )
}

export default ContentfulPage

export const Head: HeadFC = () => <title>Home Page</title>
