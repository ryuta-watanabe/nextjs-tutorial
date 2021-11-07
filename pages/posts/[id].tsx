import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts';

import Layout from '../../components/layout';
import Date from '../../components/date';
import utilStyles from '../../styles/util.module.css';

type PostData = {
	date: string;
	title: string;
	contentHtml: string;
	id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id as string);
	return {
		props: {
			postData,
		},
	};
};

const Post = ({ postData }: { postData: PostData }) => (
	<Layout>
		<Head>
			<title>{postData.title}</title>
		</Head>
		<article>
			<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={postData.date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</article>
	</Layout>
);

export default Post;
