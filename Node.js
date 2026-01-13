import express from "express";
import multer from "multer";
import { spawn } from "child_process";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const ext = file.originalname.split(".").pop();

  let vmCommand;

  if (ext === "exe") {
    vmCommand = [
      "qemu-system-x86_64",
      "-hda", "windows.img",
      "-device", `virtio-9p-pci,fsdev=fsdev0,mount_tag=host`,
      "-fsdev", `local,id=fsdev0,path=${file.path},security_model=none`
    ];
  }

  spawn(vmCommand[0], vmCommand.slice(1));
  res.json({ status: "VM started" });
});

app.listen(3000);
