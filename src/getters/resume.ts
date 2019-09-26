import { readFile, exists } from "../utils/fs";
import { validate, SchemaError } from "resume-schema";

interface IResume {
  basics?: Basics;
  work?: Work[];
  volunteer?: Volunteer[];
  education?: Education[];
  awards?: Award[];
  publications?: Publication[];
  skills?: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
}

interface Basics {
  name?: string;
  label?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
}

interface Profile {
  network?: string;
  username?: string;
  url?: string;
}

interface Work {
  company?: string;
  position?: string;
  website?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface Volunteer {
  organization?: string;
  position?: string;
  website?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface Education {
  institution?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
}

interface Award {
  title?: string;
  date?: string;
  awarder?: string;
  summary?: string;
}

interface Publication {
  name?: string;
  publisher?: string;
  releaseDate?: string;
  website?: string;
  summary?: string;
}

interface Skill {
  name?: string;
  level?: string;
  keywords?: string[];
}

interface Language {
  language?: string;
  fluency?: string;
}

interface Interest {
  name?: string;
  keywords?: string[];
}

interface Reference {
  name?: string;
  reference?: string;
}

function parseSchemaError(errors: SchemaError[]): string {
  return "Invalid resume.json file.\n\n".concat(
    errors
      .map(error =>
        [
          `${error.message} in path ${error.path} (${error.description}).`,
          `Failed params: ${error.params.join(", ")}`
        ].join("\n")
      )
      .join("\n\n")
  );
}

function validateSchema(schema: IResume): Promise<IResume> {
  return new Promise((resolve, reject) =>
    validate(schema, (errors) =>
      errors ? reject(parseSchemaError(errors)) : resolve(schema)
    )
  );
}

async function resume(): Promise<IResume | undefined> {
  if (await exists("./resume.json")) {
    const fileContent = await readFile("./resume.json", "utf8");
    const content = JSON.parse(fileContent);
    try {
      await validateSchema(content);
    } catch (errors) {
      const error = new Error("Invalid resume.json file.");
      error.stack = errors;
      throw error;
    }
    return content;
  }

  return undefined;
}

export {
  resume,
  IResume,
  Basics,
  Location,
  Profile,
  Work,
  Volunteer,
  Education,
  Award,
  Publication,
  Skill,
  Language,
  Interest,
  Reference
};
