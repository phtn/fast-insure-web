/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const location = 'YOUR_PROJECT_LOCATION'; // Format is 'us' or 'eu'
// const processorId = 'YOUR_PROCESSOR_ID'; // Create processor in Cloud Console
// const filePath = '/path/to/local/pdf';

"use server";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

// Instantiates a client
const client = new DocumentProcessorServiceClient();

export default async function processDocument(
  file: string | ArrayBuffer | null,
) {
  if (!file) return;
  const projectId = `${process.env.F_MESSAGING}`;
  const location = "us"; // Format is 'us' or 'eu'
  const processorId = "bac05e2a9d46a902:process"; // Create processor in Cloud Console
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // Read the file into memory.
  // const imageFile = await fs.readFile(".");

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(file as ArrayBuffer).toString("base64");

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);
  const { document } = result;
  if (document) {
    const { text } = document;

    console.log(text);
  }
  // Get all of the document text as one big string

  // Extract shards from the text field
  // const getText = <T,>(textAnchor: T) => {
  //   if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
  //     return "";
  //   }

  //   // First shard in document doesn't have startIndex property
  //   const startIndex = textAnchor.textSegments[0].startIndex ?? 0;
  //   const endIndex = textAnchor.textSegments[0].endIndex;

  //   return document?.text?.substring(startIndex, endIndex);
}

// Read the text recognition output from the processor
// console.log("The document contains the following paragraphs:");

// for (const p of page.paragraph) {
//   const text = getText(p);
//   console.log(`Paragraph text:\n${text}`);

// }

// Form parsing provides additional output about
// form-formatted PDFs. You  must create a form
// processor in the Cloud Console to see full field details.
// console.log("\nThe following form key/value pairs were detected:");

// const formFields = pages?.formFields;
// for (const field of formFields) {
//   const fieldName = getText(field?.fieldName.textAnchor);
//   const fieldValue = getText();
//   // const fieldValue = getText(field.fieldValue.textAnchor);

// console.log(pages);
// console.log(`\t(${pa}, ${fieldValue})`);
// }
// }
