# Back-end

The API's url is <https://betterprofessorapp.herokuapp.com/>.

### POST `/api/auth/register`

Make a post request to `/api/auth/register` with JSON in the following format:

```
{
	"name": "Schroeder",
	"email": "cats@uni.com",
	"password": "superposition"
}
```

If the registration succeeds, you will receive a response formatted in the
following way:

```
{
  "id": 1,
  "name": "Schroeder",
  "email": "cats@uni.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI5MTEzLCJleHAiOjE1ODgxMTU1MTN9.ld2n4qMoA09LRYsKD3TLSlETlNHWmovIgMwFkUDodu8"
}
```

Use the `token` field to authorize the user by putting it in the `Authorization`
header.

### POST `/api/auth/login`

Make a post request to `/api/auth/login` with JSON in the following format:

```
{
	"email": "cats@uni.com",
	"password": "superposition"
}
```

If the login succeeds, you will receive a response formatted in the following
way:

```
{
  "id": 1,
  "name": "Schroeder",
  "email": "cats@uni.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI5MTEzLCJleHAiOjE1ODgxMTU1MTN9.ld2n4qMoA09LRYsKD3TLSlETlNHWmovIgMwFkUDodu8"
}
```

Use the `token` field to authorize the user by putting it in the `Authorization`
header.

### POST `/api/students`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a post request to `/api/students` with JSON in the following format:

```
{
	"name": "Trevor",
	"email": "trevor@example.com"
}
```

If the registration succeeds, you will receive a response formatted in the
following way:

```
{
  "message": "Student successfully added",
  "student": {
    "id": 1,
    "professor_id": 1,
    "name": "Trevor",
    "email": "trevor@example.com"
  }
}
```

### GET `/api/students`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/students` and you will receive a response formatted in the following way:

```
{
  "message": "Rendering student list: ",
  "students": [
    {
      "id": 1,
      "professor_id": 1,
      "name": "Trevor",
      "email": "trevor@example.com"
    },
    {
      "id": 2,
      "professor_id": 1,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

### GET `/api/students/:id`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/students` and you will receive a response formatted in the following way:

```
{
    "message": "Pulling up student information: ",
    "student": {
        "id": 1,
        "professor_id": 1,
        "name": "Trevor",
        "email": "trevor@gmail.com"
    }
}

```


### PUT `/api/students/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a put request to `/api/students/:id` with JSON in the following format:

```
{
	"name": "Trevor",
	"email": "trevor@example.com"
}
```


Make a put request to `/api/students/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Student information updated."
}
```

### DELETE `/api/students/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a delete request to `/api/students/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Student successfully deleted.",
    "deleted": 1
}

```

### GET `/api/students/:id/projects`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/students` and you will receive a response formatted in the following way:

```
{
    "message": "...",
    "projects": [
      {
        "id": 2,
        "student_id": 2,
        "name": "eye study",
        "description": "study the biology of the eye",
        "due_date": "2021-01-23",
        "completed": 0
      }
    ]
}

```
### POST `/api/students/:id/projects`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a post request to `/api/projects` with JSON in the following format:

```
{
	"name": "robot neural net",
	"description": "build robot neural net schematics",
	"due_date": "2020-28-10",
	"completed": "false"
}
```

Make a post request to `/api/projects` and you will receive a response formatted in the following way:

```
{
    "message": "Project successfully added",
    "project": {
        "id": 11,
        "student_id": 3,
        "name": "robot neural net",
        "description": "build robot neural net schematics",
        "due_date": "2020-28-10",
        "completed": "false"
    }
}
```

### GET `/api/projects/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/projects/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Pulling up project information: ",
    "project": {
        "id": 2,
        "student_id": 2,
        "name": "eye study",
        "description": "study the biology of the eye",
        "due_date": "2021-01-23",
        "completed": 0
    }
}
```

### PUT `/api/projects/:id`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a put request to `/api/projects/:id` with JSON in the following format:

```
{
	"student_id": "3",
	"name": "test update project",
	"description": "test update project",
	"due_date": "2020-28-10",
	"completed": "false"
}
```

Make a put request to `/api/projects/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Project information updated"
}
```

### DELETE `/api/projects/:id`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a delete request to `/api/projects/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Project deleted",
    "deleted": 1
}
```

### POST `/api/messages`
To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a post request to `/api/messages` with JSON in the following format:

```
{
	"title": "test title",
	"body": "test body",
	"time_to_send": "2020-28-08",
	"sent": "false"
}
```

Make a post request to `/api/messages` and you will receive a response formatted in the following way:

```
{
    "message": "Message successfully added.",
    "newMessage": {
        "id": 6,
        "title": "test title",
        "body": "test body",
        "professor_id": 1,
        "student_id": null,
        "time_to_send": "2020-28-08",
        "sent": "false"
    }
}
```

### GET `/api/messages`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/messages` and you will receive a response formatted in the following way:

```
{
    "message": "Rendering message list",
    "appMessages": [
        {
            "id": 5,
            "title": "test title",
            "body": "test body",
            "professor_id": 1,
            "student_id": null,
            "time_to_send": "2020-28-08",
            "sent": "false"
        },
        {
            "id": 6,
            "title": "test title",
            "body": "test body",
            "professor_id": 1,
            "student_id": null,
            "time_to_send": "2020-28-08",
            "sent": "false"
        }
    ]
}
```

### GET `/api/messages/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a get request to `/api/messages/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Pulling up message information",
    "appMessage": {
        "id": 2,
        "title": "Ingredients",
        "body": "Gather ingredients for Defense Against the Dark Arts lesson",
        "professor_id": 2,
        "student_id": null,
        "time_to_send": "2020-04-29",
        "sent": 0
    }
}
```

### PUT `/api/messages/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a put request to `/api/messages/:id` with JSON in the following format:

```
{
	"title": "test title",
	"body": "test body",
	"time_to_send": "2020-28-08",
	"sent": "false"
}
```

Make a post request to `/api/messages/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Message successfully updated",
    "updated": {
        "id": 1,
        "title": "test title",
        "body": "test body",
        "professor_id": 2,
        "student_id": null,
        "time_to_send": "2020-28-08",
        "sent": "false"
    }
}
```

### DELETE `/api/messages/:id`

To access this endpoint, you must be logged in. Once you are logged in, you must set the `Authorization` header to the token.

Make a delete request to `/api/messages/:id` and you will receive a response formatted in the following way:

```
{
    "message": "Message successfully deleted",
    "deleted": 1
}
```
