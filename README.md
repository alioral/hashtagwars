<h1>Documentation</h1>
<h2>Notes</h2>

<h3>Last Updated</h3>

<p>A model’s lastUpdated field might be ambiguous </p>

<h3>Recommended Browser</h3>

<p>Due to Google Chrome’s async requests sometimes Broken Pipe error is encountered. Firefox is the recommended browser for this app.</p>

<h2>Cool Features About #ashtag Wars</h2>

<h3>Self-updating models</h3>

<p>Model is triggering the counter operation itself, thus without knowing anything about the parent views when an increase occurs it updates it’s view automatically.</p>

<h2>Possible Features I Could Have Add</h2>

<h3>Adjusting Twitter API Limits</h3>

<p>Twitter API allows only 180 request per 15 minutes (1 request per 5 secs, if there is one counter). I wanted to make sure that user should be able to add multiple hashtags thus when a new hashtag is added, master view automatically adjusts each model in it’s collection with the new count interval.</p>

<h3>Persistance</h3>

<p>When the page refreshes, the hashtags disappear. It would be much better for the user experience to be able to persist the hashtag counters added before.</p>

<h3>Caching</h3>

<p>There could be many hashtags requested by the user that already has counters so a simple caching mechanism using a tool like Redis could have been implemented in order to reduce the API calls</p>

<h3>Relevant Hashtags</h3>

<p>For each hashtag added, system could suggest relevant hashtags with a simple recommendation system implementation so when the user types the hashtag “#katyperry” system could add “Have you tried? #ladygaga #jtimberlake #iggyazalea”.</p>

<h3>Deletion of Hashtags</h3>

<p>Haven’t implemented the hashtag deletion but it would be beneficial for both reducing the API calls and also increasing the count rate of existing hashtags.</p>
