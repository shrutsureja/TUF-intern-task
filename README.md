# TUF-intern-task
completing the task for takeUforward intern

# Task

Tech Stack(preferred) 
Express (must) 
React (Can be next or something else) 

Create a web application that facilitates the submission and display of code snippets. The application should consist of two pages:

Page 1: Construct a form to gather the following fields: username, preferred code language (C++, Java, JavaScript, Python), standard input (stdin), and the source code.

Page 2: Present all submitted entries in a tabular format, showcasing the username, code language, stdin, and the timestamp of submission. Additionally, limit the display of the source code to the initial 100 characters.

The application must function seamlessly with data stored in MySQL tables. Both the frontend and backend applications need to be hosted.

It is required to provide the source codes uploaded to a publicly accessible git repository, along with links to the hosted frontend and backend applications.

Bonus Task 1: Implement Redis to cache the information displayed in the table on page 2, reducing the number of database read requests.

Bonus Task 2: Utilize external APIs, such as Judge0, to retrieve the output of the code and exhibit it in a new column (stdout) on page 2.


Judge0 API: https://judge0.com/, https://rapidapi.com/judge0-official/api/judge0-ce

Host the frontend on platforms like Vercel or similar and complete the Google Form provided.

Deadline: March 21, 2024.

Please ensure adherence to the deadline and provide all necessary details for evaluation.

# my notes

# Task to Do

- [X] Make a basic version and deploy it.
- [ ] Make Some basic frontend of loading State while the data is being fetched.
- [X] Convert the frontend post request such that all the stdin and source_code data get converted to the BASE64.
- [X] Accept the converted data and store it in a file rather than a database and store the file name in the database
- [ ] Need to take the backup of the files in the mongoDB database 
- [ ] Add some instructions for the reviewer

## Routes Required

1. **`GET /api/getAllSubmissions`**
    - return the data about the - username, preffered language, standard input, code snippet and timestamp

2. **`POST /api/submitCodeSnippet`**
    - data to send
        - username -> from the JWT token
        - preferred language -> only from the C++, python, java, javascript
        - standard input -> in BASE64 formate
        - code snippet -> in BASE64 formate
    - return's 
        - Ok on submission
