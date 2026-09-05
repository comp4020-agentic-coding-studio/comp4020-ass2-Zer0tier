// Assignment 2's spec (comp4020-agentic-coding-studio/assessments/assignment-2):
// the mechanically-checkable lines only. "Response to the brief" and "does the
// curriculum actually hold together" are for the crit, not a test file.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { courseMeta } from "../src/course-config";

// The three digits this repo was provisioned with, from the SLOP1276 the repo
// arrived with. Literal and hardcoded on purpose: a test that reads its
// expected value from courseMeta itself can't catch courseMeta being wrong.
const PROVISIONED_DIGITS = "276";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}
interface CourseApi {
  nodes: ApiNode[];
}
const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((n) => n.type === type);

describe("Assignment 2 spec", () => {
  it("keeps the SLOP code's provisioned three digits", () => {
    // Only the level (first digit) is the student's choice; the course
    // catalogue relies on the other three staying unique to this repo.
    expect(courseMeta.code.slice(-3)).toBe(PROVISIONED_DIGITS);
  });

  it("runs across twelve dated teaching weeks", () => {
    const weeks = byType("sessions")
      .map((n) => n.meta?.week)
      .sort((a, b) => (a as number) - (b as number));
    expect(weeks).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));

    for (const session of byType("sessions")) {
      expect(session.meta?.date, `${session.id} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}/);
    }
  });

  it("assessments add up to 100%", () => {
    const total = byType("assessments").reduce(
      (sum, n) => sum + Number(n.meta?.weight ?? 0),
      0,
    );
    expect(total).toBe(100);
  });

  it("at least one lecture carries a real deck, linked from its page", () => {
    const withSlides = byType("lectures").filter((n) => typeof n.meta?.slides === "string");
    expect(withSlides.length, "no lecture links a deck via `slides:`").toBeGreaterThan(0);

    for (const lecture of withSlides) {
      const slidesPath = lecture.meta!.slides as string; // "/decks/<name>/"
      const deckName = slidesPath.match(/^\/decks\/([a-z0-9-]+)\/$/)?.[1];
      expect(deckName, `${lecture.id}'s slides path is malformed: ${slidesPath}`).toBeTruthy();

      const deckSrc = readFileSync(resolve(`src/decks/${deckName}.deck.mdx`), "utf8");
      expect(
        deckSrc,
        `src/decks/${deckName}.deck.mdx is still the starter deck — ` +
          "replace it and remove its STARTER_CONTENT comment",
      ).not.toMatch(/STARTER_CONTENT/);
    }
  });
});
