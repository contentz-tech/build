function loadLocale(locale: string = "en-US"): any {
  try {
    const module = require(`date-fns/locale/${locale}/index.js`);
    if (module.default) return module.default;
    return module;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND" && locale !== "en-US") {
      return loadLocale();
    }
    throw error;
  }
}

export { loadLocale };
