import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { Button } from "../stories/Button"

export const content = graphql`
    query {
        allContentfulTestTypeaaaa {
            nodes {
                id
                title
                thumbnail {
                    title
                    url
                    description
                }
                contentsRich {
                    raw
                    references {
                        ... on ContentfulAsset {
                            contentful_id
                            file {
                                url
                                contentType
                            }
                        }
                    }
                }
            }
        }
    }
`
const ContentfulPage: React.FC<PageProps> = ({ data }) => {
    return (
        <main>
            {data.allContentfulTestTypeaaaa.nodes.map(node => (
                <>
                    <Button primary={true} label={node.title}/>
                    <div>{renderRichText(node.contentsRich)}</div>
                    <div>{node.contentsRich.raw}</div>
                </>
            ))}
        </main>
    )
}

export default ContentfulPage

export const Head: HeadFC = () => <title>contentful Page</title>
