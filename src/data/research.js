// MRes dissertation. Describe the question and the method; add findings
// here only once you're happy to publish them.

export const research = {
  degree: "MRes Artificial Intelligence",
  institution: "University of Greater Manchester",
  title: "Multilingual Sentiment Analysis for Fashion Trend Prediction",
  subtitle: "A comparative study of multilingual and monolingual data from social media",
  // The dissertation's public record. Access to the full text is restricted on Zenodo.
  publication: {
    url: "https://zenodo.org/records/24054489",
    host: "Zenodo",
    type: "MRes dissertation",
    published: "8 November 2026",
    access: "Restricted access",
    note: "Assessed by an academic panel. Not a peer-reviewed journal or conference paper.",
  },
  question:
    "Does analysing Instagram fashion content in many languages give broader, richer trend insight than analysing English alone?",
  scope:
    "Text only: captions, hashtags and comments from public posts. Images, multimodal learning and other platforms are out of scope.",
  approach:
    "Architecture-first: the whole pipeline was planned before any code, then built as separate modules across 17 phases.",
  // A real sequence: each stage feeds the next.
  pipeline: [
    {
      title: "Collect",
      detail: "Gather public Instagram fashion posts: captions, hashtags and comments.",
      tools: ["Instaloader", "Selenium", "BeautifulSoup"],
    },
    {
      title: "Clean and detect language",
      detail: "Normalise the text and tag every post with its language.",
      tools: ["pandas", "NLTK", "langdetect"],
    },
    {
      title: "Baseline model",
      detail: "Three-class sentiment (positive, neutral, negative) with TF-IDF features and logistic regression.",
      tools: ["scikit-learn"],
    },
    {
      title: "Fine-tune XLM-RoBERTa",
      detail: "Fine-tune a multilingual transformer on the same three-class task.",
      tools: ["PyTorch", "Transformers"],
    },
    {
      title: "Evaluate",
      detail: "Compare models with accuracy, precision, recall, macro F1 and confusion matrices.",
      tools: ["scikit-learn"],
    },
    {
      title: "Compare trends",
      detail: "Extract trend signals and test the multilingual view against English-only, with charts and statistical tests.",
      tools: ["SciPy", "Matplotlib", "Seaborn"],
    },
  ],
  stack: ["Python 3.13", "pandas", "NumPy", "Git and GitHub"],
};
