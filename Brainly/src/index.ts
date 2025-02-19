import express from "express"; // if you want to use express in typescript. to install express, ypu should not use npm install express because it is not in js. YOU SHOULD USE npm install -d @types/express
import { ContentModel, LinkModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json());



app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username,
        password
    })
    res.json({
        message: "Usersigned up"
    })
})
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.json({
            message: "User signed in",
            token: token
        })
    } else {
        res.status(403).json({
            message: "Username or password is incorrect"
        })
    }
})
app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const tags = req.body.tags;

    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content created"
    })
})
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content: content
    })
})
app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: res.userId
    })
    res.json({
        "message": "Content deleted"
    })
})
app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash: hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
    }

})
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash: hash
    })
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return; // early returning cause of if else in js
    }
    const content = await ContentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOneAndReplace({
        _id : link.userId
    })
    if (!user) {
        res.status(411).json({
            message: "User not found, error should ideally not happen"
        })
        return; // early returning cause of if else in js
    }
    res.json({
        username: user?.username,
        content: content
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});