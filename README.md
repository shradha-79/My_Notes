#About the Project

It is a web application made using MERN Stack. It is used for making and storing notes with title, description and tag.
It allows us register ourself with ourunique email id and all the notes are password secured, only user with correct id and password can access the notes. These notes can be edited, deleted and more notes can be added as required.
It consist of two parts - Frontend and Backend.


#BACKEND
First we connect mongodb to our backend by providing mongoURL.

we provided port and all the paths or routes in index.js.

models folder consist of schema of Notes.js(user(basically id of user), title, description, tag, date) and User.js(name, email, password, date).

auth.js - Route1: Takes data to register a new user if that user doesn't exist already. Password is hashed using bcrypt. A token is create using id through jwt.
          Route2: Takes email and password and check if they are correct and return authtoken.
          Route3: Fetch user data from fetchuser(It takes auth-token and verify it and return user if token is correct) and return all info except password.
notes.js - Route1: Get all notes - 
           Route2: Add Note - 
           Route3: Update Note - 
           Route4: Delete Note - 
#FRONTEND
