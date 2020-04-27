# Steps to setup


Install nodejs from [here]

Install mongodb by following the instructions given on this [link]

Install npm dependencies

```
npm install
```

Start employees api:

```
npm run employees
```

Start newSalary api:

```
npm run newSalary
```

____________________________________

# APIs


The below sections outlines the Sequence Diagram & Details around the APIs

* [SequenceDiagram](#sequenceDiagram)
* [Details](#details)


## SequenceDiagram

![api_sequence_diagram](assets/images/api_sequence_diagram.png)


## Details

This section outlines the details of the below 2 APIs:

* [employees](#employees)
* [newSalary](#newSalary)

### employees

The employees API can be used to create/store employee information. It contains the following Routes:

* /employees
* /employees/:employeeName

#### /employees

<!-- /employees -->

> **Methods Supported are POST and GET**

##### POST

> Use this method to add new employee(s) to the DB. This example shows usage of **Body and Optional Field (Gender)** in the request.


###### Body

| Field         | Data Type | Required | Example              |
| ------------- |:---------:| --------:| --------------------:|
| employeeName  | String    | true     | user001              |
| emailId       | String    | true     | user001@TestZone.com |
| gender        | String    | false    | female               |
| title         | String    | true     | manager              |
| currentSalary | Number    | true     | 80000                |

<details>
<summary> Sample Curl Request...</summary>
<p>

```
curl --location --request POST 'http://localhost:3000/employees' \
--header 'Content-Type: application/json' \
--data-raw '[{
    "employeeName": "user001",
    "emailId": "user001@TestZone.com",
    "gender": "female",
    "title": "manager",
    "currentSalary": "80000"
}, {
    "employeeName": "user002",
    "emailId": "user002@TestZone.com",
    "gender": "female",
    "title": "director",
    "currentSalary": "80000"
}]'
```

</p>
</details>


<details>
<summary>Sample Response Body...</summary>
<p>

```
[
    {
        "message": "user001 employee created"
    },
    {
        "message": "user002 employee created"
    }
]
```

</p>
</details>


##### GET

> Use this method to get information of all the employees available in the DB. This example simply shows how GET Method is being used to fetch multiple records.

<details>
<summary>Sample Curl Request...</summary>
<p>

```
curl --location --request GET 'http://localhost:3000/employees' \
--header 'Content-Type: application/json'
```

</p>
</details>

<details>
<summary>Sample Response Body...</summary>
<p>

```
[
    {
        "_id": "5e7115d803b7cc50f8f93863",
        "employeeName": "user001",
        "emailId": "user001@TestZone.com",
        "gender": "80000",
        "title": "manager",
        "currentSalary": 80000,
        "createdAt": "2020-03-17T18:24:24.365Z",
        "updatedAt": "2020-03-17T18:24:24.365Z",
        "__v": 0
    },
        {
        "_id": "5e7115d803b7cc50f8f93863",
        "employeeName": "user002",
        "emailId": "user002@TestZone.com",
        "gender": "male",
        "title": "engineer",
        "currentSalary": 60000,
        "createdAt": "2020-03-17T18:17:24.365Z",
        "updatedAt": "2020-03-17T18:17:24.365Z",
        "__v": 0
    },

]
```

</p>
</details>

#### /employees/:employeeName

> **Methods Supported are GET, PUT and GET**

##### GET

> Use this method to get the information of an employee. This example shows usage of **Path Parameter & Query Parameter (API response delay time in seconds)** in the request.

###### Path Parameter

| Field         | Data Type | Required | Example |
| ------------- |:---------:| --------:| -------:|
| employeeName  | String    | true     | user001 |

###### Query Parameter

| Field  | Data Type | Required | Example |
| ------ |:---------:| --------:| -------:|
| delay  | Number    | false    | 4       |

<details>
<summary>Sample Curl Request...</summary>
<p>

```
curl --location --request GET 'http://localhost:3000/employees/user001?delay=4' \
--header 'Content-Type: application/json'
```

</p>
</details>

<details>
<summary>Sample Response Body...</summary>
<p>

```
{
    "_id": "5e7115d803b7cc50f8f93863",
    "employeeName": "user001",
    "emailId": "user001@TestZone.com",
    "gender": "female",
    "title": "manager",
    "currentSalary": 80000,
    "createdAt": "2020-03-17T18:24:24.365Z",
    "updatedAt": "2020-03-17T18:24:24.365Z",
    "__v": 0
}
```

</p>
</details>

##### PUT

> Use this method to update the information of an employee. This example shows usage of **Body & Path Parameter** in the request.

###### Path Parameter

| Field         | Data Type | Required | Example |
| ------------- |:---------:| --------:| -------:|
| employeeName  | String    | true     | user001 |

###### Body

| Field         | Data Type | Required | Example              |
| ------------- |:---------:| --------:| --------------------:|
| employeeName  | String    | true     | user001              |
| emailId       | String    | true     | user001@TestZone.com |
| gender        | String    | false    | female               |
| title         | String    | true     | manager              |
| currentSalary | Number    | true     | 80000                |

<details>
<summary> Sample Curl Request...</summary>
<p>

```
curl --location --request PUT 'http://localhost:3000/employees/user001' \
--header 'Content-Type: application/json' \
--data-raw '{
    "employeeName": "user001",
    "emailId": "user001@TestZone.com",
    "gender": "female",
    "title": "director",
    "currentSalary": 100000
}'
```

</p>
</details>

<details>
<summary>Sample Response Body...</summary>
<p>

```
{
    "_id": "5e7115d803b7cc50f8f93863",
    "employeeName": "user001",
    "emailId": "user001@TestZone.com",
    "gender": "female",
    "title": "director",
    "currentSalary": 100000,
    "createdAt": "2020-03-17T18:24:24.365Z",
    "updatedAt": "2020-03-20T20:50:03.590Z",
    "__v": 0
}
```

</p>
</details>

##### DELETE

> Use this method to delete the information of an employee. This example shows usage of **Path Parameter** in the request.

###### Path Parameter

| Field         | Data Type | Required | Example |
| ------------- |:---------:| --------:| -------:|
| employeeName  | String    | true     | user001 |

<details>
<summary> Sample Curl Request...</summary>
<p>

```
curl --location --request DELETE 'http://localhost:3000/employees/user001' \
--header 'Content-Type: application/json'
```

</p>
</details>

<details>
<summary>Sample Response Body...</summary>
<p>

```
{
    "message": "Employee deleted successfully!"
}
```

</p>
</details>

### `newSalary`
This API can be used to calculate the New Salary of an employee. The calculation logic is as below:

```
New Salary = Current Salary + (Performance Rating * Salary Multiplier). 
Salary Multiplier is:
2000 for engineer
3000 for manager
4000 for director

So, if the Current Salary of a Manager is 80000 and she has a performance rating of 4.5, then her New Salary will be:

80000 + (4.5 * 3000) = 93500
```

It contains the following Route:

* /newSalary

#### /newSalary

> **Method Supported is GET**

##### GET

> Use this method to calculate the salary of an Employee. This example shows usage of **Query Parameter & Header** in the request.

###### Query Parameter

| Field         | Data Type | Required  | Example |
| ------------- |:---------:| ---------:| -------:|
| employeeName  | String    | true      | user001 |

###### Header

| Field              | Data Type | Required | Example |
| ------------------ |:---------:| --------:| -------:|
| performanceRating  | Number    | true     | 4.5     |

<details>
<summary>Sample Curl Request...</summary>
<p>

```
curl --location --request GET 'http://localhost:3000/newSalary?employeeName=user001' \
--header 'Content-Type: application/json' \
--header 'performanceRating: 4.5'
```

</p>
</details>

<details>
<summary>Sample Response Body...</summary>
<p>

```
{
    "newSalary": 93500
}
```

</p>
</details>


[here]: https://nodejs.org/en/download/
[link]: https://docs.mongodb.com/manual/installation/