import type { NextPage, GetStaticPropsResult } from "next";
import { getTagList, TagResponse } from "../../api-client";

type HomeProps = {
  tags: TagResponse[];
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const tags = await getTagList.handler();

  return {
    props: {
      tags,
    },
  };
};

const Home: NextPage<HomeProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => {
        return <p key={tag.name}> {tag.name}</p>;
      })}
    </>
  );
};

export default Home;
