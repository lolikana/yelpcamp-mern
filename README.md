# MERN YelpCamp Clone

This is a clone of the YelpCamp project from the Udemy Web Development Bootcamp, implemented using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project is designed to serve as a comprehensive example of a full-stack web application, focusing on campgrounds and reviews.

## Overview

The MERN YelpCamp Clone is a full-stack web application that allows users to:

View a list of campgrounds with descriptions and images.
- Add new campgrounds to the database.
- Leave reviews and ratings for campgrounds.
- Edit and delete their own campgrounds and reviews.
- Implement user authentication for creating and editing campgrounds and reviews.

## Features
- <strong>User Authentication</strong>: Users can sign up, log in, and log out. Authentication is implemented using JWT (JSON Web Tokens).
- <strong>Campground Management</strong>: Users can add new campgrounds, edit their own campgrounds, and delete their own campgrounds.
- <strong>Responsive Design</strong>: The application is responsive and works well on both desktop and mobile devices.
- <strong>Image Upload</strong>: Campground owners can upload images for their campgrounds using Cloudinary.

## Technologies Used
The project uses the following technologies:

### Frontend:
- React.js for building the user interface.
- React Router for client-side routing.
- Context API for state management.
- Mapbox-gl
- Swiper
  
### Backend:
- Node.js and Express.js for building the server.
- MongoDB for the database, with Mongoose for modeling data.
- Cloudinary for image storage and management.

## To-Dos
- [x] Implement image upload for campgrounds.
- [x] Ensure that deleting a campground also deletes associated files from Cloudinary.
- [x] Implement Mapbox-gl
- [ ] Implement reviews 
