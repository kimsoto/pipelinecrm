Senior Capstone Project
PIPELINE CRM

Problem: My client says that their company has tried other CRM’s in the past, but each one did not meet the expectations of their company. From having too many features that they wouldn’t use, to not enough features. My client has not found a perfect CRM solution for his start-up company.

Solution: While working with me throughout the project, we were able to create a CRM that was purposely designed to fit his companies needs. This CRM has a simple design that his employees can use without hassle. It also has features that his company absolutely needs.


Front End: 
--Uses Vue.js version 2 javascript framework as the front end--
--Styled with Bootstrap version 5 as the CSS framework--
--Routing using Vue Router--
--Authentication handled by Keycloak, an open source software product to allow single sign-on with Identity and Access Management--


Back End:
--Uses Node.js Express.js application framework--
--Uses REST API principles--
--Data is stored in a MySQL relational database--
--Each Express route verifies access tokens using Keycloak--


Hosting: 
--NGINX web server installed on Ubuntu hosts both the Vue front end, and the Express back end--
--Express backend is run as a reverse proxy--
--Keycloak authentication is install on Ubuntu, also runs as a reverse proxy on NGINX--
