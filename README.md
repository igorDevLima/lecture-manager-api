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
