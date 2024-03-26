# Music Library
A music portal allowing users to catalog their favourite tunes!


This project is made up of both a front-end & back-end component, both of which can be found in their respective folder.

# Front-end
The front-end has been built using React. You can use the following commands to interact with it:

| Command             | Description                                     |
|---------------------|-------------------------------------------------|
| npm ci              | Fetch all required packages to run application  |
| npm run test        | Run all test                                    |
| npm run start       | Start development server on localhost           |
| npm run build       | Create a production build of the project        |
| npx serve -s build  | Start production build on localhost             |


> [!NOTE]  
> Environment variables need to be set before running the application. You can create a `.env` file from the `.env.example` found inside the front-end project folder & will it with your own respective values for the given keys.

> [!CAUTION]
> Interacting with the application should be done through the production build. Reduced perfomance will be noticable when interacting through the development server.

# Back-end
The back-end is written in Java & utilises Spring-boot. The application can be interacted with using the following command:

| Command           | Description                                 |
|-------------------|---------------------------------------------|
| ./gradlew bootrun | Run the application through Gradle directly |


# Database
The back-end needs to be connected to a database. Docker-compose has been utilised to spin up a Postgres container to interact with. You can derive a `.env` file from the  `.env.example` in the root directory & fill in your respective values. 
To start the Postgres container simply run the following command:

| Command           | Description                                                                    |
|-------------------|--------------------------------------------------------------------------------|
| docker-compose up | Runs Postgres instance using environments variables within your root .env file |


> [!NOTE]  
>  While docker-compose will look at the root `.env` file, the Java application will not. You will have to manually set the required environment variables, using whichever method you prefer.  The ```application.properties``` file will give you an indication of which environment variables to set if you require further guidance.



# Endpoints
| Method | Endpoint    | Description                        |
|--------|-------------|------------------------------------|
| POST   | /songs      | Add New Song                       |
| GET    | /songs      | Retrieve Paginated Songs           |
| GET    | /songs/{id} | Retrieve Song Resource Of Given ID |


# Considerations
Validating duplicate records when it comes to songs is rather futile.

Songs titles are not unique.

1) 2 seperate artists can have the same song name e.g:


    | Artist          | Song |
    |-----------------|------|
    | Michael Jackson | Bad  |
    | U2              | Bad  |


2) The same artist can also have 2 songs of the same title e.g:

    | Artist        | Song                | Release Date |
    |---------------|---------------------|--------------|
    | Kylie Minogue | Love At First Sight | 1988         |
    | Kylie Minogue | Love At First Sight | 2001         |


3) The relationship between a song title & artists are not one-to-one either. 

    - One song can have one or many artists attributed to it
    - One song can have muliple variations of "primary" & "featured" artists associated to it

    | Song Title | Camila Cabello | Shawn Mendes   |
    |------------|----------------|----------------|
    | Señorita   | PRIMARY ARTIST | PRIMARY ARTIST |

    | Song Title | Usher          | Lil Jon         | Ludacris        |
    |------------|----------------|-----------------|-----------------|
    | Yeah!      | PRIMARY ARTIST | FEATURED ARTIST | FEATURED ARTIST |


For this reason I have decided upon a many-to-many relationship between artists & songs. The following ERD diagram references the relationships used within this project:


![Music Library ERD](https://github.com/vjrai/music-library/blob/main/erd.png?raw=true)





