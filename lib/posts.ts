import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
	// `posts`ディレクトリ配下のファイル名を取得する
	const fileNames: string[] = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName: string) => {
		// ファイル名から`.md`を削除する
		const id = fileName.replace(/\.md$/, '');

		// マークダウンファイルを文字列として読み取る
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// gray-matterを使用してメタデータをパースする
		const matterResult = matter(fileContents);

		// ファイル名をidとし、投稿データとマージする
		return {
			id,
			...(matterResult.data as { date: string; title: string }),
		};
	});

	// dateの昇順でソートする
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
};

export const getAllPostIds = () => {
	const fileNames: string[] = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
};

export const getPostData = async (id: string) => {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const matterResult = matter(fileContents);

	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	return {
		id,
		contentHtml,
		...matterResult.data,
	};
};
