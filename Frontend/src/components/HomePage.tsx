import Button from "./Button"

const HomePage= () => {
    const backgroundImageURL = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/cryptocurrency_explained.jpg';

    const backgroundStyle = {
      backgroundImage: `url(${backgroundImageURL})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh', // Adjust the height as needed
    };

  return <div style={backgroundStyle}>
    <Button />
  </div>;
};

export default HomePage;

