import express from "express";
import cors from "cors";

const app = express();

const PORT = 5001;

// Notes storage
let notes = [
    {
        id: 1,
        title: "Welcome to Notes",
        body: "This is my first note.",
        pinned: true
    },
    {
        id: 2,
        title: "Learning Node.js",
        body: "I am learning how to build APIs with Express.",
        pinned: false
    },
    {
        id: 3,
        title: "My Goals",
        body: "Build projects and become a better developer.",
        pinned: false
    }
];

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Notes API is running successfully!");
});

// GET all notes
app.get("/notes", (req, res) => {
    res.json(notes);
});

// GET one note by ID
app.get("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find((note) => note.id === id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.json(note);
});

// POST - Create a new note
app.post("/notes", (req, res) => {
  const { title, body } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      message: "Title must be at least 3 characters long"
    });
  }

  const newNote = {
    id: Date.now(),
    title: title.trim(),
    body: body || "",
    pinned: false
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});