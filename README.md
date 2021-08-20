This is my project for SoftUni Angular July 2021.It uses angular SPA for client side and google firebase for the server side.
It's a news reporting website where everyone can get the latest approved news that are being commited to the webside.

Everyone can see: 
 - [Recent-News](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/recent-news) Sorted by most recent news with client-side pagination
 - [News-Detail](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/news-detail) The full article with registered users comments
 - [Login](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/user/login)
 - [Register](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/user/register)
 
Registered users can access:
  - Commenting on individual news
  - [Profile](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/user/profile) A profile page with personal information
  - Reporting news to admins for review
  - They can apply to be a journalist on the website
  
Journalists have access to:
  - [Create-News](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/news/create-news)  Creating and editing their news articles

Admins have access to:
  - [Journalist-Applicants](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/admin/journalist-applications) reviewing journalist applicants
  - [Review-News](https://github.com/Smashcake/SoftUniAngularProject-2021/tree/main/src/app/admin/review-news) reviewing news before being released to the public aswell as removing ones which are harmful
  - Can delete articles and comments


The app separates into 5 Modules: 
  - Admin
  - User
  - News
  - Core
  - Shared

The business logic is handled in 3 services:
  - [Admin](https://github.com/Smashcake/SoftUniAngularProject-2021/blob/main/src/app/admin/admin.service.ts) contains minimal logic currently due to being the most recent.Contains logic about journalist applicants
  - [User](https://github.com/Smashcake/SoftUniAngularProject-2021/blob/main/src/app/user/user.service.ts) handles user related operations and firebase endpoints for said related operations
  - [News](https://github.com/Smashcake/SoftUniAngularProject-2021/blob/main/src/app/news/news.service.ts) same as user service but with news
