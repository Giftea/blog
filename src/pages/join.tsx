import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import styled from "@emotion/styled"
import { signIn } from "next-auth/react"
import Link from "next/link"

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <StyledDiv className="auth-buttons">
        <button className="auth-button github" onClick={() => signIn("github")}>
          <i className="fab fa-github"></i> Join with GitHub
        </button>
        <button
          className="auth-button twitter"
          onClick={() => signIn("twitter")}
        >
          <i className="fab fa-twitter"></i> Join with Twitter
        </button>
        <button className="auth-button google" onClick={() => signIn("google")}>
          <i className="fab fa-google"></i> Join with Gmail
        </button>
        <p>
          By joining the community, you are agreeing to our{" "}
          <Link href="/conduct">code of conduct</Link>.
        </p>
      </StyledDiv>
    </>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justtify-content: center;
  align-items: center;
  margin-top: 4rem;
  a {
    color: rgb(59, 73, 223);
  }
  p {
    width: 500px;
    text-align: center;
  }
  .auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .auth-button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 40%;
    text-align: center;
    color: black;
    margin-bottom: 20px;
  }

  .auth-button i {
    font-size: 20px;
  }

  .github {
    border: 1px solid #a3aaae;
  }

  .twitter {
    border: 1px solid #a3aaae;
  }

  .google {
    border: 1px solid #a3aaae;
  }

  .apple {
    border: 1px solid #a3aaae;
  }

  .forem {
    border: 1px solid #a3aaae; /* Forem's brand color */
  }
  @media (max-width: 768px) {
    margin: 10px;
    margin-top: 4rem;
    .auth-button {
      width: 100%;
    }
    p {
      width: 400px;
      text-align: center;
    }
  }
`
export default FeedPage
