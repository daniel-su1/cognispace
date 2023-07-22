# StudySpotter

## Overview
StudySpotter is a comprehensive, full-stack web application designed to help University of Waterloo students discover, share, and review their favourite study locations throughout the Waterloo region. This project is built using Node.js, Express.js, MongoDB for the backend and Bootstrap with EJS templating for the frontend.

## Screenshots
![App Screenshot](https://raw.githubusercontent.com/daniel-su1/study-spotter/main/screenshots/Screenshot%202023-07-22%20174037.jpg)
![App Screenshot](https://raw.githubusercontent.com/daniel-su1/study-spotter/main/screenshots/Screenshot%202023-07-22%20174136.jpg)
![App Screenshot](https://raw.githubusercontent.com/daniel-su1/study-spotter/main/screenshots/Screenshot%202023-07-22%20173959.jpg)

## Features
- **CRUD Operations:** Students can create, read, update, and delete their preferred study spots.
- **User Authentication:** Secure user registration and login system powered by Passport.js.
- **Image Upload:** Allows users to upload images of their study spots using Cloudinary API.
- **Geocoding:** Convert address inputs to geographic coordinates using Mapbox Geocoding API.

**You can visit the deployment of StudySpotter [here.](https://studyspotter-2e57eb2137fb.herokuapp.com/)**

## Installation

To set up the project locally, follow the steps below:

1. Clone the repository:
```git clone [https://github.com/your_username_/StudySpotter.git](https://github.com/daniel-su1/study-spotter.git)https://github.com/daniel-su1/study-spotter.git```

2. Install NPM packages:
```npm install```

3. Create a .env file in the root directory and populate it with your MongoDB connection string, Cloudinary API credentials, and Mapbox Geocoding API key.

4. Run the application:
```npm start```

## Future Developments

I plan to further improve StudySpotter by overhauling the frontend with a more responsive, visually pleasing UI using React.js. I am also considering converting it into a Single Page Application for improved user experience.

## License

StudySpotter is released under the MIT License. See the [LICENSE](https://github.com/your_username_/StudySpotter/blob/main/LICENSE) file for further details.
