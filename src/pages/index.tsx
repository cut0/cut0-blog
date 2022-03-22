import type { NextPage, GetStaticPropsResult } from "next";
import {
  BlogContentResponse,
  getBlogContentList,
  getTagList,
  TagResponse,
} from "../../api-client";
import { HomeContent } from "../components/content/Index";

type HomeProps = {
  baseBlogContentData: {
    tagId: string | null;
    category: string;
    data: BlogContentResponse[];
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
    handler: getBlogContentList.handler({
      offset: 0,
      limit: LIMIT,
    }),
  };

  const defaultPickUpRequest = {
    tagId: null,
    category: "pick-up",
    handler: getBlogContentList.handler({
      offset: 0,
      limit: LIMIT,
      filters: "isPicked[equals]true",
    }),
  };

  const tagRecentlyRequests = tagList.map((tag) => {
    const handler = getBlogContentList.handler({
      offset: 0,
      limit: LIMIT,
      filters: `tags[contains]${tag.id}`,
    });
    return { tagId: tag.id, category: "recently", handler };
  });

  const tagPickUpRequests = tagList.map((tag) => {
    const handler = getBlogContentList.handler({
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

  const baseBlogContentData = requests.map((request, index) => {
    const { tagId, category } = request;
    return { tagId, category, data: res[index] };
  });

  return {
    props: {
      baseBlogContentData,
      tagList,
    },
  };
};

const Home: NextPage<HomeProps> = ({ baseBlogContentData, tagList }) => {
  return (
    <>
      <HomeContent
        baseBlogContentData={baseBlogContentData}
        tagList={tagList}
      />
    </>
  );
};

export default Home;
