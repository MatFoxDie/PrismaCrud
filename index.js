const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Carrega o arquivo gerado

const prisma = new PrismaClient();
const app = express();


app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Usa o arquivo para o Swagger UI
  
  app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  });


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CRUD para Author
app.post('/authors', async (req, res) => {
  const { tags, surname, completeName, userId } = req.body;
  try {
    const author = await prisma.author.create({
      data: { tags, surname, completeName, userId },
    });
    res.json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/authors', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
});

app.get('/authors/:id', async (req, res) => {
    const { id } = req.params;
    const author = await prisma.author.findUnique({
        where: { id: Number(id) },
    });
    res.json(author);
});

app.put('/authors/:id', async (req, res) => {
    const { id } = req.params;
    const { tags, surname, completeName, userId } = req.body;
    try {
        const author = await prisma.author.update({
            where: { id: Number(id) },
            data: { tags, surname, completeName, userId },
        });
        res.json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.author.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// CRUD Post
app.post('/posts', async (req, res) => {
    const { title, text, authorId } = req.body;
    const post = await prisma.post.create({
      data: { title, text, authorId },
    });
    res.json(post);
  });
  
  app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
  });

    app.get('/posts/:id', async (req, res) => {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });
        res.json(post);
    });

    app.put('/posts/:id', async (req, res) => {
        const { id } = req.params;
        const { title, text, authorId } = req.body;
        try {
            const post = await prisma.post.update({
                where: { id: Number(id) },
                data: { title, text, authorId },
            });
            res.json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.delete('/posts/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.post.delete({
                where: { id: Number(id) },
            });
            res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
  
  // CRUD Comment
  app.post('/comments', async (req, res) => {
    const { text, postId, userId } = req.body;
    const comment = await prisma.comment.create({
      data: { text, postId, userId },
    });
    res.json(comment);
  });
  
  app.get('/comments', async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  });

    app.get('/comments/:id', async (req, res) => {
        const { id } = req.params;
        const comment = await prisma.comment.findUnique({
            where: { id: Number(id) },
        });
        res.json(comment);
    }
);

app.put('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { text, postId, userId } = req.body;
    try {
        const comment = await prisma.comment.update({
            where: { id: Number(id) },
            data: { text, postId, userId },
        });
        res.json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
    
app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  });