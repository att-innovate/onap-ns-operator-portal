This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Up and Running

- Make sure you have `node lts` on your machine.
- Install `yarn` using `npm` (node package manager).
- In the root of the directory run `yarn install`.
- In the root of the directory run `yarn start`.
- Navigate to `localhost:3000/dashboard`.

# What are We Showing?

- Instantiation and monitoring of Private Platinum Service (eMBB service design).
- Instantiation and monitoring of Private Silver Service (eMBB service design).

# Important Notes on Demo Limitations

1. If you hit `Cmd/Ctrl` + `R`, the entire local cache is refreshed, and since there is no backing DB, and the
front-end will have no memory of any of your manipulations.

2. The PoC is *hard-coded* with two demo instantiation templates, which you can see at:
    - The bottom of http://localhost:3000/dashboard/instantiate
    - http://localhost:3000/dashboard/instantiate/demo1
    - http://localhost:3000/dashboard/instantiate/demo2
  
3. When you press the `Instantiate` button at either of the latter two links above, it will be replaced with a spinner. If the spinner turns back into an `Instantiate` button, you have (probably) instantiated the slice for the corresponding demo. If it hangs for an unreasonable amount of time or you receive an error, hit `Cmd/Ctrl` + `R` and try again. 
   - **In either case, manually check the console.**
   
4. The "Monitor & Manage" tab **DOES NOT** reflect your attempted instantiations. 
   - What we mean by this is within this tab, there are has two dummy placeholders for you to receive and show monitoring stats by hardcoding the monitoring endpoints of successfully instantiated slices. 
   - In other words, do not to spam the aforementioned `Instantiate` buttons expecting the "Monitor & Manage" tab to update. 
   - Instead you will have to click on each placeholder in the "Monitor & Manage" tab, enter the associated monitoring endpoint of the successfully instantiated slice (which you verified in the console because you heeded `(3)`), and then walah, live graphs should pop up in the nested pages you arrived at after clicking on each placeholder.


5. If you navigate away from the individual monitoring pages for each slice (where the graphs live), you will have to do all of the stuff in `(4)` again. So how do we compare the two instantiated slices?
   - Pull up two windows.
   - Navigate to the Monitor & Manage tab in each window.
   - Click on Demo #1 in window #1, Demo #2 in window #2.
   - Enter the respective monitoring endpoints.
   - While you wait for the graphs to collect a bit of data, talk about how awesome network slicing is.
   - Show how awesome network slicing is.


This should all be clear in the step-by-step guide to an awesome demo below.

# Step-by-Step How to Show this Demo Effectively, Given Above Limitations

Coming tomorrow morning.

# For Andrew F.

## Tasks

### 08/30/2018

You now have two functions to implement.

The function from last time has been moved to `src/Containers/Template.js`. If you read the "Important Notes on Demo Limitations" and "Step-by-Step ..." sections above, you know that you will be recieving the monitoring endpoint for each individual instantiation from the user (you can choose to override this user-given value if you see fit, but then you should change the aforementioned sections accordingly!). See the comment contained within this new file for more info.

The second function is a similarly marked and absracted fetch call for the described `Instantiate` button. See the file `src/Containers/Instantiation.js` (and "Andrew" comment contained within).

### 08/25/2018

Your code should go in the file at `src/Dashboard/Monitor/index.js`. I have marked the function you need to implement with a comment that has your name in it.

As I recall you wished to poll an endpoint, so the function you implement will be called every 5 seconds by the live graphs (we can change the interval). Right now, I just return some dummy rand values.

Note: the function you must implement is marked as `async` (modern front-ends no longer use JavaScript callbacks), so make sure to use the `await` keyword on the endpoint (via `result = await fetch ...`) instead of a callback. 

The rest of the code is `await`ing your function, so assuming you use the `await` keyword on your fetch call(s) correctly. all should be good.