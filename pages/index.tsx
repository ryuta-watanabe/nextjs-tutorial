import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/util.module.css';

import { getSortedPostsData } from '../lib/posts';

type AllPostsData = {
	date: string;
	title: string;
	id: string;
};

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
};

const Home = ({ allPostsData }: { allPostsData: AllPostsData[] }) => {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>Hi! I&apos;m Ryuta Watanabe. my job is Frontend Engineer.</p>
				<p>
					(this is a sample website - you&apos;ll be building a site like this
					on )<a href='https://nextjs.org/learn'>our Next.js tutorial</a>
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export default Home;
