import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  {
    getBooks{
      id
      name
      author
      isbn
      serialNumber
    }
  }
`;

export const GET_STUDENTS = gql`
  {
    getStudents{
      id
      name
      grade
      serialNumber
      gender
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $name:String!,
    $author:String!,
    $isbn:String!
  ){
    addBook(
      name:$name,
      author:$author,
      isbn:$isbn
    ){
      id
      name
      author
      isbn
      serialNumber
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation AddStudent(
    $name:String!,
    $grade:Int!,
    $gender:Gender!
  ){
    addStudent(
      name:$name,
      grade:$grade,
      gender:$gender
    ){
      id
      name
      grade
      serialNumber
      gender
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id:ID!){
    deleteStudent(id:$id)
  }
`;

export const GET_STUDENT = gql`
  query GetStudent($id:ID!){
    getStudent(id:$id){
      id
      name
      grade
      serialNumber
      gender
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id:ID!,
    $name:String,
    $grade:Int,
    $gender:Gender!
  ){
    updateStudent(
      id:$id,
      name:$name,
      grade:$grade,
      gender:$gender
    ){
      id
      name
      grade
      serialNumber
      gender
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id:ID!){
    deleteBook(id:$id)
  }
`;

export const GET_BOOK = gql`
  query GetBook($id:ID!){
    getBook(id:$id){
      id
      name
      author
      isbn
      serialNumber
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id:ID!,
    $name:String,
    $author:String,
    $isbn:String
  ){
    updateBook(
      id:$id,
      name:$name,
      author:$author,
      isbn:$isbn
    ){
      id
      name
      author
      isbn
      serialNumber
    }
  }
`;

export const BORROW_BOOK = gql`
  mutation BorrowBook(
    $studentSerialNumber:String!,
    $bookSerialNumber:String!
  ){
    borrowBook(
      studentSerialNumber:$studentSerialNumber,
      bookSerialNumber:$bookSerialNumber
    ){
      id
      student{
        id
        name
      }
      book{
        id
        name
      }
      borrowedDate
      returnedDate
    }
  }
`;

export const GET_BOOK_LOGS = gql`
  {
    getBookLogs{
      id
      student{
        id
        name
        grade
      }
      book{
        id
        name
        author
        isbn
      }
      borrowedDate
      returnedDate
    }
  }
`;

export default {};
