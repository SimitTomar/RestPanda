# RestPanda - Set of Restful APIs

Set of Restful CRUD APIs based on Node.js for rboilerplates, prototypes, demos & courses


# Quick Start


## Steps to Setup

Install mongodb by following the instructions given on this [link]


Install npm dependencies

```bash
npm install
```

Run Server

```bash
npm run start
```

You can browse the apis at <http://localhost:3000>


## APIs

The below sections outlines the Sequence Diagram & Details around the APIs

* [`Sequence Diagram`](#Sequence_Diagram)
* [`Details`](#Details)


### `Sequence Diagram`

![api_sequence_diagram](assets/images/api_sequence_diagram.png)


### `Details`

* [`employees`](#employees)
* [`newSalary`](#newSalary)


#### `employees`

<!-- employees -->

The employees API can be used to create/store employee information. It contains the following methods:

* [`POST`](#POST)
* [`GET`](#GET)
* [`PUT`](#PUT)
* [`DELETE`](#DELETE)


##### `POST`
* [`Endpoint`](#Endpoint)
* [`Body`](#Body)
* [`Sample Curl Request`](#Sample_Curl_Request)
* [`Response Body`](#Response_Body)

###### `Endpoint`: 
```
/employees - Use this endpoint to add a new employee to the DB
```

###### `Body`:
```
| Field         | Data Type | Required | Example |
| ------------- |:---------:| --------:| -------:|
| employeeName  | String    | true     | user001 |
| emailId       | String    | true     | a@b.com |
| gender        | String    | false    | male    |
| title         | String    | true     | manager |
| currentSalary | Number    | true     | 100000  |
| experience    | Number    | true     | 8       |
```
###### `Sample Curl Request`:

```
curl --location --request POST 'http://localhost:3000/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "employeeName": "user001",
    "emailId": "a@b.com",
    "gender": "male",
    "title": "manager",
    "currentSalary": 100000,
    "experience": 8
}'
```

#### `Response Body`:

```
{
    "_id": "5e7115d803b7cc50f8f93863",
    "employeeName": "user001",
    "emailId": "a@b.com",
    "gender": "male",
    "title": "manager",
    "currentSalary": 100000,
    "experience": 8,
    "createdAt": "2020-03-17T18:24:24.365Z",
    "updatedAt": "2020-03-17T18:24:24.365Z",
    "__v": 0
}
```


### GET

#### Endpoint: 
```
/employees/:employeeName - Use this endpoint to Get information of one employee
```

#### Path Parameter:
| Field         | Data Type | Required | Example |
| ------------- |:---------:| --------:| -------:|
| employeeName  | String    | false     | user001 |

#### Sample Curl Request:

```
curl --location --request GET 'http://localhost:3000/employees' \
--header 'Content-Type: application/json'
```

#### Response Body:

```
[
    {
        "_id": "5e7115d803b7cc50f8f93863",
        "employeeName": "user001",
        "emailId": "a@b.com",
        "gender": "male",
        "title": "manager",
        "currentSalary": 100000,
        "experience": 8,
        "createdAt": "2020-03-17T18:24:24.365Z",
        "updatedAt": "2020-03-17T18:24:24.365Z",
        "__v": 0
    }
]
```

#### Endpoint: 
```
/employees - Use this endpoint to Get information of all the employees available in the DB
```

#### Sample Curl Request:

```
curl --location --request GET 'http://localhost:3000/employees/user001' \
--header 'Content-Type: application/json'
```

#### Response Body:

```
{
    "_id": "5e7115d803b7cc50f8f93863",
    "employeeName": "user001",
    "emailId": "a@b.com",
    "gender": "male",
    "title": "manager",
    "currentSalary": 100000,
    "experience": 8,
    "createdAt": "2020-03-17T18:24:24.365Z",
    "updatedAt": "2020-03-17T18:24:24.365Z",
    "__v": 0
}
```


<!-- employeesstop -->

[link]: https://docs.mongodb.com/manual/installation/