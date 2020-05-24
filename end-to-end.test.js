describe("End to End", () => {
  test("Home Page", async () => {
    await page.goto("http://localhost:5000/");
    await expect(page).toMatch("Contentz Test");
    await expect(page).toMatch(
      "Create Content, Get a Highly Optimized Website"
    );
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/home/");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DContentz%20Test%26description%3DCreate%20Content%2C%20Get%20a%20Highly%20Optimized%20Website"
    );
    expect(ogImage).toContain(encodeURIComponent("Contentz Test"));
    expect(ogImage).toContain(
      encodeURIComponent("Create Content, Get a Highly Optimized Website")
    );
    await expect(page).toClick("a", { title: "github" });
  });

  test("Navigation", async () => {
    await page.goto("http://localhost:5000/");

    await expect(page).toClick("a", { text: "Articles" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Contentz Test");

    await expect(page).toClick("a", { text: "Links" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Contentz Test");

    await expect(page).toClick("a", { text: "Talks" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Contentz Test");

    await expect(page).toClick("a", { text: "CV" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Contentz Test");

    await expect(page).toClick("a", { text: "About" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("About me - Contentz Test");
  });

  test("Error Page", async () => {
    await page.goto("http://localhost:5000/super/random/non/existant/page");
    await expect(page).toMatch("Error 404");

    await expect(page).toMatch(
      "The page, article or slide you have tried to access was not found"
    );

    await expect(page).toMatch("Go to the Home");
    await expect(page).toMatch("Go to the list of Articles");
    await expect(page).toMatch("Go to the list of Talks");
    await expect(page).toMatch("Go to the list of Shared Links");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/error/");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DError%20404%26description%3DThe%20page%2C%20article%20or%20slide%20you%20have%20tried%20to%20access%20was%20not%20found"
    );
    expect(ogImage).toContain(encodeURIComponent("Error 404"));
    expect(ogImage).toContain(
      encodeURIComponent(
        "The page, article or slide you have tried to access was not found"
      )
    );
  });

  test("Archive Page", async () => {
    await page.goto("http://localhost:5000/articles");
    await expect(page).toMatch("Articles");
    await expect(page).toMatch("List of articles of Contentz Test");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("My First Article");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/articles/");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DArticles%26description%3DList%20of%20articles%20of%20Contentz%20Test"
    );
    expect(ogImage).toContain(encodeURIComponent("Articles"));
    expect(ogImage).toContain(
      encodeURIComponent("List of articles of Contentz Test")
    );
  });

  test("Article Page", async () => {
    await page.goto("http://localhost:5000/articles/my-first-article/");
    await expect(page).toMatch("My First Article");
    await expect(page).toMatch("Learn more on contentz.tech");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("This is my first article.");
    await expect(page).toMatch("This is bold text inside a blockquote");
    await expect(page).toMatch("Edit it on GitHub");
    await expect(page).toMatch("Do you like my content?");
    await expect(page).toMatch(
      "Become a Patreon and help me continue writing!"
    );
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch(
      "https://contentz.tech/articles/my-first-article/"
    );
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DMy%20First%20Article%26description%3DLearn%20more%20on%20contentz.tech"
    );
    expect(ogImage).toContain(encodeURIComponent("My First Article"));
    expect(ogImage).toContain(
      encodeURIComponent("Learn more on contentz.tech")
    );
  });

  test("Custom Page", async () => {
    await page.goto("http://localhost:5000/about/");
    await expect(page).toMatch("About me");
    await expect(page).toMatch("This is a custom page.");
    await expect(page).toMatch("Learn more about Contentz at contentz.tech.");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("Edit it on GitHub");
    await expect(page).toMatch("Do you like my content?");
    await expect(page).toMatch(
      "Become a Patreon and help me continue writing!"
    );
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/about/");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DAbout%20me%26description%3DThis%20is%20a%20custom%20page."
    );
    expect(ogImage).toContain(encodeURIComponent("About"));
    expect(ogImage).toContain(encodeURIComponent("This is a custom page."));
  });

  test("Talks Page", async () => {
    await page.goto("http://localhost:5000/slides/");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("My Talk");
    await expect(page).toMatch("This is my first talk ever!");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/slides/");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DTalks%26description%3DList%20of%20talks%20of%20Contentz%20Test"
    );
    expect(ogImage).toContain(encodeURIComponent("Talks"));
    expect(ogImage).toContain(
      encodeURIComponent("List of talks of Contentz Test")
    );
  });

  test("Slide Page", async () => {
    await page.goto("http://localhost:5000/slides/my-talk/");
    expect(await page.title()).toBe("My Talk - Contentz Test");

    await expect(page).toMatch("First Slide");

    await page.keyboard.press("ArrowRight");
    await page.waitForNavigation();

    await expect(page).toMatch("Second Slide");

    await page.keyboard.press("ArrowRight");
    await page.waitForNavigation();

    await expect(page).toMatch("Third Slide");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/slides/my-talk");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DMy%20Talk%26description%3DThis%20is%20my%20first%20talk%20ever!"
    );
    expect(ogImage).toContain(encodeURIComponent("My Talk"));
    expect(ogImage).toContain(
      encodeURIComponent("This is my first talk ever!")
    );
  });

  test("Resume Page", async () => {
    await page.goto("http://localhost:5000/cv/");

    await expect(page).toMatch("Contentz Tech");
    await expect(page).toMatch("hello+contentz@sergiodxa.com");
    await expect(page).toMatch("https://contentz.tech");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/cv");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DCV%26description%3DContentz%20Test's%20resume"
    );
    expect(ogImage).toContain(encodeURIComponent("CV"));
    expect(ogImage).toContain(encodeURIComponent("Contentz Test's resume"));
  });

  test("Links Page", async () => {
    await page.goto("http://localhost:5000/links/");
    const ogURLContent = await page.$eval(
      "meta[property='og:url']",
      (element) => element.content
    );
    expect(ogURLContent).toMatch("https://contentz.tech/links");
    const ogImage = await page.$eval(
      "meta[property='og:image']",
      (element) => element.content
    );
    expect(ogImage).toMatch(
      "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DShared%20Links%26description%3D"
    );
    expect(ogImage).toContain(encodeURIComponent("Shared Links"));

    await expect(page).toMatch("Shared Links");
    await expect(page).toMatch("Sergio Xalambrí");
    await expect(page).toClick("a", { text: "Sergio Xalambrí" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Sergio Xalambrí");
  });
});
