-- run the below command to initialize the database
-- source /home/moshiurho/public_html/Comp466_Assignment2/part2/createEducordTables.sql;
use moshiurho;

-- Bypass dependencies, delete educordCourseContent at end
DROP TABLE IF EXISTS educordUserList;
DROP TABLE IF EXISTS educordAnnouncements;
DROP TABLE IF EXISTS educordModules;
DROP TABLE IF EXISTS educordReferences;
DROP TABLE IF EXISTS educordAssignments;
DROP TABLE IF EXISTS educordQuizQuestions;
DROP TABLE IF EXISTS educordCourseContent;
DROP TABLE IF EXISTS educordEnrolledStudents;
DROP TABLE IF EXISTS educordAssignmentSubmissions;
DROP TABLE IF EXISTS educordQuizGrades;

CREATE TABLE educordUserList(
    username varchar(255) NOT NULL,
    passwd varchar(255) NOT NULL,
    usertype varchar(10) NOT NULL,
    PRIMARY KEY (username)  
);

 
CREATE TABLE educordCourseContent(
    coursecode varchar(255) NOT NULL,
    coursetype varchar(255) NOT NULL,
    coursename varchar(255) NOT NULL,
    instructorname varchar(255) NOT NULL
);


CREATE TABLE educordAnnouncements(
    coursecode varchar(255) NOT NULL,
    announcement text NOT NULL,
    announceDate date NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordModules(
    coursecode varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    week varchar(255) NOT NULL,
    moduleText TEXT NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordReferences(
    coursecode varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    week varchar(255) NOT NULL,
    link varchar(255) NOT NULL,
    referenceText text NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordAssignments(
    coursecode varchar(255) NOT NULL,
    week varchar(255) NOT NULL,
    link varchar(255) NOT NULL,
    dueDate date NOT NULL,
    assignmentText text NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordQuizQuestions(
    coursecode varchar(255) NOT NULL,
    quizName varchar(255) NOT NULL,
    week varchar(255) NOT NULL,
    question varchar(255) NOT NULL,
    choiceA varchar(255) NOT NULL,
    choiceB varchar(255) NOT NULL,
    choiceC varchar(255) NOT NULL,
    choiceD varchar(255) NOT NULL,
    answer varchar(7) NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordEnrolledStudents(
    studentname varchar(255) NOT NULL,    
    coursecode varchar(255) NOT NULL,
    coursename varchar(255) NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordAssignmentSubmissions(
    studentname varchar(255) NOT NULL,
    coursecode varchar(255) NOT NULL,
    link varchar(255) NOT NULL,
    instructorname varchar(255) NOT NULL
);

CREATE TABLE educordQuizGrades(
    studentname varchar(255) NOT NULL,
    grade float NOT NULL,
    coursecode varchar(255) NOT NULL,
    quizName varchar(255) NOT NULL,
    submitTime datetime NOT NULL,
    instructorname varchar(255) NOT NULL
);
