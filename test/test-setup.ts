import sequelize from './test-environment/connection.ts';
import app from './test-environment/app.ts';

import bcrypt from 'bcrypt';
import {
    User,
    Credential,
    Post,
    PostContent,
} from './test-environment/db/index.ts';

sequelize.sync();

const createSeedData = async () => {
    const users = [];
    for (let i = 1; i <= 20; i++) {
        users.push({
            email: `user${i}@example.com`,
        });
    }

    const credentials = [];
    for (let i = 1; i <= 20; i++) {
        const password = `password${i}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        credentials.push({
            password: hashedPassword,
            user_id: i,
        });
    }

    const posts = [];
    for (let i = 1; i <= 20; i++) {
        posts.push({
            title: `Post ${i}`,
            user_id: i,
        });
    }

    const postContents = [];
    for (let i = 1; i <= 20; i++) {
        postContents.push({
            content: `Content for Post ${i}`,
            post_id: i,
        });
    }
    await User.bulkCreate(users);
    await Credential.bulkCreate(credentials);
    await Post.bulkCreate(posts);
    await PostContent.bulkCreate(postContents);
};

export { sequelize, app, createSeedData };
