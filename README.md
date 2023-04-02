Library Management System
=========================

This is a Library Management System web application that helps librarians manage their books and members. The system enables librarians to add, view, and edit books and members, issue books to members, and receive returned books.

Features
--------

The Library Management System has the following features:

-   Add, view, and edit books
-   Add, view, and edit members
-   Issue books to members
-   Receive returned books
-   Generate reports of books and members

Getting started
---------------

To get started with the Library Management System, you need to have the following installed on your system:

-   Git
-   Node.js
-   MongoDB

### Installation

1.  Clone the repository:
```
git clone https://github.com/sabalach/library-mgmt.git
```

1.  Install the dependencies:
```
cd library-mgmt
npm install
```

1.  Start the server:
```
npm start
```

1.  Open the application in your browser:
```
http://localhost:3000
```

### Configuration

To configure the application, edit the `config.js` file in the `config` folder. You can set the MongoDB URI and the application port.
```
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost/library-mgmt'
};
```

Contributing
------------

Contributions to the Library Management System are welcome! You can contribute by:

-   Reporting a bug
-   Fixing a bug
-   Adding a new feature
-   Improving the documentation

License
-------

The Library Management System is licensed under the [MIT License](https://opensource.org/licenses/MIT).
