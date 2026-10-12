import fraudShap from "../assets/papers/fraud_shap_summary.webp";
import fraudTest from "../assets/papers/fraud_test_evaluation.webp";
import fraudTestSmall from "../assets/papers/fraud_test_evaluation_800.webp";
import fraudMix from "../assets/papers/fraud_transaction_mix.webp";
import fraudMixSmall from "../assets/papers/fraud_transaction_mix_800.webp";
import healthConditions from "../assets/papers/health_conditions.webp";
import healthConditionsSmall from "../assets/papers/health_conditions_800.webp";
import healthDemographics from "../assets/papers/health_demographics.webp";
import healthDemographicsSmall from "../assets/papers/health_demographics_800.webp";
import healthFinance from "../assets/papers/health_finance.webp";
import healthFinanceSmall from "../assets/papers/health_finance_800.webp";
import healthOutcomes from "../assets/papers/health_outcomes.webp";
import healthOutcomesSmall from "../assets/papers/health_outcomes_800.webp";
import healthOverview from "../assets/papers/health_overview.webp";
import healthOverviewSmall from "../assets/papers/health_overview_800.webp";
import healthStay from "../assets/papers/health_stay.webp";
import healthStaySmall from "../assets/papers/health_stay_800.webp";
import pulseDag from "../assets/papers/pulse_airflow_dag.webp";
import pulseDagSmall from "../assets/papers/pulse_airflow_dag_800.webp";
import pulseDashboard from "../assets/papers/pulse_kibana_dashboard.webp";
import pulseDashboardSmall from "../assets/papers/pulse_kibana_dashboard_800.webp";

/** Width of the `small` variants, generated for phones and project tiles. */
export const SMALL_WIDTH = 800;

export interface ProjectGalleryImage {
  src: string;
  /** SMALL_WIDTH-wide copy, when the original is wider. */
  small?: string;
  /** Intrinsic size of `src`, so the page reserves the space before the image loads. */
  width: number;
  height: number;
  /** i18n key resolved against t.projects.media.<id>.shots */
  captionKey: string;
}

export interface ProjectMedia {
  /** Index in `images` of a real screenshot shown on the project's tile instead of its diagram. */
  cover?: number;
  video?: string;
  doc?: string;
  images: ProjectGalleryImage[];
}

export const projectMediaById: Record<string, ProjectMedia> = {
  "wikipedia-pulse": {
    cover: 0,
    images: [
      { src: pulseDashboard, small: pulseDashboardSmall, width: 1600, height: 1460, captionKey: "dashboard" },
      { src: pulseDag, small: pulseDagSmall, width: 1800, height: 319, captionKey: "dag" },
    ],
  },
  // No screenshots yet: the project page tells the flow and the decisions.
  "retail-pipeline": { images: [] },
  "fraud-detection": {
    images: [
      { src: fraudTest, small: fraudTestSmall, width: 1128, height: 434, captionKey: "test" },
      { src: fraudMix, small: fraudMixSmall, width: 1584, height: 884, captionKey: "mix" },
      { src: fraudShap, width: 774, height: 734, captionKey: "shap" },
    ],
  },
  "healthcare-bi": {
    cover: 0,
    images: [
      { src: healthOverview, small: healthOverviewSmall, width: 1268, height: 583, captionKey: "overview" },
      { src: healthDemographics, small: healthDemographicsSmall, width: 1126, height: 588, captionKey: "demographics" },
      { src: healthConditions, small: healthConditionsSmall, width: 1126, height: 588, captionKey: "conditions" },
      { src: healthStay, small: healthStaySmall, width: 1121, height: 583, captionKey: "stay" },
      { src: healthFinance, small: healthFinanceSmall, width: 1121, height: 583, captionKey: "finance" },
      { src: healthOutcomes, small: healthOutcomesSmall, width: 1121, height: 583, captionKey: "outcomes" },
    ],
  },
};

/** srcset for an image: the small copy for phones, the original for wide screens. */
export const srcSetOf = (img: ProjectGalleryImage): string | undefined =>
  img.small ? `${img.small} ${SMALL_WIDTH}w, ${img.src} ${img.width}w` : undefined;
