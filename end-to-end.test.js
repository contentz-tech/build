describe("End to End", () => {
  test("Home Page", async () => {
    await page.goto("http://localhost:5000/");
    await expect(page).toMatch("Contentz Test");
    await expect(page).toMatch(
      "Create Content, Get a Highly Optimized Website"
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
  });

  test("Archive Page", async () => {
    await page.goto("http://localhost:5000/articles");
    await expect(page).toMatch("Articles");
    await expect(page).toMatch("List of articles of Contentz Test");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("My First Article");
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
  });

  test("Talks Page", async () => {
    await page.goto("http://localhost:5000/slides/");
    await expect(page).toMatch("September 14, 2019");
    await expect(page).toMatch("My Talk");
    await expect(page).toMatch("This is my first talk ever!");
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
  });

  test("Resume Page", async () => {
    await page.goto("http://localhost:5000/cv/");

    await expect(page).toMatch("Contentz Tech");
    await expect(page).toMatch("hello+contentz@sergiodxa.com");
    await expect(page).toMatch("https://contentz.tech");
  });

  test("Links Page", async () => {
    await page.goto("http://localhost:5000/links/");

    await expect(page).toMatch("Shared Links");
    await expect(page).toMatch("Sergio Xalambrí");
    await expect(page).toClick("a", { text: "Sergio Xalambrí" });
    await page.waitForNavigation();
    expect(await page.title()).toBe("Sergio Xalambrí");
  });
});
