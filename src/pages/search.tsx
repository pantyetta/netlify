import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import ModalSearch from '../components/modalsearch';

const SearchPage: React.FC<PageProps> = () => {
    return (
        <main>
            <ModalSearch />
        </main>
    )
}

export default SearchPage

export const Head: HeadFC = () => <title>Search Page</title>
