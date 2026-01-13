import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext !== ".exe") {
    return res.status(400).json({ error: "Only EXE allowed" });
  }

  const vm = spawn("bash", [
    "./vm/run-windows-vm.sh",
    file.path
  ]);

  vm.stdout.on("data", d => console.log(d.toString()));
  vm.stderr.on("data", d => console.error(d.toString()));

  res.json({ status: "Windows VM started" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
