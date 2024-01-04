import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import MarkdownRenderer from "src/components/MarkdownRenderer"
import { marked } from "marked"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  
  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          {/* <NotionRenderer recordMap={data.recordMap} /> */}
          <MarkdownRenderer content={data.recordMap as unknown as string} />
          
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            {/* <CommentBox data={data} /> */}
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
 
`
