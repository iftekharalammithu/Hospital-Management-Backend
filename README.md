# User API Endpoints

This section details the available API endpoints for your project. The format is:

- **HTTP Method** **URL Path** (**Middleware**): **Description**

**Authentication:**

- `is_Admin_authenticated`: Ensures a user is authenticated as an Admin before proceeding.
- `is_Patient_authenticated`: Ensures a user is authenticated as a Patient before proceeding.

**Endpoints:**

- **POST** `/api/v1/users/patient/register` (None): Registers a new patient.
- **POST** `/api/v1/users/login` (None): Logs in a user (patient or admin). (Authentication details likely depend on your implementation.)
- **POST** `/api/v1/users/admin/register` (is_Admin_authenticated): Registers a new admin user. Requires admin authentication.
- **POST** `/api/v1/users/adddoctor` (is_Admin_authenticated): Adds a new doctor. Requires admin authentication.
- **GET** `/api/v1/users/doctors` (None): Retrieves a list of all doctors.
- **GET** `/api/v1/users/admin/me` (is_Admin_authenticated): Retrieves currently logged-in admin user's data. Requires admin authentication.
- **GET** `/api/v1/users/patient/me` (is_Patient_authenticated): Retrieves currently logged-in patient user's data. Requires patient authentication.
- **GET** `/api/v1/users/admin/logout` (is_Admin_authenticated): Logs out the currently logged-in admin user. Requires admin authentication.
- **GET** `/api/v1/users/patient/logout` (is_Patient_authenticated): Logs out the currently logged-in patient user. Requires patient authentication.

# Message Endpoints

**Authentication:**

- `is_Admin_authenticated`: Ensures a user is authenticated as an Admin before proceeding.

**Endpoints:**

- **POST** `/api/v1/message/send_message` (None): Sends a message. (Authentication details likely depend on your implementation.)
- **GET** `/api/v1/message/get_messages` (is_Admin_authenticated): Retrieves all messages. Requires admin authentication.

## Appointment Endpoints

- **POST** `/api/v1/appointment/apply_appointment` (is_Patient_authenticated): Allows patients to request an appointment. Requires patient authentication.
- **GET** `/api/v1/appointment/get_appointment` (is_Admin_authenticated): Retrieves all appointments. Requires admin authentication. (Consider adding support for filtering by date range, doctor, etc.)
- **PUT** `/api/v1/appointment/update_appointment/:appointment_id` (is_Admin_authenticated): Updates an existing appointment by appointment ID. Requires admin authentication.
- **DELETE** `/api/v1/appointment/delete_appointment/:appointment_id` (is_Admin_authenticated): Deletes an existing appointment by appointment ID. Requires admin authentication.

Follow on social media:

[<img src="https://user-images.githubusercontent.com/74038190/235294011-b8074c31-9097-4a65-a594-4151b58743a8.gif" width="50">
](https://x.com/M1thuChowdhury)
[<img src="https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif" width="50">
](https://www.linkedin.com/in/iftekharalammithu/)
[<img src="https://user-images.githubusercontent.com/74038190/235294013-a33e5c43-a01c-43f6-b44d-a406d8b4ab75.gif" width="50">
](https://www.instagram.com/iftekharalammithu/)

<div style="text-align: center;">
  <a href="https://www.buymeacoffee.com/iftekharalammithu">
    <img src="https://media.giphy.com/media/o7RZbs4KAA6tvM4H6j/giphy.gif" style=" display: block; margin: auto;" width="150">
  </a>
</div>
