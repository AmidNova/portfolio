import imMetric from "../assets/papers/im1_metric.png";
import imTrending1 from "../assets/papers/im2_trending1.png";
import imTrending2 from "../assets/papers/im2_trending2.png";
import imScoop from "../assets/papers/im3_scoop.png";
import imPays from "../assets/papers/im4_pays.png";
import imTempo from "../assets/papers/im5_histogramme_tempo.png";
import imVelocity from "../assets/papers/im6_velocity.png";
import imRatio from "../assets/papers/im7_ratio_effort_attention.png";
import wikiPulseVideo from "../assets/papers/wiki_pulse.mp4";
import wikiPulseDoc from "../assets/papers/wikipedia-pulse.pdf";

export interface ProjectGalleryImage {
  src: string;
  /** i18n key resolved against t.projects.media.<id>.shots */
  captionKey: string;
}

export interface ProjectMedia {
  video?: string;
  doc?: string;
  /** First gallery image doubles as the carousel cover. */
  images: ProjectGalleryImage[];
}

export const projectMediaById: Record<string, ProjectMedia> = {
  "wikipedia-pulse": {
    video: wikiPulseVideo,
    doc: wikiPulseDoc,
    images: [
      { src: imMetric, captionKey: "metric" },
      { src: imTrending1, captionKey: "trending1" },
      { src: imTrending2, captionKey: "trending2" },
      { src: imScoop, captionKey: "scoop" },
      { src: imPays, captionKey: "country" },
      { src: imTempo, captionKey: "tempo" },
      { src: imVelocity, captionKey: "velocity" },
      { src: imRatio, captionKey: "ratio" },
    ],
  },
};
