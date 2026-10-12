import fraudShap from "../assets/papers/fraud_shap_summary.png";
import fraudTest from "../assets/papers/fraud_test_evaluation.png";
import fraudMix from "../assets/papers/fraud_transaction_mix.png";
import healthConditions from "../assets/papers/health_conditions.webp";
import healthDemographics from "../assets/papers/health_demographics.webp";
import healthFinance from "../assets/papers/health_finance.webp";
import healthOutcomes from "../assets/papers/health_outcomes.webp";
import healthOverview from "../assets/papers/health_overview.webp";
import healthStay from "../assets/papers/health_stay.webp";
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
  "healthcare-bi": {
    images: [
      { src: healthOverview, captionKey: "overview" },
      { src: healthDemographics, captionKey: "demographics" },
      { src: healthConditions, captionKey: "conditions" },
      { src: healthStay, captionKey: "stay" },
      { src: healthFinance, captionKey: "finance" },
      { src: healthOutcomes, captionKey: "outcomes" },
    ],
  },
};
