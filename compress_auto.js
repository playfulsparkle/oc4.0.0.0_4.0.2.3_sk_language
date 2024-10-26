const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const output = fs.createWriteStream(__dirname + "/dist/ps_sk_language.ocmod.zip");

const archive = archiver("zip", {
  zlib: { level: 4 },
});

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log("ps_sk_language.ocmod.zip has been created");
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

archive.directory("src/admin/", "admin");
archive.directory("src/extension/opencart/admin/language/sk-sk/captcha", "admin/language/sk-sk/extension/opencart/captcha");
archive.directory("src/extension/opencart/admin/language/sk-sk/currency", "admin/language/sk-sk/extension/opencart/currency");
archive.directory("src/extension/opencart/admin/language/sk-sk/dashboard", "admin/language/sk-sk/extension/opencart/dashboard");
archive.directory("src/extension/opencart/admin/language/sk-sk/fraud", "admin/language/sk-sk/extension/opencart/fraud");
archive.directory("src/extension/opencart/admin/language/sk-sk/module", "admin/language/sk-sk/extension/opencart/module");
archive.directory("src/extension/opencart/admin/language/sk-sk/payment", "admin/language/sk-sk/extension/opencart/payment");
archive.directory("src/extension/opencart/admin/language/sk-sk/report", "admin/language/sk-sk/extension/opencart/report");
archive.directory("src/extension/opencart/admin/language/sk-sk/shipping", "admin/language/sk-sk/extension/opencart/shipping");
archive.directory("src/extension/opencart/admin/language/sk-sk/theme", "admin/language/sk-sk/extension/opencart/theme");
archive.directory("src/extension/opencart/admin/language/sk-sk/total", "admin/language/sk-sk/extension/opencart/total");

archive.directory("src/catalog/", "catalog");
archive.directory("src/extension/opencart/catalog/language/sk-sk/captcha", "catalog/language/sk-sk/extension/opencart/captcha");
archive.directory("src/extension/opencart/catalog/language/sk-sk/module", "catalog/language/sk-sk/extension/opencart/module");
archive.directory("src/extension/opencart/catalog/language/sk-sk/payment", "catalog/language/sk-sk/extension/opencart/payment");
archive.directory("src/extension/opencart/catalog/language/sk-sk/shipping", "catalog/language/sk-sk/extension/opencart/shipping");
archive.directory("src/extension/opencart/catalog/language/sk-sk/total", "catalog/language/sk-sk/extension/opencart/total");

archive.file("src/install.json", { name: "install.json" });

archive.finalize();
