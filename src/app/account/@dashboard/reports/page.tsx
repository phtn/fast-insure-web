import { ReportsContent } from "./content";

// import vision from "@google-cloud/vision";

const ReportsPage = async () => {
  // const client = new vision.ImageAnnotatorClient();
  // const [result] = await client.textDetection(
  //   `gs://${process.env.NEXT_PUBLIC_F_STORAGE}/requests/ocr_test_/ocr_test_0`,
  // );
  // const detections = result.textAnnotations;

  // detections?.forEach(console.log);
  return <ReportsContent />;
};
export default ReportsPage;
