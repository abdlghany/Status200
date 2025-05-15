-- Create Teachers Table
CREATE TABLE Teachers (
    TeacherID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Subject VARCHAR(50)
);

-- Create Students Table
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100)
);

-- Create Courses Table
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    Description VARCHAR(255),
    TeacherID INT,
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
);

-- Create Enrollments Table
CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    EnrollmentDate DATE,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Populate Teachers Table with 10 Records
INSERT INTO Teachers (TeacherID, FirstName, LastName, Subject) VALUES
(1, 'John', 'Doe', 'Mathematics'),
(2, 'Jane', 'Smith', 'Physics'),
(3, 'Emily', 'Jones', 'Computer Science'),
(4, 'Michael', 'Brown', 'Biology'),
(5, 'Chris', 'Davis', 'Chemistry'),
(6, 'Sarah', 'Wilson', 'History'),
(7, 'David', 'Miller', 'Art'),
(8, 'Daniel', 'Anderson', 'English'),
(9, 'Laura', 'Taylor', 'Economics'),
(10, 'Robert', 'Moore', 'Physical Education');

-- Populate Students Table with 10 Records
INSERT INTO Students (StudentID, FirstName, LastName, Email) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@example.com'),
(2, 'Bob', 'Williams', 'bob.williams@example.com'),
(3, 'Charlie', 'Martinez', 'charlie.martinez@example.com'),
(4, 'Diana', 'Hernandez', 'diana.hernandez@example.com'),
(5, 'Evan', 'Lopez', 'evan.lopez@example.com'),
(6, 'Fiona', 'Gonzalez', 'fiona.gonzalez@example.com'),
(7, 'George', 'Clark', 'george.clark@example.com'),
(8, 'Hannah', 'Rodriguez', 'hannah.rodriguez@example.com'),
(9, 'Ian', 'Lewis', 'ian.lewis@example.com'),
(10, 'Jessica', 'Walker', 'jessica.walker@example.com');

-- Populate Courses Table with 10 Records
INSERT INTO Courses (CourseID, CourseName, Description, TeacherID) VALUES
(1, 'Algebra', 'Introduction to Algebra', 1),
(2, 'Classical Mechanics', 'Fundamentals of Mechanics', 2),
(3, 'Programming 101', 'Introduction to Programming', 3),
(4, 'Genetics', 'Basic Genetics Concepts', 4),
(5, 'Organic Chemistry', 'Fundamentals of Organic Chemistry', 5),
(6, 'World History', 'Overview of World History', 6),
(7, 'Painting', 'Introduction to Painting', 7),
(8, 'Shakespearean Literature', 'Study of Shakespeare', 8),
(9, 'Microeconomics', 'Principles of Microeconomics', 9),
(10, 'Sports Science', 'Basics of Sports Science', NULL); -- No teacher assigned

-- Populate Enrollments Table with 10 Records
INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID, EnrollmentDate) VALUES
(1, 1, 1, '2024-08-01'),
(2, 2, 2, '2024-08-01'),
(3, 3, 3, '2024-08-01'),
(4, 4, 4, '2024-08-01'),
(5, 5, 5, '2024-08-01'),
(6, 1, 3, '2024-08-02'),
(7, 2, 4, '2024-08-02'),
(8, 6, 6, '2024-08-02'),
(9, 7, 7, '2023-09-03'),
(10, 8, 8, '2022-08-03');


-- 1. A list of teachers that don't teacher any courses.
SELECT 
	t.TeacherID AS "Teacher ID",
    t.FirstName AS "First Name",
    t.LastName AS "Last Name",
    t.Subject
FROM Teachers AS t 
LEFT JOIN Courses AS c ON t.TeacherID = c.TeacherID
WHERE c.CourseID IS NULL;


-- 2. A list of students enrolled in any computer science course
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students AS s
JOIN Enrollments AS e ON s.StudentID = e.StudentID
JOIN Courses AS c ON e.CourseID = c.CourseID
JOIN Teachers AS t ON c.TeacherID = t.TeacherID
WHERE t.Subject = 'Computer Science';


-- 3. A list of courses with a minimal of 2 enrollments
SELECT c.CourseName, COUNT(e.EnrollmentID) AS "# Enrollments"
FROM Courses AS c
JOIN Enrollments AS e ON c.CourseID = e.CourseID
GROUP BY c.CourseID
HAVING COUNT(e.EnrollmentID) >= 2;


-- 4. The number of students that didn't sign up for a course.
SELECT COUNT(s.StudentId) AS "# Students without signups"
FROM students AS s
LEFT JOIN Enrollments AS e ON s.StudentId = e.StudentID
WHERE e.StudentId IS NULL;


-- 5. All courses scheduled for last year up till now.
SELECT c.CourseName AS "Courses scheduled for last year up till now"
FROM Courses AS c
JOIN Enrollments AS e ON c.CourseID = e.CourseID
WHERE e.EnrollmentDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND NOW();


-- 6. A list of all students per teacher! Who is in their class?
SELECT 
	t.FirstName AS "Teacher FirstName", 
    t.LastName AS "Teacher LastName", 
    s.FirstName AS "Student FirstName", 
    s.LastName AS "Student LastName"
FROM Students AS s
JOIN Enrollments AS e ON s.StudentID = e.StudentID
JOIN Courses AS c ON e.CourseID = c.CourseID
JOIN Teachers AS t ON c.TeacherID = t.TeacherID
ORDER BY t.TeacherID, s.StudentID;