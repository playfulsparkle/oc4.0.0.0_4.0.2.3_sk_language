const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const output = fs.createWriteStream(__dirname + "/dist/ps_sk_language.zip");

const archive = archiver("zip", {
  zlib: { level: 4 },
});

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log("ps_sk_language.zip has been created");
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn("Warning:", err);
  } else {
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

archive.directory("src/admin/", "upload/admin");
archive.directory("src/catalog/", "upload/catalog");
archive.directory("src/extension/", "upload/extension");
archive.directory("src/install/", "upload/install");
archive.file("src/install.json", { name: "upload/install.json" });
archive.file("src/inštalácia.txt", { name: "upload/inštalácia.txt" });
archive.file("src/installation.txt", { name: "upload/installation.txt" });

archive.finalize();