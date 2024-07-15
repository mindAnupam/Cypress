import BasePage from "./BasePage";

class UploadPage extends BasePage {
  constructor() {
    super();
    this.url = "/file";
    this.fileInput = 'input[type="file"]';
    this.excelDownloadButton = "#xls";
    this.pdfDownloadButton = "#pdf";
  }

  visit() {
    super.visit(this.url);
  }

  uploadFile(filePath) {
    this.getElement(this.fileInput).selectFile(filePath, { force: true });
  }

  downloadExcelFile() {
    this.clickElement(this.excelDownloadButton);
  }

  downloadPdfFile() {
    this.clickElement(this.pdfDownloadButton);
  }

  verifyDownloadedFiles(expectedFiles) {
    const downloadFolder = Cypress.config("downloadsFolder");

    cy.wait(5000); // Wait for downloads to complete

    cy.task("getFolderContents", downloadFolder).then((files) => {
      expect(files.length).to.eq(expectedFiles.length);
      expect(files).to.include.members(expectedFiles);
    });
  }
}

export default new UploadPage();
