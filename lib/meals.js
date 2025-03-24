import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  try {
    const meal = db.prepare("SELECT * FROM meals WHERE slug = ").get(slug);

    return meal;
  } catch (error) {
    console.error(`Error fetching meal:`, error);
    throw error;
  }
}
export async function saveMeal(meal) {
  try {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);

    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(await bufferedImage), (error) => {
      if (error) throw new Error("Saving Image failed");
    });

    meal.image = `/images/${fileName}`;

    db.prepare(
      `
      INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES 
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
    ).run(meal);
  } catch (error) {
    console.error("Failed to save meal:", error);
    throw new Error("Database or file handling error.");
  }
}
