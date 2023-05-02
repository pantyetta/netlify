import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"


const existRichText = (richText, query) =>{
    if('value' in richText){
        return richText.value.toLowerCase().includes(query.toLowerCase()) //True/False
    }else{
        for(let i = 0; i < richText.content.length;i++){
            if(existRichText(richText.content[i], query)) {
                return true
            }
        }
    }
    return false
}

const SearchResult = () =>{
    const data = useStaticQuery(graphql`
        query {
            allContentfulTestTypeaaaa {
                nodes {
                    id
                    title
                    contentsRich {
                        raw
                    }
                }
            }
        }
    `)
    
    const allPosts = data.allContentfulTestTypeaaaa
    const [state, setState] = useState({
        filteredData: [],
        query: "",
    })

    const onInputChange = event =>{
        const query = event.target.value
        const posts = data.allContentfulTestTypeaaaa.nodes || []

        const pattern = '/^\s/'
        if(!query || query.match(pattern)){
            setState({
                filteredData: [],
                query: query,
            })
            return
        }

        const filteredData = posts.filter(post => { //配列を返す
            const title = post.title
            const content = post.contentsRich.raw
            const isExistTitle = title.toLowerCase().includes(query.toLowerCase()) //True/False
            const isExistContent = existRichText(JSON.parse(content), query)
            return (
                isExistTitle || isExistContent
            )
        })
        setState({
            filteredData: filteredData,
            query: query,
        })
    }

    const { filteredData, query } = state
    return(
        <div>
			<div className="result-inner">
				<input
					type="text"
					aria-label="Search"
					placeholder="検索ワードを入力..."
					onChange={onInputChange}
				/>
				<div className="result-inner__res">
					{state.filteredData.length }
				</div>
                <ul className="result-inner__search">
					{filteredData && filteredData.map((post) => {
						return (
							<li key={post.title}>
								<a href={`/#`}>
									<div className="result-inner__title">
										{post.title}
									</div>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
    )

}

export default SearchResult