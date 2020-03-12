# Lincoln Full-Stack Engineer Take-Home Project
All alerts are sent to robertp93@gmail.com (due to SES limitations on sandbox emailing).
https://lincoln.robpetri.com is the live demo


This take-home project is designed to simulate real world client work. It should take up to only a few hours to complete. Please work at your own pace and comfort.

Any ambiguity found in the task is intentional; we want to see how you navigate decision trees and how you defend your choices. Approach this as you would approach a task given by a real client. 

## Instructions

1. Clone this repo under your own GitHub account.
2. Complete the task below.
3. After completing the task, add **NotASithLord** as a collaborator to your cloned repo.

## Task 

### Background

Your client is a non-profit organization that uses the services of a 3rd party vendor to solicit donations on the client's behalf. Every month, the vendor sends the client a CSV file of new donation information.

The CSV file is guaranteed to be well-formed. It consists of these fields:

- Donor ID*
- Donor Name
- Donor Email
- Donor Gender
- Donor Address
- Donation Amount*

Fields marked with an asterisk (**\***) are required fields, and are guaranteed to be included in each row. Rows with blank column data should be treated as **Anonymous** donations.

The client has requested a way to manage/visualize their donation information. They want to build a simple web dashboard to:

- View all donation records
- Filter out **Anonymous** donations
- View total donation amount
- Upload any new donation CSV to add new records

Additionally, the client wants to be alerted on every successfuly CSV upload with a summary that includes the following information:

- Total number of records uploaded
- Total value of newly uploaded donations
- Percentage of **Anonymous** donations

### Deliverables

- Build a web-based dashboard with the above client requirements
- You may use any language/framework/tool to build the dashboard. Add any relevant files/code to the cloned repository.
- Somewhere in the repo, add a public URL to view the dashboard.
- Create an alert on successful CSV upload. You may send alert to any service (email, Slack, etc). Be prepared to demo this functionality.


### Tips

- We have provided a sample `donations.csv` file in the repo to use for seed data.
- We are grading for functionality and approach over polish. We do not want you to spend significant time on aethetics, though clean, elegant UI/UX is encouraged.
