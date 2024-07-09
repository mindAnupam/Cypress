const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        emptyDownloadFolder(folderPath) {
          if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach((file) => {
              const filePath = path.join(folderPath, file);
              fs.unlinkSync(filePath);
            });
          }
          return null;
        },
        getFolderContents(folderPath) {
          return fs.readdirSync(folderPath);
        },
      });
    },
  },
  env: {
    url: "https://letcode.in/test",
  },
});
