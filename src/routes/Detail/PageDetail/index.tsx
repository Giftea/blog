import React from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import MarkdownRenderer from "src/components/MarkdownRenderer"
type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null
  console.log(data.recordMap)
  return (
    <StyledWrapper>
      <MarkdownRenderer content={data.recordMap as unknown as string} />

      {/* <NotionRenderer recordMap={data.recordMap} /> */}
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 56rem;
`
