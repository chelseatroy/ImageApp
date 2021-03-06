# ImageApp
Image App allows you to browse and search for images on Unsplash, a repository for open-license images that people can use for free. 

## Screenshots
![Android](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-09-at-8.55.54-PM.png)
![iOS](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-09-at-8.52.29-PM.png)
![User Input, iOS](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-09-at-8.52.11-PM.png)
![No Results, iOS](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-10-at-1.56.39-PM.png)

## Instructions
Should be fairly intuitive. If it isn't, my UI is not good :)

But for clarity, one can search for images with the bar at the top, then scroll through the results below.

## Dependencies
Since this was a very limited-scope project, I included no additional dependencies like `redux`, `mobx`, `axios`, or `enzyme`. This creates some limitations which are worth noting:

- The `fetch` library is known to have some issues surrounding handling bad HTTP requests. I'd probably switch to something else in a larger scope app for the sake of that reliability.
- Very little state management: state amounts only to the images we just searched for, and it lives in the collection component
- Testing: Having `shallow` from `enzyme` helps a lot with component testing when components hook up directly to network requests. I use native testing elements for this for now
- Currently no separate component for individual collection views. If they got any more complicated than they are right now, I'd probably extract that out.

## Conventions and Issues
- My capitalization convention might look unfamiliar. I use `CapitalCamelCase` for files that export items with _mutable state_. I use `lowerCamelCase` for files that export functions or items with _immutable state_ (like style classes).
- When you run the tests, you'll get a warning that one of the test files contains no tests. That's because I put `fixtures.js` in the test directory so I would have some test data to mock out the API and check that my view looked right. I'd look more into this under different time circumstances, but it wasn't blocking, so I left it for now. I'd love to hear your thoughts on how to remediate this!
- For some reason, if I remove the blank line under the `<SafeAreaView>` opening tag, the app has issues. I looked into this for a little while, but did not figure it out. If you happen to know, I'd love to hear it! 

## Known issue with images
Sometimes the results for a given search are...weird. 

![Dragon, Android](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-09-at-8.57.03-PM.png)
![Noresu, iOS](https://chelseatroy.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-09-at-8.51.19-PM.png)

I checked the web UI as well, and the weird results are the actual results for some searches. 

# Security
The Unsplash API requires an API key. I figured your plan to test this app would be to pull it down from github and run it, and I did not want to include the API key in a github repo.

I considered standing up a server for this app to make a request to for the API key. I set up a mocky endpoint to hand over the key, but I still felt weird about that—anyone could look at the repo, find the mocky URL, go to that URL, and get the API key.

To put the key behind authentication would have required standing up a little server instead of using Mocky. Since implementing auth didn't quite fit in the 3 hour time frame for this app,
I instead kept the API key in a `secrets.js` file. To get this app to work, you'll need to insert that file. Steps:

1. Get an API hey [from here](https://unsplash.com/developers).
1. Make a file called `secrets.js` at the root of the project (that is, under `ImageApp`).
1. In that file, add the following line:

`export const UNSPLASH_API_KEY = "YOUR KEY HERE"`

IMPORTANT: The API Key only allows for 50 requests per hour. So, as fun as it is to search for images, keep it under that so your key doesn't get revoked :)

C

