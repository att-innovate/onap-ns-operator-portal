This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# For Andrew F.

## Up and Running

- Make sure you have `node lts` on your machine.
- Install `yarn` using `npm` (node package manager).
- In the root of the directory run `yarn start`.
- Navigate to `localhost:3000/dashboard`.

## Your Code

Should go in the file at `src/Dashboard/Monitor/index.js`. I have marked the function you need to implement with a comment that has your name in it.

As I recall you wished to poll an endpoint, so the function you implement will be called every 5 seconds by the live graphs (we can change the interval). Right now, I just return some dummy rand values.

Note: the function you must implement is marked as `async` (modern front-ends no longer use JavaScript callbacks), so make sure to use the `await` keyword on the endpoint (via `result = await fetch ...`) instead of a callback. 

The rest of the code is `await`ing your function, so assuming you use the `await` keyword on your fetch call(s) correctly. all should be good.