import type { NextPage, GetStaticPropsResult } from "next";
import {
  ArticleResponse,
  getArticleList,
  getTagList,
  TagResponse,
} from "../../api-client";
import { HomeContent } from "../components/content/Index";

type HomeProps = {
  baseArticleData: {
    tagId: string | null;
    category: string;
    data: ArticleResponse[];
  }[];
  tagList: TagResponse[];
};

const LIMIT = 20;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const tagList = await getTagList.handler({});

  const defaultRecentlyRequest = {
    tagId: null,
    category: "recently",
    handler: getArticleList.handler({
      offset: 0,
      limit: LIMIT,
    }),
  };

  const defaultPickUpRequest = {
    tagId: null,
    category: "pick-up",
    handler: getArticleList.handler({
      offset: 0,
      limit: LIMIT,
      filters: "isPicked[equals]true",
    }),
  };

  const tagRecentlyRequests = tagList.map((tag) => {
    const handler = getArticleList.handler({
      offset: 0,
      limit: LIMIT,
      filters: `tags[contains]${tag.id}`,
    });
    return { tagId: tag.id, category: "recently", handler };
  });

  const tagPickUpRequests = tagList.map((tag) => {
    const handler = getArticleList.handler({
      offset: 0,
      limit: LIMIT,
      filters: `(isPicked[equals]true)[and](tags[contains]${tag.id})`,
    });
    return { tagId: tag.id, category: "pick-up", handler };
  });

  const requests = [
    defaultRecentlyRequest,
    defaultPickUpRequest,
    ...tagRecentlyRequests,
    ...tagPickUpRequests,
  ];

  const res = await Promise.all(requests.map((item) => item.handler));

  const baseArticleData = requests.map((request, index) => {
    const { tagId, category } = request;
    return { tagId, category, data: res[index] };
  });

  return {
    props: {
      baseArticleData,
      tagList,
    },
  };
};

const Home: NextPage<HomeProps> = ({ baseArticleData, tagList }) => {
  return (
    <>
      <HomeContent baseArticleData={baseArticleData} tagList={tagList} />
    </>
  );
};

export default Home;
