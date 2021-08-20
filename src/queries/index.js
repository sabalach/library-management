import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($condition:BookCondition){
    getBooks(condition:$condition){
      id
      name
      author
      isbn
      serialNumber
      condition
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudents{
    getStudents{
      id
      name
      serialNumber
      gender
      level{
        id
        name
        abbreviation
      }
      department{
        id
        name
        abbreviation
      }
      photo
      address
      dob
      validUpto
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $name:String!,
    $author:String!,
    $isbn:String!,
    $condition:BookCondition!
  ){
    addBook(
      name:$name,
      author:$author,
      isbn:$isbn,
      condition:$condition
    ){
      id
      name
      author
      isbn
      serialNumber
      condition
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation AddStudent(
    $name:String!,
    $gender:Gender!,
    $levelId: ID!,
    $departmentId: ID!,
    $serialNumber:String,
    $address:String,
    $dob:String,
    $photo: Upload,
    $validUpto:String
  ){
    addStudent(
      name:$name,
      gender:$gender,
      levelId:$levelId,
      departmentId:$departmentId,
      serialNumber:$serialNumber,
      photo:$photo,
      address:$address,
      dob:$dob,
      validUpto:$validUpto
    ){
      id
      name
      serialNumber
      gender
      level{
        id
        name
        abbreviation
      }
      department{
        id
        name
        abbreviation
      }
      photo
      address
      dob
      validUpto
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
      serialNumber
      gender
      level{
        id
        name
        abbreviation
      }
      department{
        id
        name
        abbreviation
      }
      photo
      address
      dob
      validUpto
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id:ID!,
    $name:String,
    $gender:Gender,
    $levelId: ID,
    $departmentId: ID,
    $serialNumber:String,
    $address:String,
    $dob:String,
    $photo:Upload,
    $validUpto:String
  ){
    updateStudent(
      id:$id,
      name:$name,
      gender:$gender
      levelId:$levelId,
      departmentId:$departmentId,
      serialNumber:$serialNumber,
      address:$address,
      dob:$dob,
      photo: $photo,
      validUpto:$validUpto
    ){
      id
      name
      serialNumber
      gender
      level{
        id
        name
        abbreviation
      }
      department{
        id
        name
        abbreviation
      }
      photo
      address
      dob
      validUpto
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
      condition
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id:ID!,
    $name:String,
    $author:String,
    $isbn:String,
    $condition:BookCondition
  ){
    updateBook(
      id:$id,
      name:$name,
      author:$author,
      isbn:$isbn,
      condition:$condition
    ){
      id
      name
      author
      isbn
      serialNumber
      condition
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
  query GetBookLogs($studentSerialNumber:String){
    getBookLogs(studentSerialNumber:$studentSerialNumber){
      id
      student{
        id
        name
        serialNumber
      }
      book{
        id
        name
        author
        isbn
        serialNumber
        condition
      }
      borrowedDate
      returnedDate
      paidFine
    }
  }
`;

export const RETURN_BOOK = gql`
  mutation ReturnBook($bookSerialNumber:String!){
    returnBook(bookSerialNumber:$bookSerialNumber){
      id
      student{
        id
        name
      }
      book{
        name
        author
        serialNumber
      }
      borrowedDate
      returnedDate
    }
  }
`;

export const GET_LEVELS = gql`
  query GetLevels{
    getLevels{
      id
      name
      abbreviation
    }
  }
`;

export const ADD_LEVEL = gql`
  mutation AddLevel(
    $name: String!,
    $abbreviation: String!
  ){
    addLevel(
      name:$name,
      abbreviation:$abbreviation
    ){
      id
      name
      abbreviation
    }
  }
`;

export const DELETE_LEVEL = gql`
  mutation DeleteLevel($id:ID!){
    deleteLevel(id:$id)
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments{
    getDepartments{
      id
      name
      abbreviation
    }
  }
`;

export const ADD_DEPARTMENT = gql`
  mutation AddDepartment(
    $name: String!,
    $abbreviation: String!
  ){
    addDepartment(
      name:$name,
      abbreviation:$abbreviation
    ){
      id
      name
      abbreviation
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id:ID!){
    deleteDepartment(id:$id)
  }
`;

export const LOGO_UPLOAD = gql`
  mutation EditLogo($logo:Upload!){
    logoUpload(logo:$logo)
  }
`;

export const GET_CONFIG = gql`
  query GetConfig{
    getConfig{
      institutionName
      institutionLocation
      institutionContact
      studentLimit
      fineAfter
      institutionAbb
    }
  }
`;

export const SET_CONFIG = gql`
  mutation SetConfig(
    $institutionName:String,
    $institutionLocation:String,
    $institutionContact:String,
    $studentLimit: Int,
    $fineAfter: Int,
    $institutionAbb: String
  ){
    setConfig(
      institutionName:$institutionName,
      institutionLocation:$institutionLocation,
      institutionContact:$institutionContact,
      studentLimit:$studentLimit,
      fineAfter:$fineAfter,
      institutionAbb:$institutionAbb
    ){
      institutionName
      institutionLocation
      institutionContact
    }
  }
`;

export const QUICK_BORROW = gql`
  mutation QuickBorrow(
    $studentSerialNumber:String!,
    $bookSerialNumber:String!
  ){
    quickBorrow(
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
      paidFine
      returnedDate
    }
  }
`;

export const PAY_BOOK_FINE = gql`
  mutation PayBookFine($bookLogId:ID!){
    payBookFine(bookLogId:$bookLogId){
      id
      student{
        id
        name
        serialNumber
      }
      book{
        id
        name
        author
        isbn
        serialNumber
        condition
      }
      borrowedDate
      returnedDate
      paidFine
    }
  }
`;

export const GET_STATS = gql`
  query GetStats{
    getStats{
      totalBooks
      totalStudents
      borrowedBooks
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username:String!,$password:String!){
    login(username:$username,password:$password)
  }
`;

export default {};
