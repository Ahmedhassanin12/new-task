

## Task Description
The objective of this task is to implement a login form based on a provided Figma design and integrate it with a backend API. Upon successful authentication, the user will be redirected to a simple dashboard with a logout option.

### Requirements
1. **Login Page**:
   - Includes email and password fields.
   - Implements validation:
     - Both fields must be filled.
     - Email must be in a valid format.
   - The login button is disabled until validations pass.
   - Integrates with the login API to authenticate users.

2. **Dashboard**:
   - Displays the user's ID and name fetched from the API.
   - Includes a logout button to terminate the session.

3. **Logout**:
   - Clears authentication and redirects the user back to the login page.

### API Integration
- **Login API**:
  - URL: `url`
  - Method: POST
  - Body: `{email: <Email>, password: <Password>, isEmployee: true}`

- **User Info API**:
  - URL: `https://api-yeshtery.dev.meetusvr.com/v1/user/info`
  - Method: GET
  - Authorization: Bearer token from login response.










