import fraudShap from "../assets/papers/fraud_shap_summary.png";
import fraudTest from "../assets/papers/fraud_test_evaluation.png";
import fraudMix from "../assets/papers/fraud_transaction_mix.png";
import pulseDag from "../assets/papers/pulse_airflow_dag.webp";
import pulseDashboard from "../assets/papers/pulse_kibana_dashboard.webp";

export interface ProjectGalleryImage {
  src: string;
  /** i18n key resolved against t.projects.media.<id>.shots */
  captionKey: string;
}

export interface ProjectMedia {
  video?: string;
  doc?: string;
  images: ProjectGalleryImage[];
}

export const projectMediaById: Record<string, ProjectMedia> = {
  "wikipedia-pulse": {
    images: [
      { src: pulseDashboard, captionKey: "dashboard" },
      { src: pulseDag, captionKey: "dag" },
    ],
  },
  // No screenshots yet: the project page tells the flow and the decisions.
  "retail-pipeline": { images: [] },
  "fraud-detection": {
    images: [
      { src: fraudTest, captionKey: "test" },
      { src: fraudMix, captionKey: "mix" },
      { src: fraudShap, captionKey: "shap" },
    ],
  },
  "healthcare-bi": { images: [] },
};
