# Health Declaration App (Frontned)


## Tech Stack
- <b>Programming Language:</b> Javascript
- <b>Dependencies:</b> React, Ant Design


## Notes

This Web UI is hosted on Netlify via GitHub CICD setup. [Link](https://flourishing-torrone-5405cd.netlify.app/) to the website.

In order to run this locally,
- `npm install` at the root level to install the dependencies
- And run `npm start`


## Features

The UI has 2 sections
- Health Declaration Form
- Search User Data 

### Filling in the Form

Users will need to first submit health declaration form before they can retrieve the data.
I have spent considerable amount of effort to make the `form` as intuitive to use as possible.
I have also implemented form validation logics for NRIC formats, temperature value etc.

### Searching User Data

- Users can search for data by either providing 'Fullname' or 'NRIC/FIN' number.
- Data can be sorted by `Created At` field in both ascending and descending order.
- In addition to displaying data in tabular format, I have also implmented option allow users to download the data in `CSV` format.