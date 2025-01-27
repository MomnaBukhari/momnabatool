import "../styling/Recommendation.css";
// eslint-disable-next-line react/prop-types
function RecommendationsPage({ limit }) {
  const recommendations = [
    {
      name: "Ameer Chand",
      position: "Tutor | UOG",
      text: "MOMNA is a highly motivated and intellectually curious individual with a strong academic foundation. I am confident that they will excel in their future endeavors and make significant contributions in their chosen field. I highly recommend MOMNA without reservation.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Ibrahim Haider",
      position: "Head of Organizational Development | Rev9 Solutions",
      text: "Momna is a quick learner with a strong work ethic. She took on challenges with enthusiasm and delivered results beyond expectations. A great asset to any team!",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Osama Nisar",
      position: "Senior Backend Developer | Rev9 Solutions ",
      text: "I had the pleasure to mentored Momna as a Laravel Developer. They consistently demonstrated exceptional skills in problem-solving and coding during their internship duration. Currently, their dedication and teamwork are exceptional. I highly recommend them for any future opportunities.",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
    {
      name: "Mehmoona Nasim",
      position: "Senior Frontend Developer | Rev9 Solutions",
      text: "She ensures every bits and bytes to be appealing and perfect. Not only humble, but also a perfectionist!",
      image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    },
  ];

  const recommendationsToDisplay = limit ? recommendations.slice(0, limit) : recommendations;

  return (
    <>
      <div className="recommendations-page">
        <h1>What Momna&apos;s collegues say:</h1>
        <div className="recommendations-grid">
          {recommendationsToDisplay.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <div className="recommendation-content">
                <div className="recommendation-image">
                  <img src={rec.image} alt={rec.name} />
                </div>
                <div className="recommendation-text">
                  <p>&quot;{rec.text}&quot;</p>
                  <p className="recommendation-author">
                    - {rec.name}, <em>{rec.position}</em>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit && limit === 2 && (
          <div className="see-more">
            <a href="/recommendations">View More</a>
          </div>
        )}
      </div>
    </>
  );
}

export default RecommendationsPage;
