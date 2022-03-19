import type { NextPage, GetStaticPropsResult } from "next";
import { useRef } from "react";
import { BlogContentResponse, getBlogContentList } from "../../api-client";
import { useBlogContentList } from "../features/blogContent";
import { useIntersection } from "../features/common/intersectionHooks";

type HomeProps = {
  initialBlogContentList: BlogContentResponse[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const initialBlogContentList = await getBlogContentList.handler({
    offset: 0,
    limit: 20,
  });

  return {
    props: {
      initialBlogContentList,
    },
  };
};

const Home: NextPage<HomeProps> = ({ initialBlogContentList }) => {
  const {
    data: blogContentList,
    error,
    loading,
  } = useBlogContentList(initialBlogContentList);

  const el = useRef(null);
  useIntersection(el, {}, () => console.log("HELLO"));
  return (
    <>
      {loading && <p>ローディング中です</p>}
      {error && <p>エラーが発生しました</p>}
      {blogContentList &&
        blogContentList.map((blogContent) => {
          return <p key={blogContent.id}> {blogContent.title}</p>;
        })}
    </>
  );
};

export default Home;
