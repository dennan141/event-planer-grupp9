# Event-planer

## Getting Started 🏃

To start please run these commands from the VsCode console:

```bash
npm install
npm run dev
```

> **_NOTE:_** 🧾 Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. navigate using the top navigation bar. Click any event to to go the event-view page or click ID, TITLE or DATE to sort

> **_NOTE:_** ⚠️ The application has been tested using OperaGX, Google Chrome and Firefox. Should you use another browser and experience any errors please try any of these instead.

## Techniques

- ### Styling 🖼️

  -TailwindCSS
  -DaisyUI
  Most components was styled by either DaisyUI, TailwindCSS or a mix between the two for simplicity and learning.

- ### Storage 👨‍💻

  - IndexedDB
    By looking at what data needed to be stored and marking it down it's appearent that the _Event_ object needs to save two larger strings and a Datatime-local. Since a large amount of events can be created a more complex db-strucute is preferred since IndexedDB was choosen.
    <br>
  - SessionStorage
    The other data that needs to be stored (Sorting and latest created/edited events) could be stored either in sessionStorage or cookies. LocalStorage was quickly rejected due to the fact that no data needed to be stored that permanently. Weighing between cookies and sessionStorage the later was eventually choosen based on the fact that it does not create a unnecesarry network strain.

## Challenges 🧑‍🏫

The challenges of this project were many but mainly consisted of not knowing where to start with this new information.

- IndexedDB was learned in a separate project while development started using dummy data from a JSON file. Learning in this way created a simpler environment for learning without stalling the project.

- Due to not fully understanding useState and useEffect, the team's ability to create functioning code was severely hampered. Fortunately, I spent a large amount of time talking in Discord with other classmates and was shown better ways to use them.

- Passing data to a dynamic router was not something I had done in the previous assignment but would look good in this one, so I had to learn. Fortunately for me, I found and learned about many of Next.js functions such as useParams, UsePath, and some more. This simplified many problems automatically.

## Future improvements 🛠️

- Search bar
  By adding a search bar it can really simplify finding events from the home page after many events has been created.
- Calender
  Displaying the events in a calender creates a more visual way for the user to see their events.
- Improve loading and page speed
  Using small amounts of data is accepteable for now but for future focusing on page loadig speed should be a priority.
- Visuals
  Page is acceptable but small amount of thought have gone into UI/UX and more is needed as project expands.
- Semantic HTML and accesebility
  Needs adding
