import { PostResponse, getAllPostsBetweenDates } from '@/services/post';

const HomePage = async () => {
  const { posts, meta }: PostResponse = await getAllPostsBetweenDates({});

  console.log(posts[0]);

  return (
    <>
      <pre>{JSON.stringify(posts[0])}</pre>
      <br />
      <pre>{JSON.stringify(meta)}</pre>
    </>
  );
};

export default HomePage;
