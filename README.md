# Lecture Manager API :microphone:

Manage your events and lectures using this amazing API.

## Features

- :sleeping: Dynamic Content Management: Create, update, and delete content without code intervention

- :broom: Easy maintainability and code readability

- :teacher: A wide range of features that allow comprehensive management of event venues, events, lectures, and panelists

- :mag: Validation of all data

## Usage

To get started with this Strapi project and MySQL database, follow these steps:

### 1. Create a `.env` file at the root of your project and add the necessary configurations:

```shell

NODE_ENV=development

API_PORT=3001

MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PASSWORD=suasenhadobanco
MYSQL_PORT=3306
MYSQL_DB=lecture-manager

```

### 2. Install all project dependencies

```shell

npm install

```

### 3. Next, start the server

```shell

npm run start

```

### 4. On the running server, the following CRUD operations will be available

---

## Routes

### Location <code><b>/location</b></code>

#### Creating, reading, updating and deleting a Location

<details>
 <summary><code>POST</code> <code><b>/</b></code></summary>

##### Parameters

> None

##### Request Body

> | Field | Type   | Required | Description       |
> | ----- | ------ | -------- | ----------------- |
> | name  | String | Yes      | The location name |

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                       |
> | --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `201`     | `application/json` | `{"message": "Location created!","data": {"fieldCount": 0,"affectedRows": 1,"insertId": 20,"info": "","serverStatus": 2,"warningStatus": 0,"changedRows": 0}}` |
> | `400`     | `application/json` | `{"error": "\"name\" is required"}`                                                                                                                            |
> | `409`     | `application/json` | `{"error": "Location already exists"}`                                                                                                                         |

##### Example cURL Command

```bash
curl --request POST \
--url http://localhost:3001/location \
--header 'Content-Type: application/json' \
--data '{
  "name": "Municipal theater"
}'
```

</details>

<details>
 <summary><code>GET</code> <code><b>/</b></code></summary>

##### Parameters

> None

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                                 |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
> | `200`     | `application/json` | ` {"message": "All locations found!",   "data": [{ "location_id": 18,   "location": "Municipal theater",    "events": [ {   "event_id": 42, "name": "Anime Brasil", "begin_date_time": "2024-06-22T21:00:00.000Z", "end_date_time": "2024-07-01T00:00:00.000Z"  }   ]}]` |

##### Example cURL Command

```bash
curl --request GET \
--url http://localhost:3001/panelist
```

</details>

<details>
 <summary><code>GET</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description     |
> | ----- | ---- | -------- | --------------- |
> | id    | int  | Yes      | The location id |

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | ` {"message": "Location found!",   "data": [{ "location_id": 18,   "location": "Municipal theater",    "events": [ {   "event_id": 42, "name": "Anime Brasil", "begin_date_time": "2024-06-22T21:00:00.000Z", "end_date_time": "2024-07-01T00:00:00.000Z"  }   ]}]` |
> | `204`     | `application/json` | ` {"error": "Location not found"}`                                                                                                                                                                                                                                  |

##### Example cURL Command

```bash
curl --request GET \
--url http://localhost:3001/location/18
```

</details>

<details>
 <summary><code>PUT</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description     |
> | ----- | ---- | -------- | --------------- |
> | id    | int  | Yes      | The location id |

##### Request Body

> | Field | Type   | Required | Description       |
> | ----- | ------ | -------- | ----------------- |
> | name  | String | Yes      | The location name |

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                              |
> | --------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
> | `200`     | `application/json` | `{"message": "Location updated!","data": {"fieldCount": 0,"affectedRows": 1,"insertId": 0,"info": "Rows matched: 1  Changed: 1  Warnings: 0","serverStatus": 2,"warningStatus": 0,"changedRows": 1}}` |
> | `400`     | `application/json` | `{"error": "\"name\" is required"}`                                                                                                                                                                   |
> | `404`     | `application/json` | `{"error": "Location not found"}`                                                                                                                                                                     |     |

##### Example cURL Command

```bash
curl --request PUT \
--url http://localhost:3001/location/1 \
--header 'Content-Type: application/json' \
--data '{
	"name":"Quadra"
}'
```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description     |
> | ----- | ---- | -------- | --------------- |
> | id    | int  | Yes      | The location id |

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | ` {"message": "Location found!",   "data": [{ "location_id": 18,   "location": "Municipal theater",    "events": [ {   "event_id": 42, "name": "Anime Brasil", "begin_date_time": "2024-06-22T21:00:00.000Z", "end_date_time": "2024-07-01T00:00:00.000Z"  }   ]}]` |
> | `204`     | `application/json` | ` {"error": "Location not found"}`                                                                                                                                                                                                                                  |

##### Example cURL Command

```bash
curl --request GET \
--url http://localhost:3001/location/18
```

</details>

---

### Event <code><b>/event</b></code>

#### Creating, reading, updating and deleting a Event

<details>
 <summary><code>POST</code> <code><b>/</b></code></summary>

##### Parameters

> None

##### Request Body

> | Field           | Type   | Required | Description                                       |
> | --------------- | ------ | -------- | ------------------------------------------------- |
> | name            | String | Yes      | The event name                                    |
> | begin_date_time | String | Yes      | start event timestamp. ex.: "2024-12-19 21:00:00" |
> | end_date_time   | String | Yes      | start event timestamp. ex.: "2024-12-19 21:00:00" |
> | location        | String | Yes      | The location name                                 |

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                    |
> | --------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `201`     | `application/json` | `{"message": "Event created!","data": {"fieldCount": 0,"affectedRows": 1,"insertId": 20,"info": "","serverStatus": 2,"warningStatus": 0,"changedRows": 0}}` |
> | `400`     | `application/json` | `{"error": "\"begin_date_time\" is required"}`                                                                                                              |
> | `409`     | `application/json` | `"error": "Sorry, the location is already reserved for this date."`                                                                                         |

##### Example cURL Command

```bash
curl --request POST \
--url http://localhost:3001/event \
--header 'Content-Type: application/json' \
--data '{
	"name": "The Best Stand Up Festival",
	"begin_date_time": "2024-12-10 18:00:00",
	"end_date_time": "2024-12-19  21:00:00",
	"location": "Municipal Theater"
}'
```

</details>

<details>
 <summary><code>GET</code> <code><b>/</b></code></summary>

##### Parameters

> None

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                                                                                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | ` {"message": "All events found!",   "data": [{ "event_id": 42, "name": "The Best Stand Up Festival", "begin_date_time": "2024-12-10T18:00:00.000Z", "end_date_time": "2024-12-19T21:00:00.000Z",   "location": "Municipal theater",    "lectures": [ {   "lecture_id": 21, "theme": "Laugh with Jimmy", "begin_date_time": "2024-12-12T21:00:00.000Z", "panelist_id": 4  }   ]}]` |

##### Example cURL Command

```bash
curl --request GET \
--url http://localhost:3001/event
```

</details>

<details>
 <summary><code>GET</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description  |
> | ----- | ---- | -------- | ------------ |
> | id    | int  | Yes      | The event id |

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                                                                                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | ` {"message": "All events found!",   "data": [{ "event_id": 42, "name": "The Best Stand Up Festival", "begin_date_time": "2024-12-10T18:00:00.000Z", "end_date_time": "2024-12-19T21:00:00.000Z",   "location": "Municipal theater",    "lectures": [ {   "lecture_id": 21, "theme": "Laugh with Jimmy", "begin_date_time": "2024-12-12T21:00:00.000Z", "panelist_id": 4  }   ]}]` |
> | `204`     | `application/json` | ` {"error": "Event not found"}`                                                                                                                                                                                                                                                                                                                                                    |

##### Example cURL Command

```bash
curl --request GET \
--url http://localhost:3001/event/42
```

</details>

<details>
 <summary><code>PUT</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description  |
> | ----- | ---- | -------- | ------------ |
> | id    | int  | Yes      | The event id |

##### Request Body

> | Field           | Type   | Required | Description                                       |
> | --------------- | ------ | -------- | ------------------------------------------------- |
> | name            | String | Yes      | The event name                                    |
> | begin_date_time | String | Yes      | start event timestamp. ex.: "2024-12-19 21:00:00" |
> | end_date_time   | String | Yes      | start event timestamp. ex.: "2024-12-19 21:00:00" |
> | location        | String | Yes      | The location name                                 |

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                              |
> | --------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
> | `200`     | `application/json` | `{"message": "Event updated!","data": {"fieldCount": 0,"affectedRows": 1,"insertId": 0,"info": "Rows matched: 1  Changed: 1  Warnings: 0","serverStatus": 2,"warningStatus": 0,"changedRows": 1}}` |
> | `400`     | `application/json` | `{"error": "\"name\" is required"}`                                                                                                                                                                   |
> | `404`     | `application/json` | `{"error": "Event not found"}`                                                                                                                                                                     |     |

##### Example cURL Command

```bash
curl --request PUT \
--url http://localhost:3001/event/38 \
--header 'Content-Type: application/json' \
--data '{
	"name": "Laugh with Jimmy",
	"begin_date_time": "2024-12-13 18:00:00",
	"end_date_time": "2024-12-19  21:00:00",
	"location": "Municipal theater"
}'
```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/{id}</b></code></summary>

##### Parameters

> | Field | Type | Required | Description     |
> | ----- | ---- | -------- | --------------- |
> | id    | int  | Yes      | The location id |

##### Request Body

> None

##### Responses

> | HTTP Code | Content-Type       | Response                                                                                                                                                                                                                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | ` {"message": "Event deleted!",   "data": { "fieldCount": 0, "affectedRows": 1, "insertId": 0, "info": "","serverStatus": 2, "warningStatus": 0, "changedRows": 0}` |
> | `204`     | `application/json` | ` {"error": "Location not found"}`                                                                                                                                                                                                                                  |

##### Example cURL Command

```bash
curl --request DELETE \
--url http://localhost:3001/event/42
```

</details>

## Technology

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### Back-end :coffee:

| Technology                          | Description                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**Node.js**](https://nodejs.org/en)    | Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts. |
| [**Express**](http://expressjs.com/)    |  Fast, unopinionated, minimalist web framework for Node.js. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy. |
| [**MySQL**](https://www.mysql.com/) | A relational database management system.                                                                                                                     |

