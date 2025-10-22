import "../styling/Recommendation.css";

function RecommendationsPage({ limit }) {
  const recommendations = [
    {
      name: "Muhammad Umair",
      profile: "https://www.linkedin.com/in/muhammad-umair-a36912205",
      position: "Vice President of Product Management | Rev9 Solutions",
      text: "I had the chance to work with Momna for a short time, and I was genuinely impressed by how quickly she adapted and contributed. She has a solid grip on backend development and approaches her work with clarity and confidence.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Muhammad Taimoor Saleem",
      profile: "https://www.linkedin.com/in/muhammad-taimoor-saleem-3891a4219",
      position: "Sr Flutter Developer at Rev9 Solutions",
      text: "I've worked with Momna Batool and have been consistently impressed by her backend expertise, clean code, and problem-solving skills. She is reliable, efficient, and a strong team player—highly recommended.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Ameer Chand",
      profile: "#",
      position: "Tutor | UOG",
      text: "MOMNA is a highly motivated and intellectually curious individual with a strong academic foundation. I highly recommend MOMNA without reservation.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Ibrahim Haider",
      profile: "#",
      position: "Head of Organizational Development | Rev9 Solutions",
      text: "Momna is a quick learner with a strong work ethic. She took on challenges with enthusiasm and delivered results beyond expectations.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Osama Nisar",
      profile: "#",
      position: "Senior Backend Developer | Rev9 Solutions ",
      text: "I had the pleasure to mentor Momna as a Laravel Developer. She consistently demonstrated exceptional skills in problem-solving and coding.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Mehmoona Nasim",
      profile: "#",
      position: "Senior Frontend Developer | Rev9 Solutions",
      text: "She ensures every bits and bytes to be appealing and perfect. Not only humble, but also a perfectionist!",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
  ];

  const recommendationsToDisplay = limit ? recommendations.slice(0, limit) : recommendations;

  return (
    <div className="recommendations-page">
      <h1>What Momna&apos;s colleagues say:</h1>
      <div className="recommendations-grid">
        {recommendationsToDisplay.map((rec, index) => (
          <div
            key={index}
            className="recommendation-card"
            style={{
              "--rotation": `${Math.floor(Math.random() * 10 - 5)}deg`,
            }}
          >
            {/* <div className="recommendation-image">
              <img src={rec.image} alt={rec.name} />
            </div> */}
            <p>"{rec.text}"</p>
            <p className="recommendation-author">
              - <a href={rec.profile} target="_blank" rel="noreferrer">{rec.name}</a>, <em>{rec.position}</em>
            </p>
          </div>
        ))}
      </div>

      {/* View More button logic stays */}
      {limit && limit < recommendations.length && (
        <div className="see-more">
          <a href="/recommendations">View More</a>
        </div>
      )}
    </div>
  );
}

export default RecommendationsPage;
